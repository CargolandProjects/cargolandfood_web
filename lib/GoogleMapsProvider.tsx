"use client";

import { useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";
import type { Libraries } from "@react-google-maps/api";

const libraries: Libraries = ["places"];

const GoogleMapsProvider = ({ children }: { children: React.ReactNode }) => {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey || "",
    libraries,
    // preventGoogleFontsLoading: true, // Uncomment if needed
  });

  useEffect(() => {
    if (isLoaded) {
      console.log("Google Maps API loaded successfully");
    }
    if (loadError) {
      console.error("Google Maps load error:", loadError);
    }
  }, [isLoaded, loadError]);

  if (!googleMapsApiKey) {
    console.error("Google Maps API key is missing!");
  }

  // Always render children immediately - Maps loads in background
  return <>{children}</>;
};

export default GoogleMapsProvider;
