// ===== Elements =====
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");

const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".yes-btn");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");



const meow = document.getElementById("meow") || {
    play: () => console.log("meow 없음"),
    currentTime: 0
  };
  
const bubble = document.getElementById("bubble");

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

// ===== NO 버튼 멘트 =====
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

// ===== 말풍선 =====
function showBubble(text) {
    const bubble = document.getElementById("bubble");
  
    // 👉 말풍선 없으면 그냥 무시
    if (!bubble) {
      console.log("bubble 없음:", text);
      return;
    }
  
    bubble.textContent = text;
    bubble.classList.remove("hidden");
  
    setTimeout(() => {
      bubble.classList.add("hidden");
    }, 2000);
  }
  

// ===== 위치 랜덤 =====
function randomPos() {
  return {
    x: Math.random() * 86 + 7,
    y: Math.random() * 76 + 10
  };
}

// ===== 💖 하트 폭죽 =====
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = "💖";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.top = Math.random() * 80 + "vh";

  document.getElementById("firework-container").appendChild(heart);

  setTimeout(() => heart.remove(), 1400);
}

// =================================================
// 🐱 상하이 잡기 게임 핵심 로직
// =================================================

let caught = 0;
const NEED = 5;
let gameStarted = false;

yesBtn.addEventListener("click", () => {
  if (gameStarted) return;

  gameStarted = true;
  caught = 0;

  showBubble("상하이 히주이 5마리 잡아죠 💕");

  for (let i = 0; i < NEED; i++) {
    createCatchHeart(i);
  }
});

function createCatchHeart(index) {
  const heart = document.createElement("div");
  heart.className = "catch-heart";

  // 마지막 한 마리는 왕상하이 👑
  if (index === NEED - 1) {
    heart.classList.add("boss");
  }

  let pos = randomPos();
  heart.style.left = pos.x + "vw";
  heart.style.top = pos.y + "vh";

  heart.addEventListener("mouseenter", () => {

    // 초반엔 느리게, 마지막에만 조금 빠르게
    const delay = 350 - caught * 40;   // 350 → 190 정도
  
    setTimeout(() => {
      // 👉 지금 위치 기준 "근처로만" 도망
      const currentX = parseFloat(heart.style.left);
      const currentY = parseFloat(heart.style.top);
  
      const moveX = (Math.random() * 20 - 10); // -10 ~ 10vw
      const moveY = (Math.random() * 20 - 10); // -10 ~ 10vh
  
      let newX = currentX + moveX;
      let newY = currentY + moveY;
  
      // 화면 밖 못 나가게 보호
      newX = Math.min(90, Math.max(5, newX));
      newY = Math.min(85, Math.max(10, newY));
  
      heart.style.left = newX + "vw";
      heart.style.top = newY + "vh";
  
    }, Math.max(delay, 180));
  });
  

  // 👉 클릭 = 잡기!
  heart.addEventListener("click", (e) => {
    e.stopPropagation();


    
    // 냥소리
    if (meow && meow.play) {
        meow.currentTime = 0;
        meow.play();
      }
      

    heart.remove();
    caught++;

    const texts = [
      "잡았다!",
      "히히 💖",
      "체고야!",
      "거의 다 왔다!",
      "왕건이 겟!"
    ];

    showBubble(texts[Math.min(caught - 1, 4)]);

    // 🎯 5마리 다 잡으면 → 진짜 엔딩
    if (caught >= NEED) {
      setTimeout(() => {
        showBubble("다 잡았다! YES 열림 💝");
        openFinal();
      }, 500);
    }
  });

  document.body.appendChild(heart);
}

// =================================================
// 🎀 진짜 YES 엔딩
// =================================================
function openFinal() {
    title.textContent = "꺄아아앙 짜기 알라부 미션 컴플리또 💖";
  
    // 기존 고양이는 숨기기 (안전!)
    catImg.style.display = "none";
  
    // 1. 컨테이너
    const wrap = document.createElement("div");
    wrap.style.display = "flex";
    wrap.style.alignItems = "center";
    wrap.style.justifyContent = "center";
    wrap.style.gap = "8px";
    wrap.style.margin = "6px 0";
  
    // 2. 왼쪽 고양이
    const leftCat = document.createElement("img");
    leftCat.src = "cat_dance.gif";
    leftCat.className = "cat";
  
    // 3. 가운데 delicious
    const mid = document.createElement("img");
    mid.src = "delicious.png";
    mid.style.width = "100px";
  
    // 4. 오른쪽 고양이 (좌우반전)
    const rightCat = document.createElement("img");
    rightCat.src = "cat_dance.gif";
    rightCat.className = "cat";
    rightCat.style.transform = "scaleX(-1)";
  
    // 5. 조립
    wrap.appendChild(leftCat);
    wrap.appendChild(mid);
    wrap.appendChild(rightCat);
  
    // 👉 letter-window 안에 그냥 추가!
    document.querySelector(".letter-window").appendChild(wrap);
  
    // 💖 폭죽
    for (let i = 0; i < 18; i++) {
      setTimeout(createHeart, i * 70);
    }
  
    document.querySelector(".letter-window").classList.add("final");
  
    buttons.style.display = "none";
    finalText.style.display = "block";
  }
  