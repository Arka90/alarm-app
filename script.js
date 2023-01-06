// Getting all container and text to change
const hours_min = document.getElementById("hours-min");
const session = document.getElementById("display-session");
const second = document.getElementById("second");
const uList = document.getElementById("alarm-list");
//Input fields
const hourInput = document.getElementById("hh");
const minInput = document.getElementById("mm");
const sessionInput = document.getElementById("session");
const secInput = document.getElementById("ss");
const addAlarm = document.getElementById("add_alarm");

//Alarm Object Array
let alarms = [];
//Alarm String Array
let alarmStrings = [];

// This Set Interval is for updating the time and checking alarm to fire
setInterval(() => {
  //Gives current timestamp
  let date = new Date();

  //Gettiing Hour
  let hh = date.getHours();
  //Getting Minutes
  let mm = date.getMinutes();
  //Getting Seconds
  let ss = date.getSeconds();

  let session = "AM";

  if (hh == 0) {
    hh = 12;
  }
  if (hh > 12) {
    hh = hh - 12;
    session = "PM";
  }

  hh = hh < 10 ? "0" + hh : hh;
  mm = mm < 10 ? "0" + mm : mm;
  ss = ss < 10 ? "0" + ss : ss;

  let hoursMin = hh + ":" + mm;

  //Updating the DOM
  hours_min.innerText = hoursMin;
  session.innerText = session;
  second.innerText = ss;

  //right now
  const timeString = `${hh}:${mm}:${ss} ${session}`;

  //Checking the alarm is present
  if (alarmStrings.includes(timeString)) {
    alert(`Alarm for ${timeString}`);
  }
}, 1000);

//Creating Alarm Object
const createALarm = (e) => {
  e.preventDefault();
  if (
    hourInput.value > 12 ||
    hourInput.value == "" ||
    minInput.value > 60 ||
    minInput.value == "" ||
    !sessionInput.value
  ) {
    alert("Please enter a valid hour or minute or seconds session");
    return;
  }

  let hour = hourInput.value;
  let min = minInput.value;
  let sec = secInput.value;

  hour = hour < 10 && hour.length < 2 ? "0" + hour : hour;
  min = min < 10 && min.length < 2 ? "0" + min : min;
  sec = sec < 10 && sec.length < 2 ? "0" + sec : sec;
  //To define Alarm object
  const session = sessionInput.value;
  const alarmTimeString = `${hour}:${min}:${sec} ${sessionInput.value}`;
  const alarmID = Date.now();
  alarms.push({ alarmTime: { hour, min, session }, alarmID, alarmTimeString });
  alarmStrings.push(alarmTimeString);
  renderAlarm();
  hourInput.value = minInput.value = secInput.value = sessionInput.value = "";
};

//Adding event Listener to add Alarm button
addAlarm.addEventListener("click", createALarm);

//Render Alarm
const renderAlarm = () => {
  uList.innerHTML = "";

  alarms.forEach((alarm) => {
    const li = document.createElement("li");
    li.innerHTML = `<li id=${alarm.alarmID} class="alarm-list-item">
    <p>${alarm.alarmTimeString}</p>
    <button class="delete"><i id=${alarm.alarmID} class="fa-solid fa-trash delete"></i></button>
  </li>`;
    uList.append(li);
  });
};

//Delete alarm
const deleteAlarm = (id) => {
  const newAlarm = alarms.filter((alarm) => {
    if (alarm.alarmID != id) return alarm;
  });

  const newAlarmString = newAlarm.map((alarm) => alarm.alarmTimeString);

  alarms = newAlarm;
  alarmStrings = newAlarmString;

  renderAlarm();
};

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    deleteAlarm(e.target.id);
  }
});

renderAlarm();
