import Image from 'next/image';

import {cn} from '@lib/utils';

type Props = {
  className?: string;
  iconClassName?: string;
  size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  modal?: boolean;
};

const getSize = (size: Props['size']) => {
  switch (size) {
    case 'xs':
      return 20;

    case 'sm':
      return 50;

    case 'md':
      return 100;

    case 'lg':
      return 200;

    case 'xl':
      return 300;

    default:
      return 300;
  }
};

export const Loading = ({className, iconClassName, size, modal}: Props) => {
  const s = typeof size === 'number' ? size : getSize(size);

  return (
    // <div className={cn(modal && 'fixed inset-x-0 top-0 mx-auto', className)}>
    <div
      className={cn(
        modal && 'fixed inset-x-0 mx-auto -mt-[58px] w-full max-w-5xl',
        className,
      )}
    >
      {modal ? (
        <div className="fixed bottom-4 right-4">
          <Image
            alt=""
            width={s}
            height={s}
            src="/icon.webp"
            className={cn('animate-spin direction-reverse', iconClassName)}
          />
        </div>
      ) : (
        <Image
          alt=""
          width={s}
          height={s}
          src="/icon.webp"
          className={cn('animate-spin direction-reverse', iconClassName)}
        />
      )}
    </div>
  );
};
