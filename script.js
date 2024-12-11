// Global variables
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = 0;

// Get DOM elements
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const scoreContainer = document.getElementById("score-container");
const scoreDisplay = document.getElementById("score");
const totalQuestionsDisplay = document.getElementById("total-questions");
const restartBtn = document.getElementById("restartBtn");

// Fetch questions from the JSON file
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data.questions;  // Assuming the JSON data is structured like { "questions": [...] }
        totalQuestions = questions.length;
        totalQuestionsDisplay.innerText = totalQuestions;
        displayQuestion();
    })
    .catch(error => console.error('Error loading questions:', error));

// Display the current question and options
function displayQuestion() {
    if (currentQuestionIndex < totalQuestions) {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.innerText = currentQuestion.question;

        optionsElement.innerHTML = ''; // Clear previous options

        currentQuestion.options.forEach(option => {
            const optionBtn = document.createElement("button");
            optionBtn.innerText = option;
            optionBtn.classList.add("option-btn");
            optionBtn.addEventListener('click', () => checkAnswer(option));
            optionsElement.appendChild(optionBtn);
        });

        // Ensure Next and Previous buttons are visible
        nextBtn.style.display = 'inline-block'; // Show the "Next Question" button
        prevBtn.style.display = currentQuestionIndex > 0 ? 'inline-block' : 'none'; // Show Previous if not first question
    }
}

// Check if the selected answer is correct
function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedOption === currentQuestion.answer) {
        score++;
    }

    // Disable options after selection
    const optionBtns = document.querySelectorAll('.option-btn');
    optionBtns.forEach(btn => btn.disabled = true);

    nextBtn.style.display = 'inline-block'; // Show the "Next Question" button after selection
}

// Move to the next question or show the score
nextBtn.addEventListener('click', function() {
    currentQuestionIndex++;

    if (currentQuestionIndex >= totalQuestions) {
        showFinalScore();
    } else {
        displayQuestion();
    }
});

// Move to the previous question
prevBtn.addEventListener('click', function() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
});

// Show the final score
function showFinalScore() {
    questionElement.innerText = "Test Completed!";
    optionsElement.innerHTML = '';
    scoreDisplay.innerText = score;
    scoreContainer.style.display = 'block';
    nextBtn.style.display = 'none';
    prevBtn.style.display = 'none'; // Hide the Previous button when the test is completed
}

// Restart the test
restartBtn.addEventListener('click', function() {
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.style.display = 'none';
    displayQuestion();
    nextBtn.style.display = 'none'; // Hide the "Next Question" button initially
    prevBtn.style.display = 'none'; // Hide the "Previous Question" button initially
});
