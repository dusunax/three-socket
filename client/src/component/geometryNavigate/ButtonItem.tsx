export default function ButtonItem({
  text,
  isActive,
}: {
  text: string;
  isActive: boolean;
}) {
  return (
    <li
      className={`px-2 py-1 text-xs text-white rounded-full ${
        isActive ? "bg-lime-600" : "bg-slate-500"
      }`}
    >
      {text}
    </li>
  );
}
