// import CancelOrderModal from "../orders/CancelOrderModal";
import OrderSuccessModal from "./OrderSuccessModal";
import ReviewOrderModal from "../orders/ReviewOrderModal";
import AddressModal from "./AddressModal";
import GlobalCheckout from "./GlobalCheckout";
import OrderDetails from "./OrderDetails";
import TrackOrder from "./TrackOrder";

const GlobalUI = () => {
  return (
    <>
      <GlobalCheckout />
      <AddressModal />
      <OrderDetails />
      <TrackOrder />
      {/* <CancelOrderModal /> */}
      <ReviewOrderModal />
      <OrderSuccessModal />
    </>
  );
};

export default GlobalUI;
