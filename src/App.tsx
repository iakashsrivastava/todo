import React, {useState} from 'react';

import {Header} from "./containers/Header.container.react";
import {Main} from './containers/Main.container.react';
import {Spinner} from "./component/Spinner.component.react"
import styles from './styles/App.module.css';

function App() {
  const [isSpinnerVisible, setIsSpinnerVisible] = useState<boolean>(false);
  
  return (
    <div className={styles.appWrapper}>
      <Header />
      <Main />
      {isSpinnerVisible && <Spinner />}
    </div>
  );
}

export default App;
