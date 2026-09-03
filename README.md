# Scheda Palestra

App web per gestire le tue schede di allenamento, pesi, sforzo percepito e
progressi settimana dopo settimana — installabile sulla schermata home del
telefono come una vera app (PWA), tutto gratis su GitHub Pages.

I tuoi dati (pesi, sforzi, schede) restano **solo sul tuo telefono**, salvati
nel browser: nessun server, nessun account.

## Cosa contiene questa cartella

Tutti i file stanno **allo stesso livello, senza sottocartelle** — vanno
caricati così come sono, tutti insieme, nella radice del repository:

```
.
├── index.html                 → l'app vera e propria (tutto in un unico file)
├── manifest.json               → dice al telefono nome, colori e icone dell'app
├── sw.js                       → service worker: fa funzionare l'app offline
├── icon-192.png                → icona app 192×192
├── icon-512.png                → icona app 512×512
├── icon-192-maskable.png       → icona "adattiva" per Android
├── icon-512-maskable.png       → icona "adattiva" per Android
├── apple-touch-icon.png        → icona per iPhone/iPad
├── favicon.ico / favicon-32/16 → icona per il tab del browser
└── README.md
```

## Se avevi già un repository con la vecchia struttura (cartella `icons/`)

Se in precedenza avevi caricato una versione con i file dentro una
sottocartella `icons/`, elimina quella cartella dal repository prima di
ricaricare questi file (altrimenti il manifest continuerà a puntare a
percorsi sbagliati). Su GitHub: apri la cartella `icons`, apri ciascun file
ed eliminalo (icona del cestino in alto a destra), oppure più semplicemente
cancella l'intero repository e ricrealo da zero con questi file.

## Pubblicazione su GitHub Pages (5 minuti, gratis)

1. **Crea un repository su GitHub**
   Vai su [github.com/new](https://github.com/new), dagli un nome (es.
   `scheda-palestra`), lascialo **pubblico** (necessario per Pages gratuito)
   e crealo senza README (lo hai già qui).

2. **Carica tutti i file di questa cartella in un colpo solo**
   Nel repository appena creato, usa "Add file → Upload files" e trascina
   **tutti i file** di questa cartella insieme (non uno alla volta): essendo
   tutti allo stesso livello, senza sottocartelle, l'upload da browser
   funziona sempre in modo affidabile. In alternativa, da terminale:
   ```bash
   git init
   git add .
   git commit -m "Prima pubblicazione della scheda palestra"
   git branch -M main
   git remote add origin https://github.com/TUO-USERNAME/scheda-palestra.git
   git push -u origin main
   ```

3. **Attiva GitHub Pages**
   Nel repository vai su **Settings → Pages**. Sotto "Build and deployment",
   in "Source" scegli **Deploy from a branch**, poi come branch scegli
   **main** e come cartella **/ (root)**. Salva.

4. **Aspetta un minuto**
   GitHub ti mostrerà l'indirizzo pubblico dell'app, del tipo:
   ```
   https://TUO-USERNAME.github.io/scheda-palestra/
   ```
   Aprilo dal telefono (basta il browser, Safari su iPhone o Chrome su
   Android).

## Installarla come app sul telefono

**iPhone (Safari):** apri il link → tocca l'icona di condivisione (il
quadrato con la freccia in su) → **"Aggiungi a Home"**.

**Android (Chrome):** apri il link → tocca i tre puntini in alto a destra →
dovrebbe comparire **"Installa app"** (non solo "Crea scorciatoia"). Se vedi
solo l'opzione scorciatoia, prova a cancellare i dati del sito da Chrome
(Impostazioni sito → Cancella dati) e ricarica la pagina: a volte il
browser ricorda un tentativo precedente non riuscito e non ricontrolla
subito.

Da quel momento l'app si apre dall'icona come qualsiasi altra, senza barra
degli indirizzi, e continua a funzionare anche senza connessione una volta
aperta la prima volta.

## Quando modifichi la scheda in futuro

Se in futuro aggiorni `index.html` (nuove funzioni, correzioni, ecc.):

1. Ricarica il nuovo file su GitHub (sovrascrivendo quello vecchio).
2. Apri `sw.js` e cambia la riga `const CACHE_VERSION = 'v2';` in `'v3'`
   (poi `'v4'`, ecc. ad ogni aggiornamento). Senza questo passaggio i
   telefoni che hanno già installato l'app potrebbero continuare a vedere
   la versione precedente, perché resta salvata in cache per funzionare
   offline.

## Nota sui dati

Tutto (pesi, sforzi, schede, settimane) è salvato nella memoria del browser
del telefono (localStorage), **non** viene mai inviato a nessun server. Usa
il pulsante "Esporta backup" nell'app ogni tanto per avere una copia di
sicurezza scaricabile, soprattutto prima di cambiare telefono o cancellare i
dati del browser.
