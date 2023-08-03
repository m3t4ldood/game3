// app.js
let convertedWords = []; // Array to store the converted words

function enterLetter(letter) {
    var inputText = document.getElementById("inputText");
    inputText.value += letter;
}

function calculateWordValue(word) {
    let total = 0;
    for (let i = 0; i < word.length; i++) {
        const charCode = word.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) { // Check if it's a capital letter (A-Z)
            total += charCode - 64; // Convert letter to number (A=1, B=2, ...)
        }
    }
    return total;
}

function convertAndDisplay() {
    const inputText = document.getElementById('inputText').value;
    const wordValue = calculateWordValue(inputText.toUpperCase());
    document.getElementById('result').innerText = `Converted word: ${inputText}, Word value: ${wordValue}`;

    // Add the converted word to the array
    const hint = checkHintsForWord(inputText);
    convertedWords.push({ word: inputText, hint });

    // Update the list of converted words
    displayConvertedWords();
}

function checkHintsForWord(word) {
    const hintsUnlock = "A.B.C.-.-.F.G.-.-.-.K.-.-.N.-.-.Q.-.S.-.-.-.-.X.-.-.";
    const hintsFirstLetter = "(D)EHI(J)L(M)OPRTUVWYZ";
    const knownWords = {
        MANIFEST: "99 Fabrication kits",
        JACKWALL: "unlocks music",
        DREAMLAND: "Extra game mode"
    };

    const wordUpperCase = word.toUpperCase();
    let hint = '';

    if (hintsUnlock.includes(wordUpperCase)) {
        hint = "Possible letters that unlock stuff";
    } else if (hintsFirstLetter.includes(wordUpperCase.charAt(0))) {
        hint = "First letter of potential words";
    } else if (knownWords[wordUpperCase]) {
        hint = knownWords[wordUpperCase];
    }

    return hint;
}

function displayPossibleLetters() {
    const hintsElement = document.getElementById("hints");
    hintsElement.innerText = "Possible letters that unlock stuff:\nA.B.C.-.-.F.G.-.-.-.K.-.-.N.-.-.Q.-.S.-.-.-.-.X.-.-.";
}

function displayFirstLetter() {
    const hintsElement = document.getElementById("hints");
    hintsElement.innerText = "First letter of potential words:\n(D)EHI(J)L(M)OPRTUVWYZ";
}

function displayKnownWords() {
    const hintsElement = document.getElementById("hints");
    hintsElement.innerText = "Known words:\nMANIFEST = 99 Fabrication kits\nJACKWALL = unlocks music\nDREAMLAND = Extra game mode";
}

function displayConvertedWords() {
    const convertedWordsElement = document.getElementById("convertedWords");
    convertedWordsElement.innerHTML = ""; // Clear previous list

    if (convertedWords.length > 0) {
        const list = document.createElement("ul");
        convertedWords.forEach(entry => {
            const listItem = document.createElement("li");
            listItem.textContent = `${entry.word} - ${entry.hint}`;
            list.appendChild(listItem);
        });
        convertedWordsElement.appendChild(list);
    }
}
