import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export interface NewPostData {
    title: string;
    content: string;
}

export interface PostFormProps {
    onSubmit: (newPostData: NewPostData) => void,
}

function PostForm(props: PostFormProps) {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const newPostData: NewPostData = {
            title: data.get('title') as string,
            content: data.get('content') as string,
        };
        props.onSubmit(newPostData)
      };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoFocus
        />
        <TextField
            margin="normal"
            required
            fullWidth
            name="content"
            label="content"
            id="content"
        />
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
        >
            Send
        </Button>
    </Box>
  )
}

export default PostForm;