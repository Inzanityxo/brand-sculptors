import { redirect } from "next/navigation";

// The hero variants now live on the home page, so they are reviewed in context.
export default function HeroVariantA() {
  redirect("/?hero=a");
}
