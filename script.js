const letters = {
  miss: {
    title: "Open when you miss me ♡",
    text: "Hi, love. I wish I could be beside you right now, even just for a little while. Since I can't give you a hug through the screen, I hope this letter can remind you that you're on my mind. Take care of yourself for me, okay? One day at a time. 💗"
  },
  tired: {
    title: "Open when you're tired 🌷",
    text: "Hey, baby. You don't have to do everything perfectly, and you don't have to be okay every second. Rest when you need to. I'm proud of you for getting through today, even if it felt ordinary or difficult. Please be gentle with yourself."
  },
  sad: {
    title: "Open when you're sad 🧸",
    text: "I might not always know the perfect thing to say, but I want you to know that your feelings matter to me. You don't have to explain everything if you don't feel like it. I can listen, stay with you, or give you space — whatever helps you most. ♡"
  },
  smile: {
    title: "Open when you need a smile 🎀",
    text: "Tiny reminder: somewhere, there's someone who feels lucky to know you. That someone is me. I hope something kind happens to you today, and if not, I hope this little note gives you at least one small reason to smile."
  }
};

document.querySelectorAll(".letter-card").forEach((card) => {
  card.addEventListener("click", () => {
    const letter = letters[card.dataset.letter];
    document.getElementById("letterTitle").textContent = letter.title;
    document.getElementById("letterText").textContent = letter.text;
    document.getElementById("letterPaper").hidden = false;
    document.getElementById("letterPaper").scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
});

document.getElementById("closeLetter").addEventListener("click", () => {
  document.getElementById("letterPaper").hidden = true;
});

document.getElementById("surpriseBtn").addEventListener("click", () => {
  const message = document.getElementById("surpriseMessage");
  message.hidden = !message.hidden;
  document.getElementById("surpriseBtn").textContent = message.hidden
    ? "Open your little world ♡"
    : "A little message for you ♡";
});

const notes = [
  "I hope something makes you smile today. ♡",
  "You don't have to be loud to be loved.",
  "Just checking in: have you had some water, love? 🎀",
  "I'm glad our paths crossed.",
  "You make ordinary conversations feel special.",
  "Please remember to be kind to yourself today.",
  "If I could, I'd send you the coziest hug right now. 🧸",
  "No pressure to say anything big. I'm happy just getting to know you.",
  "One little note to say: I'm thinking of you. 💗",
  "I hope your day is as gentle as you deserve."
];

let lastNoteIndex = -1;
let noteCount = 0;

document.getElementById("noteBtn").addEventListener("click", () => {
  let index = Math.floor(Math.random() * notes.length);
  if (notes.length > 1 && index === lastNoteIndex) index = (index + 1) % notes.length;
  lastNoteIndex = index;
  noteCount += 1;
  document.getElementById("loveNote").textContent = notes[index];
  document.getElementById("noteCount").textContent = `You picked ${noteCount} little ${noteCount === 1 ? "note" : "notes"} ♡`;
});
