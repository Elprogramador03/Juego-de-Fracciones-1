// Definir las fracciones y sus respuestas correspondientes
const questions = [
  { image: '1medio.png', correctAnswer: 1, options: ['2/4', '1/2', '1/6', '1/5'] },
  { image: '2 cuarto.png', correctAnswer: 3, options: ['2/10', '1/3', '1/7', '2/4'] },
  { image: '2 quinto.png', correctAnswer: 0, options: ['2/5', '1/8', '3/6', '3/5'] },
  { image: '3 cuarto.png', correctAnswer: 2, options: ['1/4', '1/2', '3/4', '1/5'] },
  { image: '2 tercios.png', correctAnswer: 2, options: ['2/4', '2/11', '2/3', '4/5'] },
  { image: '3 sesto.png', correctAnswer: 0, options: ['3/6', '2/7', '6/3', '1/5'] },
  { image: '4 septimo.png', correctAnswer: 3, options: ['7/4', '1/2', '3/4', '4/7'] },
  { image: '5 octavo.png', correctAnswer: 1, options: ['4/5', '5/8', '2/3', '8/5'] },
  { image: '4 noveno.png', correctAnswer: 3, options: ['1/4', '9/4', '1/2', '4/9'] },
  { image: '4 onceavo.png', correctAnswer: 0, options: ['4/11', '11/4', '1/3', '2/5'] },
  // Agrega aquí las demás preguntas y respuestas
];

let currentQuestion = 0;
let score = 0;
let correctAnswers = 0;
let timer;
let timeElapsed = 0;

const fractionImage = document.getElementById('fraction-image');
const optionsContainer = document.getElementById('options-container');
const scoreDisplay = document.getElementById('score');
const correctAnswersDisplay = document.getElementById('correct-answers');
const timerDisplay = document.getElementById('timer');
const nextButton = document.getElementById('next-btn');

function displayQuestion() {
  const current = questions[currentQuestion];
  fractionImage.src = current.image;
  optionsContainer.innerHTML = '';
  current.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.classList.add('option');
    button.textContent = option;
    button.addEventListener('click', () => checkAnswer(index));
    optionsContainer.appendChild(button);
  });
}

function startTimer() {
  timer = setInterval(() => {
    timeElapsed++;
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function checkAnswer(index) {
  if (index === questions[currentQuestion].correctAnswer) {
    score += 5;
    correctAnswers++;
    scoreDisplay.textContent = score;
    correctAnswersDisplay.textContent = correctAnswers;

    // Mensaje de respuesta correcta
    const feedbackMessage = document.createElement('p');
    feedbackMessage.classList.add('feedback', 'correct');
    feedbackMessage.textContent = '¡Respuesta correcta!';
    document.getElementById('options-container').appendChild(feedbackMessage);
  } else {
    // Mensaje de respuesta incorrecta
    const feedbackMessage = document.createElement('p');
    feedbackMessage.classList.add('feedback', 'incorrect');
    feedbackMessage.textContent = '¡Respuesta incorrecta! Intenta de nuevo.';
    document.getElementById('options-container').appendChild(feedbackMessage);
  }

  setTimeout(() => {
    const feedbackMessages = document.querySelectorAll('.feedback');
    feedbackMessages.forEach((message) => message.remove());

    currentQuestion++;
    if (currentQuestion < questions.length) {
      displayQuestion();
    } else {
      stopTimer();
      showStats();
      nextButton.style.display = 'block';
      nextButton.textContent = 'Ver estadísticas';
      nextButton.removeEventListener('click', showStats);
      nextButton.addEventListener('click', showStats);
    }
  }, 1000);
}

function resetGame() {
  currentQuestion = 0;
  score = 0;
  correctAnswers = 0;
  timeElapsed = 0;
  scoreDisplay.textContent = score;
  correctAnswersDisplay.textContent = correctAnswers;
  timerDisplay.textContent = '0:00';
  nextButton.style.display = 'none';
  displayQuestion();
  startTimer();
}

function showStats() {
  const timeTaken = timerDisplay.textContent;
  const statsContainer = document.createElement('div');
  statsContainer.classList.add('stats-summary');

  const correctAnswersStat = document.createElement('p');
  correctAnswersStat.textContent = `Respuestas Correctas: ${correctAnswers}`;
  statsContainer.appendChild(correctAnswersStat);

  const incorrectAnswersStat = document.createElement('p');
  incorrectAnswersStat.textContent = `Respuestas Incorrectas: ${questions.length - correctAnswers}`;
  statsContainer.appendChild(incorrectAnswersStat);

  const timeStat = document.createElement('p');
  timeStat.textContent = `Tiempo Transcurrido: ${timeTaken}`;
  statsContainer.appendChild(timeStat);

  const scoreStat = document.createElement('p');
  scoreStat.textContent = `Puntaje: ${score}`;
  statsContainer.appendChild(scoreStat);

  const restartButton = document.createElement('button');
  restartButton.textContent = 'Reiniciar Juego';
  restartButton.addEventListener('click', resetGame);
  statsContainer.appendChild(restartButton);

  document.querySelector('.container').innerHTML = '';
  document.querySelector('.container').appendChild(statsContainer);
}

displayQuestion();
startTimer();
