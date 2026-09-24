// The one-line product teaser shown on product cards and at the top of a
// product page: the first sentence of the first descriptive (non-heading) line.
//
// It used to be `text.split(/[.;]/)[0].slice(0, 70)`, which cut words in half
// ("…из пружинной проволоки, с") and broke on decimals ("нейлона 6.6" → "6").
// Now the whole first sentence is kept; only very long sentences are shortened,
// at a word boundary and with an ellipsis. The card clamps it visually.
const LETTERS = /[A-Za-zÀ-žА-Яа-яЁё]/;
const MAX = 200;

export function makeNote(lines) {
  const src = (lines ?? []).find((l) => !l.heading && LETTERS.test(l.text));
  if (!src) return "";
  const text = src.text.replace(/\s+/g, " ").trim();
  // A sentence ends at . ! ? ; followed by whitespace and a capital letter,
  // digit or opening quote — so "6.6", "т.ч." and "0,5 mm." mid-line don't end it.
  const m = text.match(/^.+?[.!?;](?=\s+["«„“(]?[A-ZÀ-ÞĄČĘĖĮŠŲŪŽА-ЯЁ0-9])/u);
  let note = (m ? m[0] : text).trim().replace(/;$/, ".");
  if (note.length > MAX) {
    const cut = note.slice(0, MAX);
    note = cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:–—-]+$/, "") + "…";
  }
  return note;
}
