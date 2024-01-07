import { IsAuthenticated } from '@utils/auth.helpers'
import { Navigate } from 'react-router-dom'

interface AuthRequiredProps {
  children: React.ReactNode
}

export const AuthRequired = (props: AuthRequiredProps) => {
  const isAuthenticated = IsAuthenticated()
  const { children } = props

  if (!isAuthenticated) {
    return (
      <Navigate
        to='/login'
        state={{ from: window.location.pathname, qs: window.location.search }}
      />
    )
  }

  return <>{children}</>
}
