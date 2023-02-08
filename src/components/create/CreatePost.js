import React from "react";
import { useState, useEffect, useContext } from "react";
import { Box, styled, FormControl, InputBase, Button, TextareaAutosize} from "@mui/material";
import { AddCircle as Add} from '@mui/icons-material'
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from '../../context/Dataprovider';
import { API } from '../../service/api';


const Container = styled(Box)(({ theme }) => ({
    margin: '0px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}))

const Image = styled('img')({
    width: '100%',
    height: '50vh', 
    objectFit: 'cover'
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`
const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`

const TextArea = styled(TextareaAutosize)`
    width: 100%;
    margin-top: 50px;
    font-size: 20px;
    border: none;
    &:focus-visible {
        outline: none;
    }
`
const InitialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createDate: new Date()
}


function CreatePost() {

    const [post, setPost] = useState(InitialPost);
    const [file, setFile] = useState('');

    const { context } = useContext(DataContext);

    const location = useLocation();
    const navigate = useNavigate();

    const convertToBase64 = (fileData) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(fileData);
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };

      const handleFileUpload = async (e) => {
        const fileData = e.target.files[0];
        const base64 = await convertToBase64(fileData);
        setFile(base64);
        console.log(base64)
      }

    

    useEffect( () => {
        const getImage =  async() => {
            if (file) {
                const data = new FormData();
                data.append('name', file.name);
                
                data.append('file', file);
                
               
               
                //API CALL
                const response = await API.uploadFile(data);
                
                post.picture = response.data;
                //post.picture TODO
            }
        }
        getImage();
        post.categories = location.search?.split('=')[1] || 'All';
        post.username = context.username;
    }, [context.username, location.search, post, file])

    const handleChange = (e) => {
        setPost ({...post, [e.target.name]: e.target.value})
    }

    const url = post.picture ? post.picture : 'https://res.cloudinary.com/practicaldev/image/fetch/s--gVvEhuWm--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/d10yuqxe8zbpl060v2g3.jpg'

    const savePost = async() => {
        let response = await API.createPost(post);
        if (response.isSuccess) {
            navigate('/');
        }
    }


    return (
        <div style={{marginTop: '64px'}}>
        <Container>
            <Image src={url} alt='banner' />

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize='large' color='action'/>
                </label>
                <input 
                    type='file' 
                    id='fileInput'
                    style={{display: 'none'}}
                    // onChange={(e) => {setFile(e.target.files[0])}}
                    onChange={(e) => {handleFileUpload(e)}}
                 />

                <InputTextField placeholder="Title" onChange={(e) => handleChange(e)} name = 'title'/>
                <Button variant="contained" onClick={()=>savePost()}>PUBLISH</Button>
            </StyledFormControl>
            <TextArea 
                minRows={5} 
                placeholder="Tell your story...." 
                onChange={(e) => handleChange(e)}
                name = 'description'
                />
        </Container>
        </div>
    )
}

export default CreatePost;