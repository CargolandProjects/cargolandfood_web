import CancelOrderModal from "../orders/CancelOrderModal";
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
      <CancelOrderModal />
    </>
  );
};

export default GlobalUI;
