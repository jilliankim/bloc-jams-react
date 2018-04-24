import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import { Media, Row, Col, Image } from 'reactstrap';
import '../styles/Library.css';

 class Library extends Component { 
   constructor(props) {
     super(props);

     {/* assign albumData to the album property of the state object. */}
     this.state = { albums: albumData };
   }
 
   render() {
    return ( 
      <Row className='library'>
        {
          this.state.albums.map( (album, index) => 
          <Col xs="6" sm="4" key={index} className="library-album-section">
            <Link to={`/album/${album.slug}`} key={index}>
               <div className="library-album-title">{ album.title }</div>
               {/* Display additional data about each album with
                   albumCover, artist and number of songs. */}
               <Media object data-src="album-cover-art" responsive src={album.albumCover} alt={album.title} height={274} width={340} />
               <div>{album.artist}</div>
               <div>{album.songs.length} songs</div>
            </Link>
          </Col>
          )
        }
      </Row>
     );
   }
 }

export default Library;
