// Define phoneme-to-veseme mapping and image paths
const vesemeMapping = {
    'sh': 'grp_th',
    'ch': 'grp_hjchj',
    'th': 'grp_th',
    'ng': 'grp_kgh',
    'p': 'grp_pbm',
    'b': 'grp_pbm',
    'm': 'grp_pbm',
    'k': 'grp_kgh',
    'g': 'grp_kgh',
    'h': 'grp_hjchj',
    'a': 'grp_aou',
    'o': 'grp_aou',
    'u': 'grp_aou',
    'e': 'grp_ei',
    'i': 'grp_ei',
    'w': 'grp_ou',
    'r': 'grp_kgh',
    'f': 'grp_fv',
    'v': 'grp_fv',
    't': 'grp_tdnszl',
    'd': 'grp_tdnszl',
    'n': 'grp_tdnszl',
    's': 'grp_tdnszl',
    'z': 'grp_tdnszl',
    'l': 'grp_tdnszl',
    'y': 'grp_aou'
};

const imagePath = './images/'; // Path where veseme group images are stored

function animateVesemeImages(vesemeGroups, word) {
    // Create a container for the animation
    const animationContainer = document.createElement("div");
    animationContainer.classList.add("animation-container");

    const imgElement = document.createElement("img");
    imgElement.classList.add("veseme-image");
    animationContainer.appendChild(imgElement);

    let currentIndex = 0;

    // Start the infinite animation loop
    setInterval(() => {
        imgElement.src = `${imagePath}${vesemeGroups[currentIndex]}.png`; // Update the image source
        currentIndex = (currentIndex + 1) % vesemeGroups.length; // Loop through images
    }, 500); // 0.5 seconds per frame

    return animationContainer; // Return the animation container
}

function textToVesemeAnimation(text) {
    const words = text.toLowerCase().split(/\s+/);

    const animationElements = words.map(word => {
        let processedGroups = [];
        let i = 0;

        while (i < word.length) {
            const cluster = word.substring(i, i + 2);
            if (vesemeMapping[cluster]) {
                processedGroups.push(vesemeMapping[cluster]);
                i += 2;
            } else if (vesemeMapping[word[i]]) {
                processedGroups.push(vesemeMapping[word[i]]);
                i += 1;
            } else {
                i += 1;
            }
        }

        // Create animation for the word
        return animateVesemeImages(processedGroups, word);
    });

    return animationElements; // Return all animation elements
}

document.getElementById("convertButton").addEventListener("click", function() {
    const inputText = document.getElementById("inputText").value.trim();
    const outputDiv = document.getElementById("output");

    if (inputText === "") {
        outputDiv.textContent = "Please enter some text.";
        return;
    }

    const animationElements = textToVesemeAnimation(inputText);

    // Clear previous output and add animations
    outputDiv.innerHTML = "";
    animationElements.forEach(element => outputDiv.appendChild(element));
});
