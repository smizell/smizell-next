import Navigation from "@/components/navigation";

export default function Index({ children }) {
  return (
    <>
      <main>
        <Navigation />
        {children}
      </main>
      ;
    </>
  );
}
