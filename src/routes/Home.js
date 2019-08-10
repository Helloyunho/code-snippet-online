import React from 'react'
import SnippetCard from '../components/SnippetCard'
import { Grid, GridCell } from '@rmwc/grid'
import { LinearProgress } from '@rmwc/linear-progress'
import axios from 'axios'
import './Home.scss'

const Home = () => {
  const [snippets, setSnippets] = React.useState(undefined)
  React.useEffect(() => {
    const temp = async () => {
      setSnippets(
        (await axios('https://test.helloyunho.xyz/api/v1/snippets')).data
      )
    }
    temp()
  }, [])
  return (
    <Grid className='snippet-card-grid'>
      {typeof snippets === 'undefined' ? (
        <GridCell span={6}>
          <LinearProgress style={{ marginTop: '1rem' }} />
        </GridCell>
      ) : (
        snippets.map((snippet) => {
          if (typeof snippet.sid === 'undefined') {
            return null
          }

          return (
            <>
              <GridCell desktop={3}>
                <SnippetCard
                  id={snippet.sid}
                  name={snippet.title}
                  desc={snippet.desc}
                  author={snippet.author}
                  thumbnail={snippet.thumbnail}
                />
              </GridCell>
            </>
          )
        })
      )}
    </Grid>
  )
}

export default Home
