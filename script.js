document.addEventListener("DOMContentLoaded", () => {
  const generateButton = document.getElementById("generate");
  const word = document.getElementById("word");
  const message = document.getElementById("message");
  const definition = document.getElementById("definition");
  const partOfSpeech = document.getElementById("partOfSpeech");
  const card = document.getElementById("card");
  const loader = document.getElementById("loader");

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

  function changeColors() {
    const colors = ["#0266cd", "#e51421", "#dacf00", "#017802"];

    const cardColorIndex = Math.floor(Math.random() * colors.length);
    const cardColor = colors[cardColorIndex];

    card.style.backgroundColor = cardColor;
  }

  function generateRandomWord() {
    // Disable the generate button while fetching
    loader.style.display = "block";
    generate.disabled = true;
    word.innerHTML = "";
    definition.innerHTML = "";
    partOfSpeech.innerHTML = "";
    message.innerHTML = "Generating...";

    fetch("https://random-word-api.herokuapp.com/word")
      .then((response) => response.json())
      .then((data) => {
        const generatedWord = data[0];

        // Fetch the definition of the word
        fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${generatedWord}`
        )
          .then((response) => response.json())
          .then((definitionData) => {
            if (
              definitionData[0] &&
              definitionData[0].meanings &&
              definitionData[0].meanings.length > 0
            ) {
              const firstMeaning = definitionData[0].meanings[0];
              const firstDefinition = firstMeaning.definitions[0].definition;
              const firstPartOfSpeech = firstMeaning.partOfSpeech;
              definition.innerHTML = firstDefinition;
              partOfSpeech.innerHTML = firstPartOfSpeech;
            } else {
              definition.innerHTML = "";
              partOfSpeech.innerHTML = "";
            }
            word.innerHTML = generatedWord;
            changeColors();

            // Copy to clipboard
            navigator.clipboard.writeText(generatedWord).then(() => {
              message.innerHTML = "Copied to clipboard!";

              setTimeout(() => {
                message.innerHTML = "";
              }, 1000);
            });
          })
          .catch((error) => {
            console.error("Error fetching definition:", error);
            definition.innerHTML = "Error fetching definition.";
          });
      })
      .catch((error) => {
        console.error("Error fetching word:", error);
        word.innerHTML = "Error fetching word.";
      })
      .finally(() => {
        generate.disabled = false;
        loader.style.display = "none";
      });
  }
});
