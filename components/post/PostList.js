import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';
import client from '../../constants/client';

const GET_POSTS = gql`
    query GetPosts {
    posts (first:16) {
      nodes {
        id
        content
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
      {data.posts.nodes.map((post) => (
        <>
        <div className='merke grid grid-cols-3 gap-0 items-center text-3xl ' key={post.id} dangerouslySetInnerHTML={{ __html: post.content }}/>
        </>
      ))}
    </>
  );
}
