import React from 'react'
import styled from 'styled-components'

import { Input } from './Inputs'

export const InputList = ({ items, setItems }) => {
  const handleChange = (e, i) => {
    e.preventDefault()
    if (i <= items.length - 1) {
      // If current item, update
      let newArr = [...items]
      newArr[i] = e.target.value
      setItems(newArr)
    } else {
      // Else add item
      setItems([...items, e.target.value])
    }
  }

  return (
    <Container>
      {!items.length ? (
        <Button
          background="slateblue"
          onClick={e => {
            e.preventDefault()
            setItems([...items, ''])
          }}
        >
          +
        </Button>
      ) : (
        <React.Fragment>
          {items.map((ingredient, i) => (
            <Input
              key={i}
              onChange={e => handleChange(e, i)}
              placeholder={`Item ${i + 1}`}
              styles={{ marginLeft: '30px' }}
              value={ingredient}
            />
          ))}
          <Button
            background="slateblue"
            onClick={e => {
              e.preventDefault()
              setItems([...items, ''])
            }}
            style={{ marginLeft: '30px' }}
          >
            +
          </Button>
        </React.Fragment>
      )}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
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
