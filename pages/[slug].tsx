import Head from 'next/head';
import type { GetStaticProps, GetStaticPaths } from 'next';
import * as fs from 'fs';
import parse, { Element, attributesToProps } from 'html-react-parser';
import VideoPlayer from '@/components/VideoPlayer';
import { parseProps } from '@/utils/parseProps';

// import dynamic from 'next/dynamic';
// const VideoPlayer = dynamic(() => import('@/components/VideoPlayer'), {
//   ssr: false,
//   loading: () => <div className='video_skeleton'>Loading video...</div>,
// });

const Body = ({
  headline,
  articleBody,
  subheading,
}: {
  headline: string;
  articleBody: string;
  subheading: string;
}) => {
  return (
    <article>
      <h2 className='article__headline'>{headline}</h2>
      <p className='article__subheading'>{subheading}</p>
      <div className='article__body'>
        {parse(articleBody, {
          replace: (domNode) => {
            if (
              domNode instanceof Element &&
              domNode.attribs['data-component'] === 'VideoPlayer'
            ) {
              const props = parseProps<Parameters<typeof VideoPlayer>[0]>(
                attributesToProps(domNode.attribs)
              );
              return <VideoPlayer {...props} />;
            }
          },
        })}
      </div>
    </article>
  );
};

export default function Page({ body }: { body: string }) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <header className='header'>
          <h1>The Newspaper</h1>
        </header>
        <Body
          headline={'Fusce nec tellus sed augue semper porta'}
          subheading={
            'Morbi in dui quis est pulvinar ullamcorper. Nulla facilisi. Integer lacinia sollicitudin massa. Cras metus. Sed aliquet risus a tortor.'
          }
          articleBody={body}
        />
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const fileNames = fs.readdirSync('./cms');
  return {
    paths: fileNames.map((filename) => {
      return {
        params: {
          slug: filename.replace(/\.html$/, ''),
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  const { slug } = context.params;
  const articleBody = fs.readFileSync(`./cms/${slug}.html`, 'utf-8');
  return {
    props: {
      body: articleBody,
    },
  };
};
