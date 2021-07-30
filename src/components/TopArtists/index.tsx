import PropTypes from 'prop-types';
import SubTitle1 from '../Typography/Subtitle1';
import OutlinedButton from '../Buttons/OutlinedButton';
import useStyles from './style';
import ImageWrapper from '../ImageWrapper';
import FollowerInfo from '../AvatarInfoItems/FollowerInfo';
import { useHistory } from 'react-router-dom';
import Carousel from '../Carousel/index';
const TopArtistsSection = ({ artists, title, viewAllHandler }) => {
  const classes = useStyles();
  const history = useHistory();

  function RenderArtists() {
    return (
      <Carousel
        customOption={{
          loop: false,
          responsive: {
            0: {
              items: 1,
            },
            500: {
              items: 2,
            },
            768: {
              items: artists?.length > 3 ? 3 : artists?.length,
            },
            1200: {
              items: artists?.length > 4 ? 4 : artists?.length,
            },
          },
        }}
      >
        {artists?.map(artist => (
          <div
            key={artist.id}
            className={classes.artistWrapper}
            onClick={() => history.push(`/profile/${artist?.user?.walletAddress}`)}
          >
            <FollowerInfo follower={artist?.user} withFollowBtn={false} verified={artist?.user.verified}>
              {artist.soldAmount} BNB
            </FollowerInfo>
          </div>
        ))}
      </Carousel>
    );
  }
  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <SubTitle1 color="primary">{title}</SubTitle1>
        {/* <OutlinedButton label="View all" size="small" className={classes.viewButton} handleClick={viewAllHandler} /> */}
      </div>
      <div className={classes.content}>
        <div>{artists?.length && <RenderArtists />}</div>
      </div>
    </div>
  );
};

TopArtistsSection.propTypes = {
  artists: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  viewAllHandler: PropTypes.func,
};

TopArtistsSection.defaultProps = {};

export default TopArtistsSection;
