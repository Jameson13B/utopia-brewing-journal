import React from 'react'
import styled from 'styled-components'

import View from '../components/shared/View'

const OneGallonList = props => {
  return (
    <View>
      {props.recipes.map(recipe => (
        <Recipe key={recipe.id}>
          <h3>
            {recipe.type} by {recipe.author}
          </h3>
          <p>{recipe.description}</p>
        </Recipe>
      ))}
    </View>
  )
}

export default OneGallonList

const Recipe = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 5px 10px;
  transition: 0.3s;
  :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`
