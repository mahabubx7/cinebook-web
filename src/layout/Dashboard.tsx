import { Link, Outlet } from 'react-router-dom'

export const DashboardLayout = () => {
  return (
    <main className='dashboard__layout'>
      <header>
        <nav className='container'>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/test'>Df: Test</Link>
            </li>
            <li>
              <Link to='/dashboard'>Dashboard</Link>
            </li>
            <li>
              <Link to='/dashboard/test'>Ds: test</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className='dashboard__layout__content'>
        <Outlet />
      </div>
    </main>
  )
}
