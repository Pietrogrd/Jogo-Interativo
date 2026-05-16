// Base de perguntas
const questionsData = [
    {
        number: 1,
        question: "Brusque é de qual estado?",
        options: {
            A: "Santa Catarina",
            B: "Bahia",
            C: "Rio de Janeiro"
        },
        correctAnswer: "A",
        image: "./assets/quiz1.png"
    },
    {
        number: 2,
        question: "Tem um rio na cidade. Qual?",
        options: {
            A: "Itajaí-Mirim",
            B: "Amazonas",
            C: "Nilo"
        },
        correctAnswer: "A",
        image: "./assets/quiz2.png"
    },
    {
        number: 3,
        question: "Brusque faz muitas:",
        options: {
            A: "Roupas",
            B: "Aviões",
            C: "Barcos"
        },
        correctAnswer: "A",
        image: "./assets/quiz3.png"
    },
    {
        number: 4,
        question: "Quem veio morar lá?",
        options: {
            A: "Alemães",
            B: "Dinossauros",
            C: "Robôs"
        },
        correctAnswer: "A",
        image: "./assets/quiz4.png"
    },
    {
        number: 5,
        question: "Em que ano Brusque foi fundada?",
        options: {
            A: "1860",
            B: "2000",
            C: "1500"
        },
        correctAnswer: "A",
        image: "./assets/quiz5.png"
    },
    {
        number: 6,
        question: "Brusque começou com:",
        options: {
            A: "Pessoas trabalhando na terra",
            B: "Robôs",
            C: "Astronautas"
        },
        correctAnswer: "A",
        image: "./assets/quiz6.png"
    },
    {
        number: 7,
        question: "As primeiras casas eram feitas de:",
        options: {
            A: "De madeira",
            B: "De vidro",
            C: "De gelo"
        },
        correctAnswer: "A",
        image: "./assets/quiz7.png"
    },
    {
        number: 8,
        question: "Quem ajudou a criar a cidade?",
        options: {
            A: "Imigrantes alemães",
            B: "Super-heróis",
            C: "Piratas"
        },
        correctAnswer: "A",
        image: "./assets/quiz8.png"
    },
    {
        number: 9,
        question: "Com o que a cidade cresceu?",
        options: {
            A: "Fábricas de roupas",
            B: "Vulcões",
            C: "Castelos"
        },
        correctAnswer: "A",
        image: "./assets/quiz9.png"
    },
    {
        number: 10,
        question: "Nas festas de Brusque tem:",
        options: {
            A: "Dança e comida",
            B: "Silêncio",
            C: "Nada"
        },
        correctAnswer: "A",
        image: "./assets/quiz10.png"
    },
    {
        number: 11,
        question: "Qual a comida típica de Brusque?",
        options: {
            A: "Cuca",
            B: "Sushi",
            C: "Sorvete"
        },
        correctAnswer: "A",
        image: "./assets/quiz11.png"
    },
    {
        number: 12,
        question: "Em Brusque existem muitas:",
        options: {
            A: "Fábricas",
            B: "Pirâmides",
            C: "Vulcões"
        },
        correctAnswer: "A",
        image: "./assets/quiz12.png"
    },
    {
        number: 13,
        question: "Em Brusque as crianças gostam de:",
        options: {
            A: "Brincar",
            B: "Trabalhar",
            C: "Dormir sempre"
        },
        correctAnswer: "A",
        image: "./assets/quiz13.png"
    },
    {
        number: 14,
        question: "Na cidade de Brusque tem roupa:",
        options: {
            A: "Alemã",
            B: "De robô",
            C: "De astronauta"
        },
        correctAnswer: "A",
        image: "./assets/quiz14.png"
    },
    {
        number: 15,
        question: "Em que lugar fica Brusque?",
        options: {
            A: "Brasil",
            B: "Lua",
            C: "Mar"
        },
        correctAnswer: "A",
        image: "./assets/quiz15.png"
    }
];

// Estado do quiz
let currentIndex = 0;
let questions = [];
let questionsWithShuffledOptions = [];
let userAnswers = {};
let childName = "";
let childAge = "";
let childSchool = "";

// Função para embaralhar array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Função para embaralhar as alternativas de uma pergunta
function shuffleQuestionOptions(question) {
    const optionLetters = ['A', 'B', 'C'];
    const shuffledLetters = shuffleArray(optionLetters);
    
    const newQuestion = JSON.parse(JSON.stringify(question));
    const newOptions = {};
    const newAnswerMap = {};
    
    shuffledLetters.forEach((newLetter, index) => {
        const oldLetter = optionLetters[index];
        newOptions[newLetter] = question.options[oldLetter];
        newAnswerMap[oldLetter] = newLetter;
    });
    
    newQuestion.options = newOptions;
    newQuestion.correctAnswerNewLetter = newAnswerMap[question.correctAnswer];
    newQuestion.correctAnswerOldLetter = question.correctAnswer;
    
    return newQuestion;
}

