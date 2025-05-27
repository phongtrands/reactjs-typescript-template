import { SpCard } from '@shared/ui-components';

const Header = () => {
  return (
    <SpCard
      children={
        <img
          style={{
            width: '75px',
            height: '75px',
          }}
          src='../../../public/logo.png'
          alt='Company Logo'
        />
      }
      title='ePayment Recon'
      footer='SAP Portal'
    />
  );
};

export default Header;
