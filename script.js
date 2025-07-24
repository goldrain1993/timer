let timerInterval;
let seconds = 0;
let isRunning = false;
let timerMaxSeconds = 3600; // 진행바 최대값(예시: 1시간)

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const progressBar = document.getElementById('progress');
const alarmInput = document.getElementById('alarmInput');
const alarmSetBtn = document.getElementById('alarmSetBtn');

// 시계
function updateClock() {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    const hourAngle = (hour % 12) * 30 + minute * 0.5;
    const minuteAngle = minute * 6;
    const secondAngle = second * 6;
    const svgDoc = document.querySelector('#clock img').contentDocument || document.querySelector('#clock img').parentNode;
    if (svgDoc) {
        const hourHand = svgDoc.getElementById('hourHand');
        const minuteHand = svgDoc.getElementById('minuteHand');
        const secondHand = svgDoc.getElementById('secondHand');
        if (hourHand && minuteHand && secondHand) {
            hourHand.setAttribute('transform', `rotate(${hourAngle} 60 60)`);
            minuteHand.setAttribute('transform', `rotate(${minuteAngle} 60 60)`);
            secondHand.setAttribute('transform', `rotate(${secondAngle} 60 60)`);
        }
    }
}
setInterval(updateClock, 1000);

function updateDisplay() {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    timerDisplay.textContent = `${hrs}:${mins}:${secs}`;
    // 진행바 업데이트
    const percent = Math.min(100, (seconds / timerMaxSeconds) * 100);
    progressBar.style.width = percent + '%';
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerInterval = setInterval(() => {
            seconds++;
            updateDisplay();
            checkAlarm();
        }, 1000);
    }
}

function pauseTimer() {
    isRunning = false;
    clearInterval(timerInterval);
}

function resetTimer() {
    pauseTimer();
    seconds = 0;
    updateDisplay();
}

// 알람 기능
let alarmTime = null;
function checkAlarm() {
    if (!alarmTime) return;
    const now = new Date();
    const nowStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    if (nowStr === alarmTime) {
        alert('알람 시간입니다!');
        alarmTime = null;
    }
}
alarmSetBtn.addEventListener('click', () => {
    alarmTime = alarmInput.value;
    if (alarmTime) {
        alert(`알람이 ${alarmTime}로 설정되었습니다.`);
    }
});

// 스톱워치 기능
let swInterval;
let swTime = 0;
let swRunning = false;
const swDisplay = document.getElementById('stopwatchDisplay');
const swStartBtn = document.getElementById('swStartBtn');
const swPauseBtn = document.getElementById('swPauseBtn');
const swResetBtn = document.getElementById('swResetBtn');

function updateStopwatch() {
    const ms = swTime % 100;
    const totalSec = Math.floor(swTime / 100);
    const hrs = String(Math.floor(totalSec / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSec % 60).padStart(2, '0');
    swDisplay.textContent = `${hrs}:${mins}:${secs}.${String(ms).padStart(2, '0')}`;
}
function swStart() {
    if (!swRunning) {
        swRunning = true;
        swInterval = setInterval(() => {
            swTime++;
            updateStopwatch();
        }, 10);
    }
}
function swPause() {
    swRunning = false;
    clearInterval(swInterval);
}
function swReset() {
    swPause();
    swTime = 0;
    updateStopwatch();
}
swStartBtn.addEventListener('click', swStart);
swPauseBtn.addEventListener('click', swPause);
swResetBtn.addEventListener('click', swReset);

updateDisplay();
updateStopwatch();
