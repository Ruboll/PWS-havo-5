# Perfect Parts - PWS Project

Dit is een project dat je helpt bij het bouwen van je eigen pc. Het biedt handige hulpmiddelen zoals een bottleneck-calculator, aanbevelingen voor componentcombinaties en een vergelijking van CPU's en GPU's op basis van prijs per FPS. Het doel van dit project is om de informatie die vaak verwarrend is voor beginners te verduidelijken.

## Functies

- **Bottleneck Calculator**: Helpt bij het bepalen of je CPU en GPU goed samengaan.
- **Componentaanbevelingen**: Geeft suggesties voor de beste combinatie van onderdelen voor jouw budget en behoeften.
- **CPU/GPU Vergelijking**: Vergelijk verschillende CPU's en GPU's op basis van hun prestaties en prijs per FPS.

## Structuur van het Project

Het project maakt gebruik van de volgende mappen en bestanden:

- `index.html`: De hoofdpagina van het project.
- `pages/`: Bevat de pagina's zoals `home.html`, `about-us.html` en andere inhoudelijke pagina's.
- `assets/`: Bevat alle statische bestanden zoals afbeeldingen, CSS en JavaScript-bestanden.
  - `css/`: Bevat de stylesheets, waaronder `style.css`.
  - `js/`: Bevat de JavaScript-bestanden, waaronder `loadcomponents.js`, die verantwoordelijk zijn voor het inladen van de dynamische componenten (header, menu, footer).
  - `components/`: Bevat de HTML-bestanden voor herbruikbare componenten zoals `header.html`, `footer.html` en `menu.html`.

## Installatie

1. **Download of clone het project**:

   - Je kunt het project downloaden als een ZIP-bestand van [GitHub](https://github.com/Ruboll/PWS-havo-5) of het clonen via Git:

     ```bash
     git clone https://github.com/Ruboll/PWS-havo-5.git
     ```

2. **Open het project in je browser**:
   - Open de `index.html` of een andere pagina door de HTML-bestanden direct in je browser te openen. Zorg ervoor dat je de bestanden opent via een HTTP-server als je JavaScript gebruikt voor het inladen van componenten, omdat bepaalde functies anders mogelijk niet werken.

## Gebruik

1. **Navigeren door de pagina's**:

   - De website bestaat uit verschillende pagina's, zoals de homepage en de "About Us"-pagina.
   - De navigatie in de `header` en `menu` maakt het mogelijk om eenvoudig tussen de verschillende pagina's te schakelen.

2. **Dynamische componenten**:

   - De `header`, `menu` en `footer` zijn in verschillende HTML-bestanden gescheiden om herbruikbaarheid en onderhoudbaarheid te verbeteren.
   - Deze componenten worden via JavaScript ingeladen door de functie `loadComponent` in `loadcomponents.js`.

3. **Styling**:
   - Alle styling van de website is toegevoegd in `style.css`. Je kunt de layout en het uiterlijk van de website aanpassen door de stijlen hier te wijzigen.

## Een nieuwe pagina aanmaken

Wil je een nieuwe pagina toevoegen aan de website? Volg deze stappen:

1. **Maak een nieuwe HTML-pagina**:

   - Ga naar de `pages/`-map en maak een nieuw HTML-bestand, bijvoorbeeld `contact-us.html` of `services.html`.

2. **Gebruik dezelfde structuur als de bestaande pagina's**:

   - Kopieer de basisstructuur van de `index.html` of een andere pagina naar je nieuwe bestand. Dit bevat de links naar de dynamische componenten zoals de header, menu en footer.

   Voorbeeld van een nieuwe pagina `contact-us.html`:

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Contact Us</title>
       <script src="assets/js/loadcomponents.js" defer></script>
       <link rel="stylesheet" href="assets/css/style.css" />
     </head>
     <body>
       <!-- Header met fallback -->
       <div id="header">Laden van de header...</div>

       <!-- Menu met fallback -->
       <div id="menu">Laden van het menu...</div>

       <!-- Main Content (Dynamische inhoud wordt hier geladen) -->
       <main id="main-content" class="main-content">
         <h2>Neem contact met ons op</h2>
         <p>Dit is de inhoud van de contactpagina.</p>
       </main>

       <!-- Footer met fallback -->
       <div id="footer">Laden van de footer...</div>
     </body>
   </html>
   ```

````

3. **Voeg de nieuwe pagina toe aan het menu**:
Ga naar components/menu.html en voeg een nieuwe link toe naar je nieuwe pagina. Bijvoorbeeld:
```html
<nav>
<ul>
  <li><a href="index.html">Home</a></li>
  <li><a href="pages/about-us.html">About Us</a></li>
  <li><a href="pages/contact-us.html">Contact Us</a></li>
</ul>
</nav>
````

4. **Content dynamisch laden**:

- Als je dynamische content wilt inladen voor de nieuwe pagina, kun je dezelfde JavaScript-functie gebruiken (loadComponent) om bijvoorbeeld een gedeelde component zoals een header, footer of menu in te laden.

- De functie loadComponent is al toegevoegd in de loadcomponents.js en zorgt ervoor dat de content van de componenten wordt geladen in de aangegeven div-elementen.
  Technische details

### HTML: Gebruikt voor de structuur van de pagina's.

- CSS: Gebruikt voor de styling van de pagina's.
- JavaScript: Gebruikt om dynamische componenten in te laden (zoals header, menu, en footer) en andere interactieve functies.
- Live Server: Zorgt voor het correct laden van de pagina's via een lokale server (optioneel, afhankelijk van je gebruik).

### Problemen en oplossingen

Componenten worden niet geladen: Zorg ervoor dat je de pagina's via een server opent, zoals hierboven beschreven. Dit voorkomt problemen met het laden van lokale bestanden via de fetch API.
Pagina’s worden niet geladen na klikken: Als je in plaats van statische pagina’s gebruik wilt maken van dynamische inhoud, kun je de main-content div inladen met de inhoud van de pagina’s via JavaScript.
Contributie
