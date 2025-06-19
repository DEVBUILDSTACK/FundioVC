'use client'

import { Button } from "@/components/ui/button";
import { useLoginWithOAuth } from "@privy-io/react-auth";

export default function Home() {

  const { state, loading, initOAuth } = useLoginWithOAuth();

  const handleLogin = async () => {
    try {
      await initOAuth({ provider: 'google' });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-[100dvh] flex items-center justify-center">
      <Button variant={"ghost"} onClick={handleLogin} disabled={loading} className="bg-black text-white hover:bg-zinc-800 hover:text-white">
        {loading ? 'Logging in...' : 'Get Started'}
      </Button>
    </div>
  );
}
