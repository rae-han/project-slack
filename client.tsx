import React from 'react';
// import { render } from 'react-dom';
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

import App from './layouts/App';

// render(<App />, document.querySelector('#app'))

const container = document.querySelector('#app');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>)
;