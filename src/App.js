import React, { useState } from 'react';
import Select from 'react-select';

import './style.css';

class RigaSoluzioneTreno extends React.Component {
  GetHourDiff(pStartHour, pEndHour) {
    let res = '';
    let aTmp = '';
    // Trasformo l'orario di inizio in minuti
    aTmp = pStartHour.split(':');
    let nStartMin = Number(aTmp[0]) * 60 + Number(aTmp[1]);
    // Trasformo l'orario di fine in minuti
    aTmp = pEndHour.split(':');
    let nEndMin = Number(aTmp[0]) * 60 + Number(aTmp[1]);
    // Calcolo la differenza
    let nDiff = 0;
    if (nStartMin > nEndMin) {
      nDiff = nStartMin - nEndMin;
    } else {
      nDiff = nEndMin - nStartMin;
    }
    // Formatto la stringa di uscita
    let nDiffMin = 0;
    let nDiffHour = 0;
    if (nDiff > 59) {
      nDiffMin = nDiff % 60;
      nDiffHour = (nDiff - nDiffMin) / 60;
    } else {
      nDiffMin = nDiff;
    }
    if (nDiffHour < 10) res += '0';
    res += nDiffHour;
    res += 'h ';
    if (nDiffMin < 10) res += '0';
    res += nDiffMin;
    res += 'm';
    return res;
  }

  render() {
    const treno = this.props.treno;
    return (
      <tr>
        <td>
          {treno.stazione_partenza}
          <br />
          <span className="font-bold">{treno.orario_partenza}</span>
        </td>
        <td>
          {treno.stazione_arrivo}
          <br />
          <span className="font-bold">{treno.orario_arrivo}</span>
        </td>
        <td>
          <b>{this.GetHourDiff(treno.orario_partenza, treno.orario_arrivo)}</b>
        </td>
        <td>{treno.nome_treno}</td>
        <td className="font-bold">&euro;{treno.prezzo_biglietto}</td>
      </tr>
    );
  }
}

class Ricerca extends React.Component {
  constructor(props) {
    super(props);
    this.handleRicercaPartenzaChange = this.handleRicercaPartenzaChange.bind(this);

    this.handleRicercaArrivoChange = this.handleRicercaArrivoChange.bind(this);

    this.state = {
      start : '',
      end : ''
    }

  }

  handleRicercaPartenzaChange(e) {
    this.props.onFilterPartenzaChange(e.target.value);
  }

  handleRicercaArrivoChange(e) {
    this.props.onFilterArrivoChange(e.target.value);
  }

  logChangeStart(val) {
    this.setState({start: val.value});
    this.props.onFilterOraInizioChange(val.value);
  }

  logChangeEnd(val) {
    this.setState({end: val.value});
    this.props.onFilterOraFineChange(val.value);
  }

  displaySelectedValue(n, x) {
    if(!n) n = x;
    return (n <= 9) ? '0' + n : n;
  }

