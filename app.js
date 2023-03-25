let container= document.getElementById('container');
let prevBtn = document.getElementById('prev');
let playBtn = document.getElementById('play');
let nextBtn = document.getElementById('next');
let audio = document.getElementById('audio');
let artist = document.getElementById('artist');
let title = document.getElementById('title');
let cover = document.getElementById('cover');
let progress = document.getElementById('progress');
let progressContainer= document.getElementById('progress-container');
let playIcon = document.getElementById('play-pause-icon');
let shuffleBtn = document.getElementById('shuffle');
let loop = document.getElementById('loop');
let audioCurrentTime = document.querySelector('.curent-time');
let audioDuration = document.querySelector('.total-duration');
let content = document.querySelector('.content');
let detailsContainer = document.querySelector('.details');
let volumeSwitch = document.querySelector('#volume');
let repeatsIcon = document.querySelector('.repeats');
let mute = document.querySelector('.mute');
let preloader = document.querySelector('#loader');
let currentSong = document.querySelector('#current-song-index')
let totalSong = document.querySelector('#total-song')

let song = ['number one', 'love you', 'guide me' ,'paradise', 'freedom', 'one big family'];
let songIndex = 0;
let songLength = song.length;
audio.volume = 0.5;

loadSong(song[songIndex]);

function loadSong(song) {
    title.innerHTML = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
    artist.innerHTML = `maher zain`;
    currentSong.innerHTML = songIndex + 1;
    totalSong.innerHTML = songLength
}

