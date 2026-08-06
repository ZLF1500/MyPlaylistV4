/*
  stickerSlots — scattered decorative slots for YOUR OWN sticker files.
  Save your cropped PNGs into /public/assets using the names below (matched
  to each pose's mood/size).
*/
export const stickerSlots = [
  // hearts + leek — most "iconic" pose, gets prime real-estate near the hero title
  { file: "miku-hearts-leek.png", top: "10%",  left: "68%", size: 130, rot: -6 },
  // shy / teary close-up — small, peeking near a section header
  { file: "miku-shy.png",          top: "20%", left: "90%", size: 85,  rot: 9 },
  // eating lemon — playful, tucked low near the stat cards
  { file: "miku-lemon.png",        top: "44%", left: "16%",  size: 100, rot: 8 },
  // hugging plush — cozy, sits mid-page near the featured section
  { file: "miku-hug-plush.png",    top: "58%", left: "78%", size: 115, rot: -10 },
  // covering face, big floppy twintails — the biggest/boldest one, anchors lower area
  { file: "miku-shy-bigpose.png",  top: "76%", left: "32%", size: 145, rot: 6 },
  // sleepy sitting pose — relaxed, good near the footer
  { file: "miku-sleepy.png",       top: "80%", left: "84%", size: 100, rot: -7 },
];
