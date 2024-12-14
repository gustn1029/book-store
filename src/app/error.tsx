"use client";

import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">문제가 발생했습니다</h2>
      <p className="text-gray-600">{error.message}</p>
      <div className="flex gap-3">
        <Button onPress={reset} color="primary">
          다시 시도
        </Button>
        <Button onPress={() => router.push("/")} variant="bordered">
          홈으로 이동
        </Button>
      </div>
    </div>
  );
}
