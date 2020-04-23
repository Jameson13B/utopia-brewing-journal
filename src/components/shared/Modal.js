import React from 'react'
import styled from 'styled-components'
import { Button } from './Button'

export const Modal = ({ buttons, children, isRelative = false, showScrim = true, title }) => {
  return (
    <NewModal isRelative={isRelative}>
      <ModalScrim isRelative={isRelative} showScrim={showScrim}>
        <ModalContainer>
          <ModalTitle>{title}</ModalTitle>
          <ModalContent>{children}</ModalContent>
          <ButtonContainer>
            {buttons.map((button, i) => {
              return (
                <Button background={button.background} key={i} onClick={button.onClick}>
                  {button.label}
                </Button>
              )
            })}
          </ButtonContainer>
        </ModalContainer>
      </ModalScrim>
    </NewModal>
  )
}

const NewModal = styled.div`
  z-index: 1000;
  position: ${props => (props.isRelative ? 'absolute' : 'fixed')};
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: center;
  height: 100%;
  width: 100%;
`
const ModalScrim = styled.div`
  background-color: ${props => (props.showScrim ? 'rgba(247,248,248,0.9)' : 'transparent')};
  position: ${props => (props.isRelative ? 'absolute' : 'fixed')};
  height: 100%;
  width: 100%;
`
const ModalContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  z-index: 1001;
  background-color: white;
  box-shadow: 0 15px 20px rgba(87, 102, 117, 0.16);
  border-radius: 3px;
  top: 100px;
  max-width: calc(100% - 40px);
  display: inline-block;
  text-align: left;
`
const ModalTitle = styled.div`
  background-color: papayawhip;
  border-top-left-radius: 2;
  border-top-right-radius: 2;
  color: #576675;
  font-weight: 700;
  padding: 15px 20px;
  text-transform: uppercase;
  letter-spacing: 1;
`
const ModalContent = styled.div`
  position: relative;
  max-height: calc(100% - 140px);
  overflow: auto;
  padding: 20px 15px;
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-bottom: 20px;
`
