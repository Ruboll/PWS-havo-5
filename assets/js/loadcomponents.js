/**
 * Perfect Parts - Component Loader en Navigatie Systeem
 * Dit script verzorgt het dynamisch laden van componenten en pagina's, en beheert de navigatie.
 */

// ===================================
// Globale variabelen
// ===================================
let currentPage = ""; // Houdt bij welke pagina momenteel wordt weergegeven

// ===================================
// Titel en URL management
// ===================================

/**
 * Map van pagina's naar titels voor de browser tab
 */
const pageTitles = {
  'home': "Home - De beste gaming PC samenstellen",
  'FPE': "Frame Per Euro - Beste prijs/prestatie verhouding",
  'bottleneck-calculator': "Bottleneck Calculator - Check je componenten",
  'vragenlijst': "PC Advies - Vind jouw perfecte setup",
  'FAQ': "Veelgestelde Vragen - Perfect Parts",
  'about-us': "Over Ons - Perfect Parts Team",
  'contact': "Contact - Neem contact met ons op",
  '1080p': "1080p Benchmarks - Gaming Prestaties",
  '1440p': "1440p Benchmarks - Gaming Prestaties", 
  '4k': "4K Benchmarks - Gaming Prestaties"
};

/**
 * Update de pagina titel op basis van de huidige URL
 */
function updatePageTitle() {
  const urlParams = new URLSearchParams(window.location.search);
  let page = urlParams.get('page') || 'home';
  
  // Haal de juiste titel voor deze pagina
  let pageTitle = pageTitles[page] || (page.charAt(0).toUpperCase() + page.slice(1).replace(/-/g, ' '));
  
  // Stel de documenttitel in
  document.title = `Perfect Parts - ${pageTitle}`;
}

// ===================================
// Component laden functies
// ===================================

/**
 * Laadt een component (header, menu, footer) in het aangewezen element
 * @param {string} id - De ID van het element waar de component in moet komen
 * @param {string} file - Het pad naar het component bestand
 */
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

/**
 * Laadt dynamisch de content van pagina's
 * @param {string} file - Het pad naar het pagina bestand
 */
