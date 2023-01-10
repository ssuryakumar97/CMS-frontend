
import { Box, Typography, styled } from "@mui/material";
import { addEllipsis } from "../../../utils/common.utils";


const Container = styled(Box)`
    border: 1px solid #d3cede;
    border-radius: 10px;
    margin: 10px;
    height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    & > p {
        padding: 0 5px 5px 5px;
    }
`;

const Image = styled('img')({
    width: '100%',
    borderRadius: '10px 10px 0 0',
    objectFit: 'cover',
    height: '150px'
});

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`
const Heading = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
`;

const Description = styled(Typography)`
    font-size: 14px;
    word-break: break-word;
`

const Post = ( {post} ) => {

const url = post.picture? post.picture : 'https://s3-us-east-2.amazonaws.com/maryville/wp-content/uploads/2018/08/31162700/ergonomic-work-station.jpg'    

return (
    <Container>
        <Image src = {url} alt="blog" />
        <Text>{post.categories}</Text>
        <Heading>{addEllipsis(post.title, 20)}</Heading>
        <Text>{post.username}</Text>
        <Description>{addEllipsis(post.description, 100)}</Description>
    </Container>
)
}

export default Post;