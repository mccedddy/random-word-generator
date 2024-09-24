document.addEventListener("DOMContentLoaded", () => {
  const generate = document.getElementById("generate");
  const word = document.getElementById("word");
  const message = document.getElementById("message");

  // Event listener
  generate.addEventListener("click", () => {
    generateRandomWord();
  });

  // Array of random words
  const randomWords = [
    "apple",
    "banana",
    "cat",
    "dog",
    "elephant",
    "flower",
    "giraffe",
    "house",
    "igloo",
    "jacket",
    "kangaroo",
    "lemon",
    "mountain",
    "notebook",
    "ocean",
    "pizza",
    "queen",
    "rainbow",
    "sunshine",
    "turtle",
    "umbrella",
    "violin",
    "whale",
    "xylophone",
    "yacht",
    "zebra",
    "ant",
    "balloon",
    "carrot",
    "drum",
    "eagle",
    "fox",
    "grape",
    "hat",
    "island",
    "jelly",
    "kite",
    "lamp",
    "moon",
    "nest",
    "orange",
    "penguin",
    "quilt",
    "rocket",
    "star",
    "tree",
    "unicorn",
    "vase",
    "waterfall",
    "x-ray",
    "yellow",
    "zoo",
    "avocado",
    "butterfly",
    "camera",
    "diamond",
    "engine",
    "feather",
    "glasses",
    "honey",
    "iceberg",
    "jungle",
    "key",
    "lighthouse",
    "mirror",
    "necklace",
    "octopus",
    "pencil",
    "quicksand",
    "river",
    "snowflake",
    "train",
    "vulture",
    "watermelon",
    "xenon",
    "yoyo",
    "zipper",
    "airplane",
    "bicycle",
    "chocolate",
    "desert",
    "envelope",
    "fountain",
    "guitar",
    "helmet",
    "iguanodon",
    "joker",
    "kettle",
  ];

  function generateRandomWord() {
    // Disable the generate button while fetching
    generate.disabled = true;

    fetch("https://random-word-api.herokuapp.com/word")
      .then((response) => response.json())
      .then((data) => {
        const generatedWord = data[0];
        word.innerHTML = generatedWord;

        // Copy to clipboard
        navigator.clipboard.writeText(generatedWord).then(() => {
          message.innerHTML = "Copied to clipboard!";

          setTimeout(() => {
            message.innerHTML = "";
          }, 1000);
        });
      })
      .catch((error) => {
        console.error("Error fetching word:", error);

        // Fallback: Select 2 random words from the array if API fails
        const randomIndex1 = Math.floor(Math.random() * randomWords.length);
        const randomIndex2 = Math.floor(Math.random() * randomWords.length);

        const generatedWord = `${randomWords[randomIndex1]} ${randomWords[randomIndex2]}`;
        word.innerHTML = generatedWord;

        // Copy to clipboard
        navigator.clipboard.writeText(generatedWord).then(() => {
          message.innerHTML = "Copied to clipboard!";

          setTimeout(() => {
            message.innerHTML = "";
          }, 1000);
        });
      })
      .finally(() => {
        generate.disabled = false;
      });
  }
});
