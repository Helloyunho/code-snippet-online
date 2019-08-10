import React from 'react'
import { Grid, GridCell, GridInner } from '@rmwc/grid'
import { Typography } from '@rmwc/typography'
import { TextField } from '@rmwc/textfield'
import { Button } from '@rmwc/button'
import { Card } from '@rmwc/card'
import { Link, Redirect } from 'react-router-dom'
import { Snackbar, SnackbarAction } from '@rmwc/snackbar'
import NodeRSA from 'node-rsa'
import aes256 from 'aes256'
import axios from 'axios'
import sha256 from 'sha256'
import './Login.scss'

const randomString = () => {
  let text = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-=_+.,;\'"?/[{}]§※★\u2668腦脑脳盜盗盗坏壞悪いお前はもう死んでる가나다라마바사아자차카타파하거너더러머버서어저처커터퍼허뷁괽쉙쉛왧봶Біртүрлінәрсеესფეხსაცმელია'
  for (var i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}

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
  const [result, setResult] = React.useState()
  const [redirectHome, setRedirectHome] = React.useState(false)
  return (
    <>
      {redirectHome ? <Redirect to='/' /> : null}
      <Snackbar
        open={typeof result !== 'undefined' && result.success}
        onOpen={() => setTimeout(() => setRedirectHome(true), 3000)}
        onClose={() => setResult(undefined)}
        message={
          "Successfuly loggined! You'll be redirected to home page in 3 seconds."
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
          "Login failed. Please try again later. You'll be redirected to home page in 3 seconds."
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
        message={"Email or password doesn't match."}
        action={<SnackbarAction label='dismiss' />}
        timeout={3000}
      />
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
                    />
                  </GridCell>
                </GridInner>
              </GridCell>
              <GridCell>
                <GridInner>
                  <GridCell span={6}>
                    <Button
                      onClick={async () => {
                        if (
                          !state.emailError &&
                          state.email !== '' &&
                          state.password !== ''
                        ) {
                          const password = randomString()
                          const rsa = new NodeRSA()
                          rsa.importKey(
                            (await axios(
                              'https://test.helloyunho.xyz/rsa/public'
                            )).data.key,
                            'pkcs8-public'
                          )
                          const data = {
                            email: state.email,
                            password: sha256(state.password)
                          }
                          const result = await axios.post(
                            'https://test.helloyunho.xyz/user/login',
                            {
                              key: rsa.encrypt(password, 'base64'),
                              data: aes256.encrypt(
                                password,
                                JSON.stringify(data)
                              )
                            }
                          )
                          const success = JSON.parse(
                            aes256.decrypt(password, result.data)
                          )
                          setResult(success)
                        }
                      }}
                      raised
                      label='Login'
                    />
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
    </>
  )
}

export default Login
