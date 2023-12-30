import { useState } from 'react'
import { Button } from '@components'
import {
  setToken,
  setUser,
  useRegisterMutation,
  useLazyWhoAmIQuery,
  User,
  RegisterRequest,
} from '@redux/auth'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import './style.scss'

export const RegisterForm = () => {
  const [form, setForm] = useState<RegisterRequest>({
    fname: '',
    lname: '',
    middle: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const [register, { isLoading, isError, isSuccess }] = useRegisterMutation()
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
    await register(form)
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
    return <p className='text-green-500 font-bold'>Registration Successful!</p>

  return (
    <form onSubmit={handleSubmit} id='register__form'>
      <h3 className='text-center text-gray-800 font-semibold mb-2'>
        Create an account!
      </h3>

      <input
        type='text'
        name='fname'
        onChange={handleChange}
        placeholder='First Name'
        autoComplete='off'
      />

      <input
        type='text'
        name='lname'
        onChange={handleChange}
        placeholder='Last Name'
        autoComplete='off'
      />

      <input
        type='text'
        name='middle'
        onChange={handleChange}
        placeholder='Middle Name (optional)'
        autoComplete='off'
      />

      <input
        type='email'
        name='email'
        onChange={handleChange}
        placeholder='Email Address'
        autoComplete='off'
      />

      <input
        type='password'
        name='password'
        onChange={handleChange}
        placeholder='Password'
        autoComplete='off'
      />

      <input
        type='password'
        name='password_confirmation'
        onChange={handleChange}
        placeholder='Confirm Password'
        autoComplete='off'
      />

      <div className='block text-center'>
        <Button
          type='submit'
          className='login__btn'
          disabled={isLoading}
          text={isLoading ? 'Signing Up...' : 'Sign Up'}
        />
      </div>

      <div className='block text-center text-sm'>
        <Link to='/login' className='text-blue-500 hover:underline'>
          <span>Already have an account? Sign In!</span>
        </Link>
      </div>
    </form>
  )
}
