import {NavTop} from '@/page/nav-top';

import {accountMetadata} from '@constants/metadata/account';

export const metadata = accountMetadata;

export default function AccountLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <NavTop />
      <div className="min-h-[calc(100vh-155px)] lg:pt-10">
        <div className="min-h-[calc(100vh-195px)]">{children}</div>
      </div>
    </>
  );
}
