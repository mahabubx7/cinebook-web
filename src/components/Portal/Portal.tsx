import { createPortal } from 'react-dom'
import './style.scss'

interface PortalProps {
  children: React.ReactNode
}

const portal = document.getElementById('portal') as HTMLElement

export const Portal = (props: PortalProps) => {
  const { children } = props

  return createPortal(
    <div className='portal__container'>
      <div className='portal__content'>{children}</div>
    </div>,
    portal,
  )
}
