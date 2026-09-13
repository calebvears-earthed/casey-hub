// Tiny haptic + native feedback helper. Safe on desktop / iOS (no-ops there).
export function tap() {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(15);
  }
}
export function pop() {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate([10, 40, 10]);
  }
}
