const d = document,
$cardsContainer = d.getElementById('container'),
$fragment = d.createDocumentFragment(),
$cardTemplate = d.getElementById('card-template').content,
$backgrounds = d.querySelectorAll('.fondo'),
$sign = d.querySelector('.container-sign'),
$btnSign = d.querySelector('.sign-btn');

console.log($sign)
console.log($btnSign)

let firstClick = false;
let firstCard, secondCard;
let animationBlocked = false;
const availablePlayers = ['cuti', 'depaul', 'dibu', 'dimaria', 'julian', 'messi', 'ota', 'paredes', 'acunia'];
let goals = 0;
let wallpaperId = 0;
const playersList = [ ...availablePlayers , ...availablePlayers];
const totalPlayers = playersList.length;

$btnSign.addEventListener('click', ()=> $sign.classList.remove('show'))

function updateBackground(){
    const $activeSlide = d.querySelector('[data-active]');
    let newIndex = [...$backgrounds].indexOf($activeSlide) + 1;

    if(newIndex >= $backgrounds.length) newIndex = 0;

    $backgrounds[newIndex].dataset.active = true;
    delete $activeSlide.dataset.active;

}

function checkForMatch(){
    let isMatch = firstCard.dataset.player === secondCard.dataset.player;
    isMatch ? disableCards() : unshowCards()
}

function disableCards(){
    firstCard.removeEventListener('click', showCard);
    secondCard.removeEventListener('click', showCard);

    console.log('Antes', goals);
    goals++;
    console.log('Despues', goals);


    resetBoard();

    if(goals == availablePlayers.length) {
        console.log('GANASTE')
        setTimeout(()=>{
            $sign.classList.add('show');
            confetti.start();
        }, 1000)
    }
}

function unshowCards(){
    animationBlocked = true;

    setTimeout(() => {
        firstCard.classList.remove('show');
        secondCard.classList.remove('show');

        resetBoard();
     }, 800);
}

function resetBoard(){
    firstClick = false;
    animationBlocked = false;
    firstCard = null;
    secondCard = null;
}

function showCard(e){
    console.log(this)

    if(animationBlocked) return;
    if(this == firstCard) return;

    this.classList.toggle('show');

    if(!firstClick){
        firstClick = true;
        firstCard = this;
        return;
    }

    //Second Click
    secondCard = this;
        
    checkForMatch();
}

function buildCard(name){
    $cardTemplate.querySelector('.card').dataset.player = name;
    $cardTemplate.querySelector('.card__front').src = `./imgs/copa-sm.png`;
    $cardTemplate.querySelector('.card__front').alt = 'copa del mundo';
    $cardTemplate.querySelector('.card__back').src = `./imgs/${name}-sm.png`;
    $cardTemplate.querySelector('.card__back').alt = name;
    let $clone = $cardTemplate.cloneNode(true);
    return $clone;
}

function initializeCards(){
    for (let i = 0; i < totalPlayers; i++) {
        const randomIndex = Math.floor(Math.random()*playersList.length);
        const player = playersList[randomIndex];
        const $card = buildCard(player);

        playersList.splice(randomIndex, 1);

        $fragment.appendChild($card);
    }

    $cardsContainer.appendChild($fragment);
    const $cards = d.querySelectorAll('.card');
    $cards.forEach($card => {
        $card.addEventListener('click', showCard)
    })
}


setInterval(()=>{
    updateBackground()
}, 5000);

initializeCards();

