const cardsData = [
  { id: 1, img: "images/ani1.jpeg" },
  { id: 2, img: "images/ani2.jpeg" },
  { id: 3, img: "images/ani3.jpeg" },
  { id: 4, img: "images/ani4.jpeg" }
];

// Aynı kartlardan iki tane oluşturuyoruz ve karıştırıyoruz
let cards = [...cardsData, ...cardsData];
cards = cards.sort(() => Math.random() - 0.5);

const gameBoard = document.getElementById("game-board");
let flippedCards = [];
let matchedCards = 0;

function createCard(card) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.dataset.id = card.id;

  const front = document.createElement("div");
  front.classList.add("front");
  front.textContent = "?";

  const back = document.createElement("img");
  back.classList.add("back");
  back.src = card.img;
  back.style.display = "none";

  cardElement.appendChild(front);
  cardElement.appendChild(back);

  cardElement.addEventListener("click", () => {
    if (
      flippedCards.length < 2 &&
      !flippedCards.includes(cardElement) &&
      !cardElement.classList.contains("matched")
    ) {
      flipCard(cardElement);
    }
  });

  return cardElement;
}

function flipCard(cardElement) {
  flippedCards.push(cardElement);
  cardElement.classList.add("flipped");

  // Ön yüzü gizle, arka yüzü göster
  cardElement.querySelector(".front").style.display = "none";
  cardElement.querySelector(".back").style.display = "block";

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.id === card2.dataset.id) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedCards += 2;
    flippedCards = [];

    if (matchedCards === cards.length) {
      setTimeout(() => alert("Helal len sana"), 500);
    }
  } else {
    setTimeout(() => {
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        card.querySelector(".front").style.display = "block";
        card.querySelector(".back").style.display = "none";
      });
      flippedCards = [];
    }, 1000);
  }
}

function init() {
  gameBoard.innerHTML = "";
  cards.forEach((card) => {
    const cardElement = createCard(card);
    gameBoard.appendChild(cardElement);
  });
}

init();
