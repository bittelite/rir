import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';

const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      post {
        id
        title
        content
      }
    }
  }
`;

export function CreatePost() {
  const [createPost] = useMutation(CREATE_POST);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const title = event.target.title.value;
    const content = event.target.content.value;

    const result = await createPost({
      variables: {
        input: {
          title: title,
          content: content,
          status: 'PUBLISH',
        },
      },
    });

    console.log(result.data.createPost.post);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" />
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <textarea name="content" id="content" />
      </div>
      <button type="submit">Create Post</button>
    </form>
  );
}
