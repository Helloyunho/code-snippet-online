import React from 'react'
import {
  Card,
  CardPrimaryAction,
  CardActions,
  CardActionIcons,
  CardActionIcon,
  CardMedia
} from '@rmwc/card'
import { Typography } from '@rmwc/typography'
import { Link } from 'react-router-dom'
import noImage from './no-image.svg'

const SnippetCard = (props) => {
  const { name, author, desc, id } = props
  const thumbnail = props.thumbnail || noImage
  return (
    <Card>
      <CardPrimaryAction tag={Link} to={`/snippet/${id}`}>
        <CardMedia
          sixteenByNine
          style={{
            backgroundImage: `url(${thumbnail})`
          }}
        />
        <div style={{ padding: '0 1rem 1rem 1rem' }}>
          <Typography use='headline6' tag='h2'>
            {name}
          </Typography>
          <Typography
            use='subtitle2'
            tag='h3'
            theme='textSecondaryOnLight'
            style={{ marginTop: '-1rem' }}>
            by {author.username}
          </Typography>
          <Typography use='body1' tag='div' theme='textSecondaryOnLight'>
            {desc}
          </Typography>
        </div>
      </CardPrimaryAction>
      <CardActions>
        <CardActionIcons>
          <CardActionIcon onIcon='favorite' icon='favorite_border' />
          <CardActionIcon icon='share' />
          <CardActionIcon icon='more_vert' />
        </CardActionIcons>
      </CardActions>
    </Card>
  )
}

export default SnippetCard
