import { UseSocketReturn } from "@/hook/useSocket";

import ThreeCanvas from "./ThreeCanvas";

export default function Three({
  existingIds,
}: Pick<UseSocketReturn, "existingIds">) {
  return (
    <div className="h-screen">
      <ThreeCanvas existingIds={existingIds} />
    </div>
  );
}
