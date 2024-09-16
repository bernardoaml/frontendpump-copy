import React from 'react';

import {Referral} from '@/referral/referral';

export function ExtraBonuses({user}: {user: Account}) {
  return (
    <>
      <h1
        id="extra-bonus-title"
        className="mx-auto mt-6 max-w-3xl p-2 text-center font-poppins text-xl font-semibold text-gray-200 lg:text-3xl"
        data-aos="fade-in"
        data-aos-delay="300"
        data-aos-duration="2000"
        data-aos-anchor="#airdrop-tasks"
      >
        Want to Earn Extra Bonuses?
      </h1>

      <div
        className="mx-auto mb-16 max-w-3xl p-2 text-center text-white"
        data-aos="fade-up"
        data-aos-delay="300"
        data-aos-duration="1000"
        data-aos-anchor="#extra-bonus-title"
      >
        <Referral referralCode={user.referralCode} />
      </div>
    </>
  );
}
