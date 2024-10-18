const {
  fetchWord,
  fetchDefinition,
  generateFallbackWord,
} = require("../js/generateWord.js");

test("fetches random word from API", async () => {
  const word = await fetchWord();
  expect(word).toBeTruthy();
});
