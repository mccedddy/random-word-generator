type Definition = {
  definition: string;
  partOfSpeech: string;
};

export const fetchWord = async (): Promise<string | null> => {
  try {
    const response = await fetch("https://random-word-api.herokuapp.com/word");
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error("Error fetching word:", error);
    return null;
  }
};

export const fetchDefinition = async (
  word: string
): Promise<Definition | null> => {
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

export const generateFallbackWord = (): string => {
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
