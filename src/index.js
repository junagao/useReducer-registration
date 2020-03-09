import React from 'react'
import { render } from 'react-dom'
import { newUser } from './api'

import './styles.scss'

function registerReducer(state, action) {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        loading: true,
        error: '',
      }
    case 'success':
      return {
        ...state,
        loading: false,
        error: '',
        registered: true,
      }
    case 'error':
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case 'input':
      return {
        ...state,
        [action.name]: action.value,
      }
    default:
      throw new Error(`This action type isn't supported.`)
  }
}

function Redirect({ username }) {
  return (
    <>
      <h1>Dashboard</h1>
      <p>Hello {username}</p>
    </>
  )
}

function Loading() {
  return <p>Loading...</p>
}

const initialState = {
  username: '',
  email: '',
  password: '',
  loading: false,
  error: '',
  registered: false,
}

function Register() {
  const [state, dispatch] = React.useReducer(registerReducer, initialState)

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch({ type: 'login' })

    newUser({
      username: state.username,
      email: state.email,
      password: state.password,
    })
      .then(() => {
        dispatch({ type: 'success' })
      })
      .catch((error) => {
        dispatch({
          type: 'error',
          error,
        })
      })
  }

  if (state.registered === true) {
    return <Redirect username={state.username} to="/dashboard" />
  }

  if (state.loading === true) {
    return <Loading />
  }

  return (
    <React.Fragment>
      {state.error && <p className="error">{state.error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email"
          onChange={(e) =>
            dispatch({
              type: 'input',
              name: 'email',
              value: e.target.value,
            })
          }
          value={state.email}
        />
        <input
          type="text"
          placeholder="username"
          onChange={(e) =>
            dispatch({
              type: 'input',
              name: 'username',
              value: e.target.value,
            })
          }
          value={state.username}
        />
        <input
          placeholder="password"
          onChange={(e) =>
            dispatch({
              type: 'input',
              name: 'password',
              value: e.target.value,
            })
          }
          value={state.password}
          type="password"
        />
        <button type="submit">Submit</button>
      </form>
    </React.Fragment>
  )
}

render(<Register />, document.getElementById('root'))
