import { Header } from '@components'
import { Outlet } from 'react-router-dom'

export const DefaultLayout = () => {
  return (
    <main className='default__layout'>
      <Header />

      <div className='default__layout__content'>
        <Outlet />
      </div>
    </main>
  )
}
