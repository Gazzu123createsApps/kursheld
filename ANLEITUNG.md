# Kursheld – Anleitung

Kursheld ist ein Börsen-Simulator mit Spielgeld. Er läuft im Browser und lässt sich auf Android und Windows wie eine echte App installieren.

- 10.000 € Startkapital für jedes neue Konto
- 1 Spieltag = 5 echte Minuten, 1 Spieljahr = 360 Spieltage (≈ 30 Stunden)
- 47 ausgedachte Anlagen, viele davon mit Dividende: ETFs, Aktien, Anleihen, Rohstoffe (Gold, Öl), Krypto, dazu Tagesgeld
- Kurs-Wecker: Benachrichtigung, wenn ein Kurs einen Wert über- oder unterschreitet
- Limit-Orders: automatisch kaufen oder verkaufen, wenn ein Kurs deinen Wert erreicht
- Vokabeln abfotografieren und abfragen lassen: 20 € pro richtiger Antwort, höchstens 2.000 € pro Kalendertag
- Rangliste der 100 reichsten Spieler, dazu Computer-Gegner mit festen Strategien

---

## 1. Online stellen (kostenlos mit GitHub Pages)

Damit man die App installieren kann, braucht sie eine eigene **https-Adresse**.

1. Auf <https://github.com> ein kostenloses Konto anlegen.
2. Oben rechts **+ → New repository**, Name z. B. `kursheld`, auf **Public** stellen, **Create repository**.
3. Auf **uploading an existing file** klicken und **alle Dateien** aus diesem ZIP hineinziehen (es gibt keinen Unterordner). Dann **Commit changes**.
4. Im Repository **Settings → Pages**: bei *Branch* `main` und `/ (root)` wählen, **Save**.
5. Nach 1–2 Minuten ist die App unter `https://DEINNAME.github.io/kursheld/` erreichbar.

## 2. Als App installieren

**Android (Chrome):** Adresse öffnen → Menü ⋮ → **App installieren**. Kursheld steht danach im App-Menü.

**Windows (Edge oder Chrome):** Adresse öffnen → in der Adresszeile auf das Symbol **App installieren** klicken. Kursheld bekommt ein eigenes Fenster, einen Startmenü-Eintrag und lässt sich an die Taskleiste anheften. Alternativ in der App unter **Profil → App installieren**.

**iPhone (Safari):** Teilen → **Zum Home-Bildschirm**.

## 3. Jugendschutz mit Family Link

Nach der Installation über Chrome wird Kursheld von Android als eigene App eingetragen. In der Family-Link-App der Eltern:

**Kind auswählen → Bildschirmzeit/Steuerung → App-Limits → Kursheld** und dann
- **Immer zulassen** (zählt nicht zur Bildschirmzeit, „unbegrenzt“),
- **Limit festlegen** oder
- **Blockieren**.

Bitte einmal ausprobieren, ob Kursheld dort in der Liste auftaucht. Falls nicht: Schritt 5 (echte Android-App über PWABuilder) nehmen – eine App aus dem Play Store lässt sich auf jeden Fall steuern.

## 4. Online-Konten und weltweite Rangliste (Firebase, kostenlos)

Ohne diesen Schritt läuft alles **nur auf dem jeweiligen Gerät**: Konten und Rangliste sieht man nur dort. Für Konten, die auf Handy **und** PC funktionieren, und eine Rangliste mit allen Spielern braucht Kursheld einen Online-Speicher. Dafür braucht man ein Google-Konto (bei Kindern am besten von den Eltern einrichten lassen).

1. <https://console.firebase.google.com> öffnen → **Projekt hinzufügen**, Name z. B. `kursheld` (Google Analytics kann aus bleiben).
2. Auf der Projektseite das Symbol **</> (Web)** anklicken, App-Name `Kursheld`, **App registrieren**. Es erscheint ein Block `const firebaseConfig = { ... }`.
3. Die Werte `apiKey`, `authDomain`, `projectId` und `appId` in die Datei **`firebase-config.js`** eintragen (Beispiel steht in der Datei) und die geänderte Datei wieder bei GitHub hochladen.
4. Links **Build → Authentication → Jetzt starten → Anmeldemethode → E-Mail/Passwort** aktivieren.
   (Kursheld benutzt intern Spielername + Passwort, echte E-Mail-Adressen werden nicht gebraucht.)
5. **Authentication → Einstellungen → Autorisierte Domains → Domain hinzufügen:** `DEINNAME.github.io`
6. Links **Build → Firestore Database → Datenbank erstellen**, Standort z. B. `europe-west3 (Frankfurt)`, **Produktionsmodus**.
7. In Firestore auf **Regeln** gehen, alles löschen, den Inhalt der Datei **`firestore.rules`** einfügen und **Veröffentlichen**.

Danach fragt Kursheld beim Start nach Spielername und Passwort. In der Rangliste steht dann „Online – alle Spieler“.
Der kostenlose Firebase-Tarif reicht für einige Tausend Spieler.

**Datenschutz:** Gespeichert werden nur Spielername, Passwort (verschlüsselt durch Google) und der Spielstand. Den Spielernamen sehen alle in der Rangliste – also keinen echten Namen benutzen. Unpassende Namen kann man in der Firebase-Konsole unter *Firestore → leaderboard* löschen.

## 5. Echte App-Datei für Windows oder den Play Store (optional)

Auf <https://www.pwabuilder.com> die Adresse aus Schritt 1 eingeben → **Package for stores**:
- **Windows:** *Test Package* ergibt eine `.msix`-Datei zum direkten Installieren, *Store Package* ist für den Microsoft Store.
- **Android:** ergibt eine App-Datei für den Google Play Store (dafür braucht man ein Google-Play-Entwicklerkonto, einmalig 25 $). Selbst installierte `.apk`-Dateien werden auf Kinder-Konten oft blockiert.

