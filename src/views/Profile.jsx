import {Avatar, Box, Button, Grid, Rating, Typography} from '@mui/material';
import {useContext} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {useState, useEffect} from 'react';
import {useMedia, useRating, useTag} from '../hooks/ApiHooks';
import {appId, mediaUrl} from '../utils/variables';
import {useNavigate} from 'react-router-dom';

const Profile = () => {
  const {user} = useContext(MediaContext);
  const {getTag} = useTag();
  const navigate = useNavigate();
  const {getRatingsById} = useRating();
  const {getAllMediaById} = useMedia();

  const [profilePic, setProfilePic] = useState({
    filename: 'https://placekitten.com/200/200',
  });
  const [backgroundPic, setBackgroundPic] = useState({
    filename: 'https://placekitten.com/800/300',
  });
  const [profileDescription, setprofileDescription] = useState(
    'No profile text yet!'
  );
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);

  const fetchProfilePicture = async () => {
    try {
      if (user) {
        const profilePictures = await getTag(
          appId + '_profilepicture_' + user.user_id
        );
        const profilePicture = profilePictures.pop();
        profilePicture.filename = mediaUrl + profilePicture.filename;
        setProfilePic(profilePicture);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchBackgroundPicture = async () => {
    try {
      if (user) {
        const backgroundPictures = await getTag(
          appId + '_backgroundpicture_' + user.user_id
        );
        const backgroundPicture = backgroundPictures.pop();
        backgroundPicture.filename = mediaUrl + backgroundPicture.filename;
        setBackgroundPic(backgroundPicture);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchProfileDescription = async () => {
    try {
      if (user) {
        const profilePictures = await getTag(
          appId + '_profilepicture_' + user.user_id
        );
        const profileText = profilePictures.pop();
        setprofileDescription(profileText.description);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchProfilePicture();
    fetchBackgroundPicture();
    fetchProfileDescription();
    fetchAllRatings();
  }, [user]);

  const fetchAllRatings = async () => {
    try {
      const token = localStorage.getItem('token');
      const mediaInfo = await getAllMediaById(token);
      let sum = 0;
      let count = 0;
      for (const file of mediaInfo) {
        const ratings = await getRatingsById(file.file_id);
        if (ratings.length !== 0) {
          for (const rating of ratings) {
            sum = sum + rating.rating;
            count++;
          }
        }
      }
      setRatingCount(count);
      setAverageRating((sum / count).toFixed(2));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {user && (
        <>
          <Box sx={{maxWidth: 'md', margin: 'auto'}}>
            <Typography
              component="h1"
              variant="h2"
              textAlign="center"
              sx={{my: 6}}
            >
              Profile
            </Typography>
            <Avatar
              src={backgroundPic.filename}
              alt="Logo"
              sx={{
                borderRadius: 0,
                boxShadow: 3,
                width: 900,
                height: 320,
              }}
            />
            <Grid container justifyContent="center">
              <Grid item sx={{px: 3}}>
                <Avatar
                  src={profilePic.filename}
                  alt="Logo"
                  sx={{
                    top: -100,
                    left: -100,
                    boxShadow: 3,
                    width: 200,
                    height: 200,
                    borderStyle: 'solid',
                    borderWidth: 3,
                    borderColor: 'white',
                  }}
                />
              </Grid>
              <Grid item sx={{px: 3}}>
                <Typography component="h1" variant="h3" sx={{mt: 4}}>
                  <strong>{user.username}</strong>
                </Typography>
                <Box sx={{mt: 1}}>
                  <Rating
                    name="read-only"
                    size="large"
                    precision={0.1}
                    value={averageRating}
                    readOnly
                  />
                  <Typography component="legend">
                    {averageRating} ({ratingCount} ratings)
                  </Typography>
                </Box>
                <Typography component="div" variant="h6" sx={{mt: 3}}>
                  <strong>Full name : </strong>{' '}
                  {user.full_name ? user.full_name : 'Has not set a full name'}
                </Typography>
                <Typography component="div" variant="h6" sx={{mt: 3}}>
                  <strong>Email : </strong> {user.email}
                </Typography>
                <Typography component="div" variant="h6" sx={{mt: 3}}>
                  <strong> User ID : </strong> {user.user_id}
                </Typography>
                <Typography component="div" variant="h6" sx={{mt: 3}}>
                  <strong> Description : </strong> {profileDescription}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{mt: 5}}
                  onClick={() => navigate('/profile/update')}
                >
                  Update User Info
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{mt: 5}}
                  onClick={() => navigate('/logout')}
                >
                  Logout
                </Button>
              </Grid>
            </Grid>
            <Grid container justifyContent="center" gap={5}>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{mt: 5}}
                  onClick={() => navigate('/home')}
                >
                  Back
                </Button>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </>
  );
};

export default Profile;
