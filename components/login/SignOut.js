import { useRouter } from 'next/router'

export function SignOut() {
  const router = useRouter()

  const handleSignOut = () => {
    localStorage.removeItem('token')
    router.push('/')
  }

  return (
    <button
      onClick={handleSignOut}
      className='w-full p-1 text-white rounded-md bg-sky-950 hover:bg-teal-800 active:bg-teal-700 focus:outline-none focus:bg-teal-700'>
      Logg av
    </button>
  )
}