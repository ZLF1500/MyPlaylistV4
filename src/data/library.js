/* ------------------------------------------------------------------ */
/*  Data — same Spotify embeds as the original site                    */
/* ------------------------------------------------------------------ */
export const favoriteSongs = [
  "6J3pPfXLujwsWQpvR6XMgC", "1H2pPtoPS8kNlqCN7HfT6g", "7aux5UvnlBDYlrlwoczifW",
  "4e5kaIUjbskvGhpSXZdiA6", "0W0LK0oJEAU2cdYytd27gC", "2DMlu3yzDZkUXXBu8YpkkD",
  "6btL0nv4NlzIGHHQnGDlp5", "5wEy787VwmAnA7GGhEzjHR", "5oEoZdIrz0izZwqFCy6gDa",
  "4F2NudCv50tC2Bqc3dgn9v", "3fao1RoZVQPtkHY8upjezr", "0p5JKxO0pVynWVcWm3lMiP",
  "30C4LSxZHCWNtUjnZUxEoJ", "6W3beEMj18hHp1wDlqGcbt", "5jmPdv7WGoWm5KeRM1WIAf",
  "0QLoW4AZWUxHE1DfMmBwKz", "0OgBVLavb1pwjCQRvQCF30", "3JrQWFks5GS2rqorGYkkTD",
  "22sQUmLhT8umlEhQzDrzfJ", "5ZBs9dRavxKAS23WT1MwkQ", "3KLHSYHSmny4sJo2finqy9",
  "1AMzUKhF0vCFHZTx8H7OS4", "5pZVsZ8TOGly1KnYFmZ61B", "6zoNHckACUOGj2bERXgmnw",
  "0H1iMm1pO61srixV0rGYRe", "5dp3vri4d2JjeBsGriLFyW", "5ZNlX18DvNikcGOsAfoJbR",
  "3szBjRBhnc5Y645SQuvz22",
].map((id, i) => ({ id, kind: "track", tag: "favorite", num: String(i + 1).padStart(2, "0") }));

export const topSongs = [
  "37i9dQZEVXbObFQZ3JLcXt", "37i9dQZEVXbIZK8aUquyx8", "37i9dQZEVXbMDoHDwVN2tF",
  "37i9dQZEVXbNG2KDcFcKOF",
].map((id, i) => ({ id, kind: "playlist", tag: "top", num: String(i + 1).padStart(2, "0") }));

export const myPlaylists = ["53uX01Hogg89i23FEtJypM", "0uvAH64BPhj5viiLpb8gu6"]
  .map((id, i) => ({ id, kind: "playlist", tag: "playlist", num: String(i + 1).padStart(2, "0") }));

export const myArtists = ["6pNgnvzBa6Bthsv8SrZJYl", "4JX0GdKx8EduY2Ck7qac4H"]
  .map((id, i) => ({ id, kind: "artist", tag: "artist", num: String(i + 1).padStart(2, "0") }));

// TODO: ganti 2 ID placeholder di bawah dengan album ID Spotify kamu
// (buka album di Spotify -> ... -> Share -> Copy Spotify URI, ambil bagian setelah "album:")
export const myAlbums = [
  "1xhO0GSoezdPJcSuNe1ySv",
  "5uStDUB4nlmItpz2AYlFtd",
  "68w73FF3dYC6C3RWdcV0Yl",
  "6wBkzKouHawAr9e7lLxZLA",
].map((id, i) => ({ id, kind: "album", tag: "album", num: String(i + 1).padStart(2, "0") }));

// TODO: ganti 6 ID placeholder di bawah dengan playlist ID Daily Mix kamu
// (klik ... pada tiap Daily Mix di Spotify -> Share -> Copy Spotify URI, ambil bagian setelah "playlist:")
export const dailyMix = [
  "37i9dQZF1E37kjQBQCXm3z",
  "37i9dQZF1E354IJFXAhPL0",
  "37i9dQZF1E38sqpLFmypob",
  "37i9dQZF1E36PuovqOPSxU",
  "37i9dQZF1E3ahZ68dvHDya",
  "37i9dQZF1E37VYMVdWXoVx",
].map((id, i) => ({ id, kind: "playlist", tag: "dailymix", num: String(i + 1).padStart(2, "0") }));
