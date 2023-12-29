import { Header } from '@components'
import { Outlet } from 'react-router-dom'

export const DashboardLayout = () => {
  return (
    <main className='dashboard__layout'>
      <Header />
      <div className='dashboard__layout__content'>
        <Outlet />
      </div>
    </main>
  )
}
