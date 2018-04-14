import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
   constructor(props) {
     super(props);
 
     const album = albumData.find( album => {
       {/* Use the params object to access the slug URL parameter. */}
       return album.slug === this.props.match.params.slug;
     });
 
     this.state = {
       album: album,
       currentSong: album.songs[0],
       currentTime: 0,
       currentVolume: 0,
       duration: album.songs[0].duration,
       isPlaying: false
     };

     this.audioElement = document.createElement('audio');
     this.audioElement.src = album.songs[0].audioSrc;
   }

   componentDidMount() {
     this.eventListeners = {
       timeupdate: e => {
         this.setState({ currentTime: this.audioElement.currentTime });
       },
       durationchange: e => {
         this.setState({ duration: this.audioElement.duration });
       },
       volumeupdate: e => {
         this.setState({ currentVolumne: this.audioElement.currentVolume });
       },
     };
     this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
     this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
     this.audioElement.addEventListener('volumeupdate', this.eventListeners.volumeupdate);
   }

   componentWillUnmount() {
     this.audioElement.src = null;
     this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
     this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
     this.audioElement.removeEventListener('volumeupdate', this.eventListeners.volumeupdate);
   }

   play() {
     this.audioElement.play();
     this.setState({ isPlaying: true });
   }
 
   pause() {
     this.audioElement.pause();
     this.setState({ isPlaying: false });
   }   
 
   setSong(song) {
     this.audioElement.src = song.audioSrc;
     this.setState({ currentSong: song });
   }

   handleSongClick(song) {
     const isSameSong = this.state.currentSong === song;
     if (this.state.isPlaying && isSameSong) {
       this.pause();
     } else {
       if (!isSameSong) { this.setSong(song); }
       this.play();
     }
   }

   handlePrevClick() {
      const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
      const newIndex = Math.max(0, currentIndex - 1);
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play(newSong);
   }

   handleNextClick() {
      const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
      const newIndex = Math.min(this.state.album.songs.length - 1, currentIndex + 1);
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play(newSong);
   }

   handleTimeChange(e) {
     const newTime = this.audioElement.duration * e.target.value;
     this.audioElement.currentTime = newTime;
     this.setState({ currentTime: newTime });
   } 

   handleVolumeChange(e) {
     const newVolume = e.target.value;
     this.audioElement.currentVolume = newVolume;
     this.setState({ currentVolume: newVolume });
   } 

   formatTime(timeParam){
     if (isNaN(timeParam))
	 return "-:--";

     var minutes = Math.floor(timeParam / 60);
     var seconds = timeParam - (minutes * 60);

     if (minutes < 10) {minutes = "0" + minutes;}
     if (seconds < 10) {seconds = "0" + seconds;}
     var time = minutes + ":" + seconds;
     return time;
   }

   render() {
     return (
       <section className="album">
         <section id="album-info">
           <img id="album-cover-art" src={this.state.album.albumCover} />
           <div className="album-details">
             <h1 id="album-title">{this.state.album.title}</h1>
             <h2 className="artist">{this.state.album.artist}</h2>
             <div id="release-info">{this.state.album.releaseInfo}</div>
           </div>
         </section>
         <table id="song-list">
           <colgroup>
             <col id="song-number-column" />
             <col id="song-title-column" />
             <col id="song-duration-column" />
           </colgroup>  
           <tbody>
	        {/* Render song list of album */}
	        {this.state.album.songs.map((song, index) =>
		      <tr className="song" key={index} onClick={() => this.handleSongClick(song)} >
			<td className="song-actions">
                   	   <button>
                     		<span className="song-number">{index+1}</span>
                     		<span className="ion-play"></span>
                     		<span className="ion-pause"></span>
                   	   </button>
                 	</td>
			<td className="song-title">{song.title}</td>
			<td className="song-duration">{this.formatTime(song.duration)}</td>
	              </tr>
                )}
           </tbody>
         </table>
         {/* Pass down handleSongClick as a prop for it to be triggered in Album */}
         <PlayerBar
           isPlaying={this.state.isPlaying}
           currentSong={this.state.currentSong}
           currentTime={this.audioElement.currentTime}
           currentVolume={this.audioElement.currentVolume}
           duration={this.audioElement.duration}
           handleSongClick={() => this.handleSongClick(this.state.currentSong)}
           handlePrevClick={() => this.handlePrevClick()}
           handleNextClick={() => this.handleNextClick()}
           handleTimeChange={(e) => this.handleTimeChange(e)}
           handleVolumeChange={(e) => this.handleVolumeChange(e)}
           formatTime={(this.formatTime())}
         />
       </section>
     );
   }
 }

export default Album;