function playSong() {
    container.classList.add('play')
    playIcon.classList.replace('fa-play' , 'fa-pause');
    audio.play();  
}
function pauseSong() {
    container.classList.remove('play')
    playIcon.classList.replace('fa-pause' , 'fa-play');
    audio.pause();
}
playBtn.addEventListener('click' , () => {
    let isPlaying = container.classList.contains('play');

    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

function nextSong() {
    songIndex++
    if (songIndex  > songLength - 1) {
        songIndex = 0
    }
    loadSong(song[songIndex])
    playSong()
}

function prevSong() {
    songIndex--
    if (songIndex < 0) {
        songIndex = songLength - 1;
    }
    loadSong(song[songIndex])
    playSong()
}

function setProgress(e) {
    let width = this.clientWidth;
    const clickX = e.offsetX;
    let duration = audio.duration;
   audio.currentTime = (clickX / width) * duration
}

//what to do if song has ended
function decideSong() {
    if (loop.classList.contains('active')) {
        activate()
    }else if(shuffleBtn.classList.contains('active')){
        shuffle()
    }
    else{
        nextSong()
    }  
}
//shuffle
function activateShuffle() {
    shuffleBtn.classList.toggle('active');
   
    if (shuffleBtn.classList.contains('active')) {
        content.innerHTML = 'shuffle is on';
        counter = 0;
    } else {
        content.innerHTML = 'shuffle is off';
        counter = 0;
    }

    containsActive()
}
function shuffle() {
    songIndex = Math.floor(Math.random() * songLength);
    loadSong(song[songIndex])
    playSong()
}


//loop section
let clickedTime = 0;
function currentClick() {
  
switch (clickedTime) {
    case 0:
        clickedTime++;
        loop.classList.add('active');;
        content.innerHTML = 'repeat current song.';
        break;
    case 1:
        clickedTime++
        content.innerHTML = 'stop after current song.'
        repeatsIcon.classList.replace('fa-repeat' , 'fa-arrow-right-from-bracket' );
        break;
    case 2:
        clickedTime++
        content.innerHTML = 'stop after last song.'
        repeatsIcon.classList.replace('fa-arrow-right-from-bracket' , 'fa-arrow-trend-down');
        break;
    case 3:
       clickedTime = 0
       content.innerHTML = 'repeat is off.';
       loop.classList.remove('active');
       repeatsIcon.classList.replace('fa-arrow-trend-down' ,'fa-repeat');;
       break;
    }
     containsActive() 
}

function activate() {
switch (clickedTime) {
    case 1:
        repeatSong()
        break;
    case 2:
        pauseAfterCurrentSong()
        break;
    case 3:
        pauseAfterLastSong()
        break;
}
}

function repeatSong() {
       let currentSongIndex = songIndex;
       loadSong(song[currentSongIndex]);
       playSong()    
}

function pauseAfterCurrentSong() {
    nextSong()
    setTimeout(()=>{
      pauseSong()
    },200)
}

function pauseAfterLastSong() {
    let newSongIndex = songLength - 1
   if (song[songIndex] === song[newSongIndex]) {
        nextSong()
    setTimeout(()=>{
      pauseSong()
    },200)
      } else {
      nextSong()
    }
}

//update time
function updateTime() {
    if(audio.duration){            
        let currentMins = Math.floor(audio.currentTime / 60)
        let currentSecs =  Math.floor(audio.currentTime - currentMins * 60)

        let durationMins = Math.floor(audio.duration / 60)
        let durationSecs =  Math.floor(audio.duration - durationMins * 60)
        if(currentSecs < 10){
            currentSecs = `0${currentSecs}`
        }
        if(currentMins < 10){
            currentMins = `0${currentMins}`
        }
        if(durationSecs < 10){
            durationSecs = `0${durationSecs}`
        }
        if(durationMins < 10){
            durationMins = `0${durationMins}`
        }

        audioCurrentTime.innerHTML = `${currentMins}:${currentSecs}`;
        audioDuration.innerHTML = `${durationMins}:${durationSecs}`;
    }else{
        audioCurrentTime.innerHTML = `00:00`;
        audioDuration.innerHTML = `00:00`;
    }

    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${percent}%`;  
}
//volume
function changeVolume() {
    audio.volume = volumeSwitch.value / 100;
    content.innerHTML = `<i class="fa-solid fa-volume-high"></i> ${volumeSwitch.value}%`;
    if (audio.volume === 0) {
        mute.classList.replace('fa-volume-high' ,'fa-volume-xmark')
    } else {
        mute.classList.replace('fa-volume-xmark' , 'fa-volume-high' );
    }
    containsActive()
}

//mute
function muteSwitch() {
    mute.classList.toggle('active')
   if(mute.classList.contains('active')){
        audio.volume = 0
        volumeSwitch.value = 0
        mute.classList.replace('fa-volume-high' ,'fa-volume-xmark');
        content.innerHTML = `<i class="fa-solid fa-volume-xmark"></i> mute is on`
   }else{
    audio.volume = 0.5
    mute.classList.replace('fa-volume-xmark' , 'fa-volume-high' );
    volumeSwitch.value = 50;
    content.innerHTML = `<i class="fa-solid fa-volume-high"></i> mute is off`
   }
   containsActive()
}

function updateProgress(e) {
    // offX = where it's clicked | ofW = prog Width
    const scrubTime = (e.offsetX / progressContainer.offsetWidth) * audio.duration;
    audio.currentTime = scrubTime;
}

//messages displayed in details
function containsActive() {
    if (content.innerHTML !== '') {
        detailsContainer.classList.add('active');
    }
}

setInterval(check,3000)
function check() {
    if (content.innerHTML === '') {
        return
     } else {
      setTimeout(()=>{
        detailsContainer.classList.remove('active')
      },3000)
     }  
}
window.addEventListener('load' , ()=>{
    preloader.style.display = 'none'
})

//event listeners
prevBtn.addEventListener('click' , prevSong);
nextBtn.addEventListener('click' , nextSong);
audio.addEventListener('ended' , decideSong)
shuffleBtn.addEventListener('click' , activateShuffle );
loop.addEventListener('click' , currentClick);
audio.addEventListener('timeupdate' , updateTime);
volumeSwitch.addEventListener('change' , changeVolume);
progressContainer.addEventListener('click', updateProgress);
mute.addEventListener('click' , muteSwitch)


