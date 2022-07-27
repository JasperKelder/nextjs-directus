import PropTypes from 'prop-types';
import Link from 'next/link';
import { getAssetURL } from '../lib/get-asset-url';
import Image from 'next/image';

export default function Hero({ article }) {
  return (
    <article className='hero'>
      <div className='hero__topWrapper'>
        <div className='hero__imageWrapper'>
          <Image
            src={getAssetURL(article.cover_image)}
            alt=''
            loading='lazy'
            layout='fill'
          />
        </div>
      </div>
      <h1 className='hero__title'>
        <Link href={`/articles/${article.id}`}>{article.title}</Link>
      </h1>
      <p className='hero__excerpt'>{article.excerpt}</p>
      <div className='hero__detail'>
        <div className='hero__detailAuthorImage'>
          <Image
            src={getAssetURL(article.author.avatar)}
            alt=''
            loading='lazy'
            layout='fill'
          />
        </div>
        <div>
          <div className='hero__detailAuthorName'>
            {`${article.author.first_name} ${article.author.last_name}`}
          </div>
          <div>{article.publish_date}</div>
        </div>
      </div>
    </article>
  );
}

Hero.propTypes = {
  article: PropTypes.object.isRequired,
};
