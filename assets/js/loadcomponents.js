// Functie om HTML-componenten in te laden
function loadComponent(id, file) {
  const element = document.getElementById(id); // Zoek het juiste element
  if (element) {
    fetch(file) // Haal het bestand op
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Kan ${file} niet laden: ${response.statusText}`);
        }
        return response.text(); // Geef de tekstinhoud terug
      })
      .then((data) => {
        element.innerHTML = data; // Voeg de inhoud in de div
        
        // Als dit het menu is, markeer dan het actieve menu-item
        if (id === "menu") {
          markActiveMenuItem();
        }
      })
      .catch((error) => {
        console.error(`Fout bij het laden van ${file}:`, error);
        element.innerHTML = `<p>Fout bij het laden van ${file}</p>`;
      });
  } else {
    console.warn(`Element met id "${id}" niet gevonden.`);
  }
}

// Huidige actieve pagina bijhouden
let currentPage = "pages/home.html"; // Standaard is home de actieve pagina

// Functie om dynamisch de content van de pagina's te laden
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
      })
      .catch((error) => {
        console.error(`Fout bij het laden van ${file}:`, error);
        mainContent.innerHTML = `<p>Fout bij het laden van ${file}</p>`;
      });
  }
}

// Functie om het actieve menu-item te markeren
function markActiveMenuItem() {
  // Zoek alle menu-links
  const menuLinks = document.querySelectorAll("#menu a");
  
  // Verwijder eerst alle 'active' klassen
  menuLinks.forEach(link => {
    link.classList.remove("active");
  });
  
  // Zoek de link die overeenkomt met de huidige pagina en voeg de 'active' klasse toe
  menuLinks.forEach(link => {
    // Haal de pagina uit de onclick-attribuut
    const onclickAttr = link.getAttribute("onclick");
    if (onclickAttr && onclickAttr.includes(currentPage)) {
      link.classList.add("active");
    }
  });
}

// Functie om het mobiele menu te tonen/verbergen
function toggleMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  const menuOverlay = document.getElementById("menu-overlay");
  
  if (mobileMenu) {
    mobileMenu.classList.toggle("active");
    
    // Ook de overlay tonen/verbergen
    if (menuOverlay) {
      menuOverlay.classList.toggle("active");
    }
    
    // Voorkom scrollen van de pagina wanneer het menu open is
    if (mobileMenu.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
}

// Functie om het menu te sluiten wanneer er buiten het menu wordt geklikt
function closeMenuOnClickOutside() {
  const mobileMenu = document.getElementById("mobile-menu");
  const menuToggle = document.querySelector(".menu-toggle");
  
  // Voeg een event listener toe aan het document
  document.addEventListener("click", function(event) {
    // Controleer of het menu open is
    if (mobileMenu && mobileMenu.classList.contains("active")) {
      // Controleer of er buiten het menu en de toggle button is geklikt
      if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
        // Sluit het menu
        mobileMenu.classList.remove("active");
      }
    }
  });
}

// Laad de componenten bij het laden van de pagina
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM geladen, componenten worden nu ingeladen...");
  loadComponent("header", "assets/components/header.html");
  loadComponent("menu", "assets/components/menu.html");
  loadComponent("footer", "assets/components/footer.html");

  // Laad standaardpagina (home)
  loadPageContent("pages/home.html"); // Dit is de standaard pagina die geladen wordt
  
  // Initialiseer de functie om het menu te sluiten bij klikken buiten het menu
  // We wachten even tot het menu geladen is
  setTimeout(closeMenuOnClickOutside, 500);
});
