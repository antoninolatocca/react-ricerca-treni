import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Utility from './Utility';
import Costanti from './Costanti';

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

    let datiIniziali = this._controllerRicerca.getDatiIniziali();
    this.state = {
      treni: datiIniziali.treni,
      partenza: datiIniziali.partenza,
      arrivo: datiIniziali.arrivo,
      orario: datiIniziali.orario,
      convoglio: datiIniziali.convoglio,
      ordinamento: datiIniziali.ordinamento
    };
  }

  get controllerRicerca(){
    return this._controllerRicerca;
  }

  render() {
    return (
      <div className="container">
        <Ricerca
          state={this.state}
        />
        <TabellaSoluzioni
          lista={this.state.treni}
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

    this.state = this.props.state;

    this._stazioni = [];
    for(let item of this._jsonStazioni.values()) {
      this._stazioni.push({value: item, label: item});
    };

    this._convogli = [{value: Costanti.ALL, label: Costanti.TUTTI_I_TRENI}];
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

    this._ordinamenti = [
      {value: Costanti.PARTENZA, label: Costanti.PARTENZA},
      {value: Costanti.ARRIVO, label: Costanti.ARRIVO},
      {value: Costanti.DURATA, label: Costanti.DURATA}
    ];
  }

  handleRicercaPartenzaChange(val) {
    this.setState({partenza: val.value});
    App.singleton.controllerRicerca.handleSelectPartenzaChange(val.value);
  }

  handleRicercaArrivoChange(val) {
    this.setState({arrivo: val.value});
    App.singleton.controllerRicerca.handleSelectArrivoChange(val.value);
  }

  handleRicercaOraInizioChange(val) {
    this.setState({orario: val.value});
    App.singleton.controllerRicerca.handleSelectOraInizioChange(val.value);
  }

  handleRicercaConvoglioChange(val) {
    this.setState({convoglio: val.value});
    App.singleton.controllerRicerca.handleSelectConvoglioChange(val.value);
  }

  handleOrdinamentoChange(val) {
    this.setState({ordinamento: val.value});
    App.singleton.controllerRicerca.handleSelectOrdinamentoChange(val.value);
  }

  render() {
    return (
      <div id="rigaRicerca">
        <form>
          <div className="row mb-3">
            <div className="col form-group">
              <label htmlFor="stazionePartenza">{Costanti.DA} </label>
              <Select
                id="stazionePartenza"
                value={this.state.partenza}
                options={this._stazioni}
                placeholder={(this.state.partenza) ? this.state.partenza : Costanti.STAZIONE_DI_PARTENZA}
                onChange={this.handleRicercaPartenzaChange.bind(this)}
              />
            </div>
            <div className="col form-group">
              <label htmlFor="stazioneArrivo">{Costanti.A} </label>
              <Select
                id="stazioneArrivo"
                value={this.state.arrivo}
                options={this._stazioni}
                placeholder={(this.state.arrivo) ? this.state.arrivo : Costanti.STAZIONE_DI_ARRIVO}
                onChange={this.handleRicercaArrivoChange.bind(this)}
              />
            </div>
            <div className="col form-group">
              <label htmlFor="dalleOre">{Costanti.ORE} </label>
              <Select
                id="dalleOre"
                value={this.state.orario}
                options={this._orari}
                placeholder={Utility.displayDigit(this.state.orario) + ":00"}
                onChange={this.handleRicercaOraInizioChange.bind(this)}
              />
            </div>
            <div className="col form-group">
              <label htmlFor="convogli">{Costanti.TRENO} </label>
              <Select
                id="convogli"
                value={this.state.convoglio}
                options={this._convogli}
                placeholder={(this.state.convoglio == Costanti.ALL) ? Costanti.TUTTI_I_TRENI : this.state.convoglio}
                onChange={this.handleRicercaConvoglioChange.bind(this)}
              />
            </div>
            <div className="col form-group">
              <label htmlFor="ordinamento">{Costanti.ORDINA_PER} </label>
              <Select
                id="ordinamento"
                value={this.state.ordinamento}
                options={this._ordinamenti}
                placeholder={(this.state.ordinamento) ? this.state.ordinamento : Costanti.ORDINA_PER}
                onChange={this.handleOrdinamentoChange.bind(this)}
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
            <th>{Costanti.PARTENZA}</th>
            <th>{Costanti.ARRIVO}</th>
            <th>{Costanti.DURATA}</th>
            <th>{Costanti.TRENO}</th>
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
    let classi = Utility.getClassiDiServizio(treno.convoglio);
    let fermateTreno = App.singleton.controllerRicerca.getFermateTreno(treno);

    $('#titoloModal').html(treno.convoglio + " " + treno.treno);

    let opt_classi = [];
    let opt_classi_html = ""
    for(let i = 0; i < classi.length; i++) {
      opt_classi.push({value:classi[i].replaceAll(" ", "_"), label:classi[i]});
      opt_classi_html += '<option value="' + classi[i].replaceAll(" ", "_") + '">' + classi[i] + '</option>';
    }

    let html_0 = `
      <table className="table">
        <tr>
          <td>
            Convoglio
          </td>
          <td>
            <b>${treno.convoglio}</b>
          </td>
        </tr>
        <tr>
        <td>
          Tratta
        </td>
        <td>
          <b>${treno.fermate[0].stazione}</b> / <b>${treno.fermate[treno.fermate.length -1].stazione}</b>
        </td>
      </tr>
        <tr>
          <td>
            <label for="classi" className="col-form-label">Classi di servizio</label>
          </td>
          <td>
            <select id="classi" className="form-control">
              ${opt_classi_html}
            </select>
          </td>
        </tr>
      </table><br/>`;

    let html = "<table className=\"table\">";
    html += "<thead><tr><td>ORARIO</td><td>STAZIONE</td></tr></thead><tbody>";
    for (let i = 0; i < treno.fermate.length; i++) {
      const esito = fermateTreno.includes(treno.fermate[i].stazione)
      html += '<tr key="' + treno.fermate[i].stazione + '">';
      html += (esito) ? '<td class="footer"><strong>' : '<td><small><em>';
      html += treno.fermate[i].orario;
      html += (esito) ? '</strong></td><td class="footer"><strong>' : '</em></small></td><td><small><em>';
      html += (esito) ? treno.fermate[i].stazione.toUpperCase() : treno.fermate[i].stazione;
      html += (esito) ? '</strong></td></tr>' : '</em></small></td></tr>';
    }
    $('#modalDettaglioBody').html(html_0 + html + "</tbody></table>");
    $('#modalDettaglioTreno').modal('show');
  }

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
          <span><span  className="font-bold">{dati.orario_arrivo}</span> {(dati.giorno_successivo) ? <sup><small><i class="fas fa-asterisk"></i></small></sup> : ""}</span>
        </td>
        <td>
          <b>{dati.durata}</b><br/>
          {(treno.faster) ? <span><small><i className="fas fa-meteor"></i> IL PIÙ VELOCE</small><br/></span> : ""}
          {(treno.stops === 0) ? <span><small><i className="far fa-compass"></i> NO STOP</small></span> : <small>Fermate: {treno.stops}</small>}
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
        <div className="modal-dialog modal-lg" role="document">
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