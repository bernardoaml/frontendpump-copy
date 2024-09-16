// import {productsMetadata} from '#constants/metadata/dashboard';

// export const metadata = productsMetadata;

type Props = {
  task: React.ReactNode;
  children: React.ReactNode;
};

export default function AirdropStarterLayout({task, children}: Props) {
  return (
    <>
      {task}
      {children}
    </>
  );
}
