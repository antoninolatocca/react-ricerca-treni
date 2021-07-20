import React, { useState } from 'react';
import Select from 'react-select';
import Utility from './Utility';

import './style.css';

/**
 * + App {treni}
 *    + Ricerca {ricercaPartenza, ricercaArrivo, ricercaOraPartenza, ricercaOraArrivo}
 *    + TabellaSoluzioni {treni, ricercaPartenza, ricercaArrivo, ricercaOraPartenza, ricercaOraArrivo}
 *        + RigaSoluzioneTreno {treno}
 */

class RigaSoluzioneTreno extends React.Component {

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
          <b>{Utility.getHourDiff(treno.orario_partenza, treno.orario_arrivo)}</b>
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

    this.state = {
      start : this.props.ricercaOraInizio,
      end : this.props.ricercaOraFine,
      stazione_partenza : this.props.ricercaPartenza,
      stazione_arrivo : this.props.ricercaArrivo
    };

    this._stazioni = [];
    for(let item of this.props.stazioni.values()) {
      this._stazioni.push({value: item, label: item});
    };

    this._orari = [
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
  }

  handleRicercaPartenzaChange(val) {
    this.setState({stazione_partenza: val.value});
    this.props.onFilterPartenzaChange(val.value);
  }

  handleRicercaArrivoChange(val) {
    this.setState({stazione_arrivo: val.value});
    this.props.onFilterArrivoChange(val.value);
  }

  handleRicercaOraInizioChange(val) {
    this.setState({start: val.value});
    this.props.onFilterOraInizioChange(val.value);
  }

  handleRicercaOraFineChange(val) {
    this.setState({end: val.value});
    this.props.onFilterOraFineChange(val.value);
  }

  render() {
    return (
      <div id="rigaRicerca">
        <form>
          <div className="row">
            <div className="col form-group">
              <label htmlFor="stazionePartenza">Da </label>
              <Select
                id="stazionePartenza"
                value={this.state.ricercaPartenza}
                options={this._stazioni}
                placeholder="Stazione di partenza"
                onChange={this.handleRicercaPartenzaChange.bind(this)}
              />
            </div>
            <div className="col form-group">
              <label htmlFor="stazioneArrivo">A </label>
              <Select
                id="stazioneArrivo"
                value={this.state.ricercaArrivo}
                options={this._stazioni}
                placeholder="Stazione di arrivo"
                onChange={this.handleRicercaArrivoChange.bind(this)}
              />
            </div>
            <div className="col form-group">
              <label htmlFor="dalleOre">Dalle </label>
              <Select
                id="dalleOre"
                value={this.state.start}
                options={this._orari}
                onChange={this.handleRicercaOraInizioChange.bind(this)}
                placeholder={Utility.displayDigit(this.state.start)}
              />
            </div>
            <div className="col form-group">
              <label htmlFor="alleOre">Alle </label>
              <Select
                id="alleOre"
                value={this.state.end}
                options={this._orari}
                onChange={this.handleRicercaOraFineChange.bind(this)}
                placeholder={Utility.displayDigit(this.state.end)}
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

class App extends React.Component {
  constructor(props) {
    super(props);
    const _today = new Date();
    const _h = _today.getHours();
    this.state = {
      ricercaPartenza: 'Milano Centrale',
      ricercaArrivo: 'Roma Termini',
      ricercaOraInizio: _h,
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

    this.getListaStazioni();
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
    this.setState({
      ricercaOraInizio: inizio
    });
  }

  handleRicercaOraFineChange(fine) {
    this.setState({
      ricercaOraFine: fine
    });
  }

  getListaStazioni() {
    this._stazioni = new Set();
    this.props.frecce.treni.forEach(tratta => {
        tratta.fermate.forEach(fermata => {
            this._stazioni.add(fermata.stazione);
        })
    });
    console.log(this._stazioni);
  }

  render() {
    return (
      <div className="container">
        <Ricerca
          stazioni={this._stazioni}

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

export default App;
