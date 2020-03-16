import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import View from '../components/shared/View'

const OneGallonList = props => {
  return (
    <View>
      {props.recipes.map(recipe => (
        <Link
          key={recipe.id}
          to={`recipe/${recipe.id}`}
          style={{
            color: 'darkslategrey',
            textDecoration: 'none',
          }}
        >
          <Recipe>
            <Header>
              <h3>
                {recipe.name} by {recipe.author}
              </h3>
              <h4>{recipe.specs.abv}</h4>
            </Header>
            <Description>{recipe.description}</Description>
          </Recipe>
        </Link>
      ))}
    </View>
  )
}

export default OneGallonList

const Recipe = styled.div`
  background: papayawhip;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  margin-bottom: 20px;
  padding: 10px 15px;
  transition: 0.3s;
  :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
`
const Description = styled.p`
  margin-top: 0;
`
