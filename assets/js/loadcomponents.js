// Functie om HTML-componenten in te laden
function loadComponent(id, file) {
    const element = document.getElementById(id); // Zoek de juiste div
    if (element) {
      fetch(file) // Bestand ophalen
        .then(response => {
          if (!response.ok) {
            throw new Error(`Kan ${file} niet laden: ${response.statusText}`);
          }
          return response.text(); // Tekstinhoud teruggeven
        })
        .then(data => {
          element.innerHTML = data; // Inhoud invoegen in de div
        })
        .catch(error => {
          console.error(`Fout bij het laden van ${file}:`, error);
          element.innerHTML = `<p>Fout bij het laden van ${file}</p>`;
        });
    } else {
      console.warn(`Element met id "${id}" niet gevonden.`);
    }
  }
  
  // Componenten inladen bij pagina's volledige DOM geladen is
  document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM geladen, componenten worden nu ingeladen...");
    loadComponent('header', 'components/header.html');
    loadComponent('menu', 'components/menu.html');
    loadComponent('footer', 'components/footer.html');
  });
  
