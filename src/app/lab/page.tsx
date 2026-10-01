import type { Metadata } from "next";
import { Lab } from "./Lab";

export const metadata: Metadata = { title: "Lab · Brand Sculptors", robots: { index: false } };

export default function LabPage() {
  return <Lab />;
}
