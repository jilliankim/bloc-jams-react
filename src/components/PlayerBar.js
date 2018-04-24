 import React, { Component } from 'react';
 import { Container, Button, ButtonGroup, Row, Col } from 'reactstrap';
 import '../styles/PlayerBar.css';
 
 class PlayerBar extends Component {
   render() {
     return (
       <Container>
         <Row >
         <Col xs="6" sm="4" align="center">
         <section id="time-control"> 
           <div className="current-time">{this.props.formatTime(this.props.currentTime)}</div>
           <input 
             type="range" 
             className="seek-bar" 
             value={(this.props.currentTime / this.props.duration) || 0} 
             max="1" 
             min="0" 
             step="0.01" 
             onChange={this.props.handleTimeChange}
           />   
           <div className="total-time">{this.props.formatTime(this.props.duration)}</div>
         </section>
         </Col>
         <Col xs="6" sm="4">
         <ButtonGroup size="lg">
           <Button id="previous" onClick={this.props.handlePrevClick}>
             <span className="ion-skip-backward"></span>
           </Button>
           <Button id="play-pause" onClick={this.props.handleSongClick} >
             <span className={this.props.isPlaying ? 'ion-pause' : 'ion-play'}></span>
           </Button>
           <Button id="next" onClick={this.props.handleNextClick}>
             <span className="ion-skip-forward"></span>
           </Button>
         </ButtonGroup>
         </Col>
         <Col xs="6" sm="4">
         <section id="volume control">
           <Row>
           <Col className="icon ion-volume-low text-left"></Col>
           <Col className="icon ion-volume-high text-right"></Col>
           </Row>
           <Col >
           <input 
             type="range" 
             className="seek-bar" 
             value={this.props.currentVolume} 
             max="10" 
             min="0" 
             step="0.5" 
             onChange={this.props.handleVolumeChange}
           />   
           </Col>
         </section>
        </Col>
        </Row>
       </Container>
     );
   }
 }
 
 export default PlayerBar;
