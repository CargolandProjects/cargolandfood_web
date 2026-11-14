import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";
import { getDeviceId, getDeviceType } from "../utils/notifications";

export const notification = {
  async registerDevice(fcmToken: string) {
    const deviceId = getDeviceId();
    const deviceType = getDeviceType();

    const payload = {
      fcmToken,
      deviceId: deviceId,
      deviceType: deviceType,
    };

    // console.log("Notification Payload:", payload);

    const res = await apiClient.post(API_ROUTES.notificatino.register, payload);
    return res.data;
  },
};
