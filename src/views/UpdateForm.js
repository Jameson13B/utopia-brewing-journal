import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { database as db } from '../firebase'

import View from '../components/shared/View'
import { Input, TextArea } from '../components/shared/Inputs'
import { InputList } from '../components/shared/InputList'

const initialState = {
  name: '',
  author: '',
  description: '',
  specs: {
    original_grav: '',
    final_grav: '',
    ibu: '',
    abv: '',
  },
  schedule: [
    {
      step: 'Brew Phase',
      duration: '',
      date: '',
    },
  ],
}

const UpdateForm = props => {
  const [data, setData] = useState(initialState)
  const [feedback, setFeedback] = useState(null)
  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    const ingredients = []
    const recipe = props.recipes.filter(recipe => {
      if (recipe.id === props.match.params.id) {
        recipe.ingredients.map(ingredient => ingredients.push(ingredient))
        return true
      } else {
        return false
      }
    })

    setData(recipe[0])
    setIngredients(ingredients)
  }, [props.recipes, props.match.params.id, props])

  const handleUpdate = e => {
    e.preventDefault()
    if (!data.name || !data.author) {
      setFeedback('Brew Name and Author are required')
    } else {
      db.collection('onegallon')
        .add({ ...data, ingredients })
        .then(() => {
          setFeedback(`Successfully created ${data.name}`)
          setData(initialState)
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
              setData({ ...data, specs: { ...data.specs, originalGrav: e.target.value } })
            }
            placeholder="Original Gravity"
            value={data.specs.original_grav}
          />
          <Input
            labelText="Final Gravity"
            onChange={e =>
              setData({ ...data, specs: { ...data.specs, finalGrav: e.target.value } })
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
        <h3 style={{ marginBottom: 0, marginLeft: '15px' }}>Schedule:</h3>
        <p>This section coming soon!</p>
        {/* <Input
          labelText="Step"
          onChange={e =>
            setData({ ...data, schedule: [{ ...data.schedule[0], step: e.target.value }] })
          }
          placeholder="Step"
          value={data.schedule[0].step}
        />
        <Input
          labelText="Duration"
          onChange={e =>
            setData({ ...data, schedule: [{ ...data.schedule[0], duration: e.target.value }] })
          }
          placeholder="Duration"
          value={data.schedule[0].duration}
        />
        <Input
          labelText="Date"
          onChange={e =>
            setData({ ...data, schedule: [{ ...data.schedule[0], date: e.target.value }] })
          }
          placeholder="Date"
          type="date"
          value={data.schedule[0].date}
        /> */}
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
