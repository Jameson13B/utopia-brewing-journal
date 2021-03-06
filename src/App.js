import React from 'react'
import styled from 'styled-components'
import { Switch, Route, Link } from 'react-router-dom'

import { database as db } from './firebase'

import OneGallonList from './views/OneGallonList'
// import CurrentBrews from './views/CurrentBrews'
import RecipeDetails from './views/RecipeDetails'
import NotFound from './views/NotFound'
import Home from './views/Home'
import RecipeForm from './views/RecipeForm'
import UpdateForm from './views/UpdateForm'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      oneGallons: [],
    }
  }

  componentDidMount() {
    db.collection('onegallon').onSnapshot(querySnapshot => {
      let oneGallons = []

      querySnapshot.forEach(doc => oneGallons.push({ id: doc.id, ...doc.data() }))

      this.setState({ oneGallons })
    })
  }

  render() {
    return (
      <div className="App">
        <Header>
          <Title to="/">
            <h1>Utopia Brewing Co</h1>
          </Title>
          <div style={{}}>
            <NavBtn to="/recipes">Recipes</NavBtn>
            <NavBtn to="/new-recipe">+</NavBtn>
          </div>
          <NavBtn to="/current-sessions" background="turquoise" hover="darkturquoise">
            Sessions
          </NavBtn>
          {/* <NavBtn to="/current-brews" background="turquoise" hover="darkturquoise">
            Current
          </NavBtn> */}
        </Header>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="/recipes"
            component={() => <OneGallonList recipes={this.state.oneGallons} />}
          />
          <Route path="/recipe/:id" component={RecipeDetails} />
          {/* <Route
            path="/current-sessions"
            component={() => <CurrentSessions />}
          /> */}
          {/* <Route
            path="/current-brews"
            component={() => <CurrentBrews recipes={this.state.oneGallons} />}
          /> */}
          <Route exact path="/new-recipe" component={RecipeForm} />
          <Route
            exact
            path="/update-recipe/:id"
            render={props => <UpdateForm {...props} recipes={this.state.oneGallons} />}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default App

const Header = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 550px;
  @media (max-width: 500px) {
    padding: 0 10px;
    flex-wrap: wrap;
    justify-content: space-around;
    padding-bottom: 15px;
    h1 {
      margin-bottom: 10px;
      text-align: center;
    }
  }
`
const Title = styled(Link)`
  color: darkslategrey;
  text-decoration: none;
  @media (max-width: 500px) {
    width: 100%;
  }
`
const NavBtn = styled(Link)`
  background: ${props => props.background || 'orange'};
  border: 1px solid transparent;
  border-radius: 5px;
  color: darkslategrey;
  font-size: 20px;
  padding: 5px 10px;
  text-decoration: none;
  transition: background 0.5s;
  &:first-child {
    margin-right: 5px;
  }
  :hover {
    background: ${props => props.hover || 'darkorange'};
  }
`

// To Do:
// Delete recipe button
// Delete ingredient button
// Delete step button
// Backlog:
// Add sessions to the ui
// Add sessions to the submission form
// Add new session button/interface
// Add sessions to the update form*
