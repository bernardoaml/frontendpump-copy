import {NavTop} from '@/page/nav-top';

export default function LoginLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <NavTop />
      <div className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl border px-6 py-8 sm:px-12 sm:py-20">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
