# Scheda Palestra

App web per gestire le tue schede di allenamento, pesi, sforzo percepito e
progressi settimana dopo settimana — installabile sulla schermata home del
telefono come una vera app (PWA), tutto gratis su GitHub Pages.

I tuoi dati (pesi, sforzi, schede) restano **solo sul tuo telefono**, salvati
nel browser: nessun server, nessun account.

## Cosa contiene questa cartella

```
.
├── index.html              → l'app vera e propria (tutto in un unico file)
├── manifest.json            → dice al telefono nome, colori e icone dell'app
├── sw.js                    → service worker: fa funzionare l'app offline
├── favicon.ico / .png       → icona per il tab del browser
├── apple-touch-icon.png     → icona per iPhone/iPad
└── icons/                   → icona dell'app in tutte le dimensioni richieste
```

## Pubblicazione su GitHub Pages (5 minuti, gratis)

1. **Crea un repository su GitHub**
   Vai su [github.com/new](https://github.com/new), dagli un nome (es.
   `scheda-palestra`), lascialo **pubblico** (necessario per Pages gratuito)
   e crealo senza README (lo hai già qui).

2. **Carica tutti i file di questa cartella**
   Nel repository appena creato, usa "Add file → Upload files" e trascina
   dentro **tutto il contenuto** di questa cartella (compresa la sottocartella
   `icons/`, non solo i file alla radice). In alternativa, da terminale:
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
**"Installa app"** (o "Aggiungi a schermata Home").

Da quel momento l'app si apre dall'icona come qualsiasi altra, senza barra
degli indirizzi, e continua a funzionare anche senza connessione una volta
aperta la prima volta.

## Quando modifichi la scheda in futuro

Se in futuro aggiorni `index.html` (nuove funzioni, correzioni, ecc.):

1. Ricarica il nuovo file su GitHub (sovrascrivendo quello vecchio).
2. Apri `sw.js` e cambia la riga `const CACHE_VERSION = 'v1';` in `'v2'`
   (poi `'v3'`, ecc. ad ogni aggiornamento). Senza questo passaggio i
   telefoni che hanno già installato l'app potrebbero continuare a vedere
   la versione precedente, perché resta salvata in cache per funzionare
   offline.

## Nota sui dati

Tutto (pesi, sforzi, schede, settimane) è salvato nella memoria del browser
del telefono (localStorage), **non** viene mai inviato a nessun server. Usa
il pulsante "Esporta backup" nell'app ogni tanto per avere una copia di
sicurezza scaricabile, soprattutto prima di cambiare telefono o cancellare i
dati del browser.
