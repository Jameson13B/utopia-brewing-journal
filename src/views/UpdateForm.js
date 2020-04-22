import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { database as db } from '../firebase'

import View from '../components/shared/View'
import { Input, TextArea } from '../components/shared/Inputs'
import { InputList } from '../components/shared/InputList'

const initialState = {
  name: '',
  author: '',
  style: '',
  description: '',
  specs: {
    original_grav: '',
    final_grav: '',
    ibu: '',
    abv: '',
  },
}

const UpdateForm = props => {
  const [feedback, setFeedback] = useState(null)
  const [data, setData] = useState(initialState)
  const [ingredients, setIngredients] = useState([])
  const [steps, setSteps] = useState([])

  useEffect(() => {
    const ingredients = []
    const steps = []
    const recipe = props.recipes.filter(recipe => {
      if (recipe.id === props.match.params.id) {
        recipe.ingredients.map(ingredient => ingredients.push(ingredient))
        recipe.steps.map(step => steps.push(step))
        return true
      } else {
        return false
      }
    })

    setData(recipe[0])
    setIngredients(ingredients)
    setSteps(steps)
  }, [props.recipes, props.match.params.id, props])

  const handleUpdate = e => {
    e.preventDefault()
    if (!data.name || !data.author) {
      setFeedback('Brew Name and Author are required')
    } else {
      db.collection('onegallon')
        .doc(props.match.params.id)
        .update({ ...data, ingredients, steps })
        .then(() => {
          setFeedback(`Successfully created ${data.name}`)
          setIngredients([])
          setData(initialState)
          props.history.push(`/recipe/${props.match.params.id}`)
        })
        .catch(() => setFeedback('Problem saving new brew'))
    }
  }

  return (
    <View>
      <Form onSubmit={handleUpdate}>
        <h1 style={{ marginBottom: '10px' }}>Update {data.name}</h1>
        <Input
          labelText="Name*"
          onChange={e => setData({ ...data, name: e.target.value })}
          placeholder="Brew Name"
          value={data.name}
        />
        <Input
          labelText="Author*"
          onChange={e => setData({ ...data, author: e.target.value })}
          placeholder="Brew Author"
          value={data.author}
        />
        <Input
          labelText="Style"
          onChange={e => setData({ ...data, style: e.target.value })}
          placeholder="Brew Style"
          value={data.style}
        />
        <TextArea
          labelText="Description"
          onChange={e => setData({ ...data, description: e.target.value })}
          placeholder="Brew Description"
          rows="6"
          value={data.description}
        />
        <Hr />
        <SubSection>
          <h3 style={{ marginBottom: 0, marginTop: 0 }}>Specs:</h3>
          <Input
            labelText="Original Gravity"
            onChange={e =>
              setData({ ...data, specs: { ...data.specs, original_grav: e.target.value } })
            }
            placeholder="Original Gravity"
            value={data.specs.original_grav}
          />
          <Input
            labelText="Final Gravity"
            onChange={e =>
              setData({ ...data, specs: { ...data.specs, final_grav: e.target.value } })
            }
            placeholder="Final Gravity"
            value={data.specs.final_grav}
          />
          <Input
            labelText="ABV"
            onChange={e => setData({ ...data, specs: { ...data.specs, abv: e.target.value } })}
            placeholder="ABV"
            value={data.specs.abv}
          />
          <Input
            labelText="IBU"
            onChange={e => setData({ ...data, specs: { ...data.specs, ibu: e.target.value } })}
            placeholder="IBU"
            value={data.specs.ibu}
          />
        </SubSection>
        <Hr />
        <h3 style={{ marginBottom: 0, marginLeft: '15px' }}>Ingredients:</h3>
        <InputList items={ingredients} setItems={setIngredients} />
        <Hr />
        <h3 style={{ marginBottom: 0, marginLeft: '15px' }}>Steps:</h3>
        <InputList items={steps} schema="i,t" setItems={setSteps} />
        <Hr />
        <Button
          background="red"
          onClick={e => {
            e.preventDefault()
            props.history.goBack()
          }}
        >
          Cancel
        </Button>
        <Button background="green" onClick={handleUpdate}>
          Submit
        </Button>
        <Feedback>{feedback}</Feedback>
      </Form>
    </View>
  )
}

export default UpdateForm

const Form = styled.form`
  background: papayawhip;
  border-radius: 5px;
  padding: 5px 10px 25px;
`
const SubSection = styled.div`
  margin-left: 15px;
`
const Button = styled.button`
  background: ${props => props.background || 'orange'};
  border: 1px solid transparent;
  border-radius: 5px;
  color: white;
  font-size: 15px;
  margin-left: 15px;
  margin-top: 10px;
  padding: 5px 10px;
  text-decoration: none;
  transition: background 0.5s;
  :hover {
    background: ${props => 'dark' + props.background || 'darkorange'};
  }
`
const Hr = styled.hr`
  margin: 20px 15px;
`
const Feedback = styled.span`
  color: red;
  font-weight: bold;
  margin-left: 15px;
`
