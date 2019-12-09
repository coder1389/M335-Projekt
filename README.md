# M355-Projekt
Eine Personenverwaltungsapp welche ich als meine Arbeit im Ük programmiert habe.

# Lokale Entwicklungsumgebung
### Globale Dependencies
Damit sie überhaupt die App benutzten können, brauchen sie folgende npm Packages global zu installieren:
- Ionic
- Cordova

npm install ionic cordova -g

### Projekt

Um diese App lokal zu entwickeln bzw. zu starten müssen folgende Schritte ausgeführt werden:
- npm install (Alle Dependencies installieren)
- ionic serve (ruft den Normalen ng (Angular) serve Befehl)

Wenn sie die App über die Ionic DebApp aufrufen wollen brauchen sie folgende Schritte:
- npm install
- ionic cordova prepare
- ionic serve --devapp
