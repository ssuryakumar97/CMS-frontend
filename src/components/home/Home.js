import { Grid } from '@mui/material';
import React from 'react'
import Banner from '../banner/banner';
import Categories from '../home/Categories';
import Posts from './post/Posts';

function home() {
  return (
    <div style={{paddingTop:'64px'}}>
      <Banner /> 
      <Grid container>
        <Grid item lg={2} sm={2} xs={10}>
          <Categories />
        </Grid>
        <Grid item lg={10} sm={10} xs={12}>
          <Posts />
        </Grid>
      </Grid>
    </div>
  )
}

export default home;
