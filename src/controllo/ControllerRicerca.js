import Utility from "../Utility";
import App from "../App";

class ControllerRicerca {

    constructor() {
        this._partenza = "Milano Centrale";
        this._arrivo = "Roma Termini";
        this._convoglio = "Frecciarossa 1000";
    }

    handleSelectPartenzaChange(value) {
        this._partenza = value;
        App.singleton.setState({treni:Utility.ricercaTreni(value, this._arrivo, this._convoglio)});
    }

    handleSelectArrivoChange(value) {
        this._arrivo = value;
        App.singleton.setState({treni:Utility.ricercaTreni(this._partenza, value, this._convoglio)})
    }

    handleSelectOraInizioChange(value) {
        this._oraInizio = value;
        App.singleton.setState({treni:Utility.ricercaTreni(this._partenza, this._arrivo, this._convoglio)});
    }

    handleSelectConvoglioChange(value) {
        this._convoglio = value;
        App.singleton.setState({treni:Utility.ricercaTreni(this._partenza, this._arrivo, value)})
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

        console.log('Controlla le soluzioni');
        console.log(result);
        result.durata = Utility.getHourDiff(result.orario_partenza, result.orario_arrivo);

        return result;
    }

}

export default ControllerRicerca;