import React from 'react';
import './style.css';

class RigaSoluzioneTreno extends React.Component {
  GetHourDiff(pStartHour, pEndHour) {
    var res = '';
    var aTmp = '';
    // Trasformo l'orario di inizio in minuti
    aTmp = pStartHour.split(':');
    var nStartMin = Number(aTmp[0]) * 60 + Number(aTmp[1]);
    // Trasformo l'orario di fine in minuti
    aTmp = pEndHour.split(':');
    var nEndMin = Number(aTmp[0]) * 60 + Number(aTmp[1]);
    // Calcolo la differenza
    var nDiff = 0;
    if (nStartMin > nEndMin) {
      nDiff = nStartMin - nEndMin;
    } else {
      nDiff = nEndMin - nStartMin;
    }
    // Formatto la stringa di uscita
    var nDiffMin = 0;
    var nDiffHour = 0;
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
    this.handleRicercaPartenzaChange = this.handleRicercaPartenzaChange.bind(
      this
    );
    this.handleRicercaArrivoChange = this.handleRicercaArrivoChange.bind(this);
  }

  handleRicercaPartenzaChange(e) {
    this.props.onFilterPartenzaChange(e.target.value);
  }

  handleRicercaArrivoChange(e) {
    this.props.onFilterArrivoChange(e.target.value);
  }

  render() {
    const ricercaPartenza = this.props.ricercaPartenza;
    const ricercaArrivo = this.props.ricercaArrivo;

    const today = new Date();
    const y = today.getFullYear();
    const m =
      today.getMonth() + 1 < 9
        ? '0' + (today.getMonth() + 1)
        : today.getMonth() + 1;
    const d = today.getDate() < 9 ? '0' + today.getDate() : today.getDate();
    const todayString = y + '-' + m + '-' + d;

    return (
      <div id="rigaRicerca">
        <form>
          <label htmlFor="trenoDa">Da </label>
          <input
            type="text"
            value={ricercaPartenza}
            placeholder="Città di partenza"
            id="trenoDa"
            onChange={this.handleRicercaPartenzaChange}
          />
          <label htmlFor="trenoA">A </label>
          <input
            type="text"
            value={ricercaArrivo}
            placeholder="Città di arrivo"
            id="trenoA"
            onChange={this.handleRicercaArrivoChange}
          />
          <label htmlFor="dalleOre">Dalle </label>
          <select id="dalleOre">
            <option value="0">00:00</option>
            <option value="1">01:00</option>
            <option value="2">02:00</option>
            <option value="3">03:00</option>
            <option value="4">04:00</option>
            <option value="5">05:00</option>
            <option value="6">06:00</option>
            <option value="7">07:00</option>
            <option value="8">08:00</option>
            <option value="9">09:00</option>
            <option value="10">10:00</option>
            <option value="11">11:00</option>
            <option value="12">12:00</option>
            <option value="13">13:00</option>
            <option value="14">14:00</option>
            <option value="15">15:00</option>
            <option value="16">16:00</option>
            <option value="17">17:00</option>
            <option value="18">18:00</option>
            <option value="19">19:00</option>
            <option value="20">20:00</option>
            <option value="21">21:00</option>
            <option value="22">22:00</option>
            <option value="23">23:00</option>
          </select>
          <label htmlFor="alleOre">Alle </label>
          <select id="alleOre">
            <option value="0">00:00</option>
            <option value="1">01:00</option>
            <option value="2">02:00</option>
            <option value="3">03:00</option>
            <option value="4">04:00</option>
            <option value="5">05:00</option>
            <option value="6">06:00</option>
            <option value="7">07:00</option>
            <option value="8">08:00</option>
            <option value="9">09:00</option>
            <option value="10">10:00</option>
            <option value="11">11:00</option>
            <option value="12">12:00</option>
            <option value="13">13:00</option>
            <option value="14">14:00</option>
            <option value="15">15:00</option>
            <option value="16">16:00</option>
            <option value="17">17:00</option>
            <option value="18">18:00</option>
            <option value="19">19:00</option>
            <option value="20">20:00</option>
            <option value="21">21:00</option>
            <option value="22">22:00</option>
            <option value="23">23:00</option>
          </select>
          <label htmlFor="date">Il </label>
          <input
            type="date"
            id="date"
            name="start-date"
            value={todayString}
            min={todayString}
            max="2021-12-31"
          />
        </form>
      </div>
    );
  }
}

class TabellaSoluzioni extends React.Component {
  render() {
    const righe = [];
    const ricercaPartenza = this.props.ricercaPartenza;
    const ricercaArrivo = this.props.ricercaArrivo;

    this.props.treni.forEach(treno => {
      if (
        treno.stazione_partenza.toUpperCase() ===
          ricercaPartenza.toUpperCase() &&
        treno.stazione_arrivo.toUpperCase() === ricercaArrivo.toUpperCase()
      ) {
        righe.push(<RigaSoluzioneTreno treno={treno} key={treno.nome} />);
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
    this.state = {
      ricercaPartenza: 'Milano Centrale',
      ricercaArrivo: 'Roma Termini'
    };

    this.handleRicercaPartenzaChange = this.handleRicercaPartenzaChange.bind(
      this
    );
    this.handleRicercaArrivoChange = this.handleRicercaArrivoChange.bind(this);
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

  render() {
    return (
      <div className="container">
        <Ricerca
          ricercaPartenza={this.state.ricercaPartenza}
          ricercaArrivo={this.state.ricercaArrivo}
          onFilterPartenzaChange={this.handleRicercaPartenzaChange}
          onFilterArrivoChange={this.handleRicercaArrivoChange}
        />
        <TabellaSoluzioni
          treni={this.props.treni}
          ricercaPartenza={this.state.ricercaPartenza}
          ricercaArrivo={this.state.ricercaArrivo}
        />
      </div>
    );
  }
}

export default TabellaSoluzioniRicercabili;
