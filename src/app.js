import './app.scss';
import "babel-polyfill";

async function getTimes() {
  try{
    const response = await fetch('http://localhost:3000/times/')

    const data = await response.json()

    // showTimes(data)

  } catch (error) {

    console.log(error);
  }
}

getTimes();

function showTimes(times){

  let outputTimes = '';

  for(let time of times){
    outputTimes += `<li class="myTime__times-item">${time.time} <span>${time.description}</span><li>`
  }

  document.querySelector('.ulElement').innerHTML = outputTimes;
}

showTimes([    {
  "id": 1,
  "time": "05:10:50",
  "description": null
},
{
  "id": 6,
  "time": "05:10:50",
  "description": "Descrição da task Descrição da task"
},
{
  "id": 7,
  "time": "05:10:50",
  "description": "Descrição da task Descrição da task"
}])


let hh = 0;
let mm = 0;
let ss = 0;

let cron;


function start() {
  cron = setInterval(() => { timer(); }, 1000);
}

document.querySelector('.myTime__actions--start').addEventListener('click', function(){
  start();
})

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

document.querySelector('.myTime__actions--stop').addEventListener('click', function() {
  stop();

  const valor = document.getElementById('counter');

  const elementList = document.createElement('li');
  elementList.classList.add('myTime__times-item');

  let ulElement = document.querySelector('.ulElement');

  ulElement.appendChild(elementList)

  elementList.textContent = valor.innerHTML;

  document.getElementById('counter').innerText = '00:00:00';

});
