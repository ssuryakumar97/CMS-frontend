import React from 'react'
import { Box, Typography, styled} from '@mui/material'


const Image = styled(Box)`
    background: url(https://c4.wallpaperflare.com/wallpaper/632/34/549/technology-monitor-alpha-coders-binary-wallpaper-preview.jpg) center/55% repeat-x #000;
    width: 100%;
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Heading = styled(Typography)`
    font-size: 70px;
    color: #ffffff;
    line-height:1;
`;

const Subheading = styled(Typography)`
    font-size: 20px;
    background: #fff;
`

function banner() {
  return (
    <Image>
      <Heading>BLOG</Heading>
      <Subheading>Content Management system</Subheading>
    </Image>
  )
}

export default banner
