import { Button } from '@components'
import {
  setToken,
  setUser,
  useLoginMutation,
  useLazyWhoAmIQuery,
  User,
  LoginRequest,
} from '@redux/auth'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginFormSchema } from '@utils'
import './style.scss'

export const LoginForm = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()
  const [whoAmI] = useLazyWhoAmIQuery()
  const dispatch = useDispatch()

  const {
    formState: { errors },
    setError,
    handleSubmit,
    register,
  } = useForm<LoginRequest>({ resolver: zodResolver(loginFormSchema) })

  const handleFormSubmit = async (data: LoginRequest) => {
    const res = await login(data)
      .then((res) => res)
      .catch((err) => err)
    if (res.error) {
      const err = JSON.parse(res.error.data) as Record<string, any>
      const errMsg = err.errors[0].message as string
      setError('root', {
        type: 'server',
        message: errMsg.split(':')[1] ?? errMsg,
      })
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
    // sweet-alert here for login successful!
    if (state.from) {
      console.log('redirecting to', state.from)
      const makeUrl = state.from + (state.qs ? `${state.qs}` : '')
      navigate(makeUrl)
    } else {
      navigate('/')
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} id='login__form'>
      <h3 className='text-center text-gray-800 font-semibold mb-2'>Sign In</h3>
      {errors.root && (
        <span className='text-red-400 italic text-center'>
          {errors.root.message}
        </span>
      )}

      <input type='email' {...register('email')} placeholder='Email Address' />

      {errors.email && (
        <span className='text-red-400 text-sm italic'>
          {errors.email.message}
        </span>
      )}

      <input type='password' {...register('password')} placeholder='Password' />

      {errors.password && (
        <span className='text-red-400 text-sm italic'>
          {errors.password.message}
        </span>
      )}

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
