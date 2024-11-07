"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFallbackWord = exports.fetchDefinition = exports.fetchWord = void 0;
const fetchWord = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("https://random-word-api.herokuapp.com/word");
        const data = yield response.json();
        return data[0];
    }
    catch (error) {
        console.error("Error fetching word:", error);
        return null;
    }
});
exports.fetchWord = fetchWord;
const fetchDefinition = (word) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const definitionData = yield response.json();
        if (definitionData[0] &&
            definitionData[0].meanings &&
            definitionData[0].meanings.length > 0) {
            const firstMeaning = definitionData[0].meanings[0];
            const firstDefinition = firstMeaning.definitions[0].definition;
            const firstPartOfSpeech = firstMeaning.partOfSpeech;
            return {
                definition: firstDefinition,
                partOfSpeech: firstPartOfSpeech,
            };
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.error("Error fetching definition:", error);
        return null;
    }
});
exports.fetchDefinition = fetchDefinition;
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
exports.generateFallbackWord = generateFallbackWord;
