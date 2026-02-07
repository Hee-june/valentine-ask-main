// ===== Elements =====
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");

const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// ===== 봉투 클릭 =====
envelope.addEventListener("click", () => {
  envelope.style.display = "none";
  letter.style.display = "flex";

  setTimeout(() => {
    document.querySelector(".letter-window").classList.add("open");
  }, 50);
});

// ===== NO 버튼 도망 =====
noBtn.addEventListener("mouseover", () => {
  const distance = 200;
  const angle = Math.random() * Math.PI * 2;

  const moveX = Math.cos(angle) * distance;
  const moveY = Math.sin(angle) * distance;

  noBtn.style.transition = "transform 0.3s ease";
  noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// ===== 💔 NO 버튼 멘트 =====
const noTexts = [
  "엥 무야?",
  "잘못 누른 거지?ㅡㅡ",
  "손 미끄러졌지?",
  "다시 눌러뱌 😏",
  "초코압수",
  "YES만 남아땨!"
];

let noCount = 0;

noBtn.addEventListener("click", () => {
  if (noCount < noTexts.length) {
    title.textContent = noTexts[noCount];
    noCount++;

    const scale = 1 + noCount * 0.15;
    yesBtn.style.transform = `scale(${scale})`;
  }

  if (noCount === noTexts.length) {
    noBtn.style.display = "none";
  }
});

// ===== 💖 하트 폭죽 함수 =====
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = "💖";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.top = Math.random() * 80 + "vh";

  document.getElementById("firework-container").appendChild(heart);

  setTimeout(() => heart.remove(), 1400);
}


// ===== 🐱 YES → 상하이 잡기 미션 =====
const meow = document.getElementById('meow');

let catchMode = false;
let caught = 0;
const NEED = 5;

yesBtn.addEventListener("click", () => {
  if (catchMode) return;

  catchMode = true;
  caught = 0;

  alert("상하이히주이 5마리를 잡아주세요 ฅ^•ﻌ•^ฅ");

  for (let i = 0; i < NEED; i++) {
    createCatchHeart();
  }
});

function randomPos() {
  return {
    x: Math.random() * 88 + 5,
    y: Math.random() * 80 + 5
  };
}

function createCatchHeart() {
  const heart = document.createElement("div");
  heart.className = "catch-heart";

  let pos = randomPos();
  heart.style.left = pos.x + "vw";
  heart.style.top = pos.y + "vh";

  // 도망!
  heart.addEventListener("mouseenter", () => {
    const run = randomPos();
    heart.style.left = run.x + "vw";
    heart.style.top = run.y + "vh";
  });

  heart.addEventListener("click", (e) => {
    e.stopPropagation();

    // 냥소리
    meow.currentTime = 0;
    meow.play();

    heart.remove();
    caught++;

    if (caught >= NEED) {
      openFinal();
    }
  });

  document.body.appendChild(heart);
}

function openFinal() {
  // 기존 엔딩 로직 그대로 재사용 💖
  title.textContent = "꺄아아앙 ㅉ ㅏ기 알라부 이예이예잉!";
  catImg.src = "cat_dance.gif";

  for (let i = 0; i < 18; i++) {
    setTimeout(createHeart, i * 70);
  }

  document.querySelector(".letter-window").classList.add("final");

  buttons.style.display = "none";
  finalText.style.display = "block";
}
