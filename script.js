var atDoor2 = false;
var door2Closed = false;
var time = 0;
var doorlightOn = false;
var mapPositions = {
  stage: "circle(7.6% at 66% 25%)",
  dining: "circle(7.6% at 65% 51%)",
  kitchen: "circle(7.6% at 55% 78%)",
  hallway2: "circle(7.6% at 75% 65%)",
  pantry: "circle(7.6% at 74% 77%)",
  hallway1: "circle(7.6% at 46% 24%)",
  arcade: "circle(7.6% at 30% 29%)",
  boysBathroom: "circle(7.6% at 13% 26%)",
  girlsBathroom: "circle(7.6% at 12% 50%)",
  storage: "circle(7.6% at 12% 72%)",
};

var emptyDoorLight = document.querySelectorAll("img")[0];
var badDoorLight = document.querySelectorAll("img")[1];
var doorClosing = document.querySelectorAll("img")[2];
var doorClosed = document.querySelectorAll("img")[3];
var phone = document.querySelectorAll("img")[6];
var clock = document.querySelectorAll("img")[7];
var mailBad = document.querySelectorAll("img")[4];
var map = document.querySelectorAll("img")[8];
var mapBad = document.querySelectorAll("img")[9];

var ringingNoise = new Audio("/assets/sounds/ring.wav");
ringingNoise.loop = true;
var buzzingNoise = new Audio("/assets/sounds/buzz.mp3");
buzzingNoise.loop = true;
var fanNoise = new Audio("/assets/sounds/fan.mp3");
fanNoise.loop = true;
var doorOpenNoise = new Audio("/assets/sounds/doorOpen.mp3");
var doorCloseNoise = new Audio("/assets/sounds/doorClose.mp3");
var monitorOnNoise = new Audio("/assets/sounds/monitoron.mp3");
var monitorOffNoise = new Audio("/assets/sounds/monitoroff.mp3");
var jumpscareNoise = new Audio("/assets/sounds/jumpscare.mp3");
var nightStartNoise = new Audio("/assets/sounds/nightStart.mp3");
nightStartNoise.volume = 0.25;
var nightEndNoise = new Audio("/assets/sounds/nightEnd.mp3");
nightEndNoise.volume = 0.25;
var sirenNoise = new Audio("/assets/sounds/Siren.mp3");
sirenNoise.loop = true;
sirenNoise.volume = 0;

var doorUseTime = 0;
var lightUseTime = 0;

var jimmyDeanPosition = 0;
var hideJimmy = true;

var clockCycle;

setInterval(() => {
  if (door2Closed) {
    doorUseTime++;
    if (doorUseTime > 30000) {
      doorOpenNoise.play();
      door2Closed = false;
      doorClosed.style.opacity = 0;
      document.querySelectorAll("button")[0].style.background = "transparent";
      setTimeout(() => {
        doorClosing.style.opacity = 0;
      }, 20);
    }
  }
  if (doorUseTime > 30000) {
    doorClosed.style.opacity = 0;
    doorClosing.style.opacity = 0;
  }
  if (doorlightOn) {
    lightUseTime++;
    if (lightUseTime > 30000) {
      emptyDoorLight.style.opacity = 0;
      badDoorLight.style.opacity = 0;
      document.querySelectorAll("button")[1].style.background = "transparent";
      doorlightOn = false;
      buzzingNoise.pause();
      sirenNoise.volume = 0;
    }
  }
}, 1);

Swal.fire(
  "Welcome To The Demo!",
  "Note that this is, like I said, a demo. Kind of a poor one as well. But hey, it is what it is. As soon as you click OK, the game will start. v0.0.21 BETA. Created by Brian Dean Ullery.",
  "info"
).then(() => {
  nightStartNoise.play();
  setTimeout(() => {
    beginNight1.style.display = "none";
    ringingNoise.volume = 0.4;
    ringingNoise.play();
    fanNoise.play();
    sirenNoise.play();
    clockCycle = setInterval(() => {
      clock.style.opacity = 1;
      time += 1;
      if (time == 1) {
        setTimeout(jimmyDean, Math.random() * 10000);
      } else if (time == 2) {
        clock.src = "/assets/images/3am.png";
      } else if (time == 3) {
        clock.src = "/assets/images/4_30am.png";
      } else if (time == 4) {
        clock.src = "/assets/images/6am.gif";
        setTimeout(() => {
          nightEndNoise.play();
          Swal.fire("6 AM", "YOU WIN!", "success").then(() => {
            window.location.reload();
          });
          clearInterval(clockCycle);
        }, 4000);
      }
    }, 133750);
    setTimeout(() => {
      ringingNoise.pause();
      phone.style.opacity = 0;
      document.querySelectorAll("button")[3].style.display = "none";
    }, 15000);
  }, 4000);
});

