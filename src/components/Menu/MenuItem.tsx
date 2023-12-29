import { Link } from 'react-router-dom'

interface MenuItemProps {
  title?: string
  icon?: string
  link?: string
  element?: React.ReactNode
  condition?: [() => boolean, boolean]
  classes?: string
}

export const MenuItem = (props: MenuItemProps) => {
  const { title, icon, link, classes, element, condition, ...rest } = props

  if (!condition || condition.length < 2) {
    return (
      <li>
        {link ? (
          <Link to={link} className={classes} {...rest}>
            {element ?? title}
          </Link>
        ) : (
          <>{element ?? title}</>
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
        <Link to={link} className={classes} {...rest}>
          {element ?? title}
        </Link>
      ) : (
        <>{element ?? title}</>
      )}
    </li>
  ) : null
}
