import React from 'react'
import styled from 'styled-components'

export const Button = ({ onClick, children, style, background, props }) => (
  <NewBtn background={background} onClick={onClick} style={style} {...props}>
    {children}
  </NewBtn>
)

const NewBtn = styled.button`
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
