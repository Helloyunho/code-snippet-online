import React from 'react'
import SnippetCard from '../components/SnippetCard'
import { Grid, GridCell } from '@rmwc/grid'
import './Home.scss'

const Home = () => {
  return (
    <Grid className='snippet-card-grid'>
      <GridCell desktop={3} tablet={4} phone={6} className='snippet-cell'>
        <SnippetCard
          name='Test'
          author='Helloyunho'
          desc='Test lol'
          thumbnail=''
          id={1}
        />
      </GridCell>
      <GridCell desktop={3} tablet={4} phone={6} className='snippet-cell'>
        <SnippetCard name='Test' author='Helloyunho' desc='Test lol' id={2} />
      </GridCell>
      <GridCell desktop={3} tablet={4} phone={6} className='snippet-cell'>
        <SnippetCard name='Test' author='Helloyunho' desc='Test lol' id={3} />
      </GridCell>
      <GridCell desktop={3} tablet={4} phone={6} className='snippet-cell'>
        <SnippetCard name='Test' author='Helloyunho' desc='Test lol' id={4} />
      </GridCell>
    </Grid>
  )
}

export default Home
