import React from 'react'

import { FaTelegramPlane } from 'react-icons/fa';
import { RiGlobeFill } from 'react-icons/ri';
import { GlobeIcon, TwitterLogoIcon } from '@radix-ui/react-icons';

const page = () => {
  return (
    <div className='max-w-7xl mx-auto pt-5'>
      
      <div className="flex flex-row">

        <div className='left doodle-border'>
          <img src="/chart.jpg" alt="banner-top" />
          Teste
        </div>


        <div className='right border doodle'>
        <div className="flex flex-col">
              <img
                src="/tokens/4.png"
                alt="Token Name"
                className=" w-96"
              />

              <div className='px-3'>
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
            </div>
        </div>

      </div>

    </div>
  )
}

export default page