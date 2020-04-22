import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import _isEmpty from 'lodash/isEmpty'
import moment from 'moment'
import { Link } from 'react-router-dom'

import View from '../components/shared/View'
import { database as db } from '../firebase'

const RecipeDetails = props => {
  const id = props.match.params.id
  const [recipe, setRecipe] = useState({})

  useEffect(() => {
    db.collection('onegallon')
      .doc(id)
      .get()
      .then(doc => setRecipe({ id: doc.id, ...doc.data() }))
  }, [id])

  return (
    <View>
      <Recipe>
        {_isEmpty(recipe) ? (
          <p>Pouring your beer...</p>
        ) : (
          <React.Fragment>
            <Header>
              <h3 style={{ marginBottom: '5px' }}>
                {recipe.name} by {recipe.author}
              </h3>
              <Style>{recipe.style}</Style>
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
                      {item.date &&
                        `${moment(item.date).format('l')} - ${item.step} - ${item.duration}`}
                    </li>
                  ))}
              </ul>
            </Schedule>
            <p style={{ fontSize: '12px', fontStyle: 'italic', textAlign: 'right' }}>
              *pending final calculation
            </p>
            <Link to={`/update-recipe/${recipe.id}`}>Edit</Link>
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
  flex-direction: column;
`
const Style = styled.h5`
  margin: 0 0 15px 3px;
  font-weight: 500;
  font-style: italic;
  font-size: 12px;
`
const Specs = styled.div``
const Ingredients = styled.div``
const Schedule = styled.div``
const Description = styled.p`
  margin-top: 0;
`
