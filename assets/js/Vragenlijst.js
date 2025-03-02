document.addEventListener("DOMContentLoaded", function () {
    let knop = document.getElementById("adviesKnop"); // Zorg dat deze ID correct is!
    if (knop) {
        knop.addEventListener("click", toonResultaat);
    } else {
        console.error("Button met id 'adviesKnop' niet gevonden!");
    }
    console.log("Script is geladen!");
console.log("Knop gevonden:", document.getElementById("adviesKnop"));
});



function toonResultaat() {
    let budget = document.getElementById("budget").value;
    let aesthetics = document.getElementById("aesthetics").value;
    let competitive = document.getElementById("competitive").value;
    let storage = document.getElementById("storage").value;
    let ram = document.getElementById("ram").value;
    let resolution = document.getElementById("resolution").value;

    let advies = `Op basis van je keuzes raden we het volgende aan:`;

    // Processor keuze
    let processor;
    let moederbord;
    if (budget === "750") {
        processor = "Intel i3-13100F of Ryzen 3 4100";
        moederbord = "B660M voor Intel of B450M voor AMD";
    } else if (budget === "1000") {
        processor = "Intel i5-13400F of Ryzen 5 5600";
        moederbord = "B760 voor Intel of B550 voor AMD";
    } else if (budget === "1250") {
        processor = "Intel i5-13600K of Ryzen 5 7600";
        moederbord = "Z690 voor Intel of B650 voor AMD";
    } else if (budget === "1500") {
        processor = "Intel i7-13700K of Ryzen 7 7700X";
        moederbord = "Z790 voor Intel of X670 voor AMD";
    } else {
        processor = "Intel i9-14900K of Ryzen 9 7950X";
        moederbord = "Z790 high-end voor Intel of X670E voor AMD";
    }

    // Videokaart keuze
    let videokaart;
    if (resolution === "4K" || competitive === "yes") {
        if (budget === "750") videokaart = "NVIDIA GTX 1660 Super of AMD RX 6500 XT";
        else if (budget === "1000") videokaart = "NVIDIA RTX 3060 of AMD RX 6650 XT";
        else if (budget === "1250") videokaart = "NVIDIA RTX 4060 Ti of AMD RX 6750 XT";
        else if (budget === "1500") videokaart = "NVIDIA RTX 4070 of AMD RX 6800 XT";
        else videokaart = "NVIDIA RTX 4080 of AMD RX 7900 XTX";
    } else {
        videokaart = "NVIDIA RTX 3050 of AMD RX 6600";
    }

    // Behuizing keuze
    let behuizing;
    if (aesthetics === "style") behuizing = "High-end ATX met glas en RGB-verlichting";
    else if (aesthetics === "neutral") behuizing = "Standaard ATX behuizing met basic uitstraling";
    else behuizing = "Praktische behuizing met goede airflow en minimale styling";

    // Opslag en RAM keuze
    let opslagKeuze = `Opslag: ${storage} NVMe SSD`;
    let ramKeuze = `RAM: ${ram} DDR4 of DDR5`;

    // Voeding
    let voeding;
    if (budget === "750") voeding = "500W voeding van Cooler Master of Corsair";
    else if (budget === "1000") voeding = "550W voeding van Seasonic of Corsair";
    else if (budget === "1250") voeding = "600W 80+ Gold voeding van Corsair of be quiet!";
    else if (budget === "1500") voeding = "700W 80+ Gold voeding van Corsair of Seasonic";
    else voeding = "850W 80+ Platinum voeding van Corsair, Seasonic of be quiet!";

    document.getElementById("resultaat").innerText = advies;

    let onderdelenLijst = document.getElementById("onderdelen-lijst");
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
}