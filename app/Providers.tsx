"use client";
import GoogleMapsProvider from "@/lib/GoogleMapsProvider";
import { getQueryClient } from "@/lib/query-client";
import { SocketProvider } from "@/lib/providers/SocketProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => getQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SocketProvider>
        <GoogleMapsProvider>
          {children}
          <Toaster position="top-right" richColors />
          <ReactQueryDevtools />
        </GoogleMapsProvider>
      </SocketProvider>
    </QueryClientProvider>
  );
}
