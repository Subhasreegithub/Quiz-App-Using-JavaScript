const StartButton = document.getElementById('start-btn');
const NextButton = document.getElementById('next-btn');
const WholeContainer = document.getElementById('container');
const QuestionContainer = document.getElementById('question-container');
const AllQuestionElement = document.getElementById('question');
const AnswerButtonElement = document.getElementById('answer-button');
let currentQuestionIndex, shuffledQuestions;

StartButton.addEventListener('click', startGame);
NextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    StartButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    QuestionContainer.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    AllQuestionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        AnswerButtonElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    NextButton.classList.add('hide');
    while (AnswerButtonElement.firstChild) {
        AnswerButtonElement.removeChild(AnswerButtonElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(AnswerButtonElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
        if (button.dataset.correct === "true") {
            const emoji = document.createElement('span');
            emoji.innerHTML = '&#129321;';
            button.appendChild(emoji);
        }
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        NextButton.classList.remove('hide');
    } else {
        StartButton.innerText = 'Restart';
        StartButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'What is the capital of India?',
        answers: [
            { text: 'kolkata', correct: false },
            { text: 'New Delhi', correct: true }
        ]
    },
    {
        question: 'Rainbow consist of how many colours?',
        answers: [
            { text: '7 colours', correct: true },
            { text: '9 colours', correct: false },
            { text: '15 colours', correct: false },
            { text: '5 colours', correct: false }
        ]
    },
    {
        question: 'Which animal is known as the king of the jungle?',
        answers: [
            { text: 'Tiger', correct: false },
            { text: 'Lion', correct: true },
            { text: 'Elephant', correct: false },
            { text: 'Leopard', correct: false }
        ]
    },
    {
        question: 'What is the National Anthem of India?',
        answers: [
            { text: 'Maa Jujhe Salam', correct: false },
            { text: 'Jana Gana Mana', correct: true }
        ]
    }
];