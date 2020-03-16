import React, { useState } from 'react'
import styled from 'styled-components'
import { database as db } from '../firebase'
import _lowerCase from 'lodash/lowerCase'

import View from '../components/shared/View'
import { Input, TextArea } from '../components/shared/Inputs'
import { InputList } from '../components/shared/InputList'

const RecipeForm = props => {
  const [feedback, setFeedback] = useState('')
  const [name, setName] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')

  const [originalGrav, setOriginalGrav] = useState('')
  const [finalGrav, setFinalGrav] = useState('')
  const [ibu, setIbu] = useState('')
  const [abv, setAbv] = useState('')

  const [ingredients, setIngredients] = useState([])

  const [step, setStep] = useState('Brew Phase')
  const [duration, setDuration] = useState('')
  const [date, setDate] = useState('')

  const resetState = () => {
    setFeedback('')
    setName('')
    setAuthor('')
    setDescription('')
    setOriginalGrav('')
    setFinalGrav('')
    setIbu('')
    setAbv('')
    setIngredients([])
    setStep('Brew Phase')
    setDuration('')
    setDate('')
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!name || !author) {
      setFeedback('Brew Name and Author are required')
    } else {
      db.collection('onegallon')
        .add({
          name,
          author,
          description,
          specs: {
            original_grav: originalGrav,
            final_grav: finalGrav,
            ibu,
            abv,
          },
          ingredients,
          schedule: [
            {
              date,
              duration,
              step: _lowerCase(step),
            },
          ],
        })
        .then(() => resetState())
        .catch(() => setFeedback('Problem saving new brew'))
    }
  }

  return (
    <View>
      <Form onSubmit={handleSubmit}>
        <h1 style={{ marginBottom: '10px' }}>Create a Brew</h1>
        <Input
          labelText="Name*"
          onChange={e => setName(e.target.value)}
          placeholder="Brew Name"
          value={name}
        />
        <Input
          labelText="Author*"
          onChange={e => setAuthor(e.target.value)}
          placeholder="Brew Author"
          value={author}
        />
        <TextArea
          labelText="Description"
          onChange={e => setDescription(e.target.value)}
          placeholder="Brew Description"
          rows="6"
          value={description}
        />
        <Hr />
        <SubSection>
          <h3 style={{ marginBottom: 0, marginTop: 0 }}>Specs:</h3>
          <Input
            labelText="Original Gravity"
            onChange={e => setOriginalGrav(e.target.value)}
            placeholder="Original Gravity"
            value={originalGrav}
          />
          <Input
            labelText="Final Gravity"
            onChange={e => setFinalGrav(e.target.value)}
            placeholder="Final Gravity"
            value={finalGrav}
          />
          <Input
            labelText="ABV"
            onChange={e => setAbv(e.target.value)}
            placeholder="ABV"
            value={abv}
          />
          <Input
            labelText="IBU"
            onChange={e => setIbu(e.target.value)}
            placeholder="IBU"
            value={ibu}
          />
        </SubSection>
        <Hr />
        <h3 style={{ marginBottom: 0, marginLeft: '15px' }}>Ingredients:</h3>
        <InputList items={ingredients} setItems={setIngredients} />
        <Hr />
        {/* Build out the Schedule section */}
        <h3 style={{ marginBottom: 0, marginLeft: '15px' }}>Schedule:</h3>
        <Input
          labelText="Step"
          onChange={e => setStep(e.target.value)}
          placeholder="Step"
          value={step}
        />
        <Input
          labelText="Duration"
          onChange={e => setDuration(e.target.value)}
          placeholder="Duration"
          value={duration}
        />
        <Input
          labelText="Date"
          onChange={e => setDate(e.target.value)}
          placeholder="Date"
          type="date"
          value={date}
        />
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
        <Button background="green" onClick={handleSubmit}>
          Submit
        </Button>
        <Feedback>{feedback}</Feedback>
      </Form>
    </View>
  )
}

export default RecipeForm

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
