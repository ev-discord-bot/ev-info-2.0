(function() {
    var now = new Date();
    var firstMonday = new Date(now.getFullYear(), 8, 1 + (8 - new Date(now.getFullYear(), 8, 1).getDay()) % 7);
    if (now.getMonth() === 8 && now.getDate() === firstMonday.getDate()) {
      (function frame() {
        confetti({
          particleCount: 1,
          startVelocity: 0,
          ticks: 100,
          origin: {
            x: Math.random(),
            y: Math.random() * 0.6 - 0.2
          },
          shapes: [confetti.shapeFromText('⚒️'), confetti.shapeFromText('🛠️'), confetti.shapeFromText('🎉')],
          gravity: 0.5,
          scalar: 1.2,
          drift: randomInRange(-0.4, 0.4)
        });
        requestAnimationFrame(frame);
      }());
    }
  })();
  