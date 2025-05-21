const container = document.getElementById("puzzleContainer");
const size = 4;
const totalPieces = size * size;
let pieces = [];

function createPuzzle() {
  for (let i = 0; i < totalPieces; i++) {
    const piece = document.createElement("div");
    piece.classList.add("piece");
    piece.draggable = true;
    const x = i % size;
    const y = Math.floor(i / size);
    piece.style.backgroundPosition = `-${x * 100}px -${y * 100}px`;
    piece.dataset.index = i;
    pieces.push(piece);
  }

  shuffleAndRender();
}

function shuffleAndRender() {
  const shuffled = [...pieces].sort(() => Math.random() - 0.5);
  container.innerHTML = "";
  shuffled.forEach((piece, index) => {
    piece.dataset.current = index;
    container.appendChild(piece);
  });

  enableDragDrop();
}

function enableDragDrop() {
  let dragged;

  document.querySelectorAll(".piece").forEach(piece => {
    piece.addEventListener("dragstart", e => {
      dragged = piece;
    });

    piece.addEventListener("dragover", e => {
      e.preventDefault();
    });

    piece.addEventListener("drop", e => {
      e.preventDefault();
      const target = e.target;
      if (target && target.classList.contains("piece")) {
        const draggedIndex = [...container.children].indexOf(dragged);
        const targetIndex = [...container.children].indexOf(target);

        if (draggedIndex !== -1 && targetIndex !== -1) {
          container.insertBefore(dragged, container.children[targetIndex]);
          if (draggedIndex < targetIndex) {
            container.insertBefore(target, container.children[draggedIndex]);
          } else {
            container.insertBefore(target, container.children[draggedIndex + 1]);
          }

          checkIfSolved();
        }
      }
    });
  });
}

function checkIfSolved() {
  const currentOrder = [...container.children].map(child => child.dataset.index);
  const correctOrder = [...Array(totalPieces).keys()].map(i => i.toString());
  if (JSON.stringify(currentOrder) === JSON.stringify(correctOrder)) {
    document.getElementById("successMessage").classList.remove("hidden");
  }
}

createPuzzle();
