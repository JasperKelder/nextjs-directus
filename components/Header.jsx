import Link from 'next/link';

export default function Header() {
  function revalidate() {
    fetch('/api/revalidate');
  }

  return (
    <header>
      <nav className='container'>
        <h1>
          <Link href='/'>Home</Link>
        </h1>
        <span className='header__description'>
          On-demand{' '}
          <a className='accent' onClick={() => revalidate()}>
            ISR
          </a>
          , powered by{' '}
          <a
            rel='noopener noreferrer'
            target='_blank'
            href='https://nextjs.org/'
            className='accent'
          >
            Next.js
          </a>{' '}
          and{' '}
          <a
            rel='noopener noreferrer'
            target='_blank'
            href='https://directus.io/'
            className='accent'
          >
            Directus
          </a>
          .
        </span>
      </nav>
    </header>
  );
}
