import LoadingAnimation from "./components/LoadingAnimation";

export default function Loading() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    }}>
      <LoadingAnimation />
    </div>
  );
}