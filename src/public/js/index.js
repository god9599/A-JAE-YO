const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const questionCount = qnaList.length;

const userSelect = []; // 사용자가 선택한 보기의 인덱스 저장소
const problemAnswer = [0, 2, 0, 0, 1, 2, 1, 2, 0, 1]; // 문제 정답 배열

const begin = () => {
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

const resultView = () => {
  qna.style.WebkitAnimation = "fadeOut 1s";
  qna.style.animation = "fadeOut 1s";
  setTimeout(() => {
    result.style.WebkitAnimation = "fadeIn 1s";
    result.style.animation = "fadeIn 1s";
    setTimeout(() => {
      qna.style.display = "none";
      result.style.display = "block";
    }, 450);
  });
  setResult();
};

const nextQuestion = (questionId) => {
  if (questionId === questionCount) {
    resultView();
    return;
  }
  let question = document.querySelector(".questionBox");
  question.innerHTML = '<img src = " ' + qnaList[questionId].question + ' ">';
  for (let i in qnaList[questionId].example) {
    addExample(qnaList[questionId].example[i].answer, questionId, i);
  }
  let status = document.querySelector(".statusBar");
  status.style.width = (100 / questionCount) * (questionId + 1) + "%";
};

const addExample = (answerInfo, questionId, id) => {
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
        buttons[i].style.animation = "fadeOut 0.5s";
      }
      setTimeout(() => {
        userSelect[questionId] = id; // 몇 번째 질문에서 몇 번쨰 답을 선택했는 지 배열에 저장
        for (let i = 0; i < buttons.length; i++) {
          buttons[i].style.display = "none";
        }
        nextQuestion(++questionId);
      }, 500);
    },
    false
  );
};

// 정답과 사용자가 입력한 답안을 비교
const calResult = (userSelect) => {
  let correctCnt = 0;
  for (let i = 0; i < userSelect.length; i++) {
    if (userSelect[i] == problemAnswer[i]) {
      correctCnt += 1;
    }
  }
  return correctCnt;
};

const setResult = () => {
  const cnt = calResult(userSelect);
  const imgDiv = document.querySelector("#resultImg");
  const resultDesc = document.querySelector(".resultDesc");
  let resultImg = document.createElement("img");
  let imgNum;
  if (cnt == 10 || cnt == 9) {
    imgNum = 0;
  } else if (cnt == 7 || cnt == 6 || cnt == 8) {
    imgNum = 1;
  } else if (cnt == 4 || cnt == 3 || cnt == 5) {
    imgNum = 2;
  } else if (cnt == 2 || cnt == 1 || cnt == 0) {
    imgNum = 3;
  }

  let imgUrl = infoList[imgNum].result;
  resultImg.src = imgUrl;
  resultImg.alt = imgNum;
  resultImg.classList.add("img-fluid");
  imgDiv.appendChild(resultImg);

  resultDesc.innerHTML = infoList[imgNum].desc;
};
