var count = 200;
var cooldown = 5000;
var lastFired = 0;
var scalar = 5;

// Create different text shapes with custom sizes and colors
var samsung = confetti.shapeFromText({
    text: 'Samsung Type Ultra!!?!?',
    scalar,
    color: 'white'
});
var utlra = confetti.shapeFromText({
    text: 'Its ultra!?',
    scalar,
    color: 'white'
});
var megatron = confetti.shapeFromText({
    text: 'Megatron!?!?',
    scalar,
    color: 'white'
});
var wow = confetti.shapeFromText({
    text: '😮🤳',
    scalar,
});

function getButtonPosition(button) {
    var rect = button.getBoundingClientRect();
    return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
    };
}

function fire() {
    var div = document.getElementById('celebrate');
    var position = getButtonPosition(div);

    confetti({
        shapes: [samsung],
        particleCount: Math.floor(count * 0.25),
        spread: 70,
        origin: {
            x: position.x / window.innerWidth,
            y: position.y / window.innerHeight
        }
    });

    confetti({
        shapes: [utlra],
        particleCount: Math.floor(count * 0.2),
        spread: 75,
        origin: {
            x: position.x / window.innerWidth,
            y: position.y / window.innerHeight
        }
    });

    confetti({
        shapes: [megatron],
        particleCount: Math.floor(count * 0.2),
        spread: 75,
        origin: {
            x: position.x / window.innerWidth,
            y: position.y / window.innerHeight
        }
    });

    confetti({
        shapes: [wow],
        particleCount: Math.floor(count * 0.35),
        spread: 100,
        scalar: 0.8,
        origin: {
            x: position.x / window.innerWidth,
            y: position.y / window.innerHeight
        }
    });

    confetti({
        particleCount: 100,
        spread: 70,
        origin: {
            x: position.x / window.innerWidth,
            y: position.y / window.innerHeight
        }
      });

    };


function handleMouseOver() {
    var now = Date.now();
    if (now - lastFired > cooldown) {
        lastFired = now;
        fire();
    }
}
