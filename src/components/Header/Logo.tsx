import { Link } from 'react-router-dom'

export const Logo = () => {
  return (
    <Link to='/'>
      <span className='flex items-center gap-0 justify-start font-semibold my-2'>
        <span className='bg-gray-200 pr-1 py-1 pl-2 rounded-l-md'>
          <span className='text-gray-800 text-lg capitalize'>Cine</span>
        </span>
        <span className='bg-red-500 py-1 px-2 pl-1 rounded-r-md'>
          <span className='text-white text-lg capitalize'>Book</span>
        </span>
      </span>
    </Link>
  )
}
