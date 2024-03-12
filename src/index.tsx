import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { MuiThemeProvider } from './theme';
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';
// import './assets/style/global.scss';
import App from './App';
import { Provider } from './provider';
import "./index.css"
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider>
      <MuiThemeProvider>
        <App />
        <ToastContainer />
      </MuiThemeProvider>
    </Provider>
  </React.StrictMode>
);

