import React from 'react'
import {
  Grid,
  GridCell,
  GridInner
} from '@rmwc/grid'
import { Typography } from '@rmwc/typography'
import { TextField } from '@rmwc/textfield'
import { Button } from '@rmwc/button'
import { Card } from '@rmwc/card'
import { Link } from 'react-router-dom'
import './Login.scss'

const reducer = (state, action) => {
  if (action.type === 'email') {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i
    const forApply = { email: action.value }
    if (emailRegex.test(action.value)) {
      forApply.emailError = false
    } else {
      forApply.emailError = true
    }
    return { ...state, ...forApply }
  } else if (action.type === 'password') {
    const forApply = { password: action.value }
    return { ...state, ...forApply }
  } else {
    return state
  }
}

const Login = () => {
  const [state, dispatch] = React.useReducer(reducer, {
    email: '',
    password: '',
    emailError: false
  })
  return (
    <Grid className='login-grid'>
      <GridCell span={12}>
        <Card style={{ padding: '24px' }}>
          <GridInner>
            <GridCell span={12}>
              <Typography use='headline2'>Login</Typography>
            </GridCell>
            <GridCell span={12}>
              <Typography use='headline5'>Good to see you again!</Typography>
            </GridCell>
            <GridCell span={12}>
              <TextField
                outlined
                label='Email'
                onChange={({ target }) => dispatch({ type: 'email', value: target.value })}
                value={state.email}
                placeholder='example@example.com'
                invalid={state.emailError} />
            </GridCell>
            <GridCell span={12}>
              <GridInner>
                <GridCell span={12}>
                  <TextField
                    outlined
                    type='password'
                    label='Password'
                    onChange={({ target }) => dispatch({ type: 'password', value: target.value })}
                    value={state.password}
                    placeholder='Password' />
                </GridCell>
              </GridInner>
            </GridCell>
            <GridCell>
              <GridInner>
                <GridCell span={6}>
                  <Button raised label='Login' />
                </GridCell>
                <GridCell span={6}>
                  <Button label='Register' tag={Link} to='/register' />
                </GridCell>
              </GridInner>
            </GridCell>
          </GridInner>
        </Card>
      </GridCell>
    </Grid>
  )
}

export default Login
