import React from 'react'
import styled from 'styled-components'

export const Input = ({
  labelLocation = 'left',
  labelText,
  onChange,
  placeholder,
  styles,
  type = 'text',
  value,
}) => {
  return (
    <Container>
      {labelText && labelLocation === 'left' ? (
        <Label labelLocation={labelLocation}>{labelText}</Label>
      ) : null}
      <InputBox
        label={labelText}
        labelLocation={labelLocation}
        onChange={onChange}
        placeholder={placeholder}
        style={styles}
        type={type}
        value={value}
      />
      {labelText && labelLocation === 'right' ? (
        <Label labelLocation={labelLocation}>{labelText}</Label>
      ) : null}
    </Container>
  )
}

export const TextArea = ({
  labelLocation = 'left',
  labelText,
  onChange,
  placeholder,
  rows,
  styles,
  value,
  props,
}) => {
  return (
    <Container>
      {labelText && labelLocation === 'left' ? (
        <Label labelLocation={labelLocation}>{labelText}</Label>
      ) : null}
      <TextAreaBox
        label={labelText}
        labelLocation={labelLocation}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        style={styles}
        value={value}
        {...props}
      />
      {labelText && labelLocation === 'right' ? (
        <Label labelLocation={labelLocation}>{labelText}</Label>
      ) : null}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
`
const Label = styled.label`
  font-weight: bold;
  margin-left: ${props => (props.labelLocation === 'left' ? '15px' : 0)};
  margin-right: ${props => (props.labelLocation === 'right' ? '15px' : 0)};
  margin-top: 10px;
  text-align: ${props => (props.labelLocation === 'left' ? 'left' : 'right')};
  width: 30%;
`
const InputBox = styled.input`
  border: 1.3px solid grey;
  border-radius: 5px;
  margin-left: ${props => {
    if (!props.label) {
      return '15px'
    } else if (props.labelLocation === 'right') {
      return '15px'
    } else {
      return 0
    }
  }};
  margin-right: ${props => (props.labelLocation === 'left' ? '15px' : 0)};
  margin-top: 10px;
  width: 70%;
`
const TextAreaBox = styled.textarea`
  border: 1.3px solid grey;
  border-radius: 5px;
  margin-left: ${props => {
    if (!props.label) {
      return '15px'
    } else if (props.labelLocation === 'right') {
      return '15px'
    } else {
      return 0
    }
  }};
  margin-right: ${props => (props.labelLocation === 'left' ? '15px' : 0)};
  margin-top: 10px;
  resize: none;
  width: 70%;
`
