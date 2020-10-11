import React, {Suspense, useState} from 'react';

import styles from './styles/App.module.css';

const Main = React.lazy(() => import('./containers/Main.container.react'));
const Header = React.lazy(() => import('./containers/Header.container.react'));
const Spinner = React.lazy(() => import('./component/Spinner.component.react'));

function App() {
  const [isSpinnerVisible, setIsSpinnerVisible] = useState<boolean>(false);
  
  return (
    <Suspense fallback={<Spinner />}>
      <div className={styles.appWrapper}>
        <Header />
        <Main />
        {isSpinnerVisible && <Spinner />}
      </div>
    </Suspense>
  );
}

export default App;
