import { Link } from 'react-router-dom'

interface MenuItemProps {
  title?: string
  icon?: string
  link?: string
  element?: React.ReactNode
  condition?: [() => boolean, boolean]
  execute?: () => any
  classes?: string
}

export const MenuItem = (props: MenuItemProps) => {
  const {
    title,
    icon,
    link,
    classes,
    element,
    condition,
    execute: fn,
    ...rest
  } = props

  if (!condition || condition.length < 2) {
    return (
      <li>
        {link ? (
          <Link
            onClick={() => fn && fn()}
            to={link}
            className={classes}
            {...rest}
          >
            {element ?? title}
          </Link>
        ) : (
          <span onClick={() => fn && fn()}>{element ?? title}</span>
        )}
      </li>
    )
  }

  const returnCondition = () => {
    const [conditionFn, conditionValue] = condition
    return conditionFn() === conditionValue
  }

  return returnCondition() ? (
    <li>
      {link ? (
        <Link
          onClick={() => fn && fn()}
          to={link}
          className={classes}
          {...rest}
        >
          {element ?? title}
        </Link>
      ) : (
        <span onClick={() => fn && fn()}>{element ?? title}</span>
      )}
    </li>
  ) : null
}
