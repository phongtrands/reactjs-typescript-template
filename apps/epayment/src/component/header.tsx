import { Card } from '@core/components';

const Header = () => {
  return (
    <Card
      children={
        <img
          style={{
            width: '75px',
            height: '75px',
          }}
          src='image/logo.png'
          alt='Company Logo'
        />
      }
      title='ePayment Recon'
      footer={
        <div style={{ display: 'flex', gap: '10px' }}>
          <img
            style={{
              width: '100px',
              height: '30px',
            }}
            src='image/sap_logo.png'
            alt='sap Logo'
          />
          <span style={{ display: 'flex' }}>SAP Portal</span>
        </div>
      }
    />
  );
};

export default Header;
