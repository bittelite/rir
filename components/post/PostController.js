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


export function PostController() {
  const { loading, error, data } = useQuery(GET_POSTS, {
    client: client,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <ul>
      {data.rirSkjermer.nodes.map((post) => (
        <li key={post.id}>
          <h2>{post.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.objekt.innhold.avfallsmerke.tekst }} />
          <div dangerouslySetInnerHTML={{ __html: post.objekt.innhold.avfallsmerke.ikon.mediaItemUrl }} />
        </li>
      ))}
    </ul>
  );
}