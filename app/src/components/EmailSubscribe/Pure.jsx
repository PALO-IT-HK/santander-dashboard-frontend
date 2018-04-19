import React from 'react'
import styled from 'styled-components'
import SButton from 'components/Button/Pure'
import InputField from 'components/InputField/Pure'

const EmailSubscribeWrapper = styled.div`
  background: #ffffff;
  display: flex;
  padding: 0 0.5rem;
`

const DisplayButtons = styled.div`
  display: flex;
  padding: 0 10px;
  margin: 0.8rem 0.5rem;
  font-size: 12px;
`

const subscribe = {
  backgroundColor: '#1dacbd',
  border: '1px solid #1dacbd',
  color: '#FFFFFF',
  height: '26px',
  minWidth: '80px',
  padding: '0 15px',
  fontSize: '12px',
  cursor: 'pointer',
  margin: '0 0.2rem',
  letterSpacing: '1px',
  fontWeight: '100',
  fontFamily: 'Rubik, sans-serif'
}

const unsubscribe = {
  backgroundColor: '#A8AAB6',
  border: '1px solid #A8AAB6',
  color: '#FFFFFF',
  height: '26px',
  minWidth: '80px',
  padding: '0 15px',
  fontSize: '12px',
  cursor: 'pointer',
  margin: '1rem',
  letterSpacing: '1px',
  fontWeight: '100',
  fontFamily: 'Rubik, sans-serif'
}

const RenderEmail = styled.div`
  margin: 0.5rem;
  display: inline-flex;
`

const EmailSubscribe = ({isEmailSubscribed, isEmailSubscribedAction, handleInputChangeAction, postEmailSagaAction, email}) => {
  const handleInputChange = (e) => handleInputChangeAction(e.target.value)
  const submitEmail = (e) => {
    e.preventDefault()
    postEmailSagaAction()
    isEmailSubscribed ? isEmailSubscribedAction(false) : isEmailSubscribedAction(true)
  }

  return (
    <EmailSubscribeWrapper>
      <form type='submit' onSubmit={submitEmail}>
        {isEmailSubscribed
          ? (<input
            style={unsubscribe}
            type='submit'
            value='Unsubscribe'
          />)
          : (<input
            style={subscribe}
            type='submit'
            value='Subscribe'
          />)
        }
        {isEmailSubscribed
          ? (<RenderEmail>{email}</RenderEmail>)
          : (<InputField
            required
            value={email || ''}
            onChange={handleInputChange}
            type={'email'}
            placeholder={'Email Address'}
            name={'email'} />)
        }
      </form>
    </EmailSubscribeWrapper>
  )
}

export default EmailSubscribe
