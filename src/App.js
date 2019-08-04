import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import TopBar from './components/TopBar'
import Home from './routes/Home'
import Login from './routes/Login'
import Register from './routes/Register'
import Snippet from './routes/Snippet'
import CreateSnippet from './routes/CreateSnippet'

const App = () => {
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
