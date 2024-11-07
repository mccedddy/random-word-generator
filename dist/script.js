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
const generateWord_js_1 = require("./generateWord.js");
document.addEventListener("DOMContentLoaded", () => {
    const generateButton = document.getElementById("generate");
    const word = document.getElementById("word");
    const message = document.getElementById("message");
    const definition = document.getElementById("definition");
    const partOfSpeech = document.getElementById("partOfSpeech");
    const card = document.getElementById("card");
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
    const generateRandomWord = () => __awaiter(void 0, void 0, void 0, function* () {
        flipCard();
        generateButton.disabled = true;
        word.innerHTML = "";
        definition.innerHTML = "";
        partOfSpeech.innerHTML = "";
        let generatedWord = yield (0, generateWord_js_1.fetchWord)();
        if (generatedWord == null) {
            generatedWord = (0, generateWord_js_1.generateFallbackWord)();
        }
        let meaning = yield (0, generateWord_js_1.fetchDefinition)(generatedWord);
        if (meaning) {
            word.innerHTML = generatedWord;
            definition.innerHTML = meaning.definition;
            partOfSpeech.innerHTML = meaning.partOfSpeech;
        }
        else {
            word.innerHTML = generatedWord;
            definition.innerHTML = "Definition not found.";
            partOfSpeech.innerHTML = "N/A";
        }
        copyToClipboard(generatedWord);
        changeColors();
        flipCard();
        generateButton.disabled = false;
    });
});
