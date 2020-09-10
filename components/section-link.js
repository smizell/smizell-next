import Link from "next/link";
import { Box } from "@chakra-ui/core";

const hrefs = {
  introduction: "/sections/introduction/",
  useCases: "/sections/use-cases/",
  closingThoughts: "/sections/closing-thoughts/",
};

export default function SectionLink({ children, sectionName }) {
  return (
    <Box pt={10}>
      <Link href={hrefs[sectionName]}>{children}</Link>
    </Box>
  );
}
