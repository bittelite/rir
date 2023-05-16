
import Head from 'next/head'
import { useEffect } from 'react'

export const getStaticProps = async () => {
  const skjermerWP = await fetch('https://skjermkontroll.no/wp-json/wp/v2/posts?categories=3&per_page=20');
  const skjermerData = await skjermerWP.json();

  return {
    props: {
      skjerm1: skjermerData,
    },
    revalidate: 10,
  }
}

export default function Home( skjerm1 ) {
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
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='skjermVisning'>
      <div className='hidden text-left col-span-2 px-4'>Style import</div>
      <div className='grid grid-rows-4 grid-cols-4 grid-flow-row gap-0 bg-black text-white font-extrabold'>
        {skjerm1.skjerm1.map(post => (
          <div
            key={post.id}
            className='merke grid grid-cols-3 gap-0 items-center text-3xl'
            dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        ))}
      </div>
      </main>
    </>
  )
}
