const main = document.querySelector("#main");
const qna = document.querySelector("#qna");

let begin = () => {
  main.style.WebkitAnimation = "fadeOut 1s";
  main.style.animation = "fadeOut 1s";
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 1s";
    qna.style.animation = "fadeIn 1s";
    setTimeout(() => {
      main.style.display = "none";
      qna.style.display = "block";
    }, 450);
    let questionId = 0;
    nextQuestion(questionId);
  }, 450);
};

let nextQuestion = (questionId) => {
  let question = document.querySelector(".questionBox");
  question.innerHTML = qnaList[questionId].question;
  for (let i in qnaList[questionId].example) {
    addExample(qnaList[questionId].example[i].answer, questionId);
  }
};

let addExample = (answerInfo, questionId) => {
  let example = document.querySelector(".answerBox");
  let answer = document.createElement("button");
  answer.classList.add("answerList");
  answer.classList.add("py-3");
  answer.classList.add("my-4");
  answer.classList.add("mx-auto");
  answer.classList.add("fadeIn");

  // div 태그 안에 button 생성
  example.appendChild(answer);
  answer.innerHTML = answerInfo;
  answer.addEventListener(
    "click",
    () => {
      let buttons = document.querySelectorAll(".answerList");
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
        buttons[i].style.WebkitAnimation = "fadeOut 0.5s";
        button[i].style.animation = "fadeOut 0.5s";
      }
      setTimeout(() => {
        for (let i = 0; i < buttons.length; i++) {
          buttons[i].style.display = "none";
        }
        nextQuestion(++questionId);
      }, 500);
    },
    false
  );
};
