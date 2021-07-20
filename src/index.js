import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

let json = require('./data.json');
const TRENI = json.treni;

const FRECCE = require('./data-2.json');

ReactDOM.render(<App treni={TRENI} frecce={FRECCE}/>, document.getElementById('root'));
