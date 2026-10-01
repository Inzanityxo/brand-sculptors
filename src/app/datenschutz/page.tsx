import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Datenschutz · Brand Sculptors" };

const MAIL = "marco@brandsculptors.info";

export default function Datenschutz() {
  return (
    <LegalPage title="Datenschutzerklärung">
      <h2>1. Verantwortlicher</h2>
      <p>Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:<br />Marco Bednarz<br />Vesaliusstraße 82<br />13187 Berlin<br />Deutschland<br />E-Mail: <a href={`mailto:${MAIL}`}>{MAIL}</a></p>
      <h2>2. Allgemeines zur Datenverarbeitung</h2>
      <p>Ich verarbeite personenbezogene Daten der Nutzer meiner Website grundsätzlich nur, soweit dies zur Bereitstellung einer funktionsfähigen Website sowie meiner Inhalte und Leistungen erforderlich ist. Die Verarbeitung personenbezogener Daten erfolgt regelmäßig nur nach Einwilligung des Nutzers oder wenn eine gesetzliche Grundlage diese gestattet.</p>
      <h2>3. Hosting (Netlify)</h2>
      <p>Diese Website wird bei Netlify, Inc., 44 Montgomery Street, Suite 300, San Francisco, California 94104, USA gehostet. Beim Besuch der Website werden technisch notwendige Daten wie IP-Adresse, Datum und Uhrzeit des Zugriffs, übertragene Datenmenge und der anfragende Provider durch Netlify in Server-Logfiles erfasst. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer technisch fehlerfreien und sicheren Bereitstellung der Website). Netlify verarbeitet Daten auch in den USA. Eine Datenübermittlung in die USA erfolgt auf Grundlage des EU-US Data Privacy Framework, an dem Netlify teilnimmt. Weitere Informationen findest du in der Datenschutzerklärung von Netlify: <a href="https://www.netlify.com/privacy/" target="_blank" rel="noreferrer">https://www.netlify.com/privacy/</a></p>
      <h2>4. Kontaktformular (Netlify Forms)</h2>
      <p>Wenn du das Kontaktformular nutzt, verarbeite ich deinen Namen, deine E-Mail-Adresse, optional deine Website oder dein LinkedIn-Profil, dein Anliegen, deine Angabe zur Investitionsbereitschaft und deine Nachricht, um deine Anfrage zu beantworten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Anbahnung eines Vertrags).</p>
      <p>Das Formular wird über den Dienst Netlify Forms des Hosting-Anbieters Netlify (siehe Punkt 3) verarbeitet. Netlify speichert die Anfrage in meinem Konto und schickt sie mir per E-Mail. Für die Übermittlung in die USA gilt das EU-US Data Privacy Framework. Ich lösche die Anfrage, sobald sie erledigt ist und keine gesetzlichen Aufbewahrungspflichten bestehen.</p>
      <h2>5. Schriftarten</h2>
      <p>Alle Schriftarten werden von dieser Website selbst ausgeliefert. Beim Aufruf findet keine Verbindung zu Servern von Google oder anderen Schriftanbietern statt.</p>
      <h2>6. Cookies, Tracking und lokale Speicherung</h2>
      <p>Diese Website setzt keine Cookies und nutzt kein Tracking. Damit die Startanimation nicht bei jedem Seitenwechsel neu läuft und deine Einstellung für Ton erhalten bleibt, speichert die Website zwei technische Werte im Speicher deines Browsers (Session Storage und Local Storage). Diese Werte verlassen deinen Browser nicht. Rechtsgrundlage ist § 25 Abs. 2 Nr. 2 TDDDG.</p>
      <h2>7. Externer Link (LinkedIn)</h2>
      <p>Diese Website enthält einen einfachen Link zu meinem LinkedIn-Profil. Es werden keine Inhalte von LinkedIn eingebettet. Erst wenn du den Link anklickst, verarbeitet LinkedIn deine Daten nach seiner eigenen Datenschutzerklärung.</p>
      <h2>8. Deine Rechte</h2>
      <p>Du hast nach der DSGVO folgende Rechte:</p>
      <ul>
        <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
        <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
        <li>Recht auf Löschung (Art. 17 DSGVO)</li>
        <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
        <li>Recht auf Widerruf einer Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
        <li>Recht auf Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
      </ul>
      <p>Zur Ausübung deiner Rechte genügt eine E-Mail an <a href={`mailto:${MAIL}`}>{MAIL}</a>.</p>
      <h2>9. Zuständige Aufsichtsbehörde</h2>
      <p>Berliner Beauftragte für Datenschutz und Informationsfreiheit<br />Alt-Moabit 59-61<br />10555 Berlin<br /><a href="https://www.datenschutz-berlin.de" target="_blank" rel="noreferrer">https://www.datenschutz-berlin.de</a></p>
      <h2>10. Aktualität dieser Datenschutzerklärung</h2>
      <p>Stand: Oktober 2026.</p>

      <h2 className="!mt-16">Privacy policy (English)</h2>
      <p>The German version above is the legally binding version under German and EU law. This English translation is provided for convenience only.</p>
      <h2>1. Data controller</h2>
      <p>Marco Bednarz, Vesaliusstrasse 82, 13187 Berlin, Germany. Email: <a href={`mailto:${MAIL}`}>{MAIL}</a></p>
      <h2>2. Hosting (Netlify)</h2>
      <p>This website is hosted by Netlify, Inc., San Francisco, USA. When you visit it, Netlify records technically necessary data such as IP address, date and time of access, amount of data transmitted and the requesting provider in server log files (Art. 6 para. 1 lit. f GDPR). Transfers to the USA are based on the EU-US Data Privacy Framework.</p>
      <h2>3. Contact form (Netlify Forms)</h2>
      <p>When you use the contact form, I process your name, email address, optionally your website or LinkedIn profile, your topic, your answer on investment readiness and your message to answer your request (Art. 6 para. 1 lit. b GDPR). The form is handled by Netlify Forms, part of the hosting provider Netlify. Netlify stores the request in my account and sends it to me by email. Transfers to the USA are based on the EU-US Data Privacy Framework. I delete the request once it is settled and no legal retention period applies.</p>
      <h2>4. Fonts, cookies and local storage</h2>
      <p>All fonts are served by this website itself. The site sets no cookies and uses no tracking. It stores two technical values in your browser (whether the intro animation has played and your sound setting). They never leave your browser.</p>
      <h2>5. External link</h2>
      <p>The link to LinkedIn is a plain link. Nothing from LinkedIn is embedded. LinkedIn only processes your data once you click it.</p>
      <h2>6. Your rights</h2>
      <p>You have the rights of access, rectification, erasure, restriction, data portability, objection, withdrawal of consent and the right to lodge a complaint with a supervisory authority (Art. 15 to 21, 7 para. 3 and 77 GDPR). An email to <a href={`mailto:${MAIL}`}>{MAIL}</a> is enough. The competent authority is the Berlin Commissioner for Data Protection and Freedom of Information.</p>
    </LegalPage>
  );
}
