import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client';
import client from '../../constants/client';
import { UPDATE_POST } from '../../constants/mutations';

const GET_POSTS = gql`
  query GetPosts {
    posts(first: 16, where: {categoryName: "rir"}) {
      nodes {
        id
        title
        content
      }
    }
  }
`;

const GET_AVFALLSMERKER = gql`
query GetAvfallsmerker {
  posts(where: {categoryName: "avfallsmerke"}) {
    nodes {
      id
      title
      content
      featuredImage {
        node {
          id
          mediaItemUrl
          altText
        }
      }
    }
  }
}`;


export function EditPost() {
  const { loading, error, data } = useQuery(GET_POSTS, {
    client: client,
  });

  const { loading: loadingAvfallsmerker, error: errorAvfallsmerker, data: dataAvfallsmerker } = useQuery(GET_AVFALLSMERKER, {
    client: client,
  });

  const [updatePost] = useMutation(UPDATE_POST);

  if (loading || loadingAvfallsmerker) return <p>Loading...</p>;
  if (error || errorAvfallsmerker) return <p>Error :(</p>;

  function handleUpdatePost(id, title) {
    updatePost({
      variables: {
        id,
        title,
      },
    });
  }

  return (
    <ul className=' w-80'>
      {data.posts.nodes.map((post) => (
        <li className='grid grid-cols-12 p-1' key={post.id}>
          <h3>{post.title}</h3>
          <form className='col-span-10' onSubmit={(e) => {
            e.preventDefault();
            handleUpdatePost(post.id, e.target.avfallsmerker.value);
          }}>
            <select className='mx-1' name="avfallsmerker">
              <option value="" disabled selected>Velg avfallstype</option>
              {dataAvfallsmerker.posts.nodes.map(({ id, title, content }) => (
                <option key={id} value={content}>{title}</option>
              ))}
            </select>
            <button
              className='p-1 text-white rounded-md bg-sky-950 hover:bg-teal-800 active:bg-teal-700 focus:outline-none focus:ring focus:bg-teal-700'
              type="submit"
            >
              UP
            </button>
          </form>
        </li>
      ))}
    </ul>
  );
}