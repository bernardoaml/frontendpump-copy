import {RiAccountPinBoxLine as AccountIcon} from 'react-icons/ri';

export default async function LoginPage() {
  return (
    <section>
      <h1>Log in to your account</h1>

      <br />

      <p>
        Make sure your wallet is connected and then click the account button
        <span className="inline-flex items-baseline">
          <AccountIcon className="mx-1 h-4 w-4" />
        </span>
        above to subscribe to sign a verification message.
      </p>
    </section>
  );
}
