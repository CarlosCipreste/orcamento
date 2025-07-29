'use client'
import { AlertCircle } from "lucide-react";

type ErrorBoxProps = {
  message?: string;
};

export function ErrorBox({ message }: ErrorBoxProps) {
  if (!message) return null;

  return (
    <div className="flex items-center gap-2 mt-1  bg-red-100 border border-red-300 text-red-800 text-sm rounded-md shadow-sm z-10 absolute">
      <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
      <span>{message}</span>
    </div>
  );
}
