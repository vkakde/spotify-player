import React, { Component } from 'react';
import SearchTrack from './Components/SearchTrack';
import SearchResults from './Components/SearchResults';
var axios = require("axios");
var expiresIn=0;
var accessToken = '';
var accessTokenTimestamp=0;

class App extends Component {
  constructor(){
    super();
    this.state = {
      accessToken,
      searchResults_Albums :[],
      searchResults_Artists :[],
      searchResults_Tracks :[]
    };
  }

  componentWillMount(){
  }

  componentDidMount(){
    ///\cite https://github.com/spotify/web-api/issues/321
    if(accessTokenTimestamp === 0 || Date.now() - accessTokenTimestamp <= 100){
      axios.request({
        url: "https://cs-554-spotify-proxy.herokuapp.com/api/token",
        method: "post",
        baseURL: "https://cs-554-spotify-proxy.herokuapp.com/api",
        auth: {
          username: "b834819d7690472294e6c007203d5661",
          password: "47032318605f45e2ac66a7dfff2e2786"
        },
        data: {
          "grant_type": "client_credentials",
          "scope": "public"
        }
      }).then(function(res) {
        expiresIn = res.data.expires_in;
        accessToken = res.data.access_token;
        accessTokenTimestamp = Date.now();
        console.log("Access Token acquired successfully. Expires in: "+expiresIn+"\nToken timestamp: "+accessTokenTimestamp);
      });
    }
  }

  handleSearchTrack(searchQuery){
      axios({
         url: 'https://cs-554-spotify-proxy.herokuapp.com/v1/search',
         method: 'get',
         params:{
           q: searchQuery,
           type: "artist,album,track"
         },
         headers: {
           Authorization: `Bearer ${accessToken}`
         }
       }).then((searchResults) => {
        this.setState({searchResults_Albums:searchResults.data.albums.items});
        this.setState({searchResults_Artists:searchResults.data.artists.items});
        this.setState({searchResults_Tracks:searchResults.data.tracks.items});
        this.setState({accessToken:accessToken})
        console.log(this.state.searchResults_Tracks[0]);
      })
  }

  render() {
    return (
      <div className="container">
        <SearchTrack searchTrack={this.handleSearchTrack.bind(this)} />
        <hr />
        <SearchResults accessToken={this.state.accessToken} searchResults_Tracks={this.state.searchResults_Tracks} />
      </div>
    );
  }
}

export default App;
