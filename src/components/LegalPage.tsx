import Link from "next/link";
import { Footer } from "./Chrome";

/** Frame for Impressum and Datenschutz. German is binding, the English version follows below. */
export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <main id="main" className="mx-auto min-h-[80vh] max-w-[760px] px-5 py-24 sm:px-8">
        <Link href="/" className="font-mono text-[13px] text-royal-soft hover:text-paper">
          ← Brand Sculptors
        </Link>
        <h1 className="h2 mt-8 text-paper">{title}</h1>
        <div className="mt-10 space-y-5 text-paper/80 [&_h2]:mt-10 [&_h2]:text-[20px] [&_h2]:font-semibold [&_h2]:text-paper [&_a]:text-royal-soft [&_a]:underline [&_a]:underline-offset-4 [&_ul]:list-disc [&_ul]:pl-6">{children}</div>
      </main>
      <Footer />
    </>
  );
}
