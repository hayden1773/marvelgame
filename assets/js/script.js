var startGameBtn = document.querySelector("#start-game")
var headingDiv = document.querySelector("#heading")
var gameDiv = document.querySelector("#game")
var addScoreDiv = document.querySelector("#score-input")
var questionEl = document.querySelector("#question")
var selectEl = document.querySelector("#select")
var isCorrectEl = document.querySelector("#is-correct")
var timeEl = document.querySelector(`#time`);
var scoreEl = document.querySelector(`#score`);
var currQuest = 0;

var timeLeft;
var shuffled;
var countdown;

function shuffle(arr){
    var result = [];
    var arrCopy = [...arr];
    while(arrCopy.length){
        result.push(arrCopy.splice(Math.floor(Math.random()*arrCopy.length),1)[0])
    }
    return result
}



function startGame(){
    headingDiv.setAttribute("class","hide");
    gameDiv.setAttribute("class","")
    shuffled = shuffle(questions)
    timeLeft = 300;
    timeEl.textContent = `${timeLeft} second(s) remaining!`;
    countdown = setInterval(()=>{
        timeLeft--;
        timeEl.textContent = `${timeLeft} second(s) remaining!`;
        if(timeLeft<=0){
            timeLeft = 0;
            endGame()
        }
    },1000)
    loadNextQuestion()
}

function loadNextQuestion(){
    isCorrectEl.setAttribute("class","hide")
    selectEl.setAttribute("class","")
    questionEl.setAttribute("class","")
    console.log(shuffled[currQuest])
    var shuffledAns = shuffle(shuffled[currQuest].answers);
    selectEl.innerHTML = ""
    questionEl.textContent = shuffled[currQuest].question
    shuffledAns.forEach(answer=>{
        var newton = document.createElement("button");
        newton.textContent = answer;
        answer===shuffled[currQuest].correctAnswer? newton.setAttribute("data-correct","yes"):null;
        selectEl.append(newton)
    })
}

function correctGuess(){
    isCorrectEl.textContent = "correct!"
    isCorrectEl.setAttribute("class","correct")
    selectEl.setAttribute("class","hide")
    questionEl.setAttribute("class","hide")
    currQuest++;
    if(currQuest<shuffled.length){
        setTimeout(loadNextQuestion,500)
    } else {
        endGame()
    }
}
function wrongGuess(){
    isCorrectEl.textContent = "wrong!"
    isCorrectEl.setAttribute("class","wrong")
    selectEl.setAttribute("class","hide")
    questionEl.setAttribute("class","hide")
    currQuest++;
    timeLeft-=15;
    if(currQuest<shuffled.length){
        setTimeout(loadNextQuestion,500)
    } else {
        endGame()
    }
}

function endGame(){
    clearInterval(countdown)
    gameDiv.setAttribute("class","hide");
    addScoreDiv.setAttribute("class","")
    timeEl.textContent=""
    scoreEl.textContent = timeLeft;

}

startGameBtn.addEventListener("click",startGame)
select.addEventListener("click",function(event){
    if(event.target.matches("button")){
      event.target.getAttribute("data-correct")?correctGuess():wrongGuess()
    }
})
document.querySelector("form").addEventListener("submit",function(event){
    event.preventDefault();
    var currentScores = JSON.parse(localStorage.getItem("scores"))||[];
    console.log(currentScores);
    var me = {
        init:document.querySelector("input").value,
        score:timeLeft
    }
    currentScores.push(me);
    currentScores.sort((a,b)=>b.score-a.score)
    localStorage.setItem("scores",JSON.stringify(currentScores));
    location.assign("./score.html")
})
