import React from 'react';

import {GoBackBtn} from '@/page/go-back-btn';

// import {Separator} from '@/ui/separator';

import {AirdropTaskStatus} from './airdrop-task-status';

type Props = {
  // airdropData: Airdrop;
  taskData: AirdropTask;
  accountAirdropData: AccountAirdrop;
};

export function AirdropTask({
  // airdropData,
  taskData,
  accountAirdropData,
}: Props) {
  return (
    <div className="mx-auto mt-4 flex w-full max-w-5xl flex-col place-items-center p-2 pt-8 text-center">
      {/* <h1
        className="text-xl font-semibold text-gray-100 lg:text-2xl"
        // data-aos="fade-in"
        // data-aos-delay="100"
        // data-aos-duration="1000"
      >
        <MDXRemote source={airdropData.name} />
      </h1>

      <h3
        className="mt-8 text-lg text-gray-300"
        // data-aos="fade-in"
        // data-aos-delay="500"
        // data-aos-duration="1000"
      >
        <MDXRemote source={airdropData.description} />
      </h3>

      <AirdropStatusBadge status={accountAirdropData?.status ?? 'Available'} />

      <Separator className="my-10" /> */}

      <h1
        className="text-xl font-semibold text-gray-100 lg:text-2xl"
        data-aos="fade-in"
        data-aos-delay="100"
        data-aos-duration="1000"
      >
        {taskData.name}
      </h1>

      <h3
        className="mt-8 max-w-lg text-lg text-gray-300"
        data-aos="fade-in"
        data-aos-delay="300"
        data-aos-duration="1000"
      >
        {taskData.description}
      </h3>

      <div
        className="w-full"
        data-aos="fade-in"
        data-aos-delay="500"
        data-aos-duration="1000"
      >
        <AirdropTaskStatus {...{taskData, accountAirdropData}} />
      </div>

      {/* <Separator className="my-10" /> */}

      <div
        className="mt-10"
        data-aos="fade-in"
        data-aos-delay="700"
        data-aos-duration="1000"
      >
        <GoBackBtn />
      </div>
    </div>
  );
}
