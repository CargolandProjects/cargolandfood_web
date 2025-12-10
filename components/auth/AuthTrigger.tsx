"use client";

import { Button } from "@/components/ui/button";
import useAuthFlow from "@/lib/stores/authFlowStore";

// Example component showing how to trigger auth modals from anywhere in your app
const AuthTrigger = () => {
  const { openAuth } = useAuthFlow();

  return (
    <div className="flex gap-2">
      <Button 
        variant="outline"
        onClick={() => openAuth('signin')}
      >
        Sign In
      </Button>
      
      <Button 
        onClick={() => openAuth('signup')}
      >
        Sign Up
      </Button>
    </div>
  );
};

export default AuthTrigger;