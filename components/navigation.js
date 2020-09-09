import Link from "next/link";

export default function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/sections/introduction/">Introduction</Link>
      <Link href="/sections/use-cases/">Use Cases</Link>
      <Link href="/sections/closing-thoughts/">Closing Thoughts</Link>
    </nav>
  );
}
