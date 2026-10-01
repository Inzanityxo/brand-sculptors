import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Impressum · Brand Sculptors" };

const MAIL = "marco@brandsculptors.info";

export default function Impressum() {
  return (
    <LegalPage title="Impressum">
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>Marco Bednarz<br />Vesaliusstraße 82<br />13187 Berlin<br />Deutschland</p>
      <h2>Kontakt</h2>
      <p>E-Mail: <a href={`mailto:${MAIL}`}>{MAIL}</a></p>
      <h2>Umsatzsteuer</h2>
      <p>Kleinunternehmer gemäß § 19 UStG. Es wird keine Umsatzsteuer erhoben und ausgewiesen.</p>
      <h2>Redaktionell verantwortlich (§ 18 Abs. 2 MStV)</h2>
      <p>Marco Bednarz<br />Vesaliusstraße 82<br />13187 Berlin</p>
      <h2>Streitschlichtung</h2>
      <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noreferrer">https://ec.europa.eu/consumers/odr/</a>. Meine E-Mail-Adresse findest du oben im Impressum.</p>
      <p>Ich bin nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
      <h2>Haftung für Inhalte</h2>
      <p>Als Diensteanbieter bin ich gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG bin ich als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werde ich diese Inhalte umgehend entfernen.</p>
      <h2>Haftung für Links</h2>
      <p>Mein Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werde ich derartige Links umgehend entfernen.</p>
      <h2>Urheberrecht</h2>
      <p>Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.</p>

      <h2 className="!mt-16">Legal notice (English)</h2>
      <p>The German version above is the legally binding version under German law. This English translation is provided for convenience only.</p>
      <h2>Information according to § 5 DDG (German Digital Services Act)</h2>
      <p>Marco Bednarz<br />Vesaliusstrasse 82<br />13187 Berlin<br />Germany</p>
      <h2>Contact</h2>
      <p>Email: <a href={`mailto:${MAIL}`}>{MAIL}</a></p>
      <h2>VAT</h2>
      <p>Small business under § 19 UStG (German VAT Act). No VAT is charged or shown on invoices.</p>
      <h2>Editorial responsibility (§ 18 para. 2 MStV)</h2>
      <p>Marco Bednarz<br />Vesaliusstrasse 82<br />13187 Berlin</p>
      <h2>Online dispute resolution</h2>
      <p>The European Commission provides a platform for online dispute resolution (ODR): <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noreferrer">https://ec.europa.eu/consumers/odr/</a>. My email address is listed above. I am neither willing nor obligated to participate in dispute resolution proceedings before a consumer arbitration board.</p>
      <h2>Liability for content</h2>
      <p>As a service provider, I am responsible for my own content on these pages in accordance with § 7 para. 1 DDG and general law. According to §§ 8 to 10 DDG, I am not obligated to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity. Obligations to remove or block the use of information under general law remain unaffected. Any liability in this regard is only possible from the moment of knowledge of a specific legal violation. Upon becoming aware of such legal violations, I will remove the content immediately.</p>
      <h2>Liability for links</h2>
      <p>My website contains links to external third-party websites over whose content I have no control. Therefore, I cannot assume any liability for this external content. The respective provider or operator of the linked pages is always responsible for their content. The linked pages were checked for possible legal violations at the time of linking. Illegal content was not recognizable at the time of linking. However, permanent monitoring of the content of linked pages is not reasonable without concrete evidence of a legal violation. Upon becoming aware of legal violations, I will remove such links immediately.</p>
      <h2>Copyright</h2>
      <p>Content and works on these pages created by the operator are subject to German copyright law. Reproduction, processing, distribution, and any kind of exploitation outside the limits of copyright require the written consent of the respective author or creator. Downloads and copies of this site are only permitted for private, non-commercial use.</p>
    </LegalPage>
  );
}
