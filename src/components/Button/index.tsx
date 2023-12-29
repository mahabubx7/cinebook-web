import './style.scss'

interface ButtonProps {
  children?: React.ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  style?: React.CSSProperties
  text?: string
}

export const Button = (props: ButtonProps) => {
  return (
    <button className='base__btn' type={props.type ?? 'button'}>
      {props.text ?? 'Button'}
    </button>
  )
}
