import React, { Component } from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import '../App.css';
import ReviewCard from './ReviewCard';
import { Dropdown, Icon, Menu, Segment, Card } from 'semantic-ui-react';
import uuid from 'uuid';

export default class ReviewContainer extends React.Component {

  header = (
    <Menu attached='top'>
      <Dropdown icon="film" item simple >
        <Dropdown.Menu>
          <Dropdown.Item as={NavLink} exact to="/">Home</Dropdown.Item>
          <Dropdown.Item as={NavLink} exact to="/reviews">Latest Reviews</Dropdown.Item>
          <Dropdown.Item as={NavLink} exact to="/critics-picks">Critic's Picks</Dropdown.Item>
          <Dropdown.Item>
            <Icon name='dropdown' />
            <span className='text'>New</span>
            <Dropdown.Menu>
              <Dropdown.Item>Review</Dropdown.Item>
              <Dropdown.Item>Critic</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Item>
          <Dropdown.Item>Our Critics</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Menu.Menu position='right'>
        <div className='ui right aligned category search item'>
          <div className='ui transparent icon input'>
            <input className='prompt' type='text' placeholder='Search reviews...' onChange={this.props.handleChange} />
            <i className='search link icon' onClick={this.props.handleSubmit} />
          </div>
        </div>
      </Menu.Menu>
    </Menu>
    //     <img src="http://1000logos.net/wp-content/uploads/2017/04/Symbol-New-York-Times.png" />
  )

  home = () => (
    <div>
      <h1>Welcome to the New York Times Film Review Repository</h1>
      <p>Would you like to:</p>
      <ul>
        <li><Link to="/reviews">See the latest reviews</Link></li>
        <li><Link to="/reviews/new">Add a new review</Link></li>
        <li><Link to="/reviews/search">Search for a review or critic</Link></li>
      </ul>
    </div>
  )

  createReviewCards = () => {
    return this.filterReviews().map(review => <ReviewCard review={review} key={ uuid() } />)
  }

  filterReviews = () => {
    return this.props.reviews.filter(review => {
      return review.movie.toLowerCase().includes(this.props.searchInput.toLowerCase()) || review.byline.toLowerCase().includes(this.props.searchInput.toLowerCase())
    })
  }

  searchResults = () => {
    return this.props.searchResults.map(review => <ReviewCard review={review} key={ uuid() } />)
  }

  centerCards = () => {
    let arr = this.createReviewCards().map(rev => rev.props.review);
    console.log(arr);

    return <Card.Group centered items={arr}/>

    // return this.props.searchResults.length ? <Card.Group centered items={this.searchResults}/> : <Card.Group centered items={this.createReviewCards}/>
  }

  render() {
    return (
      <div>
        {this.header}
        <Segment attached='bottom'>
          <Route exact path="/" component={this.home} />
          <div className="ui special cards">
            <Route path="/reviews" component={this.centerCards} />
            {/* <Route path="/critics" component={} /> */}
          </div>
        </Segment>
      </div>
    );
  }


}
