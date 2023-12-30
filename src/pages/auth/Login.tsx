import { LoginForm } from '@components/Auth'
import { createPortal } from 'react-dom'

const portal = document.getElementById('portal') as HTMLElement

export const LoginPage = () => {
  return createPortal(
    <div className='portal__container'>
      <div className='portal__content'>
        <LoginForm />
      </div>
    </div>,
    portal,
  )
}
