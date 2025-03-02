# ARCHITECTURE - Perfect Parts Website

## Inhoudsopgave
1. [Projectoverzicht](#projectoverzicht)
2. [Mappenstructuur](#mappenstructuur)
3. [Architectuur](#architectuur)
4. [Componenten](#componenten)
5. [JavaScript Functionaliteit](#javascript-functionaliteit)
6. [CSS Styling](#css-styling)
7. [Interactieve Tools](#interactieve-tools)
8. [Responsief Design](#responsief-design)
9. [Toekomstige Verbeteringen](#toekomstige-verbeteringen)

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
│   │   ├── logo-pp.png        # Website logo
│   │   └── hero-bg.png        # Hero achtergrondafbeelding
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

5. **Volledig Responsief**: De website is geoptimaliseerd voor alle schermformaten, van desktop tot mobiel, met een speciaal ontworpen mobiel menu.

## Componenten

### Header, Menu en Footer
Deze componenten worden bij het laden van de website automatisch ingevoegd in de daarvoor bestemde containers in index.html. Dit zorgt voor consistentie in de gebruikersinterface en vermindert codeduplicatie.

- **Header**: Bevat de titel en eventuele subtitels van de website
- **Menu**: Bevat navigatielinks naar alle pagina's van de website, met een speciale mobiele versie die vanaf de rechterkant inschuift
- **Footer**: Bevat copyright informatie en eventuele extra links

### Content Pages
Alle inhoudspagina's bevinden zich in de `pages/` map en worden dynamisch geladen in de `main-content` container wanneer een gebruiker op een menu-item klikt. Elke pagina heeft een specifiek doel:

- **Home**: Introductie van de website met een opvallende hero-sectie en overzicht van de belangrijkste functies
- **About Us**: Informatie over het team en het doel van het project
- **FPE (Frame Per Euro)**: Uitleg over het concept en links naar vergelijkingspagina's
- **1080p/1440p/4K**: Tabellen met vergelijkingen van grafische kaarten bij verschillende resoluties
- **Bottleneck Calculator**: Tool om te bepalen of er een prestatie-bottleneck is tussen CPU en GPU
- **Vragenlijst**: Interactieve vragenlijst voor gepersonaliseerd PC-advies
- **FAQ**: Veelgestelde vragen over gaming-pc's
- **Contact**: Contactgegevens van het team

## JavaScript Functionaliteit

### loadcomponents.js
Dit is het hart van de website-architectuur. Het script is nu georganiseerd in functionele modules:

#### 1. Titel en URL Management
Zorgt voor consistente paginatitels in browser tabs:
- `updatePageTitle()`: Stelt de juiste titel in op basis van de huidige URL
- `pageTitles`: Map van pagina's naar beschrijvende, SEO-vriendelijke titels

#### 2. Component Laden Functies
Laadt herbruikbare componenten en pagina-inhoud dynamisch:
```javascript
function loadComponent(id, file) {
  const element = document.getElementById(id);
  if (element) {
    fetch(file)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Kan ${file} niet laden: ${response.statusText}`);
        }
        return response.text();
      })
      .then((data) => {
        element.innerHTML = data;
        if (id === "menu") {
          markActiveMenuItem();
        }
      })
      .catch((error) => {
        console.error(`Fout bij het laden van ${file}:`, error);
        element.innerHTML = `<p>Fout bij het laden van ${file}</p>`;
      });
  }
}
```

```javascript
function loadPageContent(file) {
  const mainContent = document.getElementById("main-content");
  if (mainContent) {
    fetch(file)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Kan ${file} niet laden: ${response.statusText}`);
        }
        return response.text();
      })
      .then((data) => {
        mainContent.innerHTML = data;
        currentPage = file;
        markActiveMenuItem();
        
        // Update history en titel indien nodig
        if (!window.suppressHistoryUpdate) {
          // ... code voor history update ...
          updatePageTitle();
        }
        
        window.suppressHistoryUpdate = false;
      });
  }
}
```

#### 3. Menu Functies
Beheert het navigatiemenu en zorgt voor een gebruiksvriendelijke ervaring:
- `toggleMenu()`: Schakelt het mobiele menu tussen open en gesloten
- `closeMenuAndLoadPage()`: Sluit het menu en laadt dan een nieuwe pagina
- `markActiveMenuItem()`: Markeert het huidige menu-item op basis van de geladen pagina
- `closeMenuOnClickOutside()`: Sluit het menu wanneer er buiten het menu wordt geklikt

#### 4. Navigatie Functies
Zorgt voor naadloze navigatie en URL-parsing:
- `loadPageFromUrl()`: Bepaalt welke pagina moet worden geladen op basis van de URL-parameter

#### 5. Browser History API Implementatie
Implementeert de History API voor een betere browser-navigatie ervaring:
- Gebruikt `history.pushState()` om browsergeschiedenis bij te werken bij navigatie
- Implementeert een `popstate` event listener om te reageren op browser terugknop
- Voorkomt dubbele history entries door een flag-systeem (`suppressHistoryUpdate`)

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
   - Secundaire accentkleur: Paars (#9eb5ef)
   - Secundaire achtergrond: Donkergrijs (#1a1a1a, #202020, #333)

4. **Content Containers**: Speciale containers voor verschillende soorten inhoud:
   - `#content-container`: Algemene container voor pagina-inhoud
   - `.feature-section`: Container voor feature-lijsten met opvallende styling
   - `.quote-box`: Speciale container voor quotes
   - `.hero-section`: Opvallende header-sectie op de homepage

5. **Styling voor lijsten**: Speciale styling voor checklists en linklijsten met SVG-chevrons.

6. **Animaties en Transities**: Soepele animaties voor het mobiele menu en interactieve elementen:
   ```css
   @keyframes slideIn {
     from { transform: translateX(100%); }
     to { transform: translateX(0); }
   }
   
   @keyframes slideOut {
     from { transform: translateX(0); }
     to { transform: translateX(100%); }
   }
   ```

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

## Responsief Design

De website is volledig responsief en biedt een optimale gebruikerservaring op alle apparaten, van desktop tot mobiel:

1. **Mobiel Menu**:
   - Hamburger menu-icoon op kleine schermen
   - Menu schuift in vanaf de rechterkant (80% van de schermbreedte)
   - Overlay die de rest van de pagina verduistert
   - Animaties voor soepel openen en sluiten
   - Sluit automatisch bij klikken buiten het menu

2. **Responsieve Hero-sectie**:
   - Past zich aan aan verschillende schermformaten
   - Knoppen worden verticaal gestapeld op mobiel
   - Tekstgrootte wordt aangepast voor leesbaarheid

3. **Media Queries**:
   ```css
   @media screen and (max-width: 768px) {
     /* Mobiele styling */
     .logo-image {
       max-width: 180px;
     }
     
     #menu ul.navbar__menu {
       width: 80%;
       position: fixed;
       /* Meer styling voor mobiel menu */
     }
     
     .hero-section {
       height: 350px;
     }
     
     /* Meer responsieve aanpassingen */
   }
   ```

4. **Aanpassingen voor Touch-apparaten**:
   - Grotere klikbare gebieden voor menu-items
   - Duidelijke visuele feedback bij interactie
   - Verbeterde leesbaarheid met grotere lettertypen

## Toekomstige Verbeteringen

Mogelijke verbeteringen voor toekomstige versies:

1. **CSS Variabelen**: Implementeren van CSS-variabelen voor eenvoudiger theming en onderhoud.
   - Kleuren definiëren als variabelen
   - Consistente spacing en typografie via variabelen

2. **Prestatie-optimalisatie**: Verbeteren van laadtijden en algemene prestaties.
   - Lazy loading van afbeeldingen
   - Code splitting voor JavaScript

3. **Geavanceerdere Calculators**: Uitbreiden van de bottleneck calculator met meer parameters en gedetailleerdere resultaten.
   - Rekening houden met specifieke games
   - Meer componenten toevoegen (RAM, opslag)

5. **Verbeterde Animaties**: Meer subtiele animaties en overgangen toevoegen voor een nog vloeiendere gebruikerservaring.
   - Page transitions
   - Scroll-gebaseerde animaties
   - Interactieve elementen met hover-effecten