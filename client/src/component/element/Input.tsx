export default function Input({
  name,
  placeholder,
  autoFocus,
  value = "익명",
}: {
  name: string;
  placeholder: string;
  autoFocus: boolean;
  value?: string;
}) {
  return (
    <input
      type="text"
      name={name}
      className="px-4 py-2 mx-2 border-cyan-300 rounded-lg shadow-md"
      placeholder={placeholder}
      required
      autoComplete="off"
      autoFocus={autoFocus}
      defaultValue={value}
    />
  );
}
