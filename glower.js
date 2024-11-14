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
const hueSlider = document.getElementById('glowHue');
const hueNum = document.getElementById('glowHueColor');
hueSlider.addEventListener("input", () => updateGlow());
const codeSnippet = document.getElementById('glowStyling').textContent;

function updateGlow() {
    strengthNum.textContent = strengthSlider.value/100;
    spreadNum.textContent = spreadSlider.value/5;
    blendNum.textContent = blendSlider.value/100;
    hueNum.style.color = `hsl(${hueSlider.value}, 100%, 50%)`;
    var _spread = spreadSlider.value/5;

    if(document.getElementById('textHueSwitchHandle').style.left == `63%`) {
        glowyText.style.color = `hsl(${hueSlider.value}, 100%, 80%)`
    } else {
        glowyText.style.color = `white`
    }

    if(document.getElementById('glowHueSwitchHandle').style.left == `63%`) {
        var glowHSL = `hsl(${hueSlider.value}, 100%, 50%`
    } else {
        var glowHSL = `hsl(0, 0%, 100%`
    }

    var glowpx = 2 ** (_spread*2);
    _spread += (_spread-1)/2;

    var glow = `0 0 ${twoDigitsRound(glowpx)}px ${glowHSL}, ${twoDigitsRound((strengthSlider.value/100)*(blendSlider.value/100))})`;
    for(i=0; i <= spreadSlider.value; i++) {
        glowpx *= 2;
        glow += `, 0 0 ${twoDigitsRound(glowpx)}px ${glowHSL}, ${twoDigitsRound((strengthSlider.value/glowpx)*(blendSlider.value/100))})`;
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

function switching(switchid, handleid, value) {
    const switchC = document.getElementById(switchid);
    const switchH = document.getElementById(handleid);
    switchC.addEventListener('click', () => {
        switchH.style.animation = "none";
        void switchH.offsetWidth;
        switchH.style.animation = "";
        if(value) {
            switchH.style.animation = `switchoff .3s cubic-bezier(.28,1.41,.64,1)`;
            switchC.style.filter = `grayscale(1)`;
            switchH.style.left = `5%`;
            value = false;
        } else {
            switchH.style.animation = `switch .3s cubic-bezier(.28,1.41,.64,1)`;
            switchC.style.filter = `grayscale(0)`;
            switchH.style.left = `63%`;
            value = true;
        }
    });
}

let glowColor = false;
let textColor = false;

switching('glowHueSwitch', 'glowHueSwitchHandle', glowColor);
switching('textHueSwitch', 'textHueSwitchHandle', textColor);
