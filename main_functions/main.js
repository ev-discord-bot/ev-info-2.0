let icon = {
    danger: '<i class="fa-solid fa-circle-exclamation"></i>'
};

const showToast = (message = "Sample Message", toastType = "info", duration = 5000) => {
    if (!Object.keys(icon).includes(toastType)) toastType = "info";

    let box = document.createElement("div");
    box.classList.add("toast", "text-neutral", "backdrop-brightness-50", `toast-${toastType}`, "p-6", "rounded-lg", "shadow-lg", "shadow-primary");
    box.innerHTML = `<div class="flex justify-between items-center"><div class="toast-icon p-1">${icon[toastType]}</div><div class="toast-message flex-1 p-2">${message}</div><div class="toast-progress h-1"></div></div>`;
    duration = duration || 5000;
    box.querySelector(".toast-progress").style.animationDuration = `${duration / 5000}m`;

    let toastAlready = document.body.querySelector(".toast");
    if (toastAlready) {
        toastAlready.remove();
    }

    document.body.appendChild(box)
};

var isAudioPlaying = false;

function playAudio() {
    if (!isAudioPlaying) {
        var audioUrl = "https://github.com/ev-discord-bot/ev-info/raw/main/src/the_music.mp3";
        var audioElement = new Audio(audioUrl);
        audioElement.play();
        isAudioPlaying = true;
        document.querySelector('.scrolling-text').style.pointerEvents = 'none';
        audioElement.addEventListener('ended', function () {
            audioElement.pause();
            document.querySelector('.scrolling-text').style.pointerEvents = 'auto';
        });
        document.querySelector('#logo-image').addEventListener('click', function () {
            isAudioPlaying = false;
        });
    }
}

function openNav() { document.getElementById("myNav").style.height = "100%"; }
function closeNav() { document.getElementById("myNav").style.height = "0%"; }


function hoverIcon(element) { element.querySelector('i').classList.add('fa-shake'); }
function resetIcon(element) { element.querySelector('i').classList.remove('fa-shake'); }
function PlayButton() { var audio = new Audio('img/button_click.mp3'); audio.volume = 0.05; audio.play(); }



// Select all elements with the 'scroll-container' ID
const containers = document.querySelectorAll('#scroll-container');

containers.forEach(container => {
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
        isDown = true;
        container.classList.add('cursor-grabbing');
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.classList.remove('cursor-grabbing');
    });

    container.addEventListener('mouseup', () => {
        isDown = false;
        container.classList.remove('cursor-grabbing');
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 1.5;
        container.scrollLeft = scrollLeft - walk;
    });
});
