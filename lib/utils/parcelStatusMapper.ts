import { ParcelStatus } from "../services/parcel.service";

interface OrderState {
  title: string;
  status: "idle" | "pending" | "success";
  description: string;
  time?: string;
}

/**
 * UI-only order statuses (subset of backend OrderStatus)
 */
export type UIOrderStatus =
  | "NEW"
  | "RIDER_ACCEPTED"
  | "PICKUP_ORDER"
  | "RIDER_OUTSIDE"
  | "DELIVERED";

/**
 * Normalizes backend OrderStatus to UI-compatible status
 * Handles statuses that backend sends but UI doesn't need
 *
 * @param backendStatus - The status received from backend
 * @param timestamps - Available timestamp fields to determine the most recent valid status
 * @returns Normalized status that UI can display
 */
export function normalizeOrderStatus(
  backendStatus: ParcelStatus,
  timestamps: {
    acceptedAt?: string | null;
    pickedupAt?: string | null;
    riderOutsideAt?: string | null;
    deliveredAt?: string | null;
  },
): UIOrderStatus {
  // Direct mapping for statuses UI understands
  const uiStatuses: UIOrderStatus[] = [
    "NEW",
    "RIDER_ACCEPTED",
    "PICKUP_ORDER",
    "RIDER_OUTSIDE",
    "DELIVERED",
  ];

  if (uiStatuses.includes(backendStatus as UIOrderStatus)) {
    return backendStatus as UIOrderStatus;
  }

  // Handle unwanted statuses by mapping to appropriate UI status
  switch (backendStatus) {
    case "NEW":
      // NEW orders should show as ACCEPTED once accepted
      return "NEW";

    default:
      // Fallback: use most recent timestamp to determine current status
      if (timestamps.deliveredAt) return "DELIVERED";
      if (timestamps.riderOutsideAt) return "RIDER_OUTSIDE";
      if (timestamps.pickedupAt) return "PICKUP_ORDER";
      if (timestamps.acceptedAt) return "RIDER_ACCEPTED";
      return "RIDER_ACCEPTED";
  }
}

/**
 * Maps backend OrderStatus to UI timeline states
 * Timeline progression: ACCEPTED → PREPARING → READY → ASSIGN_TO_RIDER → DELIVERED
 */
export function mapParcelStatusToTimeline(parcelStatusData: {
  OrderStatus: ParcelStatus;
  acceptedAt?: string | null;
  pickedupAt?: string | null;
  riderOutsideAt?: string | null;
  deliveredAt?: string | null;
}): OrderState[] {
  // Normalize the backend status to UI status
  const currentStatus = normalizeOrderStatus(parcelStatusData.OrderStatus, {
    acceptedAt: parcelStatusData.acceptedAt,
    pickedupAt: parcelStatusData.pickedupAt,
    riderOutsideAt: parcelStatusData.riderOutsideAt,
    deliveredAt: parcelStatusData.deliveredAt,
  });

  // const timestamp =
  //   typeof orderStatusData === "object" && "createdAt" in orderStatusData
  //     ? orderStatusData.createdAt
  //     : undefined;

  // Define the order of statuses (UI only)
  const statusOrder: UIOrderStatus[] = [
    "RIDER_ACCEPTED",
    "PICKUP_ORDER",
    "RIDER_OUTSIDE",
    "DELIVERED",
  ];

  // Find the current status index
  const currentIndex = statusOrder.indexOf(currentStatus);

  // Base timeline with hardcoded descriptions
  const timeline: OrderState[] = [
    {
      title: "Parcel Picked Up",
      description: "The parcel has been collected from the sender.",
      time: parcelStatusData?.acceptedAt || undefined,
      status: "idle",
    },
    {
      title: "In Transit",
      description: "Vendor is preparing your order",
      time: parcelStatusData?.pickedupAt || undefined,
      status: "idle",
    },
    {
      title: "Out for Delivery",
      description:
        "The parcel is with the delivery agent and will arrive soon.",
      time: parcelStatusData?.riderOutsideAt || undefined,
      status: "idle",
    },

    {
      title: "Delivered",
      description:
        "The parcel has been successfully delivered to the recipient.",
      time: parcelStatusData?.deliveredAt || undefined,
      status: "idle",
    },
  ];

  // Update timeline based on current status
  timeline.forEach((state, index) => {
    if (index < currentIndex) {
      // Previous steps are completed (success)
      state.status = "success";
    } else if (index === currentIndex) {
      // Current step is in progress (pending)
      state.status = "pending";
    } else {
      // Future steps are idle
      state.status = "idle";
    }
  });

  return timeline;
}
