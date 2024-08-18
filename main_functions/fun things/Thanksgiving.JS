(function() {
    var now = new Date();
    var fourthThursday = new Date(now.getFullYear(), 10, 22 + (11 - new Date(now.getFullYear(), 10, 1).getDay()) % 7);
    if (now.getMonth() === 10 && now.getDate() === fourthThursday.getDate()) {
      (function frame() {
        confetti({
          particleCount: 1,
          startVelocity: 0,
          ticks: 100,
          origin: {
            x: Math.random(),
            y: Math.random() * 0.6 - 0.2
          },
          shapes: [confetti.shapeFromText('🦃'), confetti.shapeFromText('🍂'), confetti.shapeFromText('🥧')],
          gravity: 0.5,
          scalar: 1.2,
          drift: randomInRange(-0.4, 0.4)
        });
        requestAnimationFrame(frame);
      }());
    }
  })();
