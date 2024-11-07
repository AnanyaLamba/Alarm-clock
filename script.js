const hoursSelect = document.querySelector('#hours')
const minutesSelect = document.querySelector('#minutes')
const secondsSelect = document.querySelector('#seconds')
const ampmSelect = document.querySelector('#ampm')
const setAlarm = document.querySelector('#set-alarm')
const clearAlarm = document.querySelector('#clear-alarm')
const alarmStatus = document.querySelector('#alarm-status')
const CurrentTimeStatus = document.querySelector('#current-time');
const alarmSound = document.querySelector('#alarm-sound');

// display current time
let currentTime = ()=>{
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let ampm = hours>=12 ? 'PM' : 'AM';
    
    hours = hours%12 || 12; // 12 hour format doesnt have 00

    CurrentTimeStatus.innerHTML = `${hours<10 ? '0':''}${hours} : ${minutes<10 ? '0':''}${minutes} : ${seconds<10 ? '0':''}${seconds} ${ampm}`

    checkAlarm(hours, minutes, seconds, ampm);
}
setInterval(currentTime,1000);

// adding options in minutes,seconds and hours
window.addEventListener('DOMContentLoaded', ()=>{
    addDropDown(1,12,hoursSelect)
    addDropDown(0,59,minutesSelect)
    addDropDown(0,59,secondsSelect)
});

let addDropDown = (start, end, element)=>{
    for(let i=start; i<=end; i++){
        let dropDown = document.createElement('option');
        dropDown.value = i<10 ? '0'+i : i;
        dropDown.innerText = i<10 ? '0'+i : i;
        element.appendChild(dropDown)
    }
}

// setting up alarm
let alarmTime = null;
let isAlarmSet = false;

setAlarm.addEventListener('click',()=>{
    const hour = hoursSelect.value;
    const minutes = minutesSelect.value;
    const seconds = secondsSelect.value;
    const ampm = ampmSelect.value;

    alarmTime = `${hour} : ${minutes} : ${seconds} ${ampm}`;
    isAlarmSet = true;
    alarmStatus.innerHTML = `Alarm set for ${alarmTime}`;
})

// Function to check if it's time to ring the alarm
let checkAlarm = (hours, minutes, seconds, ampm)=>{
    const currentTime =  `${hours<10 ? '0':''}${hours} : ${minutes<10 ? '0':''}${minutes} : ${seconds<10 ? '0':''}${seconds} ${ampm}`

    if(isAlarmSet && currentTime==alarmTime){
        alarmSound.play();
        isAlarmSet = false;
        alarmStatus.innerHTML = `Alarm set for ${alarmTime}`;
    }
}

clearAlarm.addEventListener('click', ()=>{
    alarmTime = null;
    isAlarmSet = false;
    alarmSound.pause();
    alarmSound.currentTime = 0;
    alarmStatus.innerHTML = ''
})
 
// js