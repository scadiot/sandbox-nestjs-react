import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

export interface PostProps {
    id: number,
    title: string,
    body: string,
    username: string,
    date: string,
    onDeleteClicked: (id: number) => void,
}

function Message(props: PostProps) {
    const handleDeleteClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        props.onDeleteClicked(props.id);
    };

  return (
    <Card
        sx={{ marginTop: 8 }}
    >
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {props.title}
            </Typography>
            <Button onClick={handleDeleteClick}>delete</Button>
            <Typography variant="body2" color="text.secondary">
                {props.body}
            </Typography>  
        </CardContent>
    </Card>
  )
}

export default Message;