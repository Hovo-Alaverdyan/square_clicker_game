const $time = document.querySelector('.app .header #time');
const $result = document.querySelector('.app .header #result');
const $game = document.querySelector('.app .main #game');
const $start = document.querySelector('.app .main #start');
const $changeTime = document.querySelector('.app .footer #changeTime');

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'brown', 'black', 'gray'];
let score = 0;


//event
$start.addEventListener('click', chlickGameFunc);
$changeTime.addEventListener('change', changeGameFunc);
$game.addEventListener('click', clickGameFunc);


//func
function chlickGameFunc(e) {
    score = 0;
    $result.textContent = score
    hide($start);
    $game.style.backgroundColor = 'white';
    $changeTime.setAttribute('disabled', 'true');


    const interval = setInterval(function () {

        let time = +$time.textContent;

        if (time === 0) {
            clearInterval(interval);
            endGameFunc();
        }
        else {
            $time.textContent = (time - 0.1).toFixed(1);
        }



    }, 100);
    randerBox();
}

function endGameFunc() {
    show($start);
    $game.style.backgroundColor = 'blue';
    $changeTime.removeAttribute('disabled');
    $time.textContent = (+$changeTime.value).toFixed(1);
    $game.textContent = '';
}


function changeGameFunc(e) {
    $time.textContent = (+$changeTime.value).toFixed(1);
}


function randerBox() {

    $game.textContent = '';

    const size = random(30, 100);
    const colorIndex = random(0, colors.length - 1);

    const gameSize = $game.getBoundingClientRect();
    const left = random(0, gameSize.width - size - 5);
    const top = random(0, gameSize.height - size - 5);

    const box = document.createElement('div');
    box.style.width = box.style.height = size + 'px';
    box.style.backgroundColor = colors[colorIndex];
    box.style.position = 'absolute';
    box.style.cursor = 'pointer';
    box.style.top = top + 'px';
    box.style.left = left + 'px';
    box.setAttribute('data-box', 'true');

    $game.append(box);

}

function clickGameFunc(e) {
    if (e.target.dataset.box) {
        score++;
        $result.textContent = score;
        randerBox();
    }
}










//help
function hide($el) {
    $el.classList.add('hide');
}

function show($el) {
    $el.classList.remove('hide');
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}