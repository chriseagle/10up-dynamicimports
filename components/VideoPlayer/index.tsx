const VideoPlayer = ({
  type,
  src,
}: {
  type: string;
  src: string;
}): React.ReactElement => {
  if (type === 'youtube') {
    return (
      <div className='video video__youtube'>
        <iframe
          width='560'
          height='315'
          src={src}
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        ></iframe>
      </div>
    );
  }
  if (type === 'lightweight') {
    return (
      <div className='video video__lightweight'>
        <video>
          <source src={src} type='video/mp4' />
        </video>
      </div>
    );
  }
  if (type === 'vimeo') {
    return (
      <div className='video video__vimeo'>
        <iframe
          src={src}
          width='640'
          height='240'
          frameBorder='0'
          allow='autoplay; fullscreen; picture-in-picture'
          allowFullScreen
        ></iframe>
      </div>
    );
  }
  return <></>;
};

export default VideoPlayer;
