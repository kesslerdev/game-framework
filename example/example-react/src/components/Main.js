
window.addEventListener('keydown', (e) => {
  if (e.keyCode === 82 && e.ctrlKey && e.shiftKey) {
    localStorage.clear()
  }
})