import React from 'react'
import styled from 'styled-components'
import { Switch, Route, Link } from 'react-router-dom'

import { database as db } from './firebase'

import OneGallonList from './views/OneGallonList'
import CurrentBrews from './views/CurrentBrews'
import RecipeDetails from './views/RecipeDetails'
import NotFound from './views/NotFound'
import Home from './views/Home'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      oneGallons: [],
    }
  }

  componentDidMount() {
    db.collection('onegallon')
      .get()
      .then(querySnapshot => {
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
            <h1>Dank Brewery</h1>
          </Title>
          <NavBtn to="/recipes">Recipes</NavBtn>
          <NavBtn to="/current-brews" background="turquoise" hover="darkturquoise">
            Current
          </NavBtn>
        </Header>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="/recipes"
            component={() => <OneGallonList recipes={this.state.oneGallons} />}
          />
          <Route path="/recipe/:id" component={RecipeDetails} />
          <Route
            path="/current-brews"
            component={() => <CurrentBrews recipes={this.state.oneGallons} />}
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
`
const Title = styled(Link)`
  color: darkslategrey;
  text-decoration: none;
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
  :hover {
    background: ${props => props.hover || 'darkorange'};
  }
`
