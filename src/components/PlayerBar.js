 import React, { Component } from 'react';
 
 {/* HTML for the controls will be added to PlayerBar component render method */}
 class PlayerBar extends Component {
   render() {
     return (
       <section className="player-bar">
         <section id="buttons">
           <button id="previous" onClick={this.props.handlePrevClick}>
             <span className="ion-skip-backward"></span>
           </button>
           {/* Refactor play-pause icon to reflect the state of play */}
           <button id="play-pause" onClick={this.props.handleSongClick} >
             <span className={this.props.isPlaying ? 'ion-pause' : 'ion-play'}></span>
           </button>
           <button id="next" onClick={this.props.handleNextClick}>
             <span className="ion-skip-forward"></span>
           </button>
         </section>
         <section id="time-control"> 
           <div className="current-time">{this.props.currentTime}</div>
           <input 
             type="range" 
             className="seek-bar" 
             value={(this.props.currentTime / this.props.duration) || 0} 
             max="1" 
             min="0" 
             step="0.01" 
             onChange={this.props.handleTimeChange}
           />   
           <div className="total-time">{this.props.duration}</div>
         </section>
         <section id="volume-control">
           <div className="current-volume">{this.props.currentVolume}</div>
           <input 
             type="range" 
             className="seek-bar" 
             value={this.props.currentVolume} 
             max="10" 
             min="0" 
             step="0.5" 
             onChange={this.props.handleVolumeChange}
           />   
           <div className="icon ion-volume-high"></div>
         </section>
       </section>
     );
   }
 }
 
 export default PlayerBar;
