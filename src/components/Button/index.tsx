import './style.scss'

interface ButtonProps {
  children?: React.ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
  element?: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  style?: React.CSSProperties
  text?: string
}

export const Button = (props: ButtonProps) => {
  const { text, type = 'button', className, element, ...restProps } = props

  if (element)
    return (
      <button className={`base__btn ${className}`} type={type} {...restProps}>
        {element}
      </button>
    )

  return (
    <button className={`base__btn ${className}`} type={type} {...restProps}>
      {text ?? 'Button'}
    </button>
  )
}
