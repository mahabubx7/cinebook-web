interface MenuProps {
  classes?: string
  type?: 'horizontal' | 'vertical' | 'dropdown' | 'toggle'
  children?: React.ReactNode
}

const menuClasses = {
  horizontal: 'nav__links',
  vertical: 'nav__links menu__vertical',
  dropdown: 'nav__links menu__dropdown',
  toggle: 'nav__links menu__toggle',
}

export const Menu = (props: MenuProps) => {
  const { classes, type = 'horizontal', children } = props
  return (
    <ul className={classes + ` ${type ? menuClasses[type] : ''}`}>
      {children}
    </ul>
  )
}
