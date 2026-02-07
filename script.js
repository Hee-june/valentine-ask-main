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

// ===== YES 클릭 (최종 통합) =====
yesBtn.addEventListener("click", () => {

  // 1. 텍스트 변경
  title.textContent = "Yippeeee!";

  // 2. 고양이 변경
  catImg.src = "cat_dance.gif";

  // 3. 폭죽 효과
  for (let i = 0; i < 18; i++) {
    setTimeout(createHeart, i * 70);
  }

  // 4. 화면 마무리
  document.querySelector(".letter-window").classList.add("final");

  buttons.style.display = "none";
  finalText.style.display = "block";
});
