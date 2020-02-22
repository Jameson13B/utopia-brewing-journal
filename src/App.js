import React from 'react'
import styled from 'styled-components'
import { Switch, Route, Link } from 'react-router-dom'

import { database as db } from './firebase'

import OneGallonList from './views/OneGallonList'
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
          <NavBtn to="/one-gallon">One Gal</NavBtn>
        </Header>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="/one-gallon"
            component={() => <OneGallonList recipes={this.state.oneGallons} />}
          />
          <Route />
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
  background: orange;
  border: 1px solid transparent;
  border-radius: 5px;
  color: darkslategrey;
  font-size: 20px;
  padding: 5px 10px;
  text-decoration: none;
  transition: background 1s;
  :hover {
    background: darkorange;
  }
`
