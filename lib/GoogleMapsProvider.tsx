"use client";

import { createContext, useContext, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";
import type { Libraries } from "@react-google-maps/api";

const libraries: Libraries = ["places"];

type GoogleMapsContextType = {
  isLoaded: boolean;
  loadError: Error | undefined;
};

const GoogleMapsContext = createContext<GoogleMapsContextType | null>(null);

export const useGoogleMaps = () => {
  const context = useContext(GoogleMapsContext);
  if (!context) {
    throw new Error("useGoogleMaps must be used within GoogleMapsProvider");
  }
  return context;
};

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
  return (
    <GoogleMapsContext.Provider value={{ isLoaded, loadError }}>
      {children}
    </GoogleMapsContext.Provider>
  );
};

export default GoogleMapsProvider;
