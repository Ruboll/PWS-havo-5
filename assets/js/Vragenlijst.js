document.addEventListener("click", function (event) {
    // Controleer of de geklikte knop de juiste ID heeft
    if (event.target && event.target.id === "adviesKnop") {
        console.log("Knop is geklikt! Advies wordt gegenereerd...");
        toonResultaat();
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

    console.log("✅ Advies gegenereerd:", onderdelen);
}
