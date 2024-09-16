'use client';

import { GlobeIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import {Splide, SplideSlide} from '@splidejs/react-splide';

import '@splidejs/react-splide/css';
import { FaTelegramPlane } from 'react-icons/fa';
import { RiGlobeFill } from 'react-icons/ri';

const TokenSlider = () => {
  return (
    <>
      <div className="mx-auto mt-8 max-w-7xl">
        <h1 className="pb-10 font-extrabold text-3xl">Last King of the Hill</h1>

        <Splide
          options={{perPage: 6, gap: 26, navigator: false, pagination: false}}
          aria-label="King of The Hill"
          className="hidden lg:flex"
          data-aos="zoom-in-up"
          data-aos-delay="100"
          data-aos-duration="1500"
        >
          <SplideSlide>
            <div className="flex flex-col">
              <img
                src="/tokens/1.webp"
                alt="Token Name"
                className="h-full w-full"
              />
              <h2 className="text-maincolor mt-3 font-extrabold text-xl">
                Token Name
              </h2>
              <span className="text-lg font-extrabold"> Ticker: $FASF</span>

              <p className='mt-2'>The most memeable cat on Internet</p>

              <div className="flex flex-row mt-4 gap-2">

                <TwitterLogoIcon className='w-6 h-6' />
                <FaTelegramPlane className='w-6 h-6' />
                <GlobeIcon className='w-6 h-6' />
              

              
                </div>


            </div>
          </SplideSlide>
          <SplideSlide>
            <div className="flex flex-col">
              <img
                src="/tokens/2.jpg"
                alt="Token Name"
                className="h-full w-full"
              />
              <h2 className="text-maincolor mt-3 font-extrabold text-xl">
                Token Name
              </h2>
              <span className="text-lg font-extrabold"> Ticker: $FASF</span>

              <p className='mt-2'>The most memeable cat on Internet</p>

              <div className="flex flex-row mt-4 gap-2">

                <TwitterLogoIcon className='w-6 h-6' />
                <FaTelegramPlane className='w-6 h-6' />
                <GlobeIcon className='w-6 h-6' />
              

              
                </div>
            </div>
          </SplideSlide>
          <SplideSlide>
            <div className="flex flex-col">
              <img
                src="/tokens/3.png"
                alt="Token Name"
                className="h-full w-full"
              />
               <h2 className="text-maincolor mt-3 font-extrabold text-xl">
                Token Name
              </h2>
              <span className="text-lg font-extrabold"> Ticker: $FASF</span>

              <p className='mt-2'>The most memeable cat on Internet</p>

              <div className="flex flex-row mt-4 gap-2">

                <TwitterLogoIcon className='w-6 h-6' />
                <FaTelegramPlane className='w-6 h-6' />
                <GlobeIcon className='w-6 h-6' />
              

              
                </div>
            </div>
          </SplideSlide>

          <SplideSlide>
            <div className="flex flex-col">
              <img
                src="/tokens/4.png"
                alt="Token Name"
                className="h-full w-full"
              />
               <h2 className="text-maincolor mt-3 font-extrabold text-xl">
                Token Name
              </h2>
              <span className="text-lg font-extrabold"> Ticker: $FASF</span>

              <p className='mt-2'>The most memeable cat on Internet</p>

              <div className="flex flex-row mt-4 gap-2">

                <TwitterLogoIcon className='w-6 h-6' />
                <FaTelegramPlane className='w-6 h-6' />
                <GlobeIcon className='w-6 h-6' />
              

              
                </div>
            </div>
          </SplideSlide>

          <SplideSlide>
            <div className="flex flex-col">
              <img
                src="/tokens/6.webp"
                alt="Token Name"
                className="h-full w-full"
              />
               <h2 className="text-maincolor mt-3 font-extrabold text-xl">
                Token Name
              </h2>
              <span className="text-lg font-extrabold"> Ticker: $FASF</span>

              <p className='mt-2'>The most memeable cat on Internet</p>

              <div className="flex flex-row mt-4 gap-2">

                <TwitterLogoIcon className='w-6 h-6' />
                <FaTelegramPlane className='w-6 h-6' />
                <GlobeIcon className='w-6 h-6' />
              

              
                </div>
            </div>
          </SplideSlide>
        </Splide>
      </div>
    </>
  );
};

export default TokenSlider;
