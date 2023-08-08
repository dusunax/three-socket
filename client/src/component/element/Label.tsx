import { ReactNode } from "react";

export default function Label({
  children,
  htmlFor,
}: {
  children: ReactNode;
  htmlFor: string;
}) {
  return (
    <label className="block text-xs mb-4" htmlFor={htmlFor}>
      {children}
    </label>
  );
}
