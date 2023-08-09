export default function Button({ buttonText }: { buttonText: string }) {
  return (
    <button className="px-10 py-2 rounded-full bg-slate-900 text-white">
      {buttonText}
    </button>
  );
}
