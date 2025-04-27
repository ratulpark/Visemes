// Define phoneme-to-veseme mapping
const phonemeToVeseme = {
    "HH": "grp_kgh",
    "EH": "grp_ei",
    "L": "grp_tdnszl",
    "OW": "grp_aou",
    "P": "grp_pbm",
    "B": "grp_pbm",
    "M": "grp_pbm",
    "K": "grp_kgh",
    "G": "grp_kgh",
    "A": "grp_aou",
    "O": "grp_aou",
    "U": "grp_aou",
    "E": "grp_ei",
    "I": "grp_ei",
    "W": "grp_ou",
    "R": "grp_kgh",
    "F": "grp_fv",
    "V": "grp_fv",
    "T": "grp_tdnszl",
    "D": "grp_tdnszl",
    "N": "grp_tdnszl",
    "S": "grp_tdnszl",
    "Z": "grp_tdnszl",
    "L": "grp_tdnszl",
    "Y": "grp_aou"
};

// Path to veseme images
const imagePath = "./images/";

// Function to animate vesemes (runs once, no loop)
function animateVesemes(phonemes) {
    const mappedVesemes = phonemes.map(phon => phonemeToVeseme[phon] || "unknown");
    const animationOutput = document.getElementById("animationOutput");

    // Clear previous output (only one animation pane)
    animationOutput.innerHTML = "";

    const imgElement = document.createElement("img");
    imgElement.classList.add("veseme-image");
    animationOutput.appendChild(imgElement);

    let currentIndex = 0;

    function displayNextVeseme() {
        if (currentIndex < mappedVesemes.length) {
            imgElement.src = `${imagePath}${mappedVesemes[currentIndex]}.png`;
            currentIndex++;
            setTimeout(displayNextVeseme, 500); // Show each veseme for 0.5 sec
        }
    }

    displayNextVeseme(); // Start animation sequence
}

// Function to start speech recognition
function startSpeechRecognition() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const audioContext = new AudioContext();
            const source = audioContext.createMediaStreamSource(stream);
            const recognizer = new pocketsphinx.Recognizer();

            recognizer.onresult = event => {
                const detectedPhonemes = event.results;
                document.getElementById("phonemeOutput").textContent = "Detected Phonemes: " + detectedPhonemes.join(" ");
                animateVesemes(detectedPhonemes);
            };

            source.connect(recognizer);
        })
        .catch(err => console.error("Microphone error:", err));
}

// Event listener for record button
document.getElementById("recordButton").addEventListener("click", startSpeechRecognition);
