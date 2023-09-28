// Generate a random number between 1 and 100
const randomNumber = Math.floor(Math.random() * 100) + 1;

const guessSubmit = document.getElementById("guessSubmit");
const guessInput = document.getElementById("guessInput");
const message = document.querySelector(".message");

let attempts = 0;

guessSubmit.addEventListener("click", checkGuess);

function checkGuess() {
    const userGuess = parseInt(guessInput.value);
    attempts++;

    if (userGuess === randomNumber) {
        message.textContent = `Congratulations! You guessed the correct number ${randomNumber} in ${attempts} attempts.`;
        message.style.color = "green";
        guessInput.disabled = true;
        guessSubmit.disabled = true;
    } else if (userGuess < randomNumber) {
        message.textContent = "Try a higher number.";
        message.style.color = "red";
    } else {
        message.textContent = "Try a lower number.";
        message.style.color = "red";
    }

    guessInput.value = "";
    guessInput.focus();
}
