import { Button } from '@components'
import { logout } from '@redux/auth'
import { IsAuthenticated } from '@utils'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export const Header = () => {
  const dispatch = useDispatch()
  return (
    <header>
      <nav className='container'>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/test'>Df: Test</Link>
          </li>
          <li>
            <Link to='/dashboard'>Dashboard</Link>
          </li>
          <li>
            <Link to='/dashboard/test'>Ds: test</Link>
          </li>
          <li>
            {IsAuthenticated() === true ? (
              <Button
                onClick={() => dispatch(logout())}
                text='Logout'
                className='bg-red-400 px-4 py-2 rounded-sm text-white'
              />
            ) : (
              <Link
                to='/login'
                className='bg-green-400 px-4 py-2 rounded-sm text-white'
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  )
}
