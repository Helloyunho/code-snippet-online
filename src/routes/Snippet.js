import React from 'react'
import { Card } from '@rmwc/card'
import { Grid, GridCell, GridInner } from '@rmwc/grid'
import { Typography } from '@rmwc/typography'
import { LinearProgress } from '@rmwc/linear-progress'
import hljs from 'highlight.js'
import 'highlight.js/styles/vs2015.css'
import './Snippet.scss'
import axios from 'axios'

const Snippet = (props) => {
  const [node, setNode] = React.useState(undefined)
  React.useEffect(
    () => {
      if (typeof node !== 'undefined') {
        const nodes = node.querySelectorAll('pre code')
        nodes.forEach((n) => {
          hljs.highlightBlock(n)
        })
      }
    },
    [node]
  )
  const [snippet, setSnippet] = React.useState(undefined)
  React.useEffect(
    () => {
      const temp = async () => {
        setSnippet(
          (await axios(
            `https://test.helloyunho.xyz/api/v1/snippets/${
              props.match.params.id
            }`
          )).data
        )
      }
      temp()
    },
    [props.match.params.id]
  )
  return (
    <Grid className='snippet-grid'>
      {typeof snippet === 'undefined' ? (
        <GridCell span={12}>
          <LinearProgress style={{ marginTop: '1rem' }} />
        </GridCell>
      ) : (
        <GridCell span={10}>
          <Card style={{ padding: '24px' }} className='snippet-content'>
            <GridInner>
              <GridCell span={12}>
                <Typography use='headline3'>{snippet.title}</Typography>
              </GridCell>
              <GridCell span={12}>
                <Typography use='subtitle1' theme='textSecondaryOnLight'>
                  by {snippet.author.username}
                </Typography>
              </GridCell>
              <GridCell span={12}>
                <pre
                  ref={(n) => {
                    setNode(n)
                  }}>
                  <code className={snippet.lang}>{snippet.code}</code>
                </pre>
              </GridCell>
              <GridCell span={12}>
                <Typography use='body1'>{snippet.content}</Typography>
              </GridCell>
            </GridInner>
          </Card>
        </GridCell>
      )}
    </Grid>
  )
}

export default Snippet
