import Link from 'next/link';
import React, { useCallback, useRef } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';
import { useRouter } from 'next/router';
import Image from 'next/image';

const canvasStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
};

export default function Header() {
  const router = useRouter();

  const refAnimationInstance = useRef(null);

  const getInstance = useCallback(instance => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      });
  }, []);

  const confetti = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);

  function reload() {
    router.reload(window.location.pathname);
  }

  function revalidate() {
    fetch('/api/revalidate');
    confetti();
    setTimeout(reload, 400);
  }

  return (
    <>
      <header>
        <nav className='container'>
          <h1>
            <Link href='/'>
              <Image
                src='/logo.png'
                alt='Logo'
                width='300px'
                height='22px'
                className='cursor'
              ></Image>
            </Link>
          </h1>
          <span className='header__description'>
            On-Demand{' '}
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
        <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
      </header>
    </>
  );
}
