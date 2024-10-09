import { Box, styled, Typography, Link } from '@mui/material';
import { Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px bottom 0px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;

const About = () => {

    return (
        <Box>
            <Banner/>
            <Wrapper>
                <Typography variant="h3">Surya Kumar S</Typography>
                <Text variant="h5">I'm a MERN Stack developer. 
                    And I'm having experience in manufacturing sector. <br />Moving to IT sector due to my interest in programming<br />
                    This is my first full stack web application. Kindly use and give feedback. If any issues, contact me to the below mail.
                </Text>
                <Text variant="h5">
                    Need something built or simply want to have chat? Reach out to me on Email 
                        <Link href="mailto:kumarssurya97@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                            <Email />
                        </Link>.
                </Text>
            </Wrapper>
        </Box>
    )
}

export default About;

