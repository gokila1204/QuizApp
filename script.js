const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');

const questionElement = document.getElementById('question');

const answersButtons = document.getElementById('answers-buttons');

startButton.addEventListener('click', startGame);

nextButton.addEventListener('click', () =>{
    currentQuestionIndex++;
    setNextQuestion()
});
let shuffeleQuestions, currentQuestionIndex;

function startGame(){
    console.log('started');
    startButton.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    shuffeleQuestions = questions.sort(() => Math.random() -.5)
    currentQuestionIndex = 0;
    setNextQuestion();
}

function setNextQuestion(){
    resetState();
    showQuestions(shuffeleQuestions[currentQuestionIndex]);
}
function resetState(){
    nextButton.classList.add('hide');
    while(answersButtons.firstChild){
        answersButtons.firstChild.remove();
    }
}
function showQuestions(question){
    questionElement.innerText = question.question;
    question.answers.forEach((answer) =>{
        let button = document.createElement('button');
        button.classList.add('btn');
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.innerHTML = answer.text;
        answersButtons.appendChild(button);
        button.addEventListener('click', selectAnswer);
    })
}
function selectAnswer(e){
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answersButtons.children).forEach((button) =>{
        setStatusClass(button, button.dataset.correct);
    })
    if(shuffeleQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hide');
    }else{
        startButton.innerHTML = 'Done';
        startButton.classList.remove('hide');
    }
}
function setStatusClass(element, correct){
    clearStateClass(element);
    (correct) ? element.classList.add('correct') : element.classList.add('wrong');
}
function clearStateClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong');
}
const questions = [
    {
        question:"What is 2*2=?",
        answers:[
            {text:"4", correct:true},
            {text:"8", correct:false},
        ]
    },
    {
        question:"What is 4*9=?",
        answers:[
            {text:"36", correct:true},
            {text:"39", correct:false},
        ]
    },
    {
        question:"Which is the national flower?",
        answers:[
            {text:"Jasmine", correct:false},
            {text:"Lotus", correct:true},
            {text:"Rose", correct:false},
            {text:"Butterfly Pea", correct:false},
        ]
    }
]