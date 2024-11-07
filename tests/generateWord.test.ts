const {
  fetchWord,
  fetchDefinition,
  generateFallbackWord,
} = require("../js/generateWord.ts");

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(["testword"]),
  })
);

describe("fetchWord", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("fetches a random word from the API", async () => {
    const word = await fetchWord();
    expect(fetch).toHaveBeenCalledWith(
      "https://random-word-api.herokuapp.com/word"
    );
    expect(word).toBe("testword");
  });

  test("returns null if API request fails", async () => {
    fetch.mockImplementationOnce(() => Promise.reject("API failure"));
    const word = await fetchWord();
    expect(word).toBeNull();
  });
});

describe("fetchDefinition", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("fetches word definition and part of speech from the API", async () => {
    const mockDefinition = {
      meanings: [
        {
          partOfSpeech: "noun",
          definitions: [{ definition: "A test definition." }],
        },
      ],
    };

    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve([mockDefinition]),
      })
    );

    const meaning = await fetchDefinition("testword");
    expect(fetch).toHaveBeenCalledWith(
      `https://api.dictionaryapi.dev/api/v2/entries/en/testword`
    );
    expect(meaning).toEqual({
      definition: "A test definition.",
      partOfSpeech: "noun",
    });
  });

  test("returns null if no valid definition found", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve([{}]),
      })
    );

    const meaning = await fetchDefinition("invalidword");
    expect(meaning).toBeNull();
  });

  test("returns null if API request fails", async () => {
    fetch.mockImplementationOnce(() => Promise.reject("API failure"));
    const meaning = await fetchDefinition("testword");
    expect(meaning).toBeNull();
  });
});

describe("generateFallbackWord", () => {
  test("generates a fallback word with valid prefix and suffix", () => {
    const word = generateFallbackWord();
    expect(word).toMatch(/^[a-z]+[a-z]+$/);
  });
});
