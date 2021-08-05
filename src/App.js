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
 *        + RigaZeroSoluzioni
 *    + Contatori
 *    + ModalDettagli
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
    this._rotabili = Utility.getListaRotabili();
    this.state = {
      treni: Utility.treni.treni,
      ricercaPartenza: 'Milano Centrale',
      ricercaArrivo: 'Roma Termini',
      ricercaOraInizio: _h,
      ricercaConvoglio: "Frecciarossa 1000"
    };
    // ON/OFF 
    this.state.treni = Utility.ricercaTreni(this.state.ricercaPartenza, this.state.ricercaArrivo, this.state.ricercaOraInizio, this.state.ricercaConvoglio);

    this.handleRicercaArrivoChange = this.handleRicercaArrivoChange.bind(
      this
    );

    this.handleRicercaOraInizioChange = this.handleRicercaOraInizioChange.bind(
      this
    );

    this.handleSelectConvoglioChange = this.handleRicercaConvoglioChange.bind(
      this
    );
  }

  get controllerRicerca(){
    return this._controllerRicerca;
  }

  handleRicercaArrivoChange(arrivo) {
    this.setState({
      ricercaArrivo: arrivo,
      treni: Utility.ricercaTreni(this.state.ricercaPartenza, arrivo, this.state.ricercaOraInizio, this.state.ricercaConvoglio)
    });
  }

  handleRicercaOraInizioChange(inizio) {
    this.setState({
      ricercaOraInizio: inizio,
      treni: Utility.ricercaTreni(this.state.ricercaPartenza, this.ricercaArrivo, inizio, this.state.ricercaConvoglio)
    });
  }

  handleRicercaConvoglioChange(convoglio) {
    this.setState({
      ricercaConvoglio: convoglio,
      treni: Utility.ricercaTreni(this.state.ricercaPartenza, this.ricercaArrivo, this.state.ricercaOraInizio, convoglio)
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
          ricercaConvoglio={this.state.ricercaConvoglio}
        />
        <TabellaSoluzioni
          lista={this.state.treni}
          ricercaPartenza={this.state.ricercaPartenza}
          ricercaArrivo={this.state.ricercaArrivo}
          ricercaOraInizio={this.state.ricercaOraInizio}
          ricercaConvoglio={this.state.ricercaConvoglio}
        />
        <Contatori 
          soluzioni={this.state.treni.length}
        />

        <ModalDettagli />
      </div>
    );
  }
}



/** + RICERCA */
class Ricerca extends React.Component {

