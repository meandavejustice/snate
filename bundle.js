(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"canvas2blob":2,"vkey":3}],2:[function(require,module,exports){
function _base64toArrayBuffer(base64) {
  var binary_string =  window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array( len );
  for (var i = 0; i < len; i++)        {
    var ascii = binary_string.charCodeAt(i);
    bytes[i] = ascii;
  }
  return bytes.buffer;
}

function _parseB64(b64str) {
  return {
    base64: b64str.substr(b64str.indexOf(',') + 1),
    type: b64str.match(/:([^}]*);/)[1]
  }
}

module.exports = function(canvas) {
  var data = _parseB64(canvas.toDataURL());
  var arrBuffer = _base64toArrayBuffer(data.base64);
  return new Blob([arrBuffer], {type: data.type});
}
},{}],3:[function(require,module,exports){
var ua = typeof window !== 'undefined' ? window.navigator.userAgent : ''
  , isOSX = /OS X/.test(ua)
  , isOpera = /Opera/.test(ua)
  , maybeFirefox = !/like Gecko/.test(ua) && !isOpera

var i, output = module.exports = {
  0:  isOSX ? '<menu>' : '<UNK>'
, 1:  '<mouse 1>'
, 2:  '<mouse 2>'
, 3:  '<break>'
, 4:  '<mouse 3>'
, 5:  '<mouse 4>'
, 6:  '<mouse 5>'
, 8:  '<backspace>'
, 9:  '<tab>'
, 12: '<clear>'
, 13: '<enter>'
, 16: '<shift>'
, 17: '<control>'
, 18: '<alt>'
, 19: '<pause>'
, 20: '<caps-lock>'
, 21: '<ime-hangul>'
, 23: '<ime-junja>'
, 24: '<ime-final>'
, 25: '<ime-kanji>'
, 27: '<escape>'
, 28: '<ime-convert>'
, 29: '<ime-nonconvert>'
, 30: '<ime-accept>'
, 31: '<ime-mode-change>'
, 27: '<escape>'
, 32: '<space>'
, 33: '<page-up>'
, 34: '<page-down>'
, 35: '<end>'
, 36: '<home>'
, 37: '<left>'
, 38: '<up>'
, 39: '<right>'
, 40: '<down>'
, 41: '<select>'
, 42: '<print>'
, 43: '<execute>'
, 44: '<snapshot>'
, 45: '<insert>'
, 46: '<delete>'
, 47: '<help>'
, 91: '<meta>'  // meta-left -- no one handles left and right properly, so we coerce into one.
, 92: '<meta>'  // meta-right
, 93: isOSX ? '<meta>' : '<menu>'      // chrome,opera,safari all report this for meta-right (osx mbp).
, 95: '<sleep>'
, 106: '<num-*>'
, 107: '<num-+>'
, 108: '<num-enter>'
, 109: '<num-->'
, 110: '<num-.>'
, 111: '<num-/>'
, 144: '<num-lock>'
, 145: '<scroll-lock>'
, 160: '<shift-left>'
, 161: '<shift-right>'
, 162: '<control-left>'
, 163: '<control-right>'
, 164: '<alt-left>'
, 165: '<alt-right>'
, 166: '<browser-back>'
, 167: '<browser-forward>'
, 168: '<browser-refresh>'
, 169: '<browser-stop>'
, 170: '<browser-search>'
, 171: '<browser-favorites>'
, 172: '<browser-home>'

  // ff/osx reports '<volume-mute>' for '-'
, 173: isOSX && maybeFirefox ? '-' : '<volume-mute>'
, 174: '<volume-down>'
, 175: '<volume-up>'
, 176: '<next-track>'
, 177: '<prev-track>'
, 178: '<stop>'
, 179: '<play-pause>'
, 180: '<launch-mail>'
, 181: '<launch-media-select>'
, 182: '<launch-app 1>'
, 183: '<launch-app 2>'
, 186: ';'
, 187: '='
, 188: ','
, 189: '-'
, 190: '.'
, 191: '/'
, 192: '`'
, 219: '['
, 220: '\\'
, 221: ']'
, 222: "'"
, 223: '<meta>'
, 224: '<meta>'       // firefox reports meta here.
, 226: '<alt-gr>'
, 229: '<ime-process>'
, 231: isOpera ? '`' : '<unicode>'
, 246: '<attention>'
, 247: '<crsel>'
, 248: '<exsel>'
, 249: '<erase-eof>'
, 250: '<play>'
, 251: '<zoom>'
, 252: '<no-name>'
, 253: '<pa-1>'
, 254: '<clear>'
}

for(i = 58; i < 65; ++i) {
  output[i] = String.fromCharCode(i)
}

// 0-9
for(i = 48; i < 58; ++i) {
  output[i] = (i - 48)+''
}

// A-Z
for(i = 65; i < 91; ++i) {
  output[i] = String.fromCharCode(i)
}

// num0-9
for(i = 96; i < 106; ++i) {
  output[i] = '<num-'+(i - 96)+'>'
}

// F1-F24
for(i = 112; i < 136; ++i) {
  output[i] = 'F'+(i-111)
}

},{}]},{},[1])