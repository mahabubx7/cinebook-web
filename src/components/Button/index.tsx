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
  const { text, type, ...restProps } = props

  return (
    <button className='base__btn' type={type ?? 'button'} {...restProps}>
      {text ?? 'Button'}
    </button>
  )
}
