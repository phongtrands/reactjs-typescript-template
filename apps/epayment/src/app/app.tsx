// Uncomment this line to use CSS modules
// import styles from './app.module.scss';
import NxWelcome from './nx-welcome';

export function App() {
  const a = {
    a: '12345678901234567890',
    b: '12345678901234567890',
    c: '12345678901234567890',
    d: '12345678901234567890',
    e: '12345678901234567890',
    f: '12345678901234567890',
    g: '12345678901234567890',
  };
  const b = 123;

  return (
    <div>
      <NxWelcome title='epayment' />
    </div>
  );
}

export default App;
