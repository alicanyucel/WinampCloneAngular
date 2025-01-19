import { Component, OnInit } from '@angular/core';
import { MediaService } from './media.service';
  
  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent implements OnInit {
    constructor(public mediaService: MediaService) {}
  
    ngOnInit() {
      this.mediaService.initializeTracks();
    }
  
    play() {
      this.mediaService.playTrack();
    }
  
    pause() {
      this.mediaService.pauseTrack();
    }
  
    stop() {
      this.mediaService.stopTrack();
    }
  
    next() {
      this.mediaService.nextTrack();
    }
  
    prev() {
      this.mediaService.prevTrack();
    }
  
    setVolume(event: any) {
      this.mediaService.setVolume(event.target.value / 100);
    }
  
    toggleShuffle() {
      this.mediaService.toggleShuffle();
    }
  
    toggleRepeat() {
      this.mediaService.toggleRepeat();
    }
  
    getTimeElapsed() {
      return this.mediaService.updateTimeDisplay();
    }
  
    getTrackInfo() {
      const track = this.mediaService.getTrackInfo();
      return `${track.name} (${Math.floor(track.duration / 60)}:${Math.floor(track.duration % 60)})`;
    }
  }
  