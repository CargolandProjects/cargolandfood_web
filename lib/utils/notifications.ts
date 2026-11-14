import DeviceDetector from "@varienos/device-detector-js";

export type Platform = "ANDROID" | "IOS" | "WEB";

export function getDeviceId() {
  let deviceId = localStorage.getItem("deviceId");

  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem("deviceId", deviceId);
  }

  return deviceId;
}

export function getDeviceType(): Platform {
  const detector = new DeviceDetector();

  if (detector.isAndroid()) return "ANDROID";
  if (detector.isIOS()) return "IOS";

  return "WEB";
}
