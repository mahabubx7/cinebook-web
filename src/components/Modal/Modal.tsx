import { Button } from '@components'
import './style.scss'

interface ModalProps {
  children: React.ReactNode
  onClose: () => void
}

export const Modal = (props: ModalProps) => {
  const { children, onClose } = props

  return (
    <div className='modal__container'>
      <div className='modal__content flex flex-col'>
        <div className='modal__content__box'>
          <div className='pt-6 pb-0 px-2 text-right w-full'>
            <Button
              customClass
              className='modal__close capitalize'
              onClick={onClose}
              text='close ❌'
            />
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
