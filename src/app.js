import "./app.scss";
import "@babel/polyfill";
import { v4 as uuidv4 } from "uuid";

const baseUrl = "http://localhost:3005/times";

let hh = 0;
let mm = 0;
let ss = 0;
let cron;

getTimes();

async function getTimes() {
  try {
    const response = await fetch(baseUrl);

    const data = await response.json();

    showTimes(data);
  } catch (error) {
    console.log(error);
  }
}

async function saveTime(dataTime) {
  fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataTime),
  })
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => JSON.stringify(response));
}

async function deleteTime(timeId) {
  fetch(`${baseUrl}/${timeId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((err) => console.error(err));
}

function renderTime(id, time, description) {
  return `
    <li class="myTime__times-item" data-id="${id}">
      ${time}
      <span>${description}</span>
      <button class="removeItem">x</button>
    <li>`;
}

function showTimes(times) {
  let outputTimes = "";

  for (let time of times) {
    outputTimes += renderTime(time.id, time.time, time.description);
  }

  document.querySelector(".timeList").innerHTML = outputTimes;

  let itemsRemove = document.querySelectorAll(".removeItem");

  for (let itemRemove of itemsRemove) {
    itemRemove.addEventListener("click", () => {
      deleteTime(itemRemove.parentNode.dataset.id);
      itemRemove.parentNode.remove();
    });
  }
}

function start() {
  cron = setInterval(() => {
    timer();
  }, 1000);
}
document
  .querySelector(".myTime__actions--start")
  .addEventListener("click", function () {
    start();
  });

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

  let format =
    (hh < 10 ? "0" + hh : hh) +
    ":" +
    (mm < 10 ? "0" + mm : mm) +
    ":" +
    (ss < 10 ? "0" + ss : ss);

  document.querySelector(".myTime__time").innerText = format;

  return format;
}

document
  .querySelector(".myTime__actions--stop")
  .addEventListener("click", function () {
    stop();

    const valueTime = document.querySelector(".myTime__time").outerText;
    const taskDescription = document.querySelector(".myTime__task").value;
    const idTime = uuidv4();

    const timeList = document.querySelector(".timeList");
    const printTime = renderTime(idTime, valueTime, taskDescription);

    timeList.innerHTML += printTime;

    document.querySelector(".myTime__time").innerText = "00:00:00";
    document.querySelector(".myTime__task").innerText = "";

    const dataTime = {
      id: idTime,
      time: valueTime,
      description: taskDescription,
    };

    saveTime(dataTime);
  });
