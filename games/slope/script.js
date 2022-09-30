let quickHideEnabled = true;
document.addEventListener('keydown', function(event) {
console.log(event)
if((event.key == "q" || event.key == "Q") && event.altKey) {
  event.preventDefault();
  quickHideEnabled = !quickHideEnabled
} else if ((event.key == "q" || event.key == "Q") && quickHideEnabled == true) {
  document.write()
  window.location = "https://hub.infomentor.se"
}
})
if((event.key == "j" || event.key == "J") && event.altKey) {
  var fps = 5;
  function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    console.log(startTime);
    animate();
}
} 



