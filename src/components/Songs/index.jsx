import PropTypes from 'prop-types';
import Song from './Song';

const Songs = ({ songs, addLike, toggleSong, songPlaying, audioURL }) => {
  return (
    <div className='columns is-mobile is-centered is-vcentered is-multiline'>
      {songs.map((song, idx) => {
        const {
          id,
          title,
          description,
          owner,
          filePath,
          like,
          createdAt,
        } = song;
        const props = {
          idx,
          id,
          title,
          description,
          owner,
          filePath,
          like,
          createdAt,
          songPlaying,
        };
        return <Song key={idx.toString()} addLike={addLike} toggleSong={toggleSong} 
        audioURL={audioURL} {...props} />;
      })}
    </div>
  );
};

Songs.propTypes = {
  songs: PropTypes.array.isRequired,
  songPlaying: PropTypes.any.isRequired,
  addLike: PropTypes.func.isRequired,
  toggleSong: PropTypes.func.isRequired,
  audioURL: PropTypes.string.isRequired,
};

export default Songs;
