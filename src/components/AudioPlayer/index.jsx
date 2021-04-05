import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

const AudioPlayer = ({ idx, audioURL, toggleSong }) => {
  return (
    <div className='audio-player px-4 pb-5'>
      <ReactPlayer
        url={audioURL}
        controls
        playing
        height='60px'
        onPause={() => toggleSong(idx)}
      />
    </div>
  );
};

AudioPlayer.propTypes = {
  idx: PropTypes.number.isRequired,
  audioURL: PropTypes.string.isRequired,
  toggleSong: PropTypes.func.isRequired,
};

export default AudioPlayer;
