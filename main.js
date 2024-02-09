let stopwatch;
let lapTimes = [];
let isRunning = false;
let startTime;

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - (lapTimes.length > 0 ? lapTimes.reduce((acc, time) => acc + time, 0) : 0);
        stopwatch = setInterval(updateTime, 1000);
    }
}

function pauseStopwatch() {
    if (isRunning) {
        isRunning = false;
        clearInterval(stopwatch);
    }
}

function resetStopwatch() {
    isRunning = false;
    clearInterval(stopwatch);
    lapTimes = [];
    startTime = undefined;
    updateTime();
}

function recordLapTime() {
    if (isRunning) {
        const lapTime = Date.now() - startTime;
        lapTimes.push(lapTime);
        displayLapTimes();
    }
}

function updateTime() {
    const timeDisplay = document.getElementById('timeDisplay');
    const currentTime = isRunning ? Date.now() - startTime : 0;
    timeDisplay.textContent = getFormattedTime(currentTime);
}

function getFormattedTime(milliseconds) {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60)).toString().padStart(2, '0');
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function displayLapTimes() {
    const lapTimesList = document.getElementById('lapTimes');
    lapTimesList.innerHTML = "";
    lapTimes.forEach((lapTime, index) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${getFormattedTime(lapTime)}`;
        lapTimesList.appendChild(li);
    });
}

// Call resetStopwatch when the page loads to initialize the clock display
resetStopwatch();
