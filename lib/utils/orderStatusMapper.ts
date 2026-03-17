import { OrderStatus } from "@/lib/types/cart.types";

interface OrderState {
  title: string;
  status: "idle" | "pending" | "success";
  description: string;
  time?: string;
}

/**
 * Maps backend OrderStatus to UI timeline states
 * Timeline progression: ACCEPTED → PREPARING → READY → ASSIGN_TO_RIDER → DELIVERED
 */
export function mapOrderStatusToTimeline(
  orderStatusData: OrderStatus | { status: OrderStatus; createdAt: string }
): OrderState[] {
  // Extract status and timestamp from either format
  const currentStatus =
    typeof orderStatusData === "string"
      ? orderStatusData
      : orderStatusData.status;

  const timestamp =
    typeof orderStatusData === "object" && "createdAt" in orderStatusData
      ? orderStatusData.createdAt
      : undefined;

  // Define the order of statuses
  const statusOrder: OrderStatus[] = [
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
      time: timestamp,
      status: "idle",
    },
    {
      title: "Preparing your order",
      description: "Vendor is preparing your order",
      time: timestamp,
      status: "idle",
    },
    {
      title: "Order ready to go out",
      description: "Vendor is ready to give out your order",
      time: timestamp,
      status: "idle",
    },
    {
      title: "Assign to rider",
      description: "Order has been assigned to a rider",
      time: timestamp,
      status: "idle",
    },
    {
      title: "Completed",
      description: "Your order has been delivered",
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
