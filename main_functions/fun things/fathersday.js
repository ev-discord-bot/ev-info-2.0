(function() {
    var now = new Date();
    var thirdSunday = new Date(now.getFullYear(), 5, 15 + (21 - new Date(now.getFullYear(), 5, 1).getDay()) % 7);
    if (now.getMonth() === 5 && now.getDate() === thirdSunday.getDate()) { // Third Sunday in June
      (function frame() {
        confetti({
          particleCount: 1,
          startVelocity: 0,
          ticks: 100,
          origin: {
            x: Math.random(),
            y: Math.random() * 0.6 - 0.2
          },
          shapes: [confetti.shapeFromText('👔'), confetti.shapeFromText('🍻'), confetti.shapeFromText('🎉')],
          gravity: 0.5,
          scalar: 1.2,
          drift: randomInRange(-0.4, 0.4)
        });
        requestAnimationFrame(frame);
      }());
    }
  })();
  