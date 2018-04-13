 import React, { Component } from 'react';
 
 {/* Player bar needs previous, play-pause and next buttons, time control and volume control sliders. */}
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
           <button id="next">
             <span className="ion-skip-forward"></span>
           </button>
         </section>
         <section id="time-control"> 
           <div className="current-time">–:––</div>
           <input type="range" className="seek-bar" value="0" />
           <div className="total-time">–:––</div>
         </section>
         <section id="volume-control">
           <div className="icon ion-volume-low"></div>
           <input type="range" className="seek-bar" value="80" />
           <div className="icon ion-volume-high"></div>
         </section>
       </section>
     );
   }
 }
 
 export default PlayerBar;
