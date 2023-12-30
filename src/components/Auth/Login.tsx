import { useState } from 'react'
import { Button } from '@components'
import {
  setToken,
  setUser,
  useLoginMutation,
  useLazyWhoAmIQuery,
  User,
} from '@redux/auth'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
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
  const [whoAmI] = useLazyWhoAmIQuery()
  const dispatch = useDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await login(form)
      .then((res: any) => {
        dispatch(setToken(res.data))
      })
      .finally(async () => {
        const user = await whoAmI()
        dispatch(setUser(user.data as User))
      })
  }

  if (isError) return <p className='text-red-500 font-bold'>Error!</p>

  if (isSuccess)
    return <p className='text-green-500 font-bold'>Login Successful!</p>

  return (
    <form onSubmit={handleSubmit} id='login__form'>
      <h3 className='text-center text-gray-800 font-semibold mb-2'>Sign In</h3>

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

      <div className='block text-center'>
        <Button
          type='submit'
          className='login__btn'
          disabled={isLoading}
          text={isLoading ? 'Signing In...' : 'Sign In'}
        />
      </div>

      <div className='block text-center text-sm'>
        <Link to='/forgot' className='text-blue-500 hover:underline'>
          <span>Forgot Password?</span>
        </Link>
      </div>

      <div className='block text-center text-sm'>
        <Link to='/register' className='text-blue-500 hover:underline'>
          <span>Don't have an account? Create One!</span>
        </Link>
      </div>
    </form>
  )
}
