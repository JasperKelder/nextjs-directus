import { getDirectusClient } from '../../lib/directus';
import MoreArticles from '../../components/MoreArticles';
import { formatRelativeTime } from '../../lib/format-relative-time';
import { getAssetURL } from '../../lib/get-asset-url';
import Image from 'next/image';

export default function ArticlePage({ article, moreArticles }) {
  return (
    <div className='current-article'>
      <section>
        <div className='container'>
          <h1 className='current-article__title'>{article.title}</h1>
          <div className='current-article__detail'>
            <div className='current-article__wrapperOuter'>
              <div className='current-article__wrapperInner'>
                <div className='current-article__authorImage'>
                  <Image
                    src={getAssetURL(article.author.avatar)}
                    alt=''
                    loading='lazy'
                    layout='fill'
                  />
                </div>
                <div>
                  <div className='current-article__authorName'>
                    {`${article.author.first_name} ${article.author.last_name}`}
                  </div>
                  <div className='current-article__time'>
                    {article.publish_date}
                  </div>
                </div>
              </div>
            </div>
            <div className='current-article_coverImage'>
              <Image
                src={getAssetURL(article.cover_image)}
                alt=''
                layout='fill'
              />
            </div>
          </div>
          <div className='current-article__body'>
            <div
              className='current-article__bodyContent'
              dangerouslySetInnerHTML={{ __html: article.body }}
            ></div>
          </div>
        </div>
      </section>
      <MoreArticles articles={moreArticles} />
    </div>
  );
}

export async function getStaticPaths() {
  const directus = await getDirectusClient();
  const { data } = await directus.items('articles').readByQuery({
    fields: 'id',
    filter: { status: { _eq: 'published' } },
    limit: -1,
  });
  return {
    paths: data.map(article => {
      return {
        params: { id: article.id.toString() },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;

  const directus = await getDirectusClient();

  const article = await directus.items('articles').readOne(id, {
    fields: ['*', 'author.avatar', 'author.first_name', 'author.last_name'],
  });

  const formattedArticle = {
    ...article,
    publish_date: formatRelativeTime(new Date(article.publish_date)),
  };

  const moreArticlesResponse = await directus.items('articles').readByQuery({
    fields: ['*', 'author.avatar', 'author.first_name', 'author.last_name'],
    filter: {
      _and: [{ id: { _neq: article.id } }, { status: { _eq: 'published' } }],
    },
    limit: 2,
  });
  const formattedMoreArticles = moreArticlesResponse.data.map(moreArticle => {
    return {
      ...moreArticle,
      publish_date: formatRelativeTime(new Date(moreArticle.publish_date)),
    };
  });

  return {
    props: { article: formattedArticle, moreArticles: formattedMoreArticles },
  };
}
