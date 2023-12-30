import { useState } from 'react'
import { Button, Menu, MenuItem } from '@components'
import { logout } from '@redux/auth'
import { IsAuthenticated, IsUser } from '@utils'
import { useDispatch } from 'react-redux'
import { Logo } from './Logo'
import './style.scss'

export const Header = () => {
  const [IsMenuOpen, setIsMenuOpen] = useState(false)
  const dispatch = useDispatch()

  const logoutBtn = (
    <Button
      onClick={() => dispatch(logout())}
      text='Logout'
      className='logout__btn'
    />
  )

  const toggleMobileMenu = () => setIsMenuOpen(!IsMenuOpen)

  const closeBtn = (
    <button
      type='button'
      className='close__btn'
      onClick={() => toggleMobileMenu()}
    >
      <span className='close__btn__1'></span>
      <span className='close__btn__2'></span>
      <span className='close__btn__3'></span>
    </button>
  )

  return (
    <header className='header'>
      <nav className='container header__nav'>
        <Logo />

        <span
          className={`only__mobile ${IsMenuOpen === false ? 'ham__btn' : ''}`}
        >
          {closeBtn}
        </span>

        <Menu classes={`nav__menu ${IsMenuOpen ? '' : 'mobile__menu__hidden'}`}>
          <MenuItem
            title='🔴 Running'
            link='/movies?type=running'
            classes='md:mr-2'
            execute={() => toggleMobileMenu()}
          />
          <MenuItem
            title='📢 Upcoming'
            link='/movies?type=upcoming'
            execute={() => toggleMobileMenu()}
          />
          {IsAuthenticated() && (
            <>
              <MenuItem
                title='Dashboard'
                link='/dashboard'
                execute={() => toggleMobileMenu()}
                condition={[IsUser, false]}
              />
              <MenuItem
                title='My Account'
                link='/account'
                execute={() => toggleMobileMenu()}
                condition={[IsUser, true]}
              />
            </>
          )}
          <MenuItem
            title='Login'
            link='/login'
            classes='login__btn md:ml-4'
            execute={() => toggleMobileMenu()}
            condition={[IsAuthenticated, false]}
          />

          <li
            className={`text-gray-400 ${
              IsAuthenticated() === true ? 'hidden' : 'mobile__hidden'
            }`}
          >
            <span>|</span>
          </li>

          <MenuItem
            title='Register'
            link='/register'
            classes='login__btn'
            execute={() => toggleMobileMenu()}
            condition={[IsAuthenticated, false]}
          />
          <MenuItem
            title='Logout'
            element={logoutBtn}
            execute={() => toggleMobileMenu()}
            condition={[IsAuthenticated, true]}
          />
        </Menu>
      </nav>
    </header>
  )
}
