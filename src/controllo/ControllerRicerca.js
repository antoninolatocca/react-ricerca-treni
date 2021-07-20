import Utility from "../Utility";
import App from "../App";

class ControllerRicerca {

    constructor() {
    }

    handleSelectPartenzaChange(value){
        App.singleton.setState({treni:Utility.ricercaTreni(value, "")});
    }

}

export default ControllerRicerca;