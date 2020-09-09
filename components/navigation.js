import Link from "next/link";

export default function Navigation() {
  return (
    <nav>
      <Link href="/asc2020/">ASC 2020</Link>
      <Link href="/asc2020/sections/introduction/">Introduction</Link>
      <Link href="/asc2020/sections/use-cases/">Use Cases</Link>
      <Link href="/asc2020/sections/closing-thoughts/">Closing Thoughts</Link>
    </nav>
  );
}
