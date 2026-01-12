import { address } from "@/assets/svgs";
import { Button } from "../ui/button";

const SelectAddressModal = () => {
  return (
    <div className="flex flex-col gap-8 items-center justify-center">
      <h3 className="form-title">Select address</h3>
      <div className="">
        <img
          src={address.src}
          alt="select_location_illustration"
          className=""
        />
      </div>
      <p className="max-sm:-mt-2 text-lg leading-6 text-gray-500 text-center">
        Set your location to start exploring restaurants around you
      </p>

      <div className="space-y-3.5 sm:space-y-3">
        <Button className="submit-btn font-bold! text-sm">
          Use Current Location
        </Button>
        <Button className="submit-btn bg-background border border-primary-800 text-primary-800 font-bold!">
          Set From Map
        </Button>
      </div>
    </div>
  );
};

export default SelectAddressModal;
