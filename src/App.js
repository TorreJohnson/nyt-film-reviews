import React, { Component } from 'react';
import ReviewContainer from './components/ReviewContainer';
import NYT_API_KEY from './components/ApiKey';

// https://api.nytimes.com/svc/movies/v2/reviews/all.json?api-key=cfe93295999e4a3093ea16d8f40bac5a&offset=20

class App extends Component {

  state = {
    reviews: [],
    reviewers: [],
    searchInput: '',
    searchResults: []
  }

  fetchReviews = () => {
    fetch(`https://api.nytimes.com/svc/movies/v2/reviews/all.json?api-key=${NYT_API_KEY}`)
      .then(res => res.json())
      .then(reviews => this.addRecentReviewsToState(reviews.results))
  }

  fetchCritics = () => {
    fetch(`https://api.nytimes.com/svc/movies/v2/critics/full-time.json?api-key=${NYT_API_KEY}`)
      .then(res => res.json())
      .then(critics => console.log(critics.results))
  }

  searchReviews = () => {
    fetch(`https://api.nytimes.com/svc/movies/v2/reviews/all.json?api-key=${NYT_API_KEY}&query=${this.state.searchInput}`)
      .then(res => res.json())
      .then(searchResults => this.setState({
        searchResults: searchResults.results
      }))
  }

  addRecentReviewsToState = (reviews) => {
    reviews.map(review => {
      this.setState({
        reviews: [...this.state.reviews, {
          byline: review.byline,
          movie: review.display_title,
          headline: review.headline,
          rating: review.mpaa_rating,
          openingDate: review.opening_date,
          printed: review.publication_date,
          summary: review.summary_short,
          url: review.link.url,
          image: review.multimedia.src
        }]
      })
    })
  }

  componentDidMount() {
    this.fetchReviews();
  }

  handleChange = (event) => {
    this.setState({
      searchInput: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.searchReviews();
  }

  render() {
    return (
      <ReviewContainer reviews={this.state.reviews} critics={this.state.critics} searchInput={this.state.searchInput} handleChange={this.handleChange} searchInput={this.state.searchInput} handleSubmit={this.handleSubmit} searchResults={this.state.searchResults} />
    )
  }
}

export default App;
