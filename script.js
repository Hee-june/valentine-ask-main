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
// ===== 🐱 러블리 게임맛 상하이 =====
const meow = document.getElementById('meow');
const counter = document.getElementById('counter');
const bubble = document.getElementById('bubble');

let catchMode = false;
let caught = 0;
const NEED = 5;

yesBtn.addEventListener("click", () => {
  if (catchMode) return;

  catchMode = true;
  caught = 0;
  updateCounter();

  showBubble("상하이 잡기 시작! 💖");

  for (let i = 0; i < NEED; i++) {
    createCatchHeart(i);
  }
});

function updateCounter() {
  counter.textContent = `상하이: ${caught} / ${NEED}`;
}

function showBubble(text) {
  bubble.textContent = text;
  bubble.classList.remove("hidden");

  setTimeout(() => {
    bubble.classList.add("hidden");
  }, 900);
}

function randomPos() {
  return {
    x: Math.random() * 86 + 7,
    y: Math.random() * 76 + 10
  };
}

function createCatchHeart(index) {
  const heart = document.createElement("div");
  heart.className = "catch-heart";

  // 마지막 한 마리는 왕상하이 👑
  if (index === 4) {
    heart.classList.add("boss");
  }

  let pos = randomPos();
  heart.style.left = pos.x + "vw";
  heart.style.top = pos.y + "vh";

  // 잡을수록 빨라짐 💨
  heart.addEventListener("mouseenter", () => {
    const speed = 160 - caught * 22;

    setTimeout(() => {
      const run = randomPos();
      heart.style.left = run.x + "vw";
      heart.style.top = run.y + "vh";
    }, Math.max(speed, 60));
  });

  heart.addEventListener("click", (e) => {
    e.stopPropagation();

    // 냥소리
    meow.currentTime = 0;
    meow.play();

    // 말풍선 멘트
    const texts = [
      "잡았다!",
      "히히",
      "체고 💕",
      "거의 다 왔다!",
      "왕왕큰애 겟!"
    ];

    showBubble(texts[Math.min(caught, 4)]);

    heart.remove();
    caught++;
    updateCounter();

    if (caught >= NEED) {
      setTimeout(() => {
        showBubble("다 잡았다! 💝");
        openFinal();
      }, 400);
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
