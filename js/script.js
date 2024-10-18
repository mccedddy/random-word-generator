import {
  fetchWord,
  fetchDefinition,
  generateFallbackWord,
} from "./generateWord.js";

document.addEventListener("DOMContentLoaded", () => {
  const generateButton = document.getElementById("generate");
  const word = document.getElementById("word");
  const message = document.getElementById("message");
  const definition = document.getElementById("definition");
  const partOfSpeech = document.getElementById("partOfSpeech");
  const card = document.getElementById("card");

  generateButton.addEventListener("click", () => {
    generateRandomWord();
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      generateButton.classList.add("active");
      generateRandomWord();
      setTimeout(() => {
        generateButton.classList.remove("active");
      }, 100);
    }
  });

  const flipCard = () => {
    const flipContainer = document.getElementById("flipContainer");
    flipContainer.classList.toggle("flip");
  };

  const changeColors = () => {
    const colors = ["#0266cd", "#e51421", "#dacf00", "#017802"];
    const cardColorIndex = Math.floor(Math.random() * colors.length);
    const cardColor = colors[cardColorIndex];
    card.style.backgroundColor = cardColor;
  };

  const copyToClipboard = (word) => {
    navigator.clipboard.writeText(word).then(() => {
      message.innerHTML = "Copied to clipboard!";
      setTimeout(() => {
        message.innerHTML = "";
      }, 1000);
    });
  };

  const generateRandomWord = async () => {
    flipCard();
    generate.disabled = true;
    word.innerHTML = "";
    definition.innerHTML = "";
    partOfSpeech.innerHTML = "";

    let generatedWord = await fetchWord();

    if (generatedWord == null) {
      generatedWord = generateFallbackWord();
    }

    let meaning = await fetchDefinition(generatedWord);

    if (meaning) {
      word.innerHTML = generatedWord;
      definition.innerHTML = meaning.definition;
      partOfSpeech.innerHTML = meaning.partOfSpeech;
    } else {
      word.innerHTML = generatedWord;
      definition.innerHTML = "Definition not found.";
      partOfSpeech.innerHTML = "N/A";
    }

    copyToClipboard(generatedWord);
    changeColors();
    flipCard();
    generate.disabled = false;
  };
});
