import { createPortal } from 'react-dom'
import './style.scss'

interface PortalProps {
  children: React.ReactNode
}

const portal = document.getElementById('portal') as HTMLElement

export const Portal = (props: PortalProps) => {
  return createPortal(
    <div className='portal__container'>
      <div className='portal__content'>{props.children}</div>
    </div>,
    portal,
  )
}
