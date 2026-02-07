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

// ===== 1단계 하트 =====
let heart = 0;

function spawnHearts() {
  for (let i = 0; i < 5; i++) {
    const h = document.createElement("div");
    h.textContent = "💖";
    h.className = "find-heart";

    // 모바일이라 중앙 위주 배치
    h.style.left = 10 + Math.random() * 70 + "%";
    h.style.top = 20 + Math.random() * 50 + "%";

    h.addEventListener("click", () => {
      h.remove();
      heart++;
      document.getElementById("heart-count").textContent = heart;

      if (heart >= 5) goStep2();
    });

    document.querySelector(".letter-window").appendChild(h);
  }
}

function goStep2() {
  title.textContent = "퀴즈 타임 💌";
  document.getElementById("step1").style.display = "none";
  document.getElementById("step2").style.display = "block";
}

// ===== 퀴즈 =====
document.querySelectorAll(".quiz").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("correct")) {
      goStep3();
    } else {
      btn.textContent = "다시!"
    }
  });
});

function goStep3() {
  title.textContent = "마지막 단계 ✨";
  document.getElementById("step2").style.display = "none";
  document.getElementById("step3").style.display = "block";
}

// ===== 사랑해 =====
let wordStep = 0;

document.querySelectorAll(".word").forEach((btn, i) => {
  btn.addEventListener("click", () => {
    if (i === wordStep) {
      btn.style.background = "#ffc0cb";
      wordStep++;

      if (wordStep >= 3) finishGame();
    }
  });
});

// ===== 성공 =====
function finishGame() {
  title.textContent = "이제 선택해줘 💗";
  document.getElementById("game-area").style.display = "none";
  buttons.style.display = "flex";
}

// ===== NO 도망 (약하게) =====
noBtn.addEventListener("touchstart", () => {
  const d = 40;   // 모바일은 약하게!
  const a = Math.random() * Math.PI * 2;

  noBtn.style.transform =
    `translate(${Math.cos(a)*d}px, ${Math.sin(a)*d}px)`;
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

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.top = Math.random() * 80 + "vh";

  document.getElementById("firework-container").appendChild(heart);

  setTimeout(() => heart.remove(), 1400);
}
