const questions = [
    {
        question: "Who is the first President of India ?",
        answers: [
            { text: "Jwahar Lal Nehru", correct: false },
            { text: "Mahatma Gandhi", correct: false },
            { text: " Dr. Rajendra Prasad", correct: true },
            { text: "Indira Gandhi", correct: false },

        ]

    },
    {
        question: "Name the national animal of India ?",
        answers: [
            { text: "Peacock", correct: false },
            { text: "Tiger", correct: true },
            { text: " Cheetah", correct: false },
            { text: "Lion", correct: false },

        ]
    }

];
const questionelement = document.getElementById("question");
const ansbuttons = document.getElementById("answer-buttons");
const nextbutton = document.getElementById("next-button");

let currentquestionindex = 0;
let score = 0;

function startquiz() {
    currentquestionindex = 0;
    score = 0;
    nextbutton.innerHTML = "Next";
    showquestion();
}
function showquestion() {
    resetstate();
    let currentquestion = questions[currentquestionindex];
    let questionno = currentquestionindex + 1;
    questionelement.innerHTML = questionno + "." + currentquestion.question;

    currentquestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        ansbuttons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectanswer);

    });

}

function resetstate() {
    nextbutton.style.display = "none";
    while (ansbuttons.firstChild) {
        ansbuttons.removeChild(ansbuttons.firstChild);
    }
}
function selectanswer(e) {
    const selectedbtn = e.target;
    const iscorrect = selectedbtn.dataset.correct === "true";
    if (iscorrect) {
        selectedbtn.classList.add("correct");
        score++;
    }
    else {
        selectedbtn.classList.add("incorrect");

    }
    Array.from(ansbuttons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;

    });
    nextbutton.style.display = "block";
}
function showscore() {
    resetstate();
    questionelement.innerHTML = "You scored" + score + "out of " + questions.length;
    nextbutton.innerHTML = "Play Again";
    nextbutton.style.display = "block";

}
function handlenextbutton() {
    currentquestionindex++;
    if (currentquestionindex < questions.length) {
        showquestion();

    }
    else {
        showscore();
    }


}
nextbutton.addEventListener("click", () => {
    if (currentquestionindex < questions.length) {
        handlenextbutton();

    }
    else {
        startquiz();
    }

})
startquiz();
