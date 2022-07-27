import PropTypes from 'prop-types';
import Link from 'next/link';
import { getAssetURL } from '../lib/get-asset-url';
import Image from 'next/image';

export default function Article({ article, bordered }) {
  return (
    <article className={`article ${bordered}`}>
      <div className='article__topWrapper'>
        <div className='article__imageWrapper'>
          <Image
            src={getAssetURL(article.cover_image)}
            alt=''
            loading='lazy'
            layout='fill'
          />
        </div>
      </div>
      <div className='article__bottomWrapper'>
        <h1 className='article__title'>
          <Link href={`/articles/${article.id}`}>{article.title}</Link>
        </h1>
        <div className='article__detail'>
          <div className='article__detailAuthor'>
            <Image
              src={getAssetURL(article.author.avatar)}
              alt=''
              loading='lazy'
              layout='fill'
            />
          </div>
          <div className='article__detailInner'>
            <div className='article__detailInnerAuthor'>
              {`${article.author.first_name} ${article.author.last_name}`}
            </div>
            <div className='article__detailInnerTime'>
              {article.publish_date}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

Article.propTypes = {
  article: PropTypes.object.isRequired,
  bordered: PropTypes.bool.isRequired,
};
