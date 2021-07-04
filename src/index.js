import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const TRENI = [
  {
    stazione_partenza: 'Milano Centrale',
    stazione_arrivo: 'Roma Termini',
    orario_partenza: '05:00',
    orario_arrivo: '09:04',
    nome_treno: 'Frecciarossa 1000 0909',
    prezzo_biglietto: '95,00'
  },
  {
    stazione_partenza: 'Milano Centrale',
    stazione_arrivo: 'Roma Termini',
    orario_partenza: '05:45',
    orario_arrivo: '10:35',
    nome_treno: 'Frecciarossa 1000 9303',
    prezzo_biglietto: '95,00'
  },
  {
    stazione_partenza: 'Milano Centrale',
    stazione_arrivo: 'Roma Termini',
    orario_partenza: '06:00',
    orario_arrivo: '09:10',
    nome_treno: 'Frecciarossa 1000 9603',
    prezzo_biglietto: '95,00'
  },
  {
    stazione_partenza: 'Milano Centrale',
    stazione_arrivo: 'Roma Termini',
    orario_partenza: '06:10',
    orario_arrivo: '09:50',
    nome_treno: 'Frecciarossa 1000 8209',
    prezzo_biglietto: '95,00'
  },
  {
    stazione_partenza: 'Milano Centrale',
    stazione_arrivo: 'Roma Termini',
    orario_partenza: '06:35',
    orario_arrivo: '09:34',
    nome_treno: 'Frecciarossa 1000 9605',
    prezzo_biglietto: '95,00'
  },
  {
    stazione_partenza: 'Milano Centrale',
    stazione_arrivo: 'Roma Termini',
    orario_partenza: '07:00',
    orario_arrivo: '10:11',
    nome_treno: 'Frecciarossa 9607',
    prezzo_biglietto: '149,00'
  },
  {
    stazione_partenza: 'Milano Centrale',
    stazione_arrivo: 'Roma Termini',
    orario_partenza: '12:10',
    orario_arrivo: '15:49',
    nome_treno: 'Frecciarossa 9535',
    prezzo_biglietto: '149,50'
  },
  {
    stazione_partenza: 'Milano Centrale',
    stazione_arrivo: 'Roma Termini',
    orario_partenza: '13:00',
    orario_arrivo: '16:10',
    nome_treno: 'Frecciarossa 1000 9631',
    prezzo_biglietto: '245,00'
  },
  {
    stazione_partenza: 'Milano Centrale',
    stazione_arrivo: 'Roma Termini',
    orario_partenza: '13:10',
    orario_arrivo: '16:49',
    nome_treno: 'Frecciarossa 9539',
    prezzo_biglietto: '245,00'
  },
  {
    stazione_partenza: 'Milano Centrale',
    stazione_arrivo: 'Roma Termini',
    orario_partenza: '14:10',
    orario_arrivo: '17:49',
    nome_treno: 'Frecciarossa 9543',
    prezzo_biglietto: '129,00'
  }
];

ReactDOM.render(<App treni={TRENI} />, document.getElementById('root'));
