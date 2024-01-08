import './style.scss'

interface ButtonProps {
  children?: React.ReactNode
  onClick?: () => void
  className?: string
  customClass?: true
  disabled?: boolean
  element?: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  style?: React.CSSProperties
  text?: string
  triggerAsync?: () => Promise<any>
}

export const Button = (props: ButtonProps) => {
  const {
    text,
    type = 'button',
    className,
    element,
    customClass,
    triggerAsync,
    ...restProps
  } = props

  const classNameStr = customClass ? `${className}` : `base__btn ${className}`

  if (triggerAsync) {
    return (
      <button
        className={classNameStr}
        type={type}
        onClick={async () => {
          await triggerAsync()
        }}
        {...restProps}
      >
        {text ?? 'Button'}
      </button>
    )
  }

  if (element)
    return (
      <button className={classNameStr} type={type} {...restProps}>
        {element}
      </button>
    )

  return (
    <button className={classNameStr} type={type} {...restProps}>
      {text ?? 'Button'}
    </button>
  )
}
