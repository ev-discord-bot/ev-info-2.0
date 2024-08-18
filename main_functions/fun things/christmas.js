var duration = 15 * 1000;
var animationEnd;
var skew = 1;

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function startChristmasEvent() {
  animationEnd = Date.now() + duration;
  skew = 1; // Reset skew for new event

  (function frame() {
    var timeLeft = animationEnd - Date.now();
    var ticks = Math.max(200, 500 * (timeLeft / duration));
    skew = Math.max(0.8, skew - 0.001);

    confetti({
      particleCount: 1,
      startVelocity: 0,
      ticks: ticks,
      origin: {
        x: Math.random(),
        y: (Math.random() * skew) - 0.2
      },
      colors: ['#ffffff'],
      shapes: ['circle'],
      gravity: randomInRange(0.4, 0.6),
      scalar: randomInRange(2.5, 2.5),
      drift: randomInRange(-0.4, 0.4)
    });

    if (timeLeft > 0) {
      requestAnimationFrame(frame);
    }
  }());
}

function checkChristmasEvent() {
  var now = new Date();
  if (now.getMonth() === 11) { // 11 is December (0-based index)
    startChristmasEvent();
  }
}

// Run the check function initially
checkChristmasEvent();

// Optionally, you can set an interval to check periodically
setInterval(checkChristmasEvent, 60000); // Check every minute
