import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { DefaultLayout, DashboardLayout } from '@layout'
import { HomePage, LoginPage, RegisterPage } from '@pages'
import { Movie } from '@pages/Movie'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/**
         * @Layout DefaultLayout
         * @Route /*
         */}
        <Route path='/' element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
          <Route path='movies' element={<Movie />} />
        </Route>

        {/**
         * @Layout DashboardLayout
         * @Route /dashboard/*
         */}
        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route index element={<h2>Dashboard Index</h2>} />
          <Route path='test' element={<h2>D: Page 2</h2>} />
        </Route>

        <Route path='*' element={<h2>Error! 404</h2>} />
      </Routes>
    </BrowserRouter>
  )
}
