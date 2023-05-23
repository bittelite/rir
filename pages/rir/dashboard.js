import Head from 'next/head'
import { CreatePost } from '../../components/post/CreatePost'
import { EditPost } from '../../components/post/EditPost'
import { Layout } from '../../components/layout/Layout'
import { SignOut }  from '../../components/login/SignOut'

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>RIR-skjermer</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className='hidden'>
            <h2>Legg til ny post</h2>
            <CreatePost />
        </div>
        <div>
            <h2 className='pb-4 text-2xl font-semibold text-center'>Skjermer</h2>
            <EditPost />
        </div>
        <div>
          <SignOut />
        </div>
      </Layout>
    </>
  )
}
