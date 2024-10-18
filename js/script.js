document.addEventListener("DOMContentLoaded", () => {
  const generateButton = document.getElementById("generate");
  const word = document.getElementById("word");
  const message = document.getElementById("message");
  const definition = document.getElementById("definition");
  const partOfSpeech = document.getElementById("partOfSpeech");
  const card = document.getElementById("card");

  // Event listener
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

export const fetchWord = async () => {
  try {
    const response = await fetch("https://random-word-api.herokuapp.com/word");
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error("Error fetching word:", error);
    return null;
  }
};

const fetchDefinition = async (word) => {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const definitionData = await response.json();
    if (
      definitionData[0] &&
      definitionData[0].meanings &&
      definitionData[0].meanings.length > 0
    ) {
      const firstMeaning = definitionData[0].meanings[0];
      const firstDefinition = firstMeaning.definitions[0].definition;
      const firstPartOfSpeech = firstMeaning.partOfSpeech;

      return {
        definition: firstDefinition,
        partOfSpeech: firstPartOfSpeech,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching definition:", error);
    return null;
  }
};

const generateFallbackWord = () => {
  const prefixes = [
    "bio",
    "cyber",
    "eco",
    "geo",
    "micro",
    "nano",
    "tele",
    "ultra",
    "anti",
    "auto",
    "hyper",
    "inter",
    "multi",
    "pseudo",
    "sub",
    "trans",
    "super",
  ];

  const suffixes = [
    "scope",
    "logy",
    "graph",
    "phobia",
    "nomy",
    "genic",
    "philia",
    "cracy",
    "itis",
    "ism",
    "ment",
    "tion",
    "ship",
    "ity",
    "ous",
  ];

  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  return prefix + suffix;
};
