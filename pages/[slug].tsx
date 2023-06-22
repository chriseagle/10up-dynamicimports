import type { GetStaticProps, GetStaticPaths } from 'next';
import type { VideoPlayerProps } from '@/components/VideoPlayer';

import Head from 'next/head';
import * as fs from 'fs';
import parse, { Element, attributesToProps } from 'html-react-parser';
import { parseProps } from '@/utils/parseProps';

import Image from '@/components/Image';
import VideoPlayer from '@/components/VideoPlayer';

const componentDictionary: { [key: string]: any } = {
  videoplayer: VideoPlayer,
  image: Image,
  // videoplayerintersection: VideoPlayerIntersection,
};

const ArticleBody = ({
  headline,
  body,
  subheading,
}: {
  headline: string;
  body: string;
  subheading: string;
}) => {
  return (
    <article>
      <h2 className='article__headline'>{headline}</h2>
      <p className='article__subheading'>{subheading}</p>
      <div className='article__body'>
        {parse(body, {
          replace: (domNode) => {
            if (
              domNode instanceof Element &&
              typeof componentDictionary[domNode.attribs['data-component']] !==
                'undefined'
            ) {
              const props = parseProps<any>(attributesToProps(domNode.attribs));
              const Component =
                componentDictionary[domNode.attribs['data-component']];
              return <Component {...props} />;
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
          <h1>The Multiverse Times</h1>
        </header>
        <ArticleBody
          headline={'Fusce nec tellus sed augue semper porta'}
          subheading={
            'Morbi in dui quis est pulvinar ullamcorper. Nulla facilisi. Integer lacinia sollicitudin massa. Cras metus. Sed aliquet risus a tortor.'
          }
          body={body}
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
