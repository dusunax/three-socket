export default function Light() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[0, 0, 4]} />
      <directionalLight color="#ff0000" intensity={1} position={[5, 5, 5]} />
      <directionalLight color="#0000ff" intensity={1} position={[0, 5, 5]} />
    </>
  );
}
