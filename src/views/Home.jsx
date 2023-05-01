import {Grid, Button, Typography} from '@mui/material';
import {Box} from '@mui/system';
import MediaTable from '../components/MediaTable';
import {Link} from 'react-router-dom';
import {useContext, useEffect, useState} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {useMedia} from '../hooks/ApiHooks';

const Home = () => {
  const {user, setUser} = useContext(MediaContext);
  const {getAllMediaById} = useMedia();

  const [hasPictures, setHasPictures] = useState(false);
  const [userData, setData] = useState(() => {
    return user ?? JSON.parse(window.localStorage.getItem('user'));
  });

  useEffect(() => {
    window.localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  }, [setData]);

  const fetchMedia = async () => {
    try {
      const media = await getAllMediaById(userData.user_id);
      media.length > 15 ? setHasPictures(true) : setHasPictures(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  return (
    <>
      <Grid
        container
        columnSpacing={{xs: 1, sm: 2, md: 3}}
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          py: '60px',
          backgroundColor: '#E3A7B6',
          display: hasPictures ? 'none' : 'flex',
        }}
      >
        <Grid item xs={5}>
          <Box sx={{maxWidth: '500px'}}>
            <img
              src={'onlycats_illustration1.png'}
              alt={'Cat illustration'}
              loading="lazy"
              width="100%"
            />
          </Box>
        </Grid>
        <Grid item>
          <Box
            sx={{
              borderRadius: '25px',
              backgroundColor: '#FDF7F4',
              boxShadow: 3,
              p: '2rem',
              m: '0 1rem',
              maxWidth: '22rem',
            }}
          >
            <Typography
              component="h1"
              variant="h1"
              textAlign="center"
              sx={{mb: 5}}
            >
              {user
                ? 'Ready to show off your cat friend?'
                : 'Share and discover cat photos and videos on OnlyCats.'}
            </Typography>
            <Typography component="p" textAlign="center" sx={{mb: 5}}>
              {user
                ? 'Share your favorite cat moments with our community of cat lovers by uploading photos and videos.'
                : 'Join our community and connect with fellow cat lovers.'}
            </Typography>
            <Box textAlign="center">
              <Button
                variant="contained"
                size="large"
                component={Link}
                to={user ? '/upload' : '/'}
                sx={{mb: 1}}
              >
                {user ? 'Add post' : 'Register'}
              </Button>
            </Box>
            {!user && (
              <Typography component="p" textAlign="center">
                Already have an account?{' '}
                <Button
                  sx={{fontWeight: 600}}
                  variant="text"
                  component={Link}
                  to="/"
                >
                  Log in
                </Button>
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
      <Grid sx={{mt: '50px', mb: '100px'}}>
        <MediaTable />
      </Grid>
    </>
  );
};

export default Home;
