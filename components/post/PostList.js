import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';
import client from '../../constants/client';

const GET_POSTS = gql`
    query GetPosts {
    rirSkjermer (first:16) {
      nodes {
        id
        title
        objekt {
          innhold {
            ... on Avfallsmerke {
              avfallsmerke {
                tekst
                ikon {
                  mediaItemUrl
                }
              }
            }
          }
        }
      }
    }
  }
`;


export function PostList() {
  const { loading, error, data } = useQuery(GET_POSTS, {
    client: client,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      {data.rirSkjermer.nodes.map((post) => (
        <>
        <div className='merke grid grid-cols-3 gap-0 items-center'>
            <img src={post.objekt.innhold.avfallsmerke.ikon.mediaItemUrl} width={128} height={128} className='col-span-1'/>
            <div className='text-3xl text-left col-span-2 px-4'>
            <span className='text-sm'>{post.title}</span><br />
                {post.objekt.innhold.avfallsmerke.tekst}
            </div>
        </div>
        </>
      ))}
    </>
  );
}
