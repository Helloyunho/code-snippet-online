import React from 'react'
import { Card } from '@rmwc/card'
import {
  Grid,
  GridCell,
  GridInner
} from '@rmwc/grid'
import { Typography } from '@rmwc/typography'
import hljs from 'highlight.js'
import 'highlight.js/styles/vs2015.css'
import './Snippet.scss'

const Snippet = props => {
  let node
  React.useEffect(() => {
    const nodes = node.querySelectorAll('pre code')
    nodes.forEach(n => {
      hljs.highlightBlock(n)
    })
  }, [node])
  const snippetID = props.match.params.id
  return (
    <Grid className='snippet-grid'>
      <GridCell span={10}>
        <Card style={{ padding: '24px' }} className='snippet-content'>
          <GridInner>
            <GridCell span={12}>
              <Typography use='headline3'>Test</Typography>
            </GridCell>
            <GridCell span={12}>
              <Typography use='subtitle1' theme='textSecondaryOnLight'>by Helloyunho</Typography>
            </GridCell>
            <GridCell span={12}>
              <pre ref={n => { node = n }}>
                <code className='javascript'>
                  {`console.log('test')`}
                </code>
              </pre>
            </GridCell>
            <GridCell span={12}>
              <Typography use='body1'>
                Test lol
              </Typography>
            </GridCell>
          </GridInner>
        </Card>
      </GridCell>
    </Grid>
  )
}

export default Snippet
