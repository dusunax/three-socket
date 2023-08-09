export default function Title({
  text,
  marginBottomTW = "",
}: {
  text: string;
  marginBottomTW?: string;
}) {
  return <h1 className={`text-2xl font-bold ${marginBottomTW}`}>{text}</h1>;
}