function activateLight(btn) {
  if (lightUseTime < 300000) {
    if (door2Closed || doorlightOn) {
      emptyDoorLight.style.opacity = 0;
      badDoorLight.style.opacity = 0;
      btn.style.background = "transparent";
      doorlightOn = false;
      buzzingNoise.pause();
      sirenNoise.volume = 0;
    } else {
      if (atDoor2) {
        badDoorLight.style.opacity = 1;
        sirenNoise.volume = 1;
      } else {
        emptyDoorLight.style.opacity = 1;
        sirenNoise.volume = 0;
      }
      btn.style.background = "#888888";
      doorlightOn = true;
      buzzingNoise.play();
    }
  }
}
function closeDoor(btn) {
  if (doorUseTime < 300000) {
    if (door2Closed) {
      doorOpenNoise.play();
      door2Closed = false;
      doorClosed.style.opacity = 0;
      btn.style.background = "transparent";
      setTimeout(() => {
        doorClosing.style.opacity = 0;
      }, 20);
    } else {
      doorCloseNoise.play();
      door2Closed = true;
      doorlightOn = false;
      buzzingNoise.pause();
      doorClosing.style.opacity = Number(doorUseTime < 300000);
      emptyDoorLight.style.opacity = 0;
      badDoorLight.style.opacity = 0;
      document.querySelectorAll("button")[1].style.background = "transparent";
      btn.style.background = "darkred";
      setTimeout(() => {
        doorClosed.style.opacity = Number(doorUseTime < 300000);
        sirenNoise.volume = 0;
      }, 20);
    }
  }
}

function pickupPhone(btn) {
  let call = new Audio("/assets/sounds/night1.wav");
  call.play();
  ringingNoise.pause();
  phone.style.opacity = 0;
  btn.style.display = "none";
}

function closeMail() {
  mailBad.style.opacity = 0;
}

function blinkDoorLight() {
  if (doorlightOn && emptyDoorLight.style.opacity == 1) {
    emptyDoorLight.style.opacity = 0.5;
    setTimeout(() => {
      blinkDoorLight();
    }, Math.random() * 500);
  } else {
    if (!doorlightOn) {
      emptyDoorLight.style.opacity = 0;
    }
    setTimeout(() => {
      if (doorlightOn) {
        emptyDoorLight.style.opacity = 1;
      }
      setTimeout(() => {
        blinkDoorLight();
      }, Math.random() * 500);
    }, Math.random() * 500);
  }
}
blinkDoorLight();

function toggleMap(oo) {
  if (oo) {
    monitorOnNoise.currentTime = 0;
    monitorOnNoise.play();
    map.style.display = "block";
    if (!hideJimmy) {
      mapBad.style.display = "block";
    }
  } else {
    monitorOffNoise.currentTime = 0;
    monitorOffNoise.play();
    map.style.display = "none";
    mapBad.style.display = "none";
  }
}

function jimmyDean() {
  jimmyDeanPosition == 4 ? (jimmyDeanPosition = 2) : jimmyDeanPosition;
  randomWalk = Math.round(Math.random() * 5);
  if (randomWalk <= 1) {
    jimmyDeanPosition--;
  } else if (randomWalk <= time + 2) {
    jimmyDeanPosition++;
  }
  jimmyDeanPosition = Math.max(Math.min(jimmyDeanPosition, 4), 0);

  switch (jimmyDeanPosition) {
    case 0:
      mapBad.style.clipPath = mapPositions.stage;
      atDoor2 = false;
      break;
    case 1:
      mapBad.style.clipPath = mapPositions.dining;
      atDoor2 = false;
      break;
    case 2:
      mapBad.style.clipPath = mapPositions.hallway1;
      atDoor2 = false;
      break;
    case 3:
      mapBad.style.clipPath = mapPositions.arcade;
      atDoor2 = true;
      setTimeout(testForDie, Math.random() * 3000 + 5000);
      break;
    case 4:
      mapBad.style.clipPath = mapPositions.boysBathroom;
      atDoor2 = false;
      break;
    default:
      mapBad.style.clipPath = "circle(0% at 0% 0%)";
      atDoor2 = false;
      break;
  }
  hideJimmy = false;
  if (map.style.display == "block") {
    mapBad.style.display = "block";
  }
  setTimeout(() => {
    hideJimmy = true;
    if (map.style.display == "block") {
      mapBad.style.display = "none";
    }
  }, 1000);
  setTimeout(jimmyDean, Math.random() * 30000 + 10000);
}

function testForDie() {
  if (atDoor2 && !door2Closed) {
    document.getElementById("jumpscare1").style.display = "block";
    sirenNoise.volume = 0;
    jumpscareNoise.play();
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  } else if (atDoor2) {
    setTimeout(testForDie, Math.random() * 3000 + 5000);
  }
}
