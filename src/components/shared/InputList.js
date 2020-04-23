import React from 'react'
import styled from 'styled-components'

import { Input, TextArea } from './Inputs'
import { Button } from './Button'

export const InputList = ({ items, schema, setItems }) => {
  const handleChange = (e, i, key) => {
    e.preventDefault()
    if (i <= items.length - 1) {
      // If current item, update
      let newArr = [...items]
      newArr[i] = key ? { ...items[i], [key]: e.target.value } : e.target.value
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
            const placeholder = () => {
              switch (schema) {
                case 'i,t':
                  return {}
                default:
                  return ''
              }
            }

            setItems([...items, placeholder()])
          }}
        >
          +
        </Button>
      ) : (
        <React.Fragment>
          {items.map((ingredient, i) => {
            switch (schema) {
              case 'i,t':
                return (
                  <React.Fragment key={i}>
                    <Input
                      labelText="Step"
                      onChange={e => handleChange(e, i, 'title')}
                      placeholder="Step"
                      value={ingredient.title}
                    />
                    <TextArea
                      labelText="Description"
                      onChange={e => handleChange(e, i, 'description')}
                      placeholder="Description"
                      rows="6"
                      value={ingredient.description}
                    />
                  </React.Fragment>
                )
              default:
                return (
                  <Input
                    key={i}
                    onChange={e => handleChange(e, i)}
                    placeholder={`Item ${i + 1}`}
                    styles={{ marginLeft: '30px' }}
                    value={ingredient}
                  />
                )
            }
          })}
          <Button
            background="slateblue"
            onClick={e => {
              e.preventDefault()
              const placeholder = () => (schema === 'i' ? '' : {})

              setItems([...items, placeholder])
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
