// =====================================================================
//  Kursheld – Online-Einstellungen
// ---------------------------------------------------------------------
//  Solange hier "null" steht, läuft Kursheld ohne Internet-Konto:
//  Konten und Rangliste gibt es dann nur auf dem jeweiligen Gerät.
//
//  Für Online-Konten (Handy + PC mit demselben Konto) und eine
//  weltweite Rangliste: kostenloses Firebase-Projekt anlegen
//  (siehe ANLEITUNG.md, Schritt 3) und die Werte unten eintragen.
// =====================================================================

window.KURSHELD_FIREBASE = null;

/*  Beispiel – so sieht es ausgefüllt aus:

window.KURSHELD_FIREBASE = {
  apiKey: "AIza...",
  authDomain: "mein-kursheld.firebaseapp.com",
  projectId: "mein-kursheld",
  appId: "1:1234567890:web:abcdef123456"
};

*/
