export const baseApiUrl = import.meta.env.VITE_API_URI

export const baseHeaders = {
  'Content-Type': 'application/json',
}

export const headersWithToken = () => {
  const token = JSON.parse(localStorage.getItem('token') ?? 'null')
  return {
    ...baseHeaders,
    Authorization: `Bearer ${token}`,
  }
}

export const responseHandler = async (response: Response) => {
  const data = await response.json()
  if (response.ok) {
    return data
  } else {
    return Promise.reject(data)
  }
}
