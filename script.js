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

function textToVesemeImages(text) {
    const words = text.toLowerCase().split(/\s+/);

    const mappedWords = words.map(word => {
        let processedGroups = new Set();
        let i = 0;

        while (i < word.length) {
            const cluster = word.substring(i, i + 2);
            if (vesemeMapping[cluster]) {
                processedGroups.add(vesemeMapping[cluster]);
                i += 2;
            } else if (vesemeMapping[word[i]]) {
                processedGroups.add(vesemeMapping[word[i]]);
                i += 1;
            } else {
                i += 1;
            }
        }

        // Generate HTML for images and "close" labels
        const imagesHtml = Array.from(processedGroups).map(group => {
            return `
                <span class="veseme-container">
                    <img src="${imagePath}${group}.png" alt="${group}" class="veseme-image" />
                    <span class="close-text"> (close) </span>
                </span>
            `;
        }).join(' ');

        return `<div class="word-container">${imagesHtml}</div>`;
    });

    return mappedWords.join(''); // Join the words to render output
}

document.getElementById("convertButton").addEventListener("click", function() {
    const inputText = document.getElementById("inputText").value.trim();
    const outputDiv = document.getElementById("output");

    if (inputText === "") {
        outputDiv.textContent = "Please enter some text.";
        return;
    }

    const vesemeOutput = textToVesemeImages(inputText);
    outputDiv.innerHTML = vesemeOutput; // Render output with images and labels

    // Add event listeners to dynamically created "close-text" spans
    document.querySelectorAll('.close-text').forEach(closeSpan => {
        closeSpan.addEventListener('click', function () {
            this.parentElement.remove(); // Remove the parent container
        });
    });
});
