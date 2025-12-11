"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; 
import { ChevronLeftIcon } from "lucide-react"; 

export function BackButton() {
  const router = useRouter();

  return (
    <Button
        variant="secondary"
        size="icon"
        className="absolute top-4 left-4 z-50 rounded-full hover:cursor-pointer"
        onClick={() => router.back()}
      >
        <ChevronLeftIcon />
      </Button>
  );
}