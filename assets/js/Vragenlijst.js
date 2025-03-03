document.addEventListener("click", function (event) {
    // Controleer of de geklikte knop de juiste ID heeft
    if (event.target && event.target.id === "adviesKnop") {
        console.log("Knop is geklikt! Advies wordt gegenereerd...");
        toonResultaat();
    }
    
    // Controleer of de kopieerknop of een van de kinderen (SVG, path) is geklikt
    if (event.target.closest("#copy-button")) {
        copyResults();
    }
});

function toonResultaat() {
    console.log("De functie toonResultaat() is aangeroepen!");

    let budgetElement = document.getElementById("budget");
    let aestheticsElement = document.getElementById("aesthetics");
    let competitiveElement = document.getElementById("competitive");
    let storageElement = document.getElementById("storage");
    let ramElement = document.getElementById("ram");
    let resolutionElement = document.getElementById("resolution");

    // Controleer of alle velden bestaan voordat je verder gaat
    if (!budgetElement || !aestheticsElement || !competitiveElement || !storageElement || !ramElement || !resolutionElement) {
        console.error("❌ ERROR: Eén of meerdere invoervelden ontbreken in de DOM!");
        return;
    }

    let budget = parseInt(budgetElement.value);
    let aesthetics = aestheticsElement.value;
    let competitive = competitiveElement.value;
    let storage = storageElement.value;
    let ram = ramElement.value;
    let resolution = resolutionElement.value;

    let resultaatElement = document.getElementById("resultaat");
    let onderdelenLijst = document.getElementById("onderdelen-lijst");
    let copyButton = document.getElementById("copy-button");

    if (!resultaatElement || !onderdelenLijst) {
        console.error("❌ ERROR: HTML-elementen voor het resultaat ontbreken!");
        return;
    }

    let advies = `Op basis van je keuzes raden we het volgende aan:`;

    let processor, moederbord;
    if (budget <= 750) {
        processor = "Intel i3-13100F of Ryzen 3 4100";
        moederbord = "B660M voor Intel of B450M voor AMD";
    } else if (budget <= 1000) {
        processor = "Intel i5-13400F of Ryzen 5 5600";
        moederbord = "B760 voor Intel of B550 voor AMD";
    } else if (budget <= 1250) {
        processor = "Intel i5-13600K of Ryzen 5 7600";
        moederbord = "Z690 voor Intel of B650 voor AMD";
    } else if (budget <= 1500) {
        processor = "Intel i7-13700K of Ryzen 7 7700X";
        moederbord = "Z790 voor Intel of X670 voor AMD";
    } else {
        processor = "Intel i9-14900K of Ryzen 9 7950X";
        moederbord = "Z790 high-end voor Intel of X670E voor AMD";
    }

    let videokaart;
    if (resolution === "4K" || competitive === "yes") {
        videokaart = budget > 1000 ? "NVIDIA RTX 3070 of AMD RX 6700 XT" : "NVIDIA GTX 1660 Super of AMD RX 6500 XT";
    } else {
        videokaart = "NVIDIA RTX 3050 of AMD RX 6600";
    }

    let behuizing = aesthetics === "style" ? "RGB Gaming Case" : "Minimalistische behuizing";

    let opslagKeuze = `Opslag: ${storage} NVMe SSD`;
    let ramKeuze = `RAM: ${ram} DDR4 of DDR5`;

    let voeding = budget > 1000 ? "750W 80+ Gold PSU" : "550W 80+ Bronze PSU";

    resultaatElement.innerText = advies;
    onderdelenLijst.innerHTML = "";

    let onderdelen = [
        `Processor: ${processor}`,
        `Moederbord: ${moederbord}`,
        `Videokaart: ${videokaart}`,
        ramKeuze,
        opslagKeuze,
        `Voeding: ${voeding}`,
        `Behuizing: ${behuizing}`
    ];

    onderdelen.forEach(onderdeel => {
        let li = document.createElement("li");
        li.innerText = onderdeel;
        onderdelenLijst.appendChild(li);
    });

    // Toon de kopieerknop nu de resultaten zichtbaar zijn
    if (copyButton) {
        copyButton.style.display = "block";
    }

    console.log("✅ Advies gegenereerd:", onderdelen);
}

function copyResults() {
    const advies = document.getElementById("resultaat").innerText;
    const onderdelenLijst = document.getElementById("onderdelen-lijst");
    const copyButton = document.getElementById("copy-button");
    
    if (!onderdelenLijst || !copyButton) {
        console.error("❌ ERROR: Kan de onderdelen niet kopiëren. HTML-elementen ontbreken!");
        return;
    }
    
    // Verzamel alle onderdelen in een string
    let onderdelenText = "";
    for (const li of onderdelenLijst.children) {
        onderdelenText += "- " + li.innerText + "\n";
    }
    
    // Combineer alles in één tekst
    const copyText = `Perfect Parts - Jouw PC Advies\n\n${advies}\n\n${onderdelenText}`;
    
    try {
        // Kopieer naar klembord
        navigator.clipboard.writeText(copyText).then(() => {
            // Feedback naar de gebruiker via CSS-klasse
            copyButton.title = "Gekopieerd!";
            copyButton.classList.add("copied");
            
            // Reset de knop na 2 seconden
            setTimeout(() => {
                copyButton.title = "Kopieer resultaten";
                copyButton.classList.remove("copied");
            }, 2000);
            
            console.log("✅ Resultaten gekopieerd naar klembord");
        }).catch(err => {
            console.error("❌ Kon niet naar klembord kopiëren:", err);
        });
    } catch (error) {
        console.error("❌ Clipboardfunctie niet ondersteund:", error);
        
        // Fallback voor oudere browsers
        fallbackCopy(copyText);
    }
}

function fallbackCopy(text) {
    // Creëer een tijdelijk textarea element
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";  // Voorkomt scroll
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        // Poging tot kopiëren
        const successful = document.execCommand('copy');
        const msg = successful ? '✅ Resultaten gekopieerd (fallback)' : '❌ Kopiëren mislukt';
        console.log(msg);
    } catch (err) {
        console.error('❌ Fallback kopiëren mislukt:', err);
    }
    
    // Verwijder de textarea
    document.body.removeChild(textArea);
}
