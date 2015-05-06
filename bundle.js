(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/meandave/Code/korn_snake/index.js":[function(require,module,exports){
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

can.addEventListener('mousemove', function(ev) {
  if (init) initialize();
  if (shouldPlace(ev)) {
    lastPlace = [ev.clientX - 50, ev.clientY - 50];
    place(lastPlace);
  }
})

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
},{"canvas2blob":"/home/meandave/Code/korn_snake/node_modules/canvas2blob/index.js","vkey":"/home/meandave/Code/korn_snake/node_modules/vkey/index.js"}],"/home/meandave/Code/korn_snake/node_modules/canvas2blob/index.js":[function(require,module,exports){
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
},{}],"/home/meandave/Code/korn_snake/node_modules/vkey/index.js":[function(require,module,exports){
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

},{}]},{},["/home/meandave/Code/korn_snake/index.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi91c3IvbGliL25vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL2hvbWUvbWVhbmRhdmUvQ29kZS9rb3JuX3NuYWtlL2luZGV4LmpzIiwiL2hvbWUvbWVhbmRhdmUvQ29kZS9rb3JuX3NuYWtlL25vZGVfbW9kdWxlcy9jYW52YXMyYmxvYi9pbmRleC5qcyIsIi9ob21lL21lYW5kYXZlL0NvZGUva29ybl9zbmFrZS9ub2RlX21vZHVsZXMvdmtleS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgY2FudmFzMmJsb2IgPSByZXF1aXJlKCdjYW52YXMyYmxvYicpO1xudmFyIHZrZXkgPSByZXF1aXJlKCd2a2V5Jyk7XG52YXIgY2FuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignY2FudmFzJyk7XG52YXIgY3R4ID0gY2FuLmdldENvbnRleHQoJzJkJyk7XG52YXIgbGFzdFBsYWNlID0gWzAsMF07XG52YXIgaW5pdCA9IGZhbHNlO1xuXG52YXIgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5wdXQnKTtcbnZhciBpbnB1dEZpbGVuYW1lID0gZmFsc2U7XG5cbmZ1bmN0aW9uIHBsYWNlKHBsYWNlKSB7XG4gIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgaW1nLnNyYyA9ICdrb3JuLnBuZyc7XG4gIGN0eC5kcmF3SW1hZ2UoaW1nLCBwbGFjZVswXSwgcGxhY2VbMV0pO1xufVxuXG5mdW5jdGlvbiBzaG91bGRQbGFjZShldikge1xuICB2YXIgZGlmZnggPSBldi5jbGllbnRYIC0gbGFzdFBsYWNlWzBdO1xuICBpZiAoZGlmZnggPiA1MCB8fCBkaWZmeCA8IC01MCkgcmV0dXJuIHRydWU7XG4gIHZhciBkaWZmeSA9IGV2LmNsaWVudFkgLSBsYXN0UGxhY2VbMV07XG4gIGlmIChkaWZmeSA+IDUwIHx8IGRpZmZ5IDwgLTUwKSByZXR1cm4gdHJ1ZTtcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5kb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleWRvd24pO1xuY2FuLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleWRvd24pO1xuXG5mdW5jdGlvbiBvbktleWRvd24oZXYpIHtcbiAgaWYgKGlucHV0RmlsZW5hbWUpIHtcbiAgICBpZiAodmtleVtldi5rZXlDb2RlXSA9PT0gJzxlc2NhcGU+Jykge1xuICAgICAgaW5wdXRGaWxlbmFtZSA9IGZhbHNlO1xuICAgICAgaW5wdXQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG5cbiAgICBpZiAodmtleVtldi5rZXlDb2RlXSA9PT0gJzxlbnRlcj4nICYmIGlucHV0RmlsZW5hbWUpIHtcbiAgICAgIGlucHV0RmlsZW5hbWUgPSBmYWxzZTtcbiAgICAgIGlucHV0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB2YXIgZmlsZW5hbWUgPSBpbnB1dC5xdWVyeVNlbGVjdG9yKCcuZmlsZW5hbWUnKS52YWx1ZSArICcucG5nJztcbiAgICAgIGZvcmNlRG93bmxvYWQoY2FudmFzMmJsb2IoY2FuKSwgZmlsZW5hbWUpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh2a2V5W2V2LmtleUNvZGVdID09PSAnQicpIHtcbiAgICBpbnB1dEZpbGVuYW1lID0gdHJ1ZTtcbiAgICBsYXVuY2hJbnB1dCgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGxhdW5jaElucHV0KCkge1xuICBpbnB1dC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbn1cblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsb3NlJywgZnVuY3Rpb24oKSB7XG4gIGlucHV0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGlucHV0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59KTtcblxuY2FuLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGZ1bmN0aW9uKGV2KSB7XG4gIGlmIChpbml0KSBpbml0aWFsaXplKCk7XG4gIGlmIChzaG91bGRQbGFjZShldikpIHtcbiAgICBsYXN0UGxhY2UgPSBbZXYuY2xpZW50WCAtIDUwLCBldi5jbGllbnRZIC0gNTBdO1xuICAgIHBsYWNlKGxhc3RQbGFjZSk7XG4gIH1cbn0pXG5cbi8vIGNhbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGdsaXRjaEl0KTtcbmZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XG4gIGdsaXRjaEl0KCk7XG4gIGluaXQgPSAhaW5pdDtcbiAgc2V0SW50ZXJ2YWwoZ2xpdGNoSXQsIDIwMDApO1xufVxuXG5mdW5jdGlvbiBnbGl0Y2hJdCgpIHtcbiAgZ2xpdGNoKGN0eC5nZXRJbWFnZURhdGEoIDAsIDAsIGNhbi5jbGllbnRXaWR0aCwgY2FuLmNsaWVudEhlaWdodCApLFxuICAgICAgICAgeyBhbW91bnQ6IDEwLCBzZWVkOiA0NSwgaXRlcmF0aW9uczogMzAsIHF1YWxpdHk6IDMwIH0sXG4gICAgICAgICBmdW5jdGlvbiAoaW1hZ2VfZGF0YSkge1xuICAgICAgICAgICBjdHgucHV0SW1hZ2VEYXRhKGltYWdlX2RhdGEsIDAsIDApO1xuICAgICAgICAgfSk7XG59XG5cbmZ1bmN0aW9uIGZvcmNlRG93bmxvYWQoYmxvYiwgZmlsZW5hbWUpe1xuICB2YXIgdXJsID0gKHdpbmRvdy5VUkwgfHwgd2luZG93LndlYmtpdFVSTCkuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICB2YXIgbGluayA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gIGxpbmsuaHJlZiA9IHVybDtcbiAgbGluay5kb3dubG9hZCA9IGZpbGVuYW1lIHx8ICdteWltYWdlLnBuZyc7XG4gIHZhciBjbGljayA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiRXZlbnRcIik7XG4gIGNsaWNrLmluaXRFdmVudChcImNsaWNrXCIsIHRydWUsIHRydWUpO1xuICBsaW5rLmRpc3BhdGNoRXZlbnQoY2xpY2spO1xufSIsImZ1bmN0aW9uIF9iYXNlNjR0b0FycmF5QnVmZmVyKGJhc2U2NCkge1xuICB2YXIgYmluYXJ5X3N0cmluZyA9ICB3aW5kb3cuYXRvYihiYXNlNjQpO1xuICB2YXIgbGVuID0gYmluYXJ5X3N0cmluZy5sZW5ndGg7XG4gIHZhciBieXRlcyA9IG5ldyBVaW50OEFycmF5KCBsZW4gKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykgICAgICAgIHtcbiAgICB2YXIgYXNjaWkgPSBiaW5hcnlfc3RyaW5nLmNoYXJDb2RlQXQoaSk7XG4gICAgYnl0ZXNbaV0gPSBhc2NpaTtcbiAgfVxuICByZXR1cm4gYnl0ZXMuYnVmZmVyO1xufVxuXG5mdW5jdGlvbiBfcGFyc2VCNjQoYjY0c3RyKSB7XG4gIHJldHVybiB7XG4gICAgYmFzZTY0OiBiNjRzdHIuc3Vic3RyKGI2NHN0ci5pbmRleE9mKCcsJykgKyAxKSxcbiAgICB0eXBlOiBiNjRzdHIubWF0Y2goLzooW159XSopOy8pWzFdXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihjYW52YXMpIHtcbiAgdmFyIGRhdGEgPSBfcGFyc2VCNjQoY2FudmFzLnRvRGF0YVVSTCgpKTtcbiAgdmFyIGFyckJ1ZmZlciA9IF9iYXNlNjR0b0FycmF5QnVmZmVyKGRhdGEuYmFzZTY0KTtcbiAgcmV0dXJuIG5ldyBCbG9iKFthcnJCdWZmZXJdLCB7dHlwZTogZGF0YS50eXBlfSk7XG59IiwidmFyIHVhID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCA6ICcnXG4gICwgaXNPU1ggPSAvT1MgWC8udGVzdCh1YSlcbiAgLCBpc09wZXJhID0gL09wZXJhLy50ZXN0KHVhKVxuICAsIG1heWJlRmlyZWZveCA9ICEvbGlrZSBHZWNrby8udGVzdCh1YSkgJiYgIWlzT3BlcmFcblxudmFyIGksIG91dHB1dCA9IG1vZHVsZS5leHBvcnRzID0ge1xuICAwOiAgaXNPU1ggPyAnPG1lbnU+JyA6ICc8VU5LPidcbiwgMTogICc8bW91c2UgMT4nXG4sIDI6ICAnPG1vdXNlIDI+J1xuLCAzOiAgJzxicmVhaz4nXG4sIDQ6ICAnPG1vdXNlIDM+J1xuLCA1OiAgJzxtb3VzZSA0PidcbiwgNjogICc8bW91c2UgNT4nXG4sIDg6ICAnPGJhY2tzcGFjZT4nXG4sIDk6ICAnPHRhYj4nXG4sIDEyOiAnPGNsZWFyPidcbiwgMTM6ICc8ZW50ZXI+J1xuLCAxNjogJzxzaGlmdD4nXG4sIDE3OiAnPGNvbnRyb2w+J1xuLCAxODogJzxhbHQ+J1xuLCAxOTogJzxwYXVzZT4nXG4sIDIwOiAnPGNhcHMtbG9jaz4nXG4sIDIxOiAnPGltZS1oYW5ndWw+J1xuLCAyMzogJzxpbWUtanVuamE+J1xuLCAyNDogJzxpbWUtZmluYWw+J1xuLCAyNTogJzxpbWUta2Fuamk+J1xuLCAyNzogJzxlc2NhcGU+J1xuLCAyODogJzxpbWUtY29udmVydD4nXG4sIDI5OiAnPGltZS1ub25jb252ZXJ0PidcbiwgMzA6ICc8aW1lLWFjY2VwdD4nXG4sIDMxOiAnPGltZS1tb2RlLWNoYW5nZT4nXG4sIDI3OiAnPGVzY2FwZT4nXG4sIDMyOiAnPHNwYWNlPidcbiwgMzM6ICc8cGFnZS11cD4nXG4sIDM0OiAnPHBhZ2UtZG93bj4nXG4sIDM1OiAnPGVuZD4nXG4sIDM2OiAnPGhvbWU+J1xuLCAzNzogJzxsZWZ0PidcbiwgMzg6ICc8dXA+J1xuLCAzOTogJzxyaWdodD4nXG4sIDQwOiAnPGRvd24+J1xuLCA0MTogJzxzZWxlY3Q+J1xuLCA0MjogJzxwcmludD4nXG4sIDQzOiAnPGV4ZWN1dGU+J1xuLCA0NDogJzxzbmFwc2hvdD4nXG4sIDQ1OiAnPGluc2VydD4nXG4sIDQ2OiAnPGRlbGV0ZT4nXG4sIDQ3OiAnPGhlbHA+J1xuLCA5MTogJzxtZXRhPicgIC8vIG1ldGEtbGVmdCAtLSBubyBvbmUgaGFuZGxlcyBsZWZ0IGFuZCByaWdodCBwcm9wZXJseSwgc28gd2UgY29lcmNlIGludG8gb25lLlxuLCA5MjogJzxtZXRhPicgIC8vIG1ldGEtcmlnaHRcbiwgOTM6IGlzT1NYID8gJzxtZXRhPicgOiAnPG1lbnU+JyAgICAgIC8vIGNocm9tZSxvcGVyYSxzYWZhcmkgYWxsIHJlcG9ydCB0aGlzIGZvciBtZXRhLXJpZ2h0IChvc3ggbWJwKS5cbiwgOTU6ICc8c2xlZXA+J1xuLCAxMDY6ICc8bnVtLSo+J1xuLCAxMDc6ICc8bnVtLSs+J1xuLCAxMDg6ICc8bnVtLWVudGVyPidcbiwgMTA5OiAnPG51bS0tPidcbiwgMTEwOiAnPG51bS0uPidcbiwgMTExOiAnPG51bS0vPidcbiwgMTQ0OiAnPG51bS1sb2NrPidcbiwgMTQ1OiAnPHNjcm9sbC1sb2NrPidcbiwgMTYwOiAnPHNoaWZ0LWxlZnQ+J1xuLCAxNjE6ICc8c2hpZnQtcmlnaHQ+J1xuLCAxNjI6ICc8Y29udHJvbC1sZWZ0PidcbiwgMTYzOiAnPGNvbnRyb2wtcmlnaHQ+J1xuLCAxNjQ6ICc8YWx0LWxlZnQ+J1xuLCAxNjU6ICc8YWx0LXJpZ2h0PidcbiwgMTY2OiAnPGJyb3dzZXItYmFjaz4nXG4sIDE2NzogJzxicm93c2VyLWZvcndhcmQ+J1xuLCAxNjg6ICc8YnJvd3Nlci1yZWZyZXNoPidcbiwgMTY5OiAnPGJyb3dzZXItc3RvcD4nXG4sIDE3MDogJzxicm93c2VyLXNlYXJjaD4nXG4sIDE3MTogJzxicm93c2VyLWZhdm9yaXRlcz4nXG4sIDE3MjogJzxicm93c2VyLWhvbWU+J1xuXG4gIC8vIGZmL29zeCByZXBvcnRzICc8dm9sdW1lLW11dGU+JyBmb3IgJy0nXG4sIDE3MzogaXNPU1ggJiYgbWF5YmVGaXJlZm94ID8gJy0nIDogJzx2b2x1bWUtbXV0ZT4nXG4sIDE3NDogJzx2b2x1bWUtZG93bj4nXG4sIDE3NTogJzx2b2x1bWUtdXA+J1xuLCAxNzY6ICc8bmV4dC10cmFjaz4nXG4sIDE3NzogJzxwcmV2LXRyYWNrPidcbiwgMTc4OiAnPHN0b3A+J1xuLCAxNzk6ICc8cGxheS1wYXVzZT4nXG4sIDE4MDogJzxsYXVuY2gtbWFpbD4nXG4sIDE4MTogJzxsYXVuY2gtbWVkaWEtc2VsZWN0PidcbiwgMTgyOiAnPGxhdW5jaC1hcHAgMT4nXG4sIDE4MzogJzxsYXVuY2gtYXBwIDI+J1xuLCAxODY6ICc7J1xuLCAxODc6ICc9J1xuLCAxODg6ICcsJ1xuLCAxODk6ICctJ1xuLCAxOTA6ICcuJ1xuLCAxOTE6ICcvJ1xuLCAxOTI6ICdgJ1xuLCAyMTk6ICdbJ1xuLCAyMjA6ICdcXFxcJ1xuLCAyMjE6ICddJ1xuLCAyMjI6IFwiJ1wiXG4sIDIyMzogJzxtZXRhPidcbiwgMjI0OiAnPG1ldGE+JyAgICAgICAvLyBmaXJlZm94IHJlcG9ydHMgbWV0YSBoZXJlLlxuLCAyMjY6ICc8YWx0LWdyPidcbiwgMjI5OiAnPGltZS1wcm9jZXNzPidcbiwgMjMxOiBpc09wZXJhID8gJ2AnIDogJzx1bmljb2RlPidcbiwgMjQ2OiAnPGF0dGVudGlvbj4nXG4sIDI0NzogJzxjcnNlbD4nXG4sIDI0ODogJzxleHNlbD4nXG4sIDI0OTogJzxlcmFzZS1lb2Y+J1xuLCAyNTA6ICc8cGxheT4nXG4sIDI1MTogJzx6b29tPidcbiwgMjUyOiAnPG5vLW5hbWU+J1xuLCAyNTM6ICc8cGEtMT4nXG4sIDI1NDogJzxjbGVhcj4nXG59XG5cbmZvcihpID0gNTg7IGkgPCA2NTsgKytpKSB7XG4gIG91dHB1dFtpXSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoaSlcbn1cblxuLy8gMC05XG5mb3IoaSA9IDQ4OyBpIDwgNTg7ICsraSkge1xuICBvdXRwdXRbaV0gPSAoaSAtIDQ4KSsnJ1xufVxuXG4vLyBBLVpcbmZvcihpID0gNjU7IGkgPCA5MTsgKytpKSB7XG4gIG91dHB1dFtpXSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoaSlcbn1cblxuLy8gbnVtMC05XG5mb3IoaSA9IDk2OyBpIDwgMTA2OyArK2kpIHtcbiAgb3V0cHV0W2ldID0gJzxudW0tJysoaSAtIDk2KSsnPidcbn1cblxuLy8gRjEtRjI0XG5mb3IoaSA9IDExMjsgaSA8IDEzNjsgKytpKSB7XG4gIG91dHB1dFtpXSA9ICdGJysoaS0xMTEpXG59XG4iXX0=
