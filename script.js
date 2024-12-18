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
const startTestBtn = document.getElementById("startTestBtn");
const retakeTestBtn = document.getElementById("retakeTestBtn");
const restartBtn = document.getElementById("restartBtn");

// Fetch questions from the JSON file
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data.questions;  // Assuming the JSON data is structured like { "questions": [...] }
        totalQuestions = questions.length;
        totalQuestionsDisplay.innerText = totalQuestions;
						  
    })
    .catch(error => console.error('Error loading questions:', error));

// Function to start the test
startTestBtn.addEventListener('click', function() {
    startTestBtn.style.display = 'none';  // Hide Start Test button
    displayQuestion();                    // Show the first question
    nextBtn.style.display = 'inline-block'; // Show the "Next Question" button
    prevBtn.style.display = 'none';      // Hide the "Previous Question" button (since it's the first question)
});

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

        // Enable/Disable Previous and Next buttons based on current position
        prevBtn.disabled = currentQuestionIndex === 0;
        nextBtn.disabled = currentQuestionIndex === totalQuestions - 1;
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

// Show the final score and show the Retake Test button
function showFinalScore() {
    questionElement.innerText = "Test Completed!";
    optionsElement.innerHTML = '';
    scoreDisplay.innerText = score;
    scoreContainer.style.display = 'block';
    nextBtn.disabled = true;
    prevBtn.disabled = true; // Disable both buttons on completion
    retakeTestBtn.style.display = 'inline-block';  // Show Retake Test button
}

// Retake the test when clicked
retakeTestBtn.addEventListener('click', function() {
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.style.display = 'none';
					  
    retakeTestBtn.style.display = 'none';  // Hide Retake Test button
    startTestBtn.style.display = 'block';  // Show Start Test button
});
