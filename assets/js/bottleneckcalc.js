function calculateBottleneck() {
    let cpuElement = document.getElementById('cpu');
    let gpuElement = document.getElementById('gpu');
    let resultaatElement = document.getElementById('resultaat');

    let cpuScore = parseInt(cpuElement.value);
    let gpuScore = parseInt(gpuElement.value);
    let verschil = Math.abs(cpuScore - gpuScore);
    let resultaat = "";

    if (verschil <= 10) {
        resultaat = "✅ Goede balans! Geen bottleneck.";
    } else if (cpuScore > gpuScore) {
        resultaat = `⚠️ CPU is te krachtig voor de GPU. GPU bottleneck mogelijk (${verschil}% verschil).`;
    } else {
        resultaat = `⚠️ GPU is te krachtig voor de CPU. CPU bottleneck mogelijk (${verschil}% verschil).`;
    }

    // Toon resultaat in container
    resultaatElement.textContent = resultaat;
}