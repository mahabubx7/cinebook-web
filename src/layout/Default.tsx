import { Link, Outlet } from 'react-router-dom'

export const DefaultLayout = () => {
  return (
    <main className='default__layout'>
      <header>
        <nav className='container'>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
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

      <div className='default__layout__content'>
        <Outlet />
      </div>
    </main>
  )
}
