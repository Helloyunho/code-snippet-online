import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import TopBar from './components/TopBar'
import Home from './routes/Home'
import Login from './routes/Login'
import Register from './routes/Register'
import Snippet from './routes/Snippet'
import CreateSnippet from './routes/CreateSnippet'

const randomString = () => {
  let text = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-=_+.,;\'"?/[{}]§※★\u2668腦脑脳盜盗盗坏壞悪いお前はもう死んでる가나다라마바사아자차카타파하거너더러머버서어저처커터퍼허뷁괽쉙쉛왧봶Біртүрлінәрсеესფეხსაცმელია'
  for (var i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}

const App = () => {
  React.useEffect(() => {
    const temp = async () => {
      if (typeof window !== 'undefined') {
        const password = window.sessionStorage.getItem('idk')
        if (typeof password !== 'string') {
          window.sessionStorage.setItem('idk', randomString())
        }
      }
    }

    temp()
  }, [])
  return (
    <Router>
      <TopBar>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/snippet/:id' component={Snippet} />
          <Route path='/create' component={CreateSnippet} />
        </Switch>
      </TopBar>
    </Router>
  )
}

export default App
