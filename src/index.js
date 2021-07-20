import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

let json = require('./data.json');
const TRENI = json.treni;



ReactDOM.render(<App />, document.getElementById('root'));
