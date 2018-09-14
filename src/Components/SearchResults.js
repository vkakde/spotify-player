import React, { Component } from 'react';
import SearchResultItem from './SearchResultItem';

class SearchResults extends Component {
  render() {
    let searchResultItems;
    if(this.props.searchResults_Tracks){
      searchResultItems = this.props.searchResults_Tracks.map(searchResult => {
        //console.log("Search Result: "+searchResult.name);
        return (
          <SearchResultItem key={searchResult.id} accessToken={this.props.accessToken} searchResult={searchResult} />
        );
      });
    }
    return (
      <div className="row">
          {searchResultItems}
      </div>
    );
  }
}

SearchResults.propTypes = {
  searchResults_Tracks: React.PropTypes.array,
  searchResultItems: React.PropTypes.array
}

export default SearchResults;
