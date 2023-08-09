import { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-[1200px] px-4 sm:px-10 mx-auto text-center">
      {children}
    </div>
  );
}
