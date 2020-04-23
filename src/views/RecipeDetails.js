import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import _isEmpty from 'lodash/isEmpty'
import { Link } from 'react-router-dom'

import View from '../components/shared/View'
import { Button } from '../components/shared/Button'
import { Modal } from '../components/shared/Modal'
import { database as db } from '../firebase'

const RecipeDetails = props => {
  const id = props.match.params.id
  const [recipe, setRecipe] = useState({})
  const [showDeleteModal, toggleDeleteModal] = useState(false)

  useEffect(() => {
    db.collection('onegallon')
      .doc(id)
      .get()
      .then(doc => setRecipe({ id: doc.id, ...doc.data() }))
  }, [id])

  const handleDelete = () =>
    db
      .collection('onegallon')
      .doc(id)
      .delete()
      .then(() => {
        toggleDeleteModal(false)
        props.history.push('/recipes')
      })

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
                {recipe.ingredients.map((item, i) => (
                  <li key={i} style={{ listStyleType: 'circle' }}>
                    {item}
                  </li>
                ))}
              </ul>
            </Ingredients>
            <Steps>
              <h4>Steps:</h4>
              <ol style={{ paddingLeft: '20px' }}>
                {recipe.steps &&
                  recipe.steps.map((step, i) => (
                    <li key={i} style={{ listStyleType: 'none' }}>
                      <p style={{ fontWeight: '700', marginBottom: '5px' }}>{step.title}</p>
                      <p style={{ marginTop: '0' }}>{step.description}</p>
                    </li>
                  ))}
              </ol>
            </Steps>
            <p style={{ fontSize: '12px', fontStyle: 'italic', textAlign: 'right' }}>
              *pending final calculation
            </p>
            <Link to={`/update-recipe/${recipe.id}`}>Edit</Link>
            <Button background="red" onClick={() => toggleDeleteModal(true)}>
              Delete
            </Button>
          </React.Fragment>
        )}
      </Recipe>
      {showDeleteModal ? (
        <Modal
          buttons={[
            { background: 'turquoise', label: 'Cancel', onClick: () => toggleDeleteModal(false) },
            { background: 'red', label: 'Delete', onClick: () => handleDelete() },
          ]}
          title="Delete Recipe?"
        >
          Are you sure you want to delete this recipe?
        </Modal>
      ) : null}
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
const Steps = styled.div``
const Description = styled.p`
  margin-top: 0;
`
