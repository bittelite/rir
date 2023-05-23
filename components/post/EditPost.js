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
  posts(first: 50, where: {categoryName: "avfallsmerke"}) {
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

  const handleClick = (event) => {
    const img = event.target;
    img.classList.add('animate-spin');
    setTimeout(() => {
      img.classList.remove('animate-spin');
    }, 15000);
  };

  return (
    <ul className='w-80'>
      {data.posts.nodes.map((post) => (
        <li className='grid grid-cols-12 p-1 items-center' key={post.id}>
          <h3 className='text-xl text-center font-bold pt-1'>{post.title}</h3>
          <form className='grid grid-flow-col items-center' onSubmit={(e) => {
            e.preventDefault();
            handleUpdatePost(post.id, e.target.avfallsmerker.value);
          }}>
            <select 
              className='h-8 w-60 p-1 mx-2 rounded-md border-2 border-sky-950 hover:border-teal-600 focus:outline-none' 
              name="avfallsmerker"
            >
              <option className='text-gray-400' value="" defaultValue>Velg avfallstype</option>
              {dataAvfallsmerker.posts.nodes.map(({ id, title, content }) => (
                <option key={id} value={content}>{title}</option>
              ))}
            </select>
            <button
              className='h-8 w-8 p-2 text-white rounded-md bg-sky-950 hover:bg-teal-800 active:bg-teal-700 focus:outline-none focus:bg-teal-700'
              type="submit"
            >
              <img onClick={handleClick} className='' src='/update.png' width='20px' height='20px' />
            </button>
          </form>
        </li>
      ))}
    </ul>
  );
}