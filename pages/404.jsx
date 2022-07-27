import Link from 'next/link';

export default function Custom404Page() {
  return (
    <main className='error'>
      <section>
        <div className='container'>
          <h1>Computer says no.</h1>
          <p>
            <Link href='/'>Have you tried turning it off and on again?</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
