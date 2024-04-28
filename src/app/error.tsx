"use client";

import { Button } from "../components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  function getErrorMessages() {
    const isApiExpired = error.message?.includes("ServiceUnavailable");
    if (isApiExpired) {
      return <h2>API key has expired</h2>;
    }
    return (
      <h2>
        An error occurred. Please try again later or contact support if the
        issue persists. Error: {error.message}
      </h2>
    );
  }
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="text-center">{getErrorMessages()}</div>
      <Button className="m-6 rounded font-bold" type="button" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
