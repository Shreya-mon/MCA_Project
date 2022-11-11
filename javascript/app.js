const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];

function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for(let i=0;i<totalQuestion;i++){
        availableQuestions.push(quiz[i])
    }
}

function getNewQuestion()
{
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q
    const index1 = availableQuestions.indexOf(questionIndex);
    availableQuestions.splice(index1,1);
    const optionLen = currentQuestion.options.length
    for(let i=0;i<optionLen;i++){
        availableOptions.push(i)
    }
    optionContainer.innerHTML = '';
    let animationDelay = 0.2;
    for(let i=0;i<optionLen;i++)
    {
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        const index2 = availableOptions.indexOf(optionIndex)
        availableOptions.splice(index2,1);
        console.log(optionIndex);
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.2;
        option.className = "option";
        optionContainer.appendChild(option)
        option.setAttribute("onclick","getResult(this)")

    }
    //console.log(questionIndex)
    questionCounter++

}
function getResult(element){
    const id = parseInt(element.id);
    if(id === currentQuestion.answer){
        element.classList.add("correct");
    }
    else{
        element.classList.add("Wrong");
        const optionLen = optionContainer.children;
        for(let i=0;i<optionLen;i++){
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");  
            }
        }
    }
    unclickableOptions();
}
function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i=0;i<optionLen;i++){
        optionContainer.children.classList.add("already-answered");
    }
}
function next(){
    if(questionCounter === quiz.length){
        console.log("Quiz Over");
    }
    else{
        getNewQuestion();
    }
}

window.onload = function(){
    setAvailableQuestions();
    getNewQuestion();
}


