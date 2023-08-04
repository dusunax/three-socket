import { UseSocketReturn } from "@/hook/useSocket";

export type ChatProps = Pick<UseSocketReturn, "messages" | "sendMessage">;