  render() {
    let ricercaPartenza = this.props.ricercaPartenza;
    let ricercaArrivo = this.props.ricercaArrivo;

    let ricercaOraInizio = this.props.ricercaOraInizio;
    let ricercaOraFine = this.props.ricercaOraFine;

    console.log(this.props);

    var options = [
      {value: '0', label: '00:00' },
      {value: '1', label: '01:00' },
      {value: '2', label: '02:00' },
      {value: '3', label: '03:00' },
      {value: '4', label: '04:00' },
      {value: '5', label: '05:00' },
      {value: '6', label: '06:00' },
      {value: '7', label: '07:00' },
      {value: '8', label: '08:00' },
      {value: '9', label: '09:00' },
      {value: '10', label: '10:00' },
      {value: '11', label: '11:00' },
      {value: '12', label: '12:00' },
      {value: '13', label: '13:00' },
      {value: '14', label: '14:00' },
      {value: '15', label: '15:00' },
      {value: '16', label: '16:00' },
      {value: '17', label: '17:00' },
      {value: '18', label: '18:00' },
      {value: '19', label: '19:00' },
      {value: '20', label: '20:00' },
      {value: '21', label: '21:00' },
      {value: '22', label: '22:00' },
      {value: '23', label: '23:00' }
    ];

    return (
      <div id="rigaRicerca">
        <form>
          <div className="row">
            <div className="col form-group">
              <label htmlFor="trenoDa">Da </label>
              <input
                type="text"
                value={ricercaPartenza}
                placeholder="Città di partenza"
                id="trenoDa"
                onChange={this.handleRicercaPartenzaChange}
                className="form-control"
              />
            </div>
            <div className="col form-group">
              <label htmlFor="trenoA">A </label>
              <input
                type="text"
                value={ricercaArrivo}
                placeholder="Città di arrivo"
                id="trenoA"
                onChange={this.handleRicercaArrivoChange}
                className="form-control"
              />
            </div>
            <div className="col form-group">
              <label htmlFor="dalleOre">Dalle </label>
              <Select
                id="dalleOre"
                value={this.state.start}
                options={options}
                onChange={this.logChangeStart.bind(this)}
                placeholder={this.displaySelectedValue(this.state.start, ricercaOraInizio)}
              />
            </div>
            <div className="col form-group">
              <label htmlFor="alleOre">Alle </label>
              <Select
                id="alleOre"
                value={this.state.end}
                options={options}
                onChange={this.logChangeEnd.bind(this)}
                placeholder={this.displaySelectedValue(this.state.end, ricercaOraFine)}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

class TabellaSoluzioni extends React.Component {
  isInRange(partenza, arrivo, min, max) {
    partenza = parseInt(partenza.substring(0, 2));
    arrivo = parseInt(arrivo.substring(0, 2));
    return partenza >= min && arrivo <= max ? true : false;
  }

  render() {
    const righe = [];
    const ricercaPartenza = this.props.ricercaPartenza;
    const ricercaArrivo = this.props.ricercaArrivo;
    const ricercaInizio = this.props.ricercaOraInizio;
    const ricercaFine = this.props.ricercaOraFine;

    this.props.treni.forEach(treno => {
      if (
        treno.stazione_partenza.toUpperCase() ===
          ricercaPartenza.toUpperCase() &&
        treno.stazione_arrivo.toUpperCase() === ricercaArrivo.toUpperCase() &&
        this.isInRange(
          treno.orario_partenza,
          treno.orario_arrivo,
          ricercaInizio,
          ricercaFine
        )
      ) {
        righe.push(<RigaSoluzioneTreno treno={treno} key={treno.nome_treno} />);
      }
    });

    return (
      <table>
        <thead>
          <tr id="rigaIntestazione">
            <th>Partenza</th>
            <th>Arrivo</th>
            <th>Durata</th>
            <th>Treno</th>
            <th>Prezzo</th>
          </tr>
        </thead>
        <tbody>{righe}</tbody>
      </table>
    );
  }
}

class TabellaSoluzioniRicercabili extends React.Component {
  constructor(props) {
    super(props);
    const today = new Date();
    const h = today.getHours();
    this.state = {
      ricercaPartenza: 'Milano Centrale',
      ricercaArrivo: 'Roma Termini',
      ricercaOraInizio: h,
      ricercaOraFine: '23'
    };

    this.handleRicercaPartenzaChange = this.handleRicercaPartenzaChange.bind(
      this
    );
    this.handleRicercaArrivoChange = this.handleRicercaArrivoChange.bind(
      this
    );

    this.handleRicercaOraInizioChange = this.handleRicercaOraInizioChange.bind(
      this
    );
    this.handleRicercaOraFineChange = this.handleRicercaOraFineChange.bind(
      this
    );
  }

  handleRicercaPartenzaChange(partenza) {
    this.setState({
      ricercaPartenza: partenza
    });
  }

  handleRicercaArrivoChange(arrivo) {
    this.setState({
      ricercaArrivo: arrivo
    });
  }

  handleRicercaOraInizioChange(inizio) {
    console.log('Ora inizio Change: ' + inizio)
    this.setState({
      ricercaOraInizio: inizio
    });
    console.log(this.state);
  }

  handleRicercaOraFineChange(fine) {
    console.log('Ora fine Change: ' + fine)
    this.setState({
      ricercaOraFine: fine
    });
    console.log(this.state);
  }

  render() {
    return (
      <div className="container">
        <Ricerca
          ricercaPartenza={this.state.ricercaPartenza}
          ricercaArrivo={this.state.ricercaArrivo}
          ricercaOraInizio={this.state.ricercaOraInizio}
          ricercaOraFine={this.state.ricercaOraFine}
          onFilterPartenzaChange={this.handleRicercaPartenzaChange}
          onFilterArrivoChange={this.handleRicercaArrivoChange}
          onFilterOraInizioChange={this.handleRicercaOraInizioChange}
          onFilterOraFineChange={this.handleRicercaOraFineChange}
        />
        <TabellaSoluzioni
          treni={this.props.treni}
          ricercaPartenza={this.state.ricercaPartenza}
          ricercaArrivo={this.state.ricercaArrivo}
          ricercaOraInizio={this.state.ricercaOraInizio}
          ricercaOraFine={this.state.ricercaOraFine}
        />
      </div>
    );
  }
}

export default TabellaSoluzioniRicercabili;
