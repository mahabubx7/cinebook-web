import { Button, Menu, MenuItem } from '@components'
import { logout } from '@redux/auth'
import { IsAuthenticated, IsUser } from '@utils'
import { useDispatch } from 'react-redux'
import { Logo } from './Logo'
import './style.scss'

export const Header = () => {
  const dispatch = useDispatch()

  const logoutBtn = (
    <Button
      onClick={() => dispatch(logout())}
      text='Logout'
      className='nav__link__btn logout__btn'
    />
  )

  return (
    <header className='header'>
      <nav className='container header__nav'>
        <Logo />

        <Menu>
          <MenuItem title='Home' link='/' />
          <MenuItem title='Test' link='/test' />
          {IsAuthenticated() && (
            <>
              <MenuItem
                title='Dashboard'
                link='/dashboard'
                condition={[IsUser, false]}
              />
              <MenuItem
                title='My Account'
                link='/account'
                condition={[IsUser, true]}
              />
            </>
          )}
          <MenuItem
            title='Login'
            link='/login'
            condition={[IsAuthenticated, false]}
          />
          <MenuItem
            title='Logout'
            element={logoutBtn}
            condition={[IsAuthenticated, true]}
          />
        </Menu>
      </nav>
    </header>
  )
}
