var canvas2blob = require('canvas2blob');
var vkey = require('vkey');
var can = document.querySelector('canvas');
var ctx = can.getContext('2d');
var lastPlace = [0,0];
var init = false;

var input = document.querySelector('.input');
var inputFilename = false;

function place(place) {
  var img = new Image();
  img.src = 'korn.png';
  ctx.drawImage(img, place[0], place[1]);
}

function shouldPlace(ev) {
  var diffx = ev.clientX - lastPlace[0];
  if (diffx > 50 || diffx < -50) return true;
  var diffy = ev.clientY - lastPlace[1];
  if (diffy > 50 || diffy < -50) return true;
  return false;
}

document.body.addEventListener('keydown', onKeydown);
can.addEventListener('keydown', onKeydown);

function onKeydown(ev) {
  if (inputFilename) {
    if (vkey[ev.keyCode] === '<escape>') {
      inputFilename = false;
      input.style.display = 'none';
    }

    if (vkey[ev.keyCode] === '<enter>' && inputFilename) {
      inputFilename = false;
      input.style.display = 'none';
      var filename = input.querySelector('.filename').value + '.png';
      forceDownload(canvas2blob(can), filename);
    }
  } else if (vkey[ev.keyCode] === 'B') {
    inputFilename = true;
    launchInput();
  }
}

function launchInput() {
  input.style.display = 'block';
}

document.querySelector('.close', function() {
  input.style.display = 'none';
  input.style.display = 'none';
});

function evHandle(ev) {
  if (init) initialize();
  if (shouldPlace(ev)) {
    lastPlace = [ev.clientX - 50, ev.clientY - 50];
    place(lastPlace);
  }
}

can.addEventListener('mousemove', evHandle);
can.addEventListener('touchmove', evHandle);
can.addEventListener('touchend', evHandle);
can.addEventListener('touchstart', evHandle);

// can.addEventListener('click', glitchIt);
function initialize() {
  glitchIt();
  init = !init;
  setInterval(glitchIt, 2000);
}

function glitchIt() {
  glitch(ctx.getImageData( 0, 0, can.clientWidth, can.clientHeight ),
         { amount: 10, seed: 45, iterations: 30, quality: 30 },
         function (image_data) {
           ctx.putImageData(image_data, 0, 0);
         });
}

function forceDownload(blob, filename){
  var url = (window.URL || window.webkitURL).createObjectURL(blob);
  var link = window.document.createElement('a');
  link.href = url;
  link.download = filename || 'myimage.png';
  var click = document.createEvent("Event");
  click.initEvent("click", true, true);
  link.dispatchEvent(click);
}