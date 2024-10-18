const { fetchWord } = require("../js/script.js");

test("fetches random word from API", async () => {
  const word = await fetchWord();
  expect(word).toBeTruthy();
});
