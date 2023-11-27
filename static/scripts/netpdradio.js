var playing = false;
var play_content = '<img src="/images/play.png" alt="playback" id="nr_playbutton">';
var pause_content = '<img src="/images/pause.png" alt="pause" id="nr_playbutton">';
var radio = new Audio();
var volume = 1.0;

var button = null;
var slider = null;
var title = null;
var timer = null;
  
const getJSON = async url => {
  const response = await fetch(url);
  if(!response.ok) // check if response worked (no 404 errors etc...)
    throw new Error(response.statusText);

  const data = response.json(); // get JSON from the response
  return data; // returns a promise, which resolves to this data value
}


function reload_icy_title() {
  getJSON("https://radio.netpd.org:8443/status-json.xsl").then(data => {
    title.innerHTML = data.icestats.source[4].title;
  }).catch(error => {
    console.error(error);
  });
}

function buttonclick(button) {
  if (playing) {
    playing = false;
    button.innerHTML = play_content;
    radio.pause();
    radio.src = '';
    clearInterval(timer);
    title.innerHTML = '&nbsp;';
  } else {
    playing = true;
    button.innerHTML = pause_content;
    radio = new Audio('https://radio.netpd.org:8443/netpd.mp3')
    radio.volume = volume;
    radio.play();
    reload_icy_title();
    timer = setInterval(function () {
      reload_icy_title();
    }, 5000);
  }
}
  
function changevolume(vol) {
  volume = vol
  radio.volume = volume;
}


window.addEventListener("DOMContentLoaded", function() {
  button = document.getElementById('nr_button');
  button.addEventListener('click', function() {
    buttonclick(button);
  });
  slider = document.getElementById('nr_slider');
  slider.addEventListener('input', function() {
    volume = (this.value/100)*(this.value/100);
    changevolume(volume);
  });
  title = document.getElementById('nr_title');
  
}, false);


