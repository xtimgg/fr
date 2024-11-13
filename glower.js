window.onload = function() {
    updateGlow();
};

const glowyText = document.getElementById('glow');
const strengthSlider = document.getElementById('glowStrength');
const strengthNum = document.getElementById('glowStrengthNum');
strengthSlider.addEventListener("input", () => updateGlow());
const spreadSlider = document.getElementById('glowSpread');
const spreadNum = document.getElementById('glowSpreadNum');
spreadSlider.addEventListener("input", () => updateGlow());
const blendSlider = document.getElementById('glowBlend');
const blendNum = document.getElementById('glowBlendNum');
blendSlider.addEventListener("input", () => updateGlow());
const codeSnippet = document.getElementById('glowStyling').textContent;

function updateGlow() {
    strengthNum.textContent = strengthSlider.value/100;
    spreadNum.textContent = spreadSlider.value/5;
    blendNum.textContent = blendSlider.value/100;
    var _spread = spreadSlider.value/5;

    var glowpx = 2 ** (_spread*2);
    _spread += (_spread-1)/2;

    var glow = `0 0 ${twoDigitsRound(glowpx)}px rgba(255, 255, 255, ${twoDigitsRound((strengthSlider.value/100)*(blendSlider.value/100))})`;
    for(i=0; i <= spreadSlider.value; i++) {
        glowpx *= 2;
        glow += `, 0 0 ${twoDigitsRound(glowpx)}px rgba(255, 255, 255, ${twoDigitsRound((strengthSlider.value/glowpx)*(blendSlider.value/100))})`;
    }
    glowyText.style.textShadow = glow;

    const glowStyling = document.getElementById('glowStyling');
    
    glowStyling.textContent = codeSnippet;
    glowStyling.textContent += glow + ';';
}

function twoDigitsRound(num) {
    return Math.round(num * 100) / 100;
}

document.getElementById('copyCode').addEventListener("click", () => {
    document.getElementById('copyCode').textContent = `copied\n✔✔✔`;
    navigator.clipboard.writeText(glowStyling.textContent);
    setTimeout(() => document.getElementById('copyCode').textContent = `copy\ncode`, 1500)
});