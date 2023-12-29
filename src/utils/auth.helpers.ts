import { getRole, checkAuth } from '@redux/auth'
import { useSelector } from 'react-redux'

/**
 * @Guard IsAuthenticated
 * @description Check if user is authenticated or not
 * @returns boolean
 */
export const IsAuthenticated = () => {
  return useSelector(checkAuth)
}

/**
 * @Guard IsUser
 * @description Check if user is a USER or not
 * @returns boolean
 */
export const IsUser = () => {
  return useSelector(getRole) === 'user'
}

/**
 * @Guard IsVendor
 * @description Check if user is a VENDOR or not
 * @returns boolean
 */
export const IsVendor = () => {
  return useSelector(getRole) === 'vendor'
}

/**
 * @Guard IsManager
 * @description Check if user is a Manager or not
 * @returns boolean
 */
export const IsManager = () => {
  return useSelector(getRole) === 'manager'
}

/**
 * @Guard IsAdmin
 * @description Check if user is an ADMIN or not
 * @returns boolean
 */
export const IsAdmin = () => {
  return useSelector(getRole) === 'admin'
}

/**
 * @Guard IsSuperAdmin
 * @description Check if user is an SuperAdmin or not
 * @returns boolean
 */
export const IsSuperAdmin = () => {
  return useSelector(getRole) === 'super_admin'
}
