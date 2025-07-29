'use client'
import { ErrorBox } from "./ErrorBox";
import { HTMLInputTypeAttribute } from "react";

type Props = {
  label: string;
  name: string;
  children: React.ReactNode;
  error?: string;
};

export function FormField({ label, children, error }: Props) {
  return (
    <div className="flex items-center w-full gap-2 mb-3">
      <label className="w-32">{label}</label>
      <div className="w-full">
        {children}
        <ErrorBox message={error} />
      </div>
    </div>
  );
}
