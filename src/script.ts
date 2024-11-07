import {
  fetchWord,
  fetchDefinition,
  generateFallbackWord,
} from "./generateWord.ts";

document.addEventListener("DOMContentLoaded", () => {
  const generateButton = document.getElementById(
    "generate"
  ) as HTMLButtonElement;
  const word = document.getElementById("word") as HTMLParagraphElement;
  const message = document.getElementById("message") as HTMLParagraphElement;
  const definition = document.getElementById(
    "definition"
  ) as HTMLParagraphElement;
  const partOfSpeech = document.getElementById(
    "partOfSpeech"
  ) as HTMLParagraphElement;
  const card = document.getElementById("card") as HTMLElement;

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
    const flipContainer = document.getElementById(
      "flipContainer"
    ) as HTMLElement;
    flipContainer.classList.toggle("flip");
  };

  const changeColors = () => {
    const colors = ["#0266cd", "#e51421", "#dacf00", "#017802"];
    const cardColorIndex = Math.floor(Math.random() * colors.length);
    const cardColor = colors[cardColorIndex];
    card.style.backgroundColor = cardColor;
  };

  const copyToClipboard = (word: string) => {
    navigator.clipboard.writeText(word).then(() => {
      message.innerHTML = "Copied to clipboard!";
      setTimeout(() => {
        message.innerHTML = "";
      }, 1000);
    });
  };

  const generateRandomWord = async () => {
    flipCard();
    generateButton.disabled = true;
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
    generateButton.disabled = false;
  };
});
