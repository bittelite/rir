import Head from 'next/head'
import { CreatePost } from '../../components/post/CreatePost'
import { PostList } from '../../components/post/PostList'
import { PostController } from '../../components/post/PostController'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    const interval = setInterval(() => {
      if (navigator.onLine) {
        window.location.reload(false); 
      }
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>RIR-skjermer</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='skjermVisning'>
        <div className='grid grid-rows-4 grid-cols-4 grid-flow-row gap-0 bg-black text-white'>
          <PostList />
        </div>
      </main>
    </>
  )
}
