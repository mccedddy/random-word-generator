document.addEventListener("DOMContentLoaded", () => {
  const generate = document.getElementById("generate");
  const word = document.getElementById("word");
  const message = document.getElementById("message");

  // Event listener
  generate.addEventListener("click", () => {
    generateRandomWord();
  });

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
        message.innerHTML = "Error fetching word";
      })
      .finally(() => {
        generate.disabled = false;
      });
  }
});