## Gut zu wissen

- **Vokabeln fotografieren:** Gedruckte Listen (Schulbuch) werden gut erkannt, Handschrift oft schlecht. Nach dem Foto kann man alles korrigieren. Beim ersten Mal lädt die Texterkennung einmalig Daten aus dem Internet. In der Vorschau innerhalb von Claude liest Claude selbst das Foto (meist genauer).
- **Kurse:** Sind für alle gleich und werden aus der Uhrzeit berechnet. Eine falsch gestellte Geräte-Uhr verschiebt die Kurse.
- **Schummeln:** Spielstände werden auf dem Gerät berechnet. Wer sich mit Programmierkenntnissen Mühe gibt, könnte schummeln. Für ein Familien-/Klassenspiel reicht das; einen echten Schummelschutz gäbe es nur mit eigener Server-Logik.
- **Updates:** Geänderte Dateien einfach bei GitHub ersetzen. Die installierte App holt sich die neue Version beim nächsten Start mit Internet.
- Kursheld ist ein **Lernspiel**. Alle Firmen sind ausgedacht, alles ist Spielgeld, nichts davon ist eine Anlageempfehlung.


---

## Kurs-Wecker

Auf der Seite jeder Anlage (und unter **Depot → Kurs-Wecker**) stellst du ein, ab welchem Wert du Bescheid bekommen willst – wahlweise wenn der Kurs **über** den Wert steigt oder **unter** den Wert fällt. Beim ersten Wecker fragt dein Gerät, ob Benachrichtigungen erlaubt sind.

- Es klingelt, solange Kursheld offen ist (auch minimiert oder im Hintergrund).
- Ist die App ganz geschlossen, kann sie nicht klingeln – dafür bräuchte man einen eigenen Server. Beim nächsten Öffnen wird nachgeprüft, ob der Wert inzwischen erreicht wurde, und die App zeigt, *wann* das passiert ist (bis zu 48 Stunden zurück).
- Wecker werden im Spielstand gespeichert (bei Online-Konten also auch auf anderen Geräten).

## Limit-Orders

Auf der Seite jeder Anlage gibt es die Karte **Limit-Order**. Es gibt drei Arten:

- **📥 Günstig kaufen:** Kursheld kauft für deinen Betrag, sobald der Kurs auf deinen Wert fällt (oder darunter). Der Wert muss unter dem aktuellen Kurs liegen.
- **💰 Gewinn mitnehmen:** Kursheld verkauft, sobald der Kurs auf deinen Wert steigt (oder darüber). Dafür musst du die Anlage im Depot haben.
- **🛡️ Verlust begrenzen (Stop-Loss):** Kursheld verkauft, sobald der Kurs auf deinen Wert fällt (oder darunter).

Beim Verkaufen kannst du einen Betrag eingeben oder das Feld leer lassen, dann wird alles verkauft. Orders bleiben gültig, bis sie ausgeführt oder gelöscht werden (höchstens 30 offene). Jede Ausführung kostet wie sonst 1 € Gebühr.

- Bargeld wird **nicht reserviert**. Fehlt es im Moment der Ausführung, wird die Order mit einer Meldung abgebrochen.
- Wird eine Verkaufs-Order ausgeführt und das Depot ist danach leer, werden die anderen Verkaufs-Orders derselben Anlage automatisch gestrichen. So kannst du „Gewinn mitnehmen" und „Verlust begrenzen" gleichzeitig stellen.
- Auch hier gilt: Ist die App geschlossen, wird nichts ausgeführt. Beim nächsten Öffnen prüft Kursheld bis zu 5 Tage zurück und führt die Order zu dem Kurs und der Uhrzeit aus, an der der Wert erreicht wurde.
- Bei Online-Konten Kursheld nur auf **einem Gerät gleichzeitig** offen haben, sonst können sich Stände gegenseitig überschreiben.

## Updates ohne Neuinstallation

Neue Version einspielen: im GitHub-Repository **Add file → Upload files**, die neuen Dateien hochladen (gleiche Namen werden ersetzt) und **Commit changes**.

Alle installierten Apps (Handy, Windows) prüfen regelmäßig, beim Öffnen und alle 10 Minuten, ob es eine neue Version gibt, und zeigen dann **„Neue Version verfügbar – Jetzt aktualisieren"**. Der Spielstand bleibt erhalten, es wird nichts zusätzlich installiert. Unter **Profil → Nach Update suchen** geht es auch von Hand. GitHub braucht nach dem Hochladen 1–2 Minuten.

## Ereignisse, Crashs und Booms

Etwa an jedem vierten Spieltag passiert etwas: Nachrichten zu einzelnen Firmen, ganzen Branchen oder dem ganzen Markt. Sie erscheinen groß als Pop-up und unter **Markt → Börsen-Nachrichten**. Selten (etwa einmal pro Tag echter Zeit) gibt es einen **Börsencrash**, bei dem fast alle Kurse um 10–30 % fallen. Ganz selten gibt es einen **Mega-Boom**: Eine Aktie oder Kryptowährung verdoppelt sich oder mehr und fällt dann innerhalb von 3–5 Spieltagen wieder auf ihren normalen Kurs. Die Ereignisse sind für alle Spieler gleich.

## Dividenden

Anlagen mit 💸 zahlen alle 30 Spieltage (≈ 2,5 Stunden) Dividende. Das Geld kommt automatisch zum Bargeld – auch nachträglich, wenn die App geschlossen war.
