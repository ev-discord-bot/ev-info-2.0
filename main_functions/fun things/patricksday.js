(function() {
    var now = new Date();
    if (now.getMonth() === 2 && now.getDate() === 17) {
      (function frame() {
        confetti({
          particleCount: 1,
          startVelocity: 0,
          ticks: 100,
          origin: {
            x: Math.random(),
            y: Math.random() * 0.6 - 0.2
          },
          shapes: [confetti.shapeFromText('🍀'), confetti.shapeFromText('🍻'), confetti.shapeFromText('🌈')],
          gravity: 0.5,
          scalar: 2,
          drift: randomInRange(-0.4, 0.4)
        });
        requestAnimationFrame(frame);
      }());
    }
  })();
  