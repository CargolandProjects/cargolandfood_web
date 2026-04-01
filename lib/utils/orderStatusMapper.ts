import { OrderStatus } from "@/lib/types/cart.types";

interface OrderState {
  title: string;
  status: "idle" | "pending" | "success";
  description: string;
  time?: string;
}

/**
 * UI-only order statuses (subset of backend OrderStatus)
 */
type UIOrderStatus = "ACCEPTED" | "PREPARING" | "READY" | "ASSIGN_TO_RIDER" | "DELIVERED";

/**
 * Normalizes backend OrderStatus to UI-compatible status
 * Handles statuses that backend sends but UI doesn't need
 * 
 * @param backendStatus - The status received from backend
 * @param timestamps - Available timestamp fields to determine the most recent valid status
 * @returns Normalized status that UI can display
 */
export function normalizeOrderStatus(
  backendStatus: OrderStatus,
  timestamps: {
    acceptedAt?: string | null;
    preparedAt?: string | null;
    readyAt?: string | null;
    assignedAt?: string | null;
    completedAt?: string | null;
  }
): UIOrderStatus {
  // Direct mapping for statuses UI understands
  const uiStatuses: UIOrderStatus[] = ["ACCEPTED", "PREPARING", "READY", "ASSIGN_TO_RIDER", "DELIVERED"];
  
  if (uiStatuses.includes(backendStatus as UIOrderStatus)) {
    return backendStatus as UIOrderStatus;
  }

  // Handle unwanted statuses by mapping to appropriate UI status
  switch (backendStatus) {
    case "NEW":
      // NEW orders should show as ACCEPTED once accepted
      return "ACCEPTED";
      
    case "RIDER_ACCEPTED":
    case "PICKUP_ORDER":
      // These intermediate statuses map to ASSIGN_TO_RIDER
      // But we should check timestamps to avoid going backwards
      // If the order hasn't been assigned yet, use the most recent valid status
      if (timestamps.assignedAt) return "ASSIGN_TO_RIDER";
      if (timestamps.readyAt) return "READY";
      if (timestamps.preparedAt) return "PREPARING";
      return "ACCEPTED";
      
    default:
      // Fallback: use most recent timestamp to determine current status
      if (timestamps.completedAt) return "DELIVERED";
      if (timestamps.assignedAt) return "ASSIGN_TO_RIDER";
      if (timestamps.readyAt) return "READY";
      if (timestamps.preparedAt) return "PREPARING";
      return "ACCEPTED";
  }
}

/**
 * Maps backend OrderStatus to UI timeline states
 * Timeline progression: ACCEPTED → PREPARING → READY → ASSIGN_TO_RIDER → DELIVERED
 */
export function mapOrderStatusToTimeline(orderStatusData: {
  OrderStatus: OrderStatus;
  acceptedAt?: string | null;
  preparedAt?: string | null;
  readyAt?: string | null;
  assignedAt?: string | null;
  completedAt?: string | null;
}): OrderState[] {
  // Normalize the backend status to UI status
  const currentStatus = normalizeOrderStatus(
    orderStatusData.OrderStatus,
    {
      acceptedAt: orderStatusData.acceptedAt,
      preparedAt: orderStatusData.preparedAt,
      readyAt: orderStatusData.readyAt,
      assignedAt: orderStatusData.assignedAt,
      completedAt: orderStatusData.completedAt,
    }
  );

  // const timestamp =
  //   typeof orderStatusData === "object" && "createdAt" in orderStatusData
  //     ? orderStatusData.createdAt
  //     : undefined;

  // Define the order of statuses (UI only)
  const statusOrder: UIOrderStatus[] = [
    "ACCEPTED",
    "PREPARING",
    "READY",
    "ASSIGN_TO_RIDER",
    "DELIVERED",
  ];

  // Find the current status index
  const currentIndex = statusOrder.indexOf(currentStatus);

  // Base timeline with hardcoded descriptions
  const timeline: OrderState[] = [
    {
      title: "Order Accepted",
      description: "Your order has been confirmed by the vendor",
      time: orderStatusData.acceptedAt || undefined,
      status: "idle",
    },
    {
      title: "Preparing your order",
      description: "Vendor is preparing your order",
      time: orderStatusData.preparedAt || undefined,
      status: "idle",
    },
    {
      title: "Order ready to go out",
      description: "Vendor is ready to give out your order",
      time: orderStatusData.readyAt || undefined,
      status: "idle",
    },
    {
      title: "Assign to rider",
      description: "Order has been assigned to a rider",
      time: orderStatusData.assignedAt || undefined,
      status: "idle",
    },
    {
      title: "Completed",
      description: "Your order has been delivered",
      time: orderStatusData.completedAt || undefined,
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
