const Image = ({ src, width, height, caption }: { [key: string]: string }) => {
  return (
    <div className='article_image'>
      {/* eslint-disable-next-line */}
      <img src={src} width={width} height={height} alt={caption} />
      <p>{caption}</p>
    </div>
  );
};
export default Image;