function loadPageContent(file) {
  const mainContent = document.getElementById("main-content");
  if (mainContent) {
    fetch(file)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Kan ${file} niet laden: ${response.statusText}`);
        }
        return response.text(); // Geef de tekstinhoud terug
      })
      .then((data) => {
        mainContent.innerHTML = data; // Laad de inhoud in de main
        currentPage = file; // Update de huidige pagina
        markActiveMenuItem(); // Markeer het actieve menu-item
        
        // Voeg de pagina toe aan de browsergeschiedenis alleen als dit niet vanuit closeMenuAndLoadPage komt
        if (!window.suppressHistoryUpdate) {
          // Maak een title op basis van de bestandsnaam (zonder pad en extensie)
          const pageTitle = file.split('/').pop().replace('.html', '');
          const formattedTitle = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1).replace(/-/g, ' ');
          
          // Update de browsergeschiedenis en document titel
          const stateObj = { page: file };
          history.pushState(stateObj, formattedTitle, `?page=${pageTitle}`);
          
          // Update de pagina titel
          updatePageTitle();
        }
        
        // Reset de flag
        window.suppressHistoryUpdate = false;
      })
      .catch((error) => {
        console.error(`Fout bij het laden van ${file}:`, error);
        mainContent.innerHTML = `<p>Fout bij het laden van ${file}</p>`;
        // Reset de flag in geval van een fout
        window.suppressHistoryUpdate = false;
      });
  }
}

/**
 * Laadt alle componenten (header, menu, footer)
 */
function loadAllComponents() {
  loadComponent("header", "./assets/components/header.html");
  loadComponent("menu", "./assets/components/menu.html");
  loadComponent("footer", "./assets/components/footer.html");
}

// ===================================
// Menu functies
// ===================================

/**
 * Markeert het actieve menu-item op basis van de huidige pagina
 */
function markActiveMenuItem() {
  const menuLinks = document.querySelectorAll("#menu a");
  menuLinks.forEach((link) => {
    link.classList.remove("active");
    const onclickAttr = link.getAttribute("onclick");
    if (onclickAttr && onclickAttr.includes(currentPage)) {
      link.classList.add("active");
    }
  });
}

/**
 * Schakelt het mobiele menu tussen open en gesloten
 */
function toggleMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  const menuOverlay = document.getElementById("menu-overlay");
  
  if (mobileMenu) {
    mobileMenu.classList.toggle("active");
    
    if (menuOverlay) {
      menuOverlay.classList.toggle("active");
    }
    
    if (mobileMenu.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
}

/**
 * Sluit het menu en laadt een nieuwe pagina
 * @param {string} file - Het pad naar het pagina bestand
 * @param {string} title - De titel voor de pagina (optioneel)
 */
function closeMenuAndLoadPage(file, title) {
  // Haal referenties naar menu-elementen
  const mobileMenu = document.getElementById("mobile-menu");
  const menuOverlay = document.getElementById("menu-overlay");
  
  // Zet de flag om te voorkomen dat loadPageContent history.pushState aanroept
  window.suppressHistoryUpdate = true;
  
  // Update zelf de browsergeschiedenis en document titel
  const pageTitle = file.split('/').pop().replace('.html', '');
  const formattedTitle = title || pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1).replace(/-/g, ' ');
  const stateObj = { page: file };
  history.pushState(stateObj, formattedTitle, `?page=${pageTitle}`);
  
  // Update de pagina titel
  updatePageTitle();
  
  // Controleer of het menu open is
  if (mobileMenu && mobileMenu.classList.contains("active")) {
    // Verwijder de active klasse (sluit het menu)
    mobileMenu.classList.remove("active");
    
    // Verwijder ook de active klasse van de overlay
    if (menuOverlay) {
      menuOverlay.classList.remove("active");
    }
    
    // Herstel scrollen
    document.body.style.overflow = "";
    
    // Wacht tot de animatie is voltooid voordat de pagina wordt geladen
    setTimeout(() => {
      loadPageContent(file);
    }, 300); // 300ms is de duur van de animatie in CSS
  } else {
    // Als het menu al gesloten is, laad de pagina direct
    loadPageContent(file);
  }
}

/**
 * Voegt een event listener toe die het menu sluit wanneer buiten het menu wordt geklikt
 */
function closeMenuOnClickOutside() {
  document.addEventListener("click", function(event) {
    const mobileMenu = document.getElementById("mobile-menu");
    const menuToggle = document.querySelector(".menu-toggle");
    
    if (mobileMenu && mobileMenu.classList.contains("active")) {
      if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
        mobileMenu.classList.remove("active");
        
        const menuOverlay = document.getElementById("menu-overlay");
        if (menuOverlay) {
          menuOverlay.classList.remove("active");
        }
        
        document.body.style.overflow = "";
      }
    }
  });
}

// ===================================
// Navigatie functies
// ===================================

/**
 * Laadt een pagina op basis van de URL-parameter
 */
function loadPageFromUrl() {
  // Haal de pagina uit de URL (bijv. ?page=home)
  const urlParams = new URLSearchParams(window.location.search);
  let page = urlParams.get('page');
  
  // Als er geen pagina-parameter is, gebruik dan 'home'
  if (!page) {
    page = 'home';
  }
  
  // Update de pagina titel
  updatePageTitle();
  
  // Laad de juiste pagina
  loadPageContent(`pages/${page}.html`);
}

// ===================================
// Event Listeners
// ===================================

// Voer code uit wanneer de DOM is geladen
document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM geladen, componenten worden nu ingeladen...");
  
  // Laad alle componenten
  loadAllComponents();
  
  // Voeg een event listener toe om het menu te sluiten bij klikken buiten het menu
  closeMenuOnClickOutside();
  
  // Laad de juiste pagina op basis van de URL
  loadPageFromUrl();
  
  // Initialiseer het mobiele menu nadat alle componenten zijn geladen
  setTimeout(() => {
    // Maak het menu zichtbaar nadat JavaScript is geladen
    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenu) {
      mobileMenu.classList.add("js-loaded");
    }
  }, 500);
  
  // Event listener voor browser navigatie (terugknop)
  window.addEventListener("popstate", function(event) {
    if (event.state) {
      const mainContent = document.getElementById("main-content");
      if (mainContent) {
        fetch(event.state.page)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Kan ${event.state.page} niet laden: ${response.statusText}`);
            }
            return response.text();
          })
          .then(data => {
            mainContent.innerHTML = data;
            currentPage = event.state.page;
            markActiveMenuItem();
            updatePageTitle();
          })
          .catch(error => {
            console.error(`Fout bij het laden van ${event.state.page}:`, error);
            mainContent.innerHTML = `<p>Fout bij het laden van ${event.state.page}</p>`;
          });
      }
    } else {
      // Als er geen state is, laad dan de homepage
      loadPageContent("pages/home.html");
    }
  });
});
