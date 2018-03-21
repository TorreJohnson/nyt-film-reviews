import React from 'react'
import { Card, Icon } from 'semantic-ui-react'

const ReviewCard = (props) => {
  const extra = (
    <a>
      <Icon name='write' />
      Written By: {props.review.byline}
    </a>
  )

  return (
    <Card
      image={props.review.image}
      header={props.review.movie}
      meta={props.review.openingDate}
      description={props.review.summary}
      extra={extra}
    />
  )
}

export default ReviewCard;
