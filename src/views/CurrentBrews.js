import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import _capitalize from 'lodash/capitalize'

import View from '../components/shared/View'

const CurrentBrews = props => {
  return (
    <View>
      <h3>Currently Brewing:</h3>
      {props.recipes
        .filter(recipe => recipe.current)
        .map(recipe => (
          <Recipe key={recipe.id}>
            <Header>
              <h3>
                {recipe.type} by {recipe.author}
              </h3>
              <h4>{recipe.specs.abv}</h4>
            </Header>
            <Description>{recipe.description}</Description>
            <p>
              {moment(recipe.schedule[recipe.schedule.length - 1].date.toDate()).format('l')} -{' '}
              {_capitalize(recipe.schedule[recipe.schedule.length - 1].step)}
            </p>
          </Recipe>
        ))}
    </View>
  )
}

export default CurrentBrews

const Recipe = styled.div`
  background: papayawhip;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 2px;
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
