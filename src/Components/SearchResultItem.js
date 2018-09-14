import React, { Component } from 'react';
var axios = require("axios");
var accessToken = ' ';

class SearchResultItem extends Component {
  componentDidMount(){
    accessToken=this.props.accessToken;
  }

  handleViewArtist(){
      axios({
         url: this.props.searchResult.artists[0].href,
         method: 'get',
         headers: {
           Authorization: `Bearer ${accessToken}`
         }
       })
  }

  handleViewAlbum(){
      axios({
         url: this.props.searchResult.album.href,
         method: 'get',
         headers: {
           Authorization: `Bearer ${accessToken}`
         }
       })
  }

  render() {
    return (
      <div className="col-sm-12 col-md-6 col-lg-4">
        <div className="card text-center">
          <div className="card-header">{this.props.searchResult.artists[0].name} - {this.props.searchResult.name}</div>
          <div><img height="270" width="270" src={this.props.searchResult.album.images[0].url} alt="Unavailable"/></div>
        <div>
            <audio controls>
              <source src={this.props.searchResult.preview_url} />
            </audio>
          </div>
          <div className="card-text">Album: <a href={this.props.searchResult.album.href}>{this.props.searchResult.album.name}</a></div>
          <div className="card-text">Artist: <a href={this.props.searchResult.artists[0].href}>{this.props.searchResult.artists[0].name}</a></div>
          <div className="card-text">Popularity: {this.props.searchResult.popularity}</div>
          <br/>
        </div>
        </div>
    );
  }
}

SearchResultItem.propTypes = {
  searchResult: React.PropTypes.object
}

export default SearchResultItem;
