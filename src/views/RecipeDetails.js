import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { database as db } from '../firebase'
import _isEmpty from 'lodash/isEmpty'
import _capitalize from 'lodash/capitalize'
import moment from 'moment'

import View from '../components/shared/View'

const RecipeDetails = props => {
  const id = props.match.params.id
  const [recipe, setRecipe] = useState({})

  useEffect(() => {
    db.collection('onegallon')
      .doc(id)
      .get()
      .then(doc => {
        setRecipe({ id: doc.id, ...doc.data() })
      })
  }, [id])

  return (
    <View>
      <Recipe>
        {_isEmpty(recipe) ? (
          <p>Pouring your beer...</p>
        ) : (
          <React.Fragment>
            <Header>
              <h3>
                {recipe.name} by {recipe.author}
              </h3>
            </Header>
            <Description>{recipe.description}</Description>
            <Specs>
              <h5>Original Gravity: {recipe.specs.original_grav}</h5>
              <h5>Final Gravity: {recipe.specs.final_grav}</h5>
              <h5>ABV: {recipe.specs.abv}</h5>
              <h5>IBU: {recipe.specs.ibu}</h5>
            </Specs>
            <Ingredients>
              <h4>Ingredients:</h4>
              <ul>
                {recipe.ingredients.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Ingredients>
            <Schedule>
              <h4>Schedule:</h4>
              <ul>
                {recipe.schedule &&
                  recipe.schedule.map(item => (
                    <li key={item}>
                      {moment(item.date.toDate()).format('l')} - {_capitalize(item.step)} -{' '}
                      {item.duration}
                    </li>
                  ))}
              </ul>
            </Schedule>
            <p style={{ fontSize: '12px', fontStyle: 'italic', textAlign: 'right' }}>
              *pending final calculation
            </p>
          </React.Fragment>
        )}
      </Recipe>
    </View>
  )
}

export default RecipeDetails

const Recipe = styled.div`
  background: papayawhip;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  padding: 10px 15px;
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
`
const Specs = styled.div``
const Ingredients = styled.div``
const Schedule = styled.div``
const Description = styled.p`
  margin-top: 0;
`
