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
import './Register.scss'

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
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i
    const forApply = { password: action.value }
    if (passwordRegex.test(action.value)) {
      forApply.passwordError = false
    } else {
      forApply.passwordError = true
    }
    return { ...state, ...forApply }
  } else if (action.type === 'username') {
    return { ...state, username: action.value }
  } else {
    return state
  }
}

const Register = () => {
  const [state, dispatch] = React.useReducer(reducer, {
    email: '',
    password: '',
    username: '',
    emailError: false,
    passwordError: false
  })
  return (
    <Grid className='register-grid'>
      <GridCell span={12}>
        <Card style={{ padding: '24px' }}>
          <GridInner>
            <GridCell span={12}>
              <Typography use='headline2'>Register</Typography>
            </GridCell>
            <GridCell span={12}>
              <Typography use='headline5'>Hello, sir.</Typography>
            </GridCell>
            <GridCell span={12}>
              <TextField
                outlined
                label='Username'
                onChange={({ target }) => dispatch({ type: 'username', value: target.value })}
                value={state.username}
                placeholder='username' />
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
                    placeholder='Password'
                    invalid={state.passwordError} />
                </GridCell>
                { state.passwordError ? (
                  <GridCell span={12}>
                    <Typography use='body1' theme='error'>The password must:</Typography>
                    <br />
                    <Typography use='body1' theme='error'>Over 8 charaters</Typography>
                    <br />
                    <Typography use='body1' theme='error'>Contains one or more letter</Typography>
                    <br />
                    <Typography use='body1' theme='error'>Contains one or more number</Typography>
                  </GridCell>
                ) : null }
              </GridInner>
            </GridCell>
            <GridCell>
              <Button raised label='Register' />
            </GridCell>
          </GridInner>
        </Card>
      </GridCell>
    </Grid>
  )
}

export default Register
