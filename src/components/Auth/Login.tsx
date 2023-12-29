import { useState } from 'react'
import { Button } from '@components'
import { setToken, useLoginMutation } from '@redux/auth'
import { useDispatch } from 'react-redux'
import './style.scss'

interface LoginFormState {
  email: string
  password: string
}

export const LoginForm = () => {
  const [form, setForm] = useState<LoginFormState>({
    email: '',
    password: '',
  })

  const [login, { isLoading, isError, isSuccess }] = useLoginMutation()
  const dispatch = useDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = await login(form)
    if (isError) return
    dispatch(setToken(result))
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        name='email'
        onChange={handleChange}
        placeholder='Email Address'
      />
      <input
        type='password'
        name='password'
        onChange={handleChange}
        placeholder='Password'
      />
      <p className='text-red-400'>{isError ? 'Error' : ''}</p>
      <p className='text-green-500 font-bold'>
        {isSuccess ? 'Login Successful!' : ''}
      </p>
      <Button type='submit' disabled={isLoading}>
        Login
      </Button>
    </form>
  )
}
