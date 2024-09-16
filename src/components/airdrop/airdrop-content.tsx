import React from 'react';

import {AirdropStatusBadge} from './airdrop-status-badge';
import {AirdropTaskItem} from './airdrop-task-item';

type Props = {
  airdropData: Airdrop;
  accountAirdropData: AccountAirdrop;
  isOnAccountHome?: boolean;
};

export function AirdropContent({
  airdropData,
  accountAirdropData,
  isOnAccountHome,
}: Props) {
  const {id, name, description, tasks} = airdropData;

  return (
    <div className="mb-10 flex flex-col items-center justify-center gap-8 p-2 px-10 font-poppins font-medium">
      <h1
        className="mx-auto mt-10 text-center text-2xl font-semibold lg:text-3xl"
        data-aos="fade-in"
        data-aos-delay="200"
        data-aos-duration="1000"
      >
        {name}
      </h1>

      <h2
        className="mx-auto text-center text-sm lg:text-base"
        data-aos="fade-in"
        data-aos-delay="400"
        data-aos-duration="1000"
      >
        {description}
      </h2>

      {tasks && Object.getOwnPropertyNames(tasks).length ? (
        <div
          id="airdrop-tasks"
          className="flex w-full max-w-lg flex-col lg:py-8"
          data-aos="zoom-in"
          data-aos-delay="400"
          data-aos-duration="1000"
        >
          {Object.values(tasks).map((task, index) => (
            <div
              key={index}
              className="border-b border-white border-opacity-20 py-4"
            >
              <AirdropTaskItem
                airdropId={id}
                {...{task, accountAirdropData, isOnAccountHome}}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="py-8 text-center text-lg text-gray-300">
          No tasks available
        </p>
      )}

      <div data-aos="zoom-in" data-aos-delay="600" data-aos-duration="3620">
        <AirdropStatusBadge
          status={accountAirdropData?.status ?? 'Available'}
        />
      </div>
    </div>
  );
}
