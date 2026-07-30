"use client";
import { getQueryClient } from "@/lib/query-client";
import { SocketProvider } from "@/lib/socket/SocketProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { Toaster } from "sonner";
import { APIProvider } from "@vis.gl/react-google-maps";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => getQueryClient());
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  if (!apiKey) console.error("Missing Google Maps API key");

  return (
    <QueryClientProvider client={queryClient}>
      <SocketProvider>
        <APIProvider apiKey={apiKey}>{children}</APIProvider>
        <Toaster position="top-right" richColors />
        <ReactQueryDevtools />
      </SocketProvider>
    </QueryClientProvider>
  );
}
