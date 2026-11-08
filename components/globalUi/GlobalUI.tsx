// import CancelOrderModal from "../orders/CancelOrderModal";
import OrderSuccessModal from "./OrderSuccessModal";
import ReviewOrderModal from "../orders/ReviewOrderModal";
import AddressModal from "./AddressModal";
import GlobalCheckout from "./GlobalCheckout";
import OrderDetails from "./OrderDetails";
import TrackOrder from "./TrackOrder";
import TrackParcel from "./TrackParcel";
import LocationConfirmationModal from "./LocationConfirmationModal";

const GlobalUI = () => {
  return (
    <>
      <GlobalCheckout />
      <AddressModal />
      <OrderDetails />
      <TrackOrder />
      <TrackParcel />
      {/* <CancelOrderModal /> */}
      <ReviewOrderModal />
      <OrderSuccessModal />
      <LocationConfirmationModal />
    </>
  );
};

export default GlobalUI;
