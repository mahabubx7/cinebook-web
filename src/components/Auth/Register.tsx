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
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerFormSchema } from '@utils'
import './style.scss'

export const RegisterForm = () => {
  const [register, { isLoading }] = useRegisterMutation()
  const [whoAmI] = useLazyWhoAmIQuery()
  const dispatch = useDispatch()
  const {
    formState: { errors },
    handleSubmit,
    setError,
    register: handleChange,
  } = useForm<RegisterRequest>({ resolver: zodResolver(registerFormSchema) })

  const handleSubmitForm = async (data: RegisterRequest) => {
    const res = await register(data)
      .then((res) => res)
      .catch((err) => err)
    if (res.error) {
      const errMsg = JSON.parse(res.error.data).message as string
      setError('root', { type: 'server', message: errMsg })
      return
    }

    dispatch(setToken(res.data))
    const user = await whoAmI()
      .then((res) => res)
      .catch((err) => err)
    if (user.error) {
      console.error(user.error)
      setError('root', {
        type: 'server',
        message: 'Something went wrong!',
      })
      return
    }
    dispatch(setUser(user.data as User))
    // sweet-alert here for registration successful!
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} id='register__form'>
      <h3 className='text-center text-gray-800 font-semibold mb-2'>
        Create an account!
      </h3>

      {errors.root && (
        <span className='text-red-400 italic text-center'>
          {errors.root.message}
        </span>
      )}

      <input
        type='text'
        {...handleChange('fname')}
        placeholder='First Name'
        autoComplete='off'
      />

      {errors.fname && (
        <span className='text-red-400 text-sm italic'>
          {errors.fname.message}
        </span>
      )}

      <input
        type='text'
        {...handleChange('lname')}
        placeholder='Last Name'
        autoComplete='off'
      />

      {errors.lname && (
        <span className='text-red-400 text-sm italic'>
          {errors.lname.message}
        </span>
      )}

      <input
        type='email'
        {...handleChange('email')}
        placeholder='Email Address'
        autoComplete='off'
      />

      {errors.email && (
        <span className='text-red-400 text-sm italic'>
          {errors.email.message}
        </span>
      )}

      <input
        type='password'
        {...handleChange('password')}
        placeholder='Password'
        autoComplete='off'
      />

      {errors.password && (
        <span className='text-red-400 text-sm italic'>
          {errors.password.message}
        </span>
      )}

      <input
        type='password'
        {...handleChange('password_confirmation')}
        placeholder='Confirm Password'
        autoComplete='off'
      />

      {errors.password_confirmation && (
        <span className='text-red-400 text-sm italic'>
          {errors.password_confirmation.message}
        </span>
      )}

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
