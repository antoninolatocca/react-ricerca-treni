import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Utility from './Utility';

import './style.css';
import ControllerRicerca from "./controllo/ControllerRicerca";

/**
 * + App
 *    + Ricerca
 *    + TabellaSoluzioni
 *        + RigaSoluzioneTreno
 */

/** APP **/
class App extends React.Component {
  static singleton;

  constructor(props) {
    super(props);
    App.singleton = this;
    this._controllerRicerca = new ControllerRicerca();
    const _today = new Date();
    const _h = _today.getHours();
    this._stazioni = Utility.getListaStazioni();
    this.state = {
      treni: Utility.treni.treni,
      ricercaPartenza: 'Milano Centrale',
      ricercaArrivo: 'Roma Termini',
      ricercaOraInizio: _h,
      ricercaOraFine: '23'
    };

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

  get controllerRicerca(){
    return this._controllerRicerca;
  }


  handleRicercaArrivoChange(arrivo) {
    this.setState({
      ricercaArrivo: arrivo,
      treni: Utility.ricercaTreni(this.state.ricercaPartenza, arrivo)
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

  render() {
    return (
      <div className="container">
        <Ricerca
          stazioni={this._stazioni}

          ricercaPartenza={this.state.ricercaPartenza}
          ricercaArrivo={this.state.ricercaArrivo}
          ricercaOraInizio={this.state.ricercaOraInizio}
          ricercaOraFine={this.state.ricercaOraFine}

          onFilterOraInizioChange={this.handleRicercaOraInizioChange}
          onFilterOraFineChange={this.handleRicercaOraFineChange}
        />
        <TabellaSoluzioni
          lista={this.state.treni}
          ricercaPartenza={this.state.ricercaPartenza}
          ricercaArrivo={this.state.ricercaArrivo}
          ricercaOraInizio={this.state.ricercaOraInizio}
          ricercaOraFine={this.state.ricercaOraFine}
        />
      </div>
    );
  }
}



/** + RICERCA */
class Ricerca extends React.Component {

  constructor(props) {
    super(props);

    this._jsonStazioni = Utility.getListaStazioni();

    this.state = {
      start : this.props.ricercaOraInizio,
      end : this.props.ricercaOraFine,
      stazione_partenza : this.props.ricercaPartenza,
      stazione_arrivo : this.props.ricercaArrivo
    };

    this._stazioni = [];
    for(let item of this._jsonStazioni.values()) {
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
    App.singleton.setState({ricercaPartenza: val.value});
    App.singleton.controllerRicerca.handleSelectPartenzaChange(val.value);
  }

  handleRicercaArrivoChange(val) {
    this.setState({stazione_arrivo: val.value});
    App.singleton.controllerRicerca.handleSelectArrivoChange(val.value);
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
                placeholder={(this.state.ricercaPartenza) ? this.state.ricercaPartenza : "Stazione di partenza"}
                onChange={this.handleRicercaPartenzaChange.bind(this)}
              />
            </div>
            <div className="col form-group">
              <label htmlFor="stazioneArrivo">A </label>
              <Select
                id="stazioneArrivo"
                value={this.state.ricercaArrivo}
                options={this._stazioni}
                placeholder={(this.state.ricercaArrivo) ? this.state.ricercaArrivo : "Stazione di arrivo"}
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


/** + TABELLA */
class TabellaSoluzioni extends React.Component {

  constructor(props) {
    super(props);

    this._ricercaPartenza = this.props.ricercaPartenza;
    this._ricercaArrivo = this.props.ricercaArrivo;
    this._ricercaInizio = this.props.ricercaOraInizio;
    this._ricercaFine = this.props.ricercaOraFine;
  }

  render() {
    const righe = [];

    if(this.props.lista.length > 0) {
      this.props.lista.forEach((soluzione) => {
        righe.push(<RigaSoluzioneTreno treno={soluzione} key={soluzione.treno} />);
      });
    } else {
      righe.push("Nessun Risultato") 
    }

    return (
      <table>
        <thead>
          <tr id="rigaIntestazione">
            <th>Partenza</th>
            <th>Arrivo</th>
            <th>Durata</th>
            <th>Treno</th>
          </tr>
        </thead>
        <tbody>{righe}</tbody>
      </table>
    );
  }
}


/** + + RIGA */
class RigaSoluzioneTreno extends React.Component {

  render() {
    const treno = this.props.treno;

    let dati = App.singleton.controllerRicerca.getDatiRigaTreno(treno);

    return (
      <tr>
        <td>
          {dati.stazione_partenza}
          <br />
          <span className="font-bold">{dati.orario_partenza}</span>
        </td>
        <td>
          {dati.stazione_arrivo}
          <br />
          <span className="font-bold">{dati.orario_arrivo}</span>
        </td>
        <td>
          <b>{dati.durata}</b>
        </td>
        <td>{treno.convoglio} <b>{treno.treno}</b></td>
      </tr>
    );
  }
}

export default App;