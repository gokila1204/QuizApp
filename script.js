const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');

const questionElement = document.getElementById('question');

const answersButtons = document.getElementById('answers-buttons');

const timer = document.getElementById('timer');

startButton.addEventListener('click', startGame);

nextButton.addEventListener('click', () =>{
    currentQuestionIndex++;
    setNextQuestion()
});
let shuffeleQuestions, currentQuestionIndex;

function startGame(){
    console.log('started');
    timer.classList.remove('hide');
    timer.classList.add('timer');
    startTimer();
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
            {text:"10", correct:false},
            {text:"4", correct:true},
            {text:"8", correct:false},
            {text:"12", correct:false},
        ]
    },
    {
        question:"What is 4*9=?",
        answers:[
            {text:"36", correct:true},
            {text:"39", correct:false},
            {text:"43", correct:false},
            {text:"38", correct:false},
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
    },
    {
        question: "MS-Word is an example of",
        answers: [
            {text: "An operating system", correct: false},
            {text: " A processing device", correct: false},
            {text: "Application software", correct: true},
            {text: "An input device", correct: false},
        ]
    },
    {
        question: "National Income estimates in India are prepared by",
        answers: [
            {text: "Planning Commission", correct: false},
            {text: "Central statistical organisation", correct: true},
            {text: "Reserve Bank of India", correct: false},
            {text: "Indian statistical Institute", correct: false},
        ]
    },
    {
        question: "Ctrl, Shift and Alt are called .......... keys.",
        answers: [
            {text: "modifier", correct: true},
            {text: "function", correct: false},
            {text: "alphanumeric", correct: false},
            {text: "adjustment", correct: false},
        ]
    }
]
function startTimer(){
    let hour = document.getElementById('hour');
    let minute = document.getElementById('minute');
    let seconds = document.getElementById('seconds');
    let i = j = k = 1;
    setInterval(()=>{ 
        if(i<60){
            let x = i;
            seconds.innerText = ('00' + x).substr(-2);
            console.log(i)
            i++;
        }else if(j < 60){
            let y = j;
            minute.innerText = ('00' + y).substr(-2);
            console.log(j)
            j++;
            i=1;
        }else{
            let z = k;
            hour.innerText = ('00' + z).substr(-2);
            console.log(k)
            k++;
            i=1;
            j=1;
        }
    }, 1000);
    
}
