import React from 'react'
import styled from 'styled-components'

const View = props => {
  return <Container style={props.style}>{props.children}</Container>
}

export default View

const Container = styled.div`
  margin: 0 auto;
  max-width: 550px;
`