// Inicializar
function init() {
    childName = localStorage.getItem('childName');
    childAge = localStorage.getItem('childAge');
    childSchool = localStorage.getItem('childSchool');

    if (!childName) {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('childNameDisplay').textContent = childName;
    shuffleQuestions();
    loadQuestion();
}

// Embaralhar perguntas e suas alternativas
function shuffleQuestions() {
    questions = JSON.parse(JSON.stringify(questionsData));
    
    // Embaralhar a ordem das perguntas
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    
    // Embaralhar as alternativas de cada pergunta
    questionsWithShuffledOptions = questions.map(q => shuffleQuestionOptions(q));
    
    // Limpar respostas anteriores
    userAnswers = {};
}

// Carregar pergunta atual
function loadQuestion() {
    const q = questionsWithShuffledOptions[currentIndex];
    document.getElementById('questionNumber').textContent = `Pergunta ${currentIndex + 1}`;
    document.getElementById('questionText').textContent = q.question;
    document.getElementById('optionA').textContent = q.options.A;
    document.getElementById('optionB').textContent = q.options.B;
    document.getElementById('optionC').textContent = q.options.C;
    document.getElementById('questionImage').src = q.image;
    document.getElementById('progressText').textContent = `Pergunta ${currentIndex + 1} de 15`;
    document.getElementById('progressFill').style.width = ((currentIndex + 1) / 15) * 100 + '%';

    // Restaurar resposta anterior se existir
    const savedAnswer = userAnswers[currentIndex];
    document.querySelectorAll('input[name="answer"]').forEach(input => {
        input.checked = input.value === savedAnswer;
    });

    // Limpar mensagem de erro
    document.getElementById('errorMessage').textContent = '';
    document.getElementById('selectHint').style.display = 'none';
    document.getElementById('selectHint').setAttribute('aria-hidden', 'true');
    document.getElementById('selectHint').classList.remove('select-hint--blink');

    // Atualizar visibilidade dos botões
    document.getElementById('btnPrev').style.display = currentIndex > 0 ? 'block' : 'none';
    document.getElementById('btnNext').textContent = currentIndex === 14 ? 'Finalizar' : 'Próxima →';
}

// Salvar resposta
function saveAnswer() {
    const selected = document.querySelector('input[name="answer"]:checked');
    const hint = document.getElementById('selectHint');
    if (!selected) {
        document.getElementById('errorMessage').textContent = '⚠️ Selecione uma alternativa!';
        hint.style.display = 'block';
        hint.setAttribute('aria-hidden', 'false');
        hint.classList.remove('select-hint--blink');
        void hint.offsetWidth;
        hint.classList.add('select-hint--blink');
        return false;
    }
    userAnswers[currentIndex] = selected.value;
    document.getElementById('errorMessage').textContent = '';
    hint.style.display = 'none';
    hint.setAttribute('aria-hidden', 'true');
    hint.classList.remove('select-hint--blink');
    return true;
}

// Próxima pergunta
document.getElementById('btnNext').addEventListener('click', function() {
    if (!saveAnswer()) return;

    if (currentIndex === 14) {
        showResults();
    } else {
        currentIndex++;
        loadQuestion();
        window.scrollTo(0, 0);
    }
});

// Pergunta anterior
document.getElementById('btnPrev').addEventListener('click', function() {
    if (currentIndex > 0) {
        currentIndex--;
        loadQuestion();
        window.scrollTo(0, 0);
    }
});

// Sair (header)
document.getElementById('btnLogout').addEventListener('click', function() {
    if (confirm('Deseja sair? Todos os dados serão apagados.')) {
        localStorage.removeItem('childName');
        localStorage.removeItem('childAge');
        localStorage.removeItem('childSchool');
        window.location.href = 'index.html';
    }
});

// Mostrar resultados
function showResults() {
    let correctCount = 0;
    let resultHTML = '';

    questionsWithShuffledOptions.forEach((q, idx) => {
        const userAnswer = userAnswers[idx];
        const isCorrect = userAnswer === q.correctAnswerNewLetter;
        if (isCorrect) correctCount++;

        const status = isCorrect ? '✅ Acertou!' : '❌ Errou!';
        const statusClass = isCorrect ? 'correct' : 'incorrect';

        resultHTML += `
            <div class="result-item ${statusClass}">
                <div class="result-number">${idx + 1}.</div>
                <div class="result-content">
                    <p class="result-question">${q.question}</p>
                    <p class="result-answer">Sua resposta: <strong>${q.options[userAnswer]}</strong></p>
                    <p class="result-correct">Resposta correta: <strong>${q.options[q.correctAnswerNewLetter]}</strong></p>
                </div>
                <div class="result-status">${status}</div>
            </div>
        `;
    });

    const incorrectCount = 15 - correctCount;
    const percentage = Math.round((correctCount / 15) * 100);

    document.getElementById('childNameResult').textContent = childName;
    document.getElementById('correctCount').textContent = correctCount;
    document.getElementById('incorrectCount').textContent = incorrectCount;
    document.getElementById('percentageScore').textContent = percentage + '%';
    document.getElementById('resultsList').innerHTML = resultHTML;

    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('resultsContainer').style.display = 'block';
    window.scrollTo(0, 0);
}

// Recomeçar Quiz (com embaralhamento)
document.getElementById('btnRetry').addEventListener('click', function() {
    currentIndex = 0;
    userAnswers = {};
    shuffleQuestions();
    document.getElementById('quizContainer').style.display = 'block';
    document.getElementById('resultsContainer').style.display = 'none';
    loadQuestion();
    window.scrollTo(0, 0);
});

// Sair da conta (Botão Sair nos resultados)
document.getElementById('btnHome').addEventListener('click', function() {
    if (confirm('Deseja sair? Todos os dados serão apagados.')) {
        localStorage.removeItem('childName');
        localStorage.removeItem('childAge');
        localStorage.removeItem('childSchool');
        window.location.href = 'index.html';
    }
});

// Iniciar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
