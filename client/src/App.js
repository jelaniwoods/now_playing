import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor() {
    super()
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
        name: 'Not Checked',
        image: '',
        pn: '',
        images: [],
        test: ''
      }
    }
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
      console.log('LOGGED');
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }
  getNowPlaying() {
    spotifyWebApi.getMyCurrentPlayingTrack()
      .then((response) => {
        this.setState({
          nowPlaying: {
            name: response.item.name,
            image: response.item.album.images[0].url
          }
        })
        console.log(this.state.nowPlaying.image)
      })
  }

  render() {
    return (
      <div className="App">
        <a href='http://localhost:8888' > Login to Spotify </a>
        <div>
          Now Playing: { this.state.nowPlaying.name }
        </div>
        <div>
          <img src={this.state.nowPlaying.image} style={{ height: 300, width: 300 }}/>
        </div>
        { this.state.loggedIn &&
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        }

      </div>
    );
  }
}

export default App;
