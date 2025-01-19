import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  audio: HTMLAudioElement;
  tracks: Array<any> = [];
  trackLoaded: number = 0;
  play: boolean = false;
  pause: boolean = false;
  shuffle: boolean = false;
  repeat: boolean = false;

  constructor() {
    this.audio = new Audio();
  }

  initializeTracks() {
    const trackNames = [
      'Ornatos Violeta - Capitão Romance',
      'Ornatos Violeta - Punk Moda Funk',
      'Ornatos Violeta - Ouvi Dizer',
    ];

    trackNames.forEach((trackName, index) => {
      const track = {
        name: `track-${index + 1}`,
        artist: 'Ornatos Violeta',
        url: `http://uber-dick.com/music/${trackName}.mp3`,
        duration: 0,
      };

      const audioForDuration = new Audio(track.url);
      audioForDuration.addEventListener('loadedmetadata', () => {
        track.duration = audioForDuration.duration;
      });
      
      this.tracks.push(track);
    });
  }

  playTrack() {
    if (!this.play) {
      this.audio.src = this.tracks[this.trackLoaded].url;
      this.audio.play();
      this.play = true;
    }
  }

  pauseTrack() {
    if (this.play) {
      this.audio.pause();
      this.pause = true;
    }
  }

  stopTrack() {
    if (this.play) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.play = false;
    }
  }

  nextTrack() {
    if (this.trackLoaded < this.tracks.length - 1) {
      this.trackLoaded++;
    } else if (this.shuffle) {
      this.trackLoaded = Math.floor(Math.random() * this.tracks.length);
    } else {
      this.trackLoaded = 0;
    }
    this.audio.src = this.tracks[this.trackLoaded].url;
    this.audio.play();
  }

  prevTrack() {
    if (this.trackLoaded > 0) {
      this.trackLoaded--;
    } else {
      this.trackLoaded = this.tracks.length - 1;
    }
    this.audio.src = this.tracks[this.trackLoaded].url;
    this.audio.play();
  }

  setVolume(volume: number) {
    this.audio.volume = volume;
  }

  toggleShuffle() {
    this.shuffle = !this.shuffle;
  }

  toggleRepeat() {
    this.repeat = !this.repeat;
    this.audio.loop = this.repeat;
  }

  getTimeElapsed() {
    return this.audio.currentTime;
  }

  getTimeRemaining() {
    return this.audio.duration - this.audio.currentTime;
  }

  getTrackInfo() {
    return this.tracks[this.trackLoaded];
  }

  updateTimeDisplay() {
    const currentTime = this.audio.currentTime;
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}
