import React, {Suspense, useState} from 'react';

import {Spinner} from "./component/Spinner.component.react"
import styles from './styles/App.module.css';

const Main = React.lazy(() => import('./containers/Main.container.react'));
const Header = React.lazy(() => import('./containers/Header.container.react'));

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
