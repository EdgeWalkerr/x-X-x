window.addEventListener('keydown', e => {
    const keyCode = e.keyCode;
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${keyCode}"]`);
    if (!audio) {
        return;
    }
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');
})

const keys = document.querySelectorAll('.key');
keys.forEach(key => {
    key.addEventListener('transitionend', e => {
        if (e.propertyName !== 'transform') {
            return;
        }
        e.target.classList.remove('playing')
    })
});