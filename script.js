const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");

const buttons = document.getElementById("letter-buttons");
const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const finalText = document.getElementById("final-text");

// 편지 열기
envelope.addEventListener("click", () => {
  envelope.style.display = "none";
  letter.style.display = "flex";
  spawnHearts();
});


// ===== 1단계: 하트 찾기 =====
let heart = 0;

function spawnHearts() {
  for (let i = 0; i < 5; i++) {
    const h = document.createElement("div");
    h.textContent = "💖";
    h.className = "find-heart";

    h.style.left = 20 + Math.random()*60 + "%";
    h.style.top = 30 + Math.random()*40 + "%";

    h.addEventListener("click", () => {
      h.remove();
      heart++;
      document.getElementById("heart-count").textContent = heart;

      if (heart >= 5) goQuiz();
    });

    document.querySelector(".letter-window").appendChild(h);
  }
}

function goQuiz() {
  title.textContent = "퀴즈 타임 💌";
  document.getElementById("step1").style.display = "none";
  document.getElementById("step2").style.display = "block";
}


// ===== 2단계: 퀴즈 =====
let correct = 0;

document.querySelectorAll(".quiz").forEach(btn => {
  btn.addEventListener("click", () => {

    if (btn.classList.contains("correct")) {
      btn.style.background = "#ffc0cb";
      correct++;
    } else {
      btn.textContent = "땡!"
    }

    if (correct >= 2) finishGame();
  });
});


// ===== 성공 → 버튼 등장 =====
function finishGame() {
  title.textContent = "이제 선택해줘 💗";
  document.getElementById("game-area").style.display = "none";
  buttons.style.display = "flex";
}


// ===== NO 시스템 =====
const noTexts = [
  "진짜…?",
  "다시 생각해줘 🥺",
  "나 울어 😢",
  "초코 줄게!",
  "안아줄게 💗"
];

let noCount = 0;
let yesScale = 1;

noBtn.addEventListener("click", () => {

  if (noCount < noTexts.length) {
    title.textContent = noTexts[noCount];
    noCount++;

    // YES 점점 커지기
    yesScale += 0.25;
    yesBtn.style.transform = `scale(${yesScale})`;
  }

  if (noCount >= 5) {
    noBtn.style.display = "none";
  }
});


// ===== YES =====
yesBtn.addEventListener("click", () => {
  title.textContent = "Yippeeee!";
  catImg.src = "cat_dance.gif";

  for (let i = 0; i < 18; i++) {
    setTimeout(createHeart, i * 70);
  }

  buttons.style.display = "none";
  finalText.style.display = "block";
});

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = "💖";

  heart.style.left = Math.random()*100 + "vw";
  heart.style.top = Math.random()*80 + "vh";

  document.getElementById("firework-container").appendChild(heart);

  setTimeout(()=>heart.remove(), 1400);
}
