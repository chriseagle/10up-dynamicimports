import { default as NextImage } from 'next/image';

const Image = ({
  src,
  width,
  height,
  caption,
  fill,
}: {
  [key: string]: string;
}) => {
  return (
    <div className='article_image'>
      {/* eslint-disable-next-line */}
      <NextImage
        src={src}
        width={fill !== 'true' ? Number(width) : undefined}
        height={fill !== 'true' ? Number(height) : undefined}
        alt={caption}
        fill={fill === 'true'}
        style={{ width: '100%', height: 'auto' }}
      />
      {caption && (
        <p
          style={{
            fontSize: '.875rem',
            margin: 0,
            color: 'rgba(11,11,11,.45)',
            fontStyle: 'italic',
          }}
        >
          {caption}
        </p>
      )}
    </div>
  );
};
export default Image;
