import React from 'react'
import { Grid, GridCell, GridInner } from '@rmwc/grid'
import { Typography } from '@rmwc/typography'
import { TextField } from '@rmwc/textfield'
import { Button } from '@rmwc/button'
import { Card } from '@rmwc/card'
import { Snackbar, SnackbarAction } from '@rmwc/snackbar'
import { Redirect } from 'react-router-dom'
import NodeRSA from 'node-rsa'
import axios from 'axios'
import aes256 from 'aes256'
import sha256 from 'sha256'
import './Register.scss'

const reducer = (state, action) => {
  if (action.type === 'email') {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i
    return {
      ...state,
      email: action.value,
      emailError: !emailRegex.test(action.value)
    }
  } else if (action.type === 'password') {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i
    return {
      ...state,
      password: action.value,
      passwordError: !passwordRegex.test(action.value)
    }
  } else if (action.type === 'username') {
    return {
      ...state,
      username: action.value,
      usernameError: action.value === ''
    }
  } else {
    return state
  }
}

const randomString = () => {
  let text = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-=_+.,;\'"?/[{}]§※★\u2668腦脑脳盜盗盗坏壞悪いお前はもう死んでる가나다라마바사아자차카타파하거너더러머버서어저처커터퍼허뷁괽쉙쉛왧봶Біртүрлінәрсеესფეხსაცმელია'
  for (var i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}

const Register = () => {
  const [state, dispatch] = React.useReducer(reducer, {
    email: '',
    password: '',
    username: '',
    emailError: false,
    passwordError: false,
    usernameError: false
  })
  const [result, setResult] = React.useState(undefined)
  const [redirect, setRedirect] = React.useState(false)
  const [redirectHome, setRedirectHome] = React.useState(false)
  return (
    <>
      {redirect ? <Redirect to='/login' /> : null}
      {redirectHome ? <Redirect to='/' /> : null}
      <Snackbar
        open={typeof result !== 'undefined' && result.success}
        onOpen={() => setTimeout(() => setRedirect(true), 3000)}
        onClose={() => setResult(undefined)}
        message={
          "Your registration was successful! You'll be redirected to login page in 3 seconds."
        }
        action={<SnackbarAction label='dismiss' />}
        timeout={3000}
      />
      <Snackbar
        open={
          typeof result !== 'undefined' &&
          !result.success &&
          typeof result.code === 'undefined'
        }
        onOpen={() => setTimeout(() => setRedirectHome(true), 3000)}
        onClose={() => setResult(undefined)}
        message={
          "Your registration was failed. Please try again later. You'll be redirected to home page in 3 seconds."
        }
        action={<SnackbarAction label='dismiss' />}
        timeout={3000}
      />
      <Snackbar
        open={
          typeof result !== 'undefined' &&
          !result.success &&
          typeof result.code !== 'undefined' &&
          result.code === 1
        }
        onClose={() => setResult(undefined)}
        message='Your email or your username is used by someone. Please try some different.'
        action={<SnackbarAction label='dismiss' />}
        timeout={3000}
      />
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
                  onChange={({ target }) =>
                    dispatch({ type: 'username', value: target.value })
                  }
                  value={state.username}
                  placeholder='username'
                  invalid={state.usernameError}
                />
              </GridCell>
              <GridCell span={12}>
                <TextField
                  outlined
                  label='Email'
                  onChange={({ target }) =>
                    dispatch({ type: 'email', value: target.value })
                  }
                  value={state.email}
                  placeholder='example@example.com'
                  invalid={state.emailError}
                />
              </GridCell>
              <GridCell span={12}>
                <GridInner>
                  <GridCell span={12}>
                    <TextField
                      outlined
                      type='password'
                      label='Password'
                      onChange={({ target }) =>
                        dispatch({ type: 'password', value: target.value })
                      }
                      value={state.password}
                      placeholder='Password'
                      invalid={state.passwordError}
                    />
                  </GridCell>
                  {state.passwordError ? (
                    <GridCell span={12}>
                      <Typography use='body1' theme='error'>
                        The password must:
                      </Typography>
                      <br />
                      <Typography use='body1' theme='error'>
                        Over 8 charaters
                      </Typography>
                      <br />
                      <Typography use='body1' theme='error'>
                        Contains one or more letter
                      </Typography>
                      <br />
                      <Typography use='body1' theme='error'>
                        Contains one or more number
                      </Typography>
                    </GridCell>
                  ) : null}
                </GridInner>
              </GridCell>
              <GridCell>
                <Button
                  raised
                  label='Register'
                  onClick={async () => {
                    if (
                      !state.emailError &&
                      !state.passwordError &&
                      !state.usernameError &&
                      state.email !== '' &&
                      state.password !== '' &&
                      state.username !== ''
                    ) {
                      const password = randomString()
                      const rsa = new NodeRSA()
                      rsa.importKey(
                        (await axios('https://test.helloyunho.xyz/rsa/public'))
                          .data.key,
                        'pkcs8-public'
                      )
                      const data = {
                        email: state.email,
                        password: sha256(state.password),
                        username: state.username
                      }
                      const result = await axios.post(
                        'https://test.helloyunho.xyz/user/register',
                        {
                          key: rsa.encrypt(password, 'base64'),
                          data: aes256.encrypt(password, JSON.stringify(data))
                        },
                        {
                          responseType: 'text',
                          headers: {
                            'Content-Type': 'application/json'
                          }
                        }
                      )
                      const success = JSON.parse(
                        aes256.decrypt(password, result.data)
                      )
                      setResult(success)
                    }
                  }}
                />
              </GridCell>
            </GridInner>
          </Card>
        </GridCell>
      </Grid>
    </>
  )
}

export default Register
