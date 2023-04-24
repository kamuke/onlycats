import {Grid, Button, Typography} from '@mui/material';
import {Box} from '@mui/system';
import MediaTable from '../components/MediaTable';
import {Link} from 'react-router-dom';
import {useState} from 'react';

const Home = () => {
  const [loggedIn] = useState(true);

  return (
    <>
      <Grid
        container
        columnSpacing={{xs: 1, sm: 2, md: 3}}
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{py: '80px', backgroundColor: '#E3A7B6'}}
      >
        <Grid item sx={5}>
          <Box sx={{maxWidth: '500px'}}>
            <img
              src={'/src/assets/onlycats_illustration1.png'}
              alt={'Cat illustration'}
              loading="lazy"
              width="100%"
            />
          </Box>
        </Grid>
        <Grid item sx={1}>
          <Box
            sx={{
              borderRadius: '25px',
              backgroundColor: 'white',
              boxShadow: 3,
              p: '40px',
              width: '300px',
            }}
          >
            <Typography
              component="h1"
              variant="h1"
              textAlign="center"
              sx={{mb: 5}}
            >
              {loggedIn
                ? 'Ready to show off your cat friend?'
                : 'Share and discover cat photos on OnlyCats.'}
            </Typography>
            <Typography component="p" textAlign="center" sx={{mb: 5}}>
              {loggedIn
                ? 'Share your favorite cat moments with our community of cat lovers by uploading your photos.'
                : 'Join our community and connect with fellow cat lovers.'}
            </Typography>
            <Box textAlign="center">
              <Button
                variant="contained"
                size="large"
                component={Link}
                to={loggedIn ? '/upload' : '/login'}
                sx={{mb: 1}}
              >
                {loggedIn ? 'Upload photo' : 'Register'}
              </Button>
            </Box>
            {!loggedIn && (
              <Typography component="p" textAlign="center">
                Already have an account?{' '}
                <Button variant="text" component={Link} to="/login">
                  Log in
                </Button>
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
      <Box sx={{my: '50px', mx: '5%'}}>
        <Typography component="h2" variant="h2" sx={{mb: 2}}>
          Discover cats
        </Typography>
        <MediaTable />
      </Box>
    </>
  );
};

export default Home;
