import './app.scss';


let hh = 0;
let mm = 0;
let ss = 0;

let cron;


function start() {
  cron = setInterval(() => { timer(); }, 1000);
}

document.querySelector('.bg-green').addEventListener('click', function(){
  start();
})

function pause() {
  clearInterval(cron);
}

function stop() {

  clearInterval(cron);

  hh = 0;
  mm = 0;
  ss = 0;
}

function timer() {
    ss++;

    if (ss == 59) {
        ss = 0;
        mm++;

        if (mm == 59) {
            mm = 0;
            hh++;
        }
    }


    let format = (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);


    document.getElementById('counter').innerText = format;

    return format;
}

document.querySelector('.bg-red').addEventListener('click', function() {

  const valor = document.getElementById('counter');

  const elementList = document.createElement('li');
  elementList.classList.add('ulElement__item');

  let ulElement = document.querySelector('.ulElement');

  ulElement.appendChild(elementList)

  elementList.textContent = valor.innerHTML;

  document.getElementById('counter').innerText = '00:00:00';

})
