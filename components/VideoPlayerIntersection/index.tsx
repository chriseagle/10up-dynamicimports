import { useInView } from 'react-intersection-observer';

export type VideoPlayerProps = {
  type: string;
  src: string;
};

const VideoPlayerIntersection = ({
  type,
  src,
}: VideoPlayerProps): React.ReactElement => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  return (
    <div ref={ref}>
      {inView && type === 'youtube' && (
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
      )}
      {inView && type === 'lightweight' && (
        <div className='video video__lightweight' ref={ref}>
          <video>
            <source src={src} type='video/mp4' />
          </video>
        </div>
      )}
      {inView && type === 'vimeo' && (
        <div className='video video__vimeo' ref={ref}>
          <iframe
            src={src}
            width='640'
            height='240'
            frameBorder='0'
            allow='autoplay; fullscreen; picture-in-picture'
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default VideoPlayerIntersection;
