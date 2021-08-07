import Utility from "../Utility";
import App from "../App";
import Costanti from "../Costanti";

class ControllerRicerca {

    constructor() {
        const _today = new Date();
        const _h = _today.getHours();

        this._partenza = "Milano Centrale";
        this._arrivo = "Roma Termini";
        this._orario = _h;
        this._convoglio = Costanti.ALL;

        this._avviaRicerca = true;

        this._orderBy = Costanti.PARTENZA;
    }

    handleSelectPartenzaChange(value) {
        this._partenza = value;
        App.singleton.setState({treni:Utility.ricercaTreni(value, this._arrivo, this._orario, this._convoglio, this._orderBy)});
    }

    handleSelectArrivoChange(value) {
        this._arrivo = value;
        App.singleton.setState({treni:Utility.ricercaTreni(this._partenza, value, this._orario, this._convoglio, this._orderBy)})
    }

    handleSelectOraInizioChange(value) {
        this._orario = value;
        App.singleton.setState({treni:Utility.ricercaTreni(this._partenza, this._arrivo, value, this._convoglio, this._orderBy)});
    }

    handleSelectConvoglioChange(value) {
        this._convoglio = value;
        App.singleton.setState({treni:Utility.ricercaTreni(this._partenza, this._arrivo, this._orario, value, this._orderBy)});
    }

    handleSelectOrdinamentoChange(value) {
        this._orderBy = value;
        App.singleton.setState({treni:Utility.ricercaTreni(this._partenza, this._arrivo, this._orario, this._convoglio, value)});
    }

    getDatiRigaTreno(treno) {
        const _posPartenza = Utility.getPosFermata(treno, this._partenza);
        const _posArrivo = Utility.getPosFermata(treno, this._arrivo);

        let result = {
            "stazione_partenza": treno.fermate[0].stazione,
            "stazione_arrivo": treno.fermate[treno.fermate.length -1].stazione,
            "orario_partenza": treno.fermate[0].orario,
            "orario_arrivo": treno.fermate[treno.fermate.length -1].orario
        };
    
        if(_posPartenza && _posPartenza >= 0) {
          result.stazione_partenza = treno.fermate[_posPartenza].stazione;
          result.orario_partenza = treno.fermate[_posPartenza].orario;
        }
        if(_posArrivo && _posArrivo >= 0) {
          result.stazione_arrivo = treno.fermate[_posArrivo].stazione;
          result.orario_arrivo = treno.fermate[_posArrivo].orario;
        }

        let durataObj = Utility.getHourDiff(result.orario_partenza, result.orario_arrivo);
        result.durata = Utility.displayDurata(durataObj);
        result.giorno_successivo = durataObj.giorno_successivo;

        return result;
    }

    getFermateTreno(treno) {
        const _posPartenza = Utility.getPosFermata(treno, this._partenza);
        const _posArrivo = Utility.getPosFermata(treno, this._arrivo);

        let fermate = [];
        for(let i = _posPartenza; i <= _posArrivo; i++) {
            fermate.push(treno.fermate[i].stazione);
        }
        return fermate;
    }

    getDatiIniziali() {
        let treni;
        if(this._avviaRicerca) {
            treni = Utility.ricercaTreni(this._partenza, this._arrivo, this._orario, this._convoglio, this._orderBy);
        } else {
            treni = Utility.treni.treni;
        }

        return {
            treni: treni,
            partenza: this._partenza,
            arrivo: this._arrivo,
            orario: this._orario,
            convoglio: this._convoglio,
            ordinamento: this._orderBy
        };
    }

}

export default ControllerRicerca;