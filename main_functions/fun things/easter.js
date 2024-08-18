(function() {
    var now = new Date();
    if (now.getMonth() === 3 && now.getDate() === 9) {
      var skew = 1;
      var emoji1 = confetti.shapeFromText({
        text: '🐰',
        scalar: 10
      });
      var emoji2 = confetti.shapeFromText({
        text: '🥚',
        scalar: 10
      });
      var emoji3 = confetti.shapeFromText({
        text: '🌸',
        scalar: 10
      });
  
      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }
  
      (function frame() {
        skew = Math.max(0.8, skew - 0.001);
        confetti({
          particleCount: 1,
          startVelocity: 0,
          ticks: 100,
          origin: {
            x: Math.random(),
            y: (Math.random() * skew) - 0.2
          },
          shapes: [emoji1, emoji2, emoji3],
          gravity: randomInRange(0.4, 0.6),
          scalar: randomInRange(2.5, 2.5),
          drift: randomInRange(-0.4, 0.4)
        });
        requestAnimationFrame(frame);
      }());
    }
  })();