let words = [];
let currentWord = "";
let totalWords = 0;
let correctCount = 0;
let wrongCount = 0;
let sentence = "";

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[.,!?;:]/g, "")
    .trim();
}

function startGame() {
  let text = document.getElementById("input-text").value;
  let wordCount = parseInt(document.getElementById("word-count").value) || 1;
  words = text.split(/\s+/).filter((word) => word.trim().length > 0);
  totalWords = Math.min(wordCount, words.length);

  if (words.length < 2) {
    alert("Introduce un texto con más palabras.");
    return;
  }

  sentence = text;
  document.getElementById("input-text").style.display = "none";
  document.getElementById("word-count").style.display = "none";
  document.querySelector("button").style.display = "none";
  document.getElementById("game-container").style.display = "block";
  document.getElementById("remaining-count").innerText = totalWords;
  document.getElementById("final-score").style.display = "none";
  document.getElementById("sentence").style.color = "black";
  nextWord();
}

function restartGame() {
  location.reload();
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    checkWord();
  }
}

function checkWord() {
  let input = normalizeText(document.getElementById("word-input").value);
  let expected = normalizeText(currentWord);

  if (input === expected) {
    correctCount++;
    document.getElementById("correct-count").innerText = correctCount;
    resultMessage.innerText = "¡Correcto!";
    resultMessage.style.color = "green";
  } else {
    wrongCount++;
    document.getElementById("wrong-count").innerText = wrongCount;
    resultMessage.innerText = `Incorrecto. La palabra era: "${currentWord}"`;
    resultMessage.style.color = "red";
  }

  nextWord();
}

function nextWord() {
  if (totalWords === 0) {
    let sentenceElement = document.getElementById("sentence");
    sentenceElement.innerText = "¡Juego terminado!";
    sentenceElement.style.color = "black";
    document.getElementById("word-input").style.display = "none";
    document.getElementById("restart-button").style.display = "inline-block";
    let total = correctCount + wrongCount;
    let accuracy = total > 0 ? ((correctCount / total) * 100).toFixed(2) : 0;
    let finalScoreElement = document.getElementById("final-score");
    finalScoreElement.innerText = `Promedio de aciertos: ${accuracy}%`;
    finalScoreElement.style.display = "block";
    finalScoreElement.style.color = "black";
    return;
  }

  let index = Math.floor(Math.random() * words.length);
  currentWord = words[index].replace(/[.,!?;:]/g, "");
  words.splice(index, 1);
  totalWords--;

  document.getElementById("remaining-count").innerText = totalWords;
  document.getElementById("word-input").value = "";
  document.getElementById("sentence").innerHTML = sentence.replace(
    new RegExp(`\\b${currentWord}\\b`, "g"),
    "<span class='blank'>_____</span>"
  );
}
