import React from 'react'
import { Card } from '@rmwc/card'
import {
  Grid,
  GridCell,
  GridInner
} from '@rmwc/grid'
import { TextField } from '@rmwc/textfield'
import './CreateSnippet.scss'
import MonacoEditor from 'react-monaco-editor'

const Snippet = props => {
  const [content, setContent] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [code, setCode] = React.useState('')
  return (
    <Grid className='create-snippet-grid'>
      <GridCell span={10}>
        <Card style={{ padding: '24px' }} className='snippet-content'>
          <GridInner>
            <GridCell span={12}>
              <TextField
                fullwidth
                placeholder="Title"
                value={title}
                onChange={({target}) => setTitle(target.value)}
              />
            </GridCell>
            <GridCell span={12}>
              <MonacoEditor
                theme='vs-dark'
                height='200'
                value={code}
                onChange={value => setCode(value)}
              />
            </GridCell>
            <GridCell span={12}>
              <TextField
                textarea
                fullwidth
                label="Contents"
                rows={20}
                maxLength={Infinity}
                value={content}
                onChange={({target}) => setContent(target.value)}
              />
            </GridCell>
          </GridInner>
        </Card>
      </GridCell>
    </Grid>
  )
}

export default Snippet
