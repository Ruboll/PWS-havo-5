# ARCHITECTURE - Perfect Parts Website

## Inhoudsopgave
1. [Projectoverzicht](#projectoverzicht)
2. [Mappenstructuur](#mappenstructuur)
3. [Architectuur](#architectuur)
4. [Componenten](#componenten)
5. [JavaScript Functionaliteit](#javascript-functionaliteit)
6. [CSS Styling](#css-styling)
7. [Interactieve Tools](#interactieve-tools)
8. [Toekomstige Verbeteringen](#toekomstige-verbeteringen)

## Projectoverzicht

De Perfect Parts website is ontwikkeld als onderdeel van een profielwerkstuk (PWS) voor havo 5. Het doel van de website is om informatie te bieden over gaming-pc's, componenten te vergelijken, en gebruikers te helpen bij het maken van weloverwogen keuzes bij het samenstellen van een gaming-pc.

De website is gebouwd met moderne webstandaarden (HTML, CSS, JavaScript) en volgt een component-gebaseerde architectuur voor betere onderhoudbaarheid en herbruikbaarheid van code.

## Mappenstructuur

```
PWS-havo-5/
│
├── index.html                 # Hoofdpagina en entry point van de website
├── assets/                    # Alle statische bestanden
│   ├── components/            # Herbruikbare HTML-componenten
│   │   ├── footer.html        # Voettekst component
│   │   ├── header.html        # Koptekst component
│   │   └── menu.html          # Navigatiemenu component
│   │
│   ├── css/                   # CSS-bestanden
│   │   └── style.css          # Hoofdstijlbestand
│   │
│   ├── images/                # Afbeeldingen
│   │   └── logo.png           # Website logo
│   │
│   └── js/                    # JavaScript-bestanden
│       ├── bottleneckcalc.js  # Bottleneck calculator functionaliteit
│       ├── loadcomponents.js  # Component laad-systeem
│       └── vragenlijst.js     # Vragenlijst functionaliteit
│
└── pages/                     # Inhoudspagina's
    ├── 1080p.html             # 1080p resolutie vergelijking
    ├── 1440p.html             # 1440p resolutie vergelijking
    ├── 4k.html                # 4K resolutie vergelijking
    ├── about-us.html          # Over ons pagina
    ├── bottleneck-calculator.html # Bottleneck calculator tool
    ├── contact.html           # Contactpagina
    ├── FAQ.html               # Veelgestelde vragen
    ├── FPE.html               # Frame per Euro overzicht
    ├── home.html              # Homepage inhoud
    └── vragenlijst.html       # PC advies vragenlijst
```

## Architectuur

De website is gebouwd volgens een Single Page Application (SPA) principe, waarbij de inhoud dynamisch wordt geladen zonder volledige pagina-verversingen. Dit zorgt voor een snellere en vloeiendere gebruikerservaring.

### Kernprincipes:

1. **Component-gebaseerd**: De website is opgedeeld in herbruikbare componenten (header, menu, footer) die op elke pagina worden gebruikt.

2. **Dynamisch inladen**: Pagina-inhoud wordt dynamisch geladen via JavaScript, waardoor de website snel en responsief aanvoelt.

3. **Modulaire JavaScript**: Elke functionaliteit heeft zijn eigen JavaScript-bestand, wat de code beter onderhoudbaar maakt.

4. **Moderne CSS**: De styling gebruikt logische eigenschappen (block-start, inline-end, etc.) voor betere ondersteuning van verschillende schrijfrichtingen en talen.

## Componenten

### Header, Menu en Footer
Deze componenten worden bij het laden van de website automatisch ingevoegd in de daarvoor bestemde containers in index.html. Dit zorgt voor consistentie in de gebruikersinterface en vermindert codeduplicatie.

- **Header**: Bevat de titel en eventuele subtitels van de website
- **Menu**: Bevat navigatielinks naar alle pagina's van de website
- **Footer**: Bevat copyright informatie en eventuele extra links

### Content Pages
Alle inhoudspagina's bevinden zich in de `pages/` map en worden dynamisch geladen in de `main-content` container wanneer een gebruiker op een menu-item klikt. Elke pagina heeft een specifiek doel:

- **Home**: Introductie van de website en het project
- **About Us**: Informatie over het team en het doel van het project
- **FPE (Frame Per Euro)**: Uitleg over het concept en links naar vergelijkingspagina's
- **1080p/1440p/4K**: Tabellen met vergelijkingen van grafische kaarten bij verschillende resoluties
- **Bottleneck Calculator**: Tool om te bepalen of er een prestatie-bottleneck is tussen CPU en GPU
- **Vragenlijst**: Interactieve vragenlijst voor gepersonaliseerd PC-advies
- **FAQ**: Veelgestelde vragen over gaming-pc's
- **Contact**: Contactgegevens van het team

## JavaScript Functionaliteit

### loadcomponents.js
Dit is het hart van de website-architectuur. Het bevat twee hoofdfuncties:

1. **loadComponent()**: Laadt herbruikbare componenten (header, menu, footer) via fetch API
   ```javascript
   function loadComponent(id, file) {
     const element = document.getElementById(id);
     if (element) {
       fetch(file)
         .then((response) => response.text())
         .then((data) => {
           element.innerHTML = data;
         });
     }
   }
   ```

2. **loadPageContent()**: Laadt dynamisch de inhoud van pagina's wanneer gebruikers navigeren
   ```javascript
   function loadPageContent(file) {
     const mainContent = document.getElementById("main-content");
     if (mainContent) {
       fetch(file)
         .then((response) => response.text())
         .then((data) => {
           mainContent.innerHTML = data;
         });
     }
   }
   ```

3. **DOMContentLoaded Event**: Zorgt ervoor dat de componenten en de standaard homepagina worden geladen wanneer de website wordt geopend

### bottleneckcalc.js
Implementeert de bottleneck calculator die gebruikers helpt om te bepalen of hun CPU en GPU goed op elkaar zijn afgestemd. De calculator gebruikt een eenvoudig algoritme dat het verschil tussen CPU- en GPU-scores berekent om potentiële bottlenecks te identificeren.

Werking:
1. Gebruiker selecteert een CPU en GPU uit dropdown menu's
2. De functie berekent het verschil tussen de prestatiescore van beide componenten
3. Op basis van het verschil wordt een advies gegeven over mogelijke bottlenecks

### vragenlijst.js
Biedt gepersonaliseerd advies voor PC-componenten op basis van gebruikersvoorkeuren zoals budget, esthetiek, competitief gamen, opslagbehoeften, RAM-vereisten en gewenste resolutie.

Werking:
1. Gebruiker vult een formulier in met voorkeuren
2. De functie analyseert deze voorkeuren en bepaalt de beste componenten
3. Een gepersonaliseerd advies wordt getoond met specifieke componenten voor de gebruiker

## CSS Styling

De website gebruikt een moderne CSS-aanpak met:

1. **Logische eigenschappen**: In plaats van traditionele directional properties (top, right, bottom, left) worden logische eigenschappen gebruikt (block-start, inline-end, etc.) voor betere internationalisatie.

   Voorbeeld:
   ```css
   /* Traditioneel */
   margin-top: 20px;
   padding-left: 10px;
   
   /* Logische eigenschappen */
   margin-block-start: 20px;
   padding-inline-start: 10px;
   ```

2. **Flexbox layout**: Voor responsieve en flexibele layouts die goed werken op verschillende schermformaten.

3. **Consistente kleurschema's**: Donker thema met accentkleuren voor een moderne gaming-esthetiek.
   - Achtergrond: Zwart (#000)
   - Tekst: Wit (#fff)
   - Accentkleur: Lichtblauw (#00bcd4)
   - Secundaire achtergrond: Donkergrijs (#1a1a1a, #202020, #333)

4. **Content Containers**: Speciale containers voor verschillende soorten inhoud:
   - `#content-container`: Algemene container voor pagina-inhoud
   - `#content-neck-container`: Specifieke container voor de bottleneck calculator

5. **Styling voor lijsten**: Speciale styling voor checklists en linklijsten met SVG-chevrons.

## Interactieve Tools

De website bevat verschillende interactieve tools om gebruikers te helpen bij het maken van beslissingen:

1. **Bottleneck Calculator**: Helpt gebruikers om te bepalen of er een prestatie-bottleneck zou kunnen zijn tussen hun gekozen CPU en GPU.
   - Gebruikers selecteren hun CPU en GPU uit dropdown menu's
   - De calculator berekent of er een goede balans is tussen de componenten
   - Resultaat wordt getoond met een duidelijke indicatie (✅ of ⚠️)

2. **PC Advies Vragenlijst**: Geeft gepersonaliseerde aanbevelingen voor PC-componenten op basis van gebruikersvoorkeuren en budget.
   - Gebruikers vullen een formulier in met hun voorkeuren
   - De vragenlijst analyseert deze voorkeuren en genereert een advies
   - Advies bevat specifieke componenten voor: processor, moederbord, videokaart, RAM, opslag, voeding en behuizing

3. **Frame per Euro Vergelijkingen**: Tabellen die verschillende grafische kaarten vergelijken op basis van hun prijs-prestatieverhouding bij verschillende resoluties (1080p, 1440p, 4K).
   - Toont kaarten gesorteerd op prijs
   - Vergelijkt prijs, prijs per FPS en gemiddelde FPS
   - Beschikbaar voor drie verschillende resoluties

## Toekomstige Verbeteringen

Mogelijke verbeteringen voor toekomstige versies:

1. **Responsive Design Verbetering**: Optimalisatie voor mobiele apparaten en tablets.
   - Media queries toevoegen voor verschillende schermformaten
   - Aanpasbare menu's voor kleinere schermen

2. **CSS Variabelen**: Implementeren van CSS-variabelen voor eenvoudiger theming en onderhoud.
   - Kleuren definiëren als variabelen
   - Consistente spacing en typografie via variabelen

3. **Uitgebreidere Component-bibliotheek**: Meer herbruikbare componenten toevoegen.
   - Kaartcomponenten voor productweergave
   - Tabcomponenten voor het organiseren van inhoud

4. **Geavanceerdere Calculators**: Uitbreiden van de bottleneck calculator met meer parameters en gedetailleerdere resultaten.
   - Rekening houden met specifieke games
   - Meer componenten toevoegen (RAM, opslag)

5. **Lokale Opslag**: Gebruikersvoorkeuren opslaan in localStorage voor een gepersonaliseerde ervaring bij terugkerende bezoeken.
   - Opslaan van eerder gekozen componenten
   - Onthouden van gebruikersvoorkeuren

---

Dit document is bedoeld als gids voor ontwikkelaars die aan dit project werken en om inzicht te geven in de architectuur en ontwerpbeslissingen die zijn gemaakt tijdens de ontwikkeling van de Perfect Parts website.