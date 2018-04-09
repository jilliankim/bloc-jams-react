import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
  render() {
    return (
      <div className="App">
         <header>
           <nav>
             <Link to='/'>Landing</Link>
             <Link to='/library'>Library</Link>
           </nav>
           <h1>Bloc Jams</h1>
         </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <main>
           <Route exact path="/" component={Landing} />
           <Route path="/library" component={Library} />

           {/* Album route differentiates between different albums
               by specifying a URL parameter that begins with a :.
               React Router treats the URL position as a dynamic parameter
               and its value is passed to the component as a property.
               Here, a slug is text that's been formatted to be acceptable in
               a different format.
            */}
           <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
