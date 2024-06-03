let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

const hours = document.getElementById("hrs");
const minutes = document.getElementById("mins");
const seconds = document.getElementById("secs");
const milliseconds = document.getElementById("msecs");

const hh = document.getElementById("hh");
const mm = document.getElementById("mm");
const ss = document.getElementById("ss");
const ms = document.getElementById("ms");

const dotH = document.querySelector(".h_dot");
const dotM = document.querySelector(".m_dot");
const dotS = document.querySelector(".s_dot");
const dotMS = document.querySelector(".ms_dot");

const startStopButton = document.getElementById("startStop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapList = document.getElementById("lapList");
let lapCounter = 1;

startStopButton.addEventListener("click", () => {
  if (isRunning) {
    elapsedTime += new Date().getTime() - startTime;
    clearInterval(timer);
    startStopButton.textContent = "Start";
  } else {
    startTime = new Date().getTime();
    timer = setInterval(updateDisplay, 10);
    startStopButton.textContent = "Pause";
  }
  isRunning = !isRunning;
});

resetButton.addEventListener("click", () => {
  clearInterval(timer);
  isRunning = false;
  elapsedTime = 0;
  hours.innerHTML = "00";
  minutes.innerHTML = "00";
  seconds.innerHTML = "00";
  milliseconds.innerHTML = "000";
  hh.style.strokeDashoffset = 440;
  mm.style.strokeDashoffset = 440;
  ss.style.strokeDashoffset = 440;
  ms.style.strokeDashoffset = 440;
  dotH.style.transform = `rotate(0deg)`;
  dotM.style.transform = `rotate(0deg)`;
  dotS.style.transform = `rotate(0deg)`;
  dotMS.style.transform = `rotate(0deg)`;
  startStopButton.textContent = "Start";
  lapList.innerHTML = ""; // Clear lap list on reset
  lapCounter = 1; // Reset lap counter
});

lapButton.addEventListener("click", () => {
  if (isRunning) {
    const now = new Date().getTime();
    const lapTime = elapsedTime + (now - startTime);
    const formattedLapTime = formatTime(lapTime); // Format the lap time
    const lapItem = document.createElement("p");
    lapItem.textContent = `Lap ${lapCounter}: ${formattedLapTime}`;
    lapList.appendChild(lapItem);
    lapCounter++;
  }
});

function updateDisplay() {
  const now = new Date().getTime();
  const timeElapsed = elapsedTime + (now - startTime);

  const h = Math.floor(timeElapsed / (1000 * 60 * 60)) % 24;
  const m = Math.floor(timeElapsed / (1000 * 60)) % 60;
  const s = Math.floor(timeElapsed / 1000) % 60;
  const msValue = Math.floor(timeElapsed % 1000);

  hours.innerHTML = h.toString().padStart(2, '0');
  minutes.innerHTML = m.toString().padStart(2, '0');
  seconds.innerHTML = s.toString().padStart(2, '0');
  milliseconds.innerHTML = msValue.toString().padStart(3, '0');

  hh.style.strokeDashoffset = 440 - (440 * h) / 24;
  mm.style.strokeDashoffset = 440 - (440 * m) / 60;
  ss.style.strokeDashoffset = 440 - (440 * s) / 60;
  ms.style.strokeDashoffset = 440 - (440 * msValue) / 1000;

  dotH.style.transform = `rotate(${h * 15}deg)`;
  dotM.style.transform = `rotate(${m * 6}deg)`;
  dotS.style.transform = `rotate(${s * 6}deg)`;
  dotMS.style.transform = `rotate(${msValue * 0.36}deg)`;
}

function formatTime(time) {
  const h = Math.floor(time / (1000 * 60 * 60)) % 24;
  const m = Math.floor(time / (1000 * 60)) % 60;
  const s = Math.floor(time / 1000) % 60;
  const ms = Math.floor(time % 1000);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
}
