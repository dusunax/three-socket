import { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return <div className="max-w-[600px] mx-auto mt-20">{children}</div>;
}