  constructor(props) {
    super(props);

    this._jsonStazioni = Utility.getListaStazioni();
    this._jsonConvogli = Utility.getListaRotabili();

    this.state = {
      start : this.props.ricercaOraInizio,
      stazione_partenza : this.props.ricercaPartenza,
      stazione_arrivo : this.props.ricercaArrivo,
      convoglio: this.props.ricercaConvoglio
    };

    this._stazioni = [];
    for(let item of this._jsonStazioni.values()) {
      this._stazioni.push({value: item, label: item});
    };

    this._convogli = [];
    for(let item of this._jsonConvogli.values()) {
      this._convogli.push({value: item, label: item});
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
    App.singleton.controllerRicerca.handleSelectOraInizioChange(val.value);
  }

  handleRicercaConvoglioChange(val) {
    this.setState({convoglio: val.value});
    App.singleton.controllerRicerca.handleSelectConvoglioChange(val.value);
  }

  render() {
    return (
      <div id="rigaRicerca">
        <form>
          <div className="row mb-3">
            <div className="col form-group">
              <label htmlFor="stazionePartenza">Da </label>
              <Select
                id="stazionePartenza"
                value={this.state.ricercaPartenza}
                options={this._stazioni}
                placeholder={(this.state.stazione_partenza) ? this.state.stazione_partenza : "Stazione di partenza"}
                onChange={this.handleRicercaPartenzaChange.bind(this)}
              />
            </div>
            <div className="col form-group">
              <label htmlFor="stazioneArrivo">A </label>
              <Select
                id="stazioneArrivo"
                value={this.state.ricercaArrivo}
                options={this._stazioni}
                placeholder={(this.state.stazione_arrivo) ? this.state.stazione_arrivo : "Stazione di arrivo"}
                onChange={this.handleRicercaArrivoChange.bind(this)}
              />
            </div>
            <div className="col form-group">
              <label htmlFor="dalleOre">Ore </label>
              <Select
                id="dalleOre"
                value={this.state.start}
                options={this._orari}
                placeholder={Utility.displayDigit(this.state.start) + ":00"}
                onChange={this.handleRicercaOraInizioChange.bind(this)}
              />
            </div>
            <div className="col form-group">
              <label htmlFor="convogli">Treno </label>
              <Select
                id="convogli"
                value={this.state.ricercaConvoglio}
                options={this._convogli}
                placeholder={(this.state.convoglio) ? this.state.convoglio : "Treno"}
                onChange={this.handleRicercaConvoglioChange.bind(this)}
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
    this._convogli = this.props.ricercaConvoglio;
  }

  render() {
    let righe = [];

    if(this.props.lista.length > 0) {
      this.props.lista.forEach((soluzione) => {
        righe.push(<RigaSoluzioneTreno treno={soluzione} key={soluzione.treno} />);
      });
    } else {
      righe = [];
      righe.push(<RigaZeroSoluzioni key="0"/>); 
    }

    return (
      <table className="shadow mb-2">
        <thead>
          <tr id="rigaIntestazione">
            <th>Partenza</th>
            <th>Arrivo</th>
            <th>Durata</th>
            <th>Treno</th>
          </tr>
        </thead>
        <tbody className="hover-red">{righe}</tbody>
      </table>
    );
  }
}


/** + + RIGA */
class RigaSoluzioneTreno extends React.Component {

  handleClickDettagli() {
    let treno = Utility.getTrenoByNumber(this.props.treno.treno);
    let fermateTreno = App.singleton.controllerRicerca.getFermateTreno(treno);

    $('#titoloModal').html(treno.convoglio + " " + treno.treno);
    let html = "<table className=\"table\">";
    for (let i = 0; i < treno.fermate.length; i++) {
      const esito = fermateTreno.includes(treno.fermate[i].stazione)
      html += '<tr key="' + treno.fermate[i].stazione + '">';
      html += (esito) ? '<td class="footer"><strong>' : '<td><small><em>';
      html += treno.fermate[i].orario;
      html += (esito) ? '</strong></td><td class="footer"><strong>' : '</em></small></td><td><small><em>';
      html += (esito) ? treno.fermate[i].stazione.toUpperCase() : treno.fermate[i].stazione;
      html += (esito) ? '</strong></td></tr>' : '</em></small></td></tr>';
    }
    $('#modalDettaglioBody').html(html + "</table>");
    $('#modalDettaglioTreno').modal('show');
  }

  render() {
    const treno = this.props.treno;
    console.log(treno);

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
          {(treno.faster) ? <span><br/><small><i className="fas fa-meteor"></i> IL PIÙ VELOCE</small></span> : ""}
          {(treno.noStop) ? <span><br/><small><i className="far fa-compass"></i> NO STOP</small></span> : ""}
        </td>
        <td>{treno.convoglio} <b>{treno.treno}</b> <i id={this.props.treno.treno} className="fas fa-info-circle" type="button" data-bs-toggle="modal" data-bs-target="#modalDettaglioTreno" onClick={this.handleClickDettagli.bind(this)}></i></td>
      </tr>
    );
  }
}

/** + + RIGAVUOTA */
class RigaZeroSoluzioni extends React.Component {

  render() {

    return (
      <tr className="error">
        <td colSpan='4'>
          <i className="fas fa-exclamation-triangle fa-4x my-3"></i><br/>
          Purtroppo non ci sono risultati con questi filtri di ricerca
        </td>
      </tr>
    );
  }
}

class ModalDettagli extends React.Component {

  render() {
    return(
      <div className="modal fade" id="modalDettaglioTreno" tabIndex="-1" role="dialog" aria-labelledby="titoloModal" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="titoloModal">Dettagli treno</h5>
              <button type="button" className="btn btn-light" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fas fa-times"></i></span>
              </button>
            </div>
            <div className="modal-body" id="modalDettaglioBody">
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Contatori extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let treni = Utility.treni.treni.length;
    let stazioni = Utility.getListaStazioni().length;
    let soluzioni = this.props.soluzioni;

    return(
      <div className="row pt-5" id="contatori">
        <div className="col-4 my-4 py-4 border border-danger text-center text-danger rounded-pill shadow">
          <p className="display-2">{treni}</p>
          <p><b>Treni disponibili</b></p>
        </div>
        <div className="col-4 py-5 border border-danger text-center rounded-pill shadow">
          <p className="display-1">{soluzioni}</p>
          <p><b>Risultati trovati</b></p>
        </div>
        <div className="col-4 my-4 py-4 border border-danger text-center text-danger rounded-pill shadow">
          <p className="display-2">{stazioni}</p>
          <p><b>Stazioni disponibili</b></p>
        </div>
      </div>
    );
  }

}

export default App;