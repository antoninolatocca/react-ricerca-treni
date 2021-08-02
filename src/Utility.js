const FRECCE = require('./data.json');

Array.prototype.findFermateByName = function(stazione){
    let pos = -1;
    this.forEach((fermata, position )=>{
        if (fermata.stazione == stazione ){
            pos = position;
            return pos;
        }
    });
    return pos;
};

class Utility {

    static get treni(){
        return FRECCE;
    }


    static getHourDiff(pStartHour, pEndHour) {
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
        nDiff = (nStartMin > nEndMin) ? (nStartMin - nEndMin) : (nEndMin - nStartMin);
        // Formatto la stringa di uscita
        let nDiffMin = 0;
        let nDiffHour = 0;
        if (nDiff > 59) {
            nDiffMin = nDiff % 60;
            nDiffHour = (nDiff - nDiffMin) / 60;
        } else {
            nDiffMin = nDiff;
        }
        res += this.displayDigit(nDiffHour);
        res += 'h ';
        res += this.displayDigit(nDiffMin);
        res += 'm';
        return res;
    }

    static isAfter(fermata, ricerca) {
        if(parseInt(fermata[0]) > parseInt(ricerca[0])) return true;
        if(parseInt(fermata[0]) < parseInt(ricerca[0])) return false;
        if(parseInt(fermata[0]) === parseInt(ricerca[0])) {
            if(ricerca[1]) {
                return (parseInt(fermata[1]) >= parseInt(ricerca[1])) ? true : false;
            } else return true;
        }
    }

    static displayDigit(n) {
        return (n < 10) ? '0' + n : n;
    }

    static getListaStazioni() {
        let stazioni = new Set();
        FRECCE.treni.forEach(tratta => {
            tratta.fermate.forEach(fermata => {
                stazioni.add(fermata.stazione);
            })
        });
        stazioni = [...stazioni].sort();
        return stazioni;
    }

    static getListaRotabili() {
        let rotabili = new Set();
        FRECCE.treni.forEach(treno => {
            rotabili.add(treno.convoglio);
        });
        rotabili = [...rotabili].sort();
        return rotabili;
    }

    static ricercaTreni(partenza, arrivo, orario, convoglio) {
        let _soluzioni = [];
        FRECCE.treni.forEach(treno => {
            treno.fermate.forEach(fermata => {
                if (fermata.stazione == partenza && fermata != treno.fermate[treno.fermate.length - 1]) {
                    _soluzioni.push(treno);
                }
            });
        });
        if (arrivo != "" && _soluzioni.length > 0){
            let sol_arrivo = [];
            _soluzioni.forEach((treno)=> {
                const posPartenza = treno.fermate.findFermateByName(partenza);
                const posArrivo  = treno.fermate.findFermateByName(arrivo);

                let esito;
                if(orario) {
                    const h_feramta = treno.fermate[posPartenza].orario.split(':');
                    let h_ricerca = [];
                    if(typeof orario === 'string') {
                        h_ricerca = orario.split(":");
                    } else if(typeof orario === 'number') {
                        h_ricerca.push(orario.toString(10));
                    }
                    esito = this.isAfter(h_feramta, h_ricerca);
                } else esito = true;
                
                if (posPartenza < posArrivo){
                    if(esito) sol_arrivo.push(treno);
                }
            });
            _soluzioni = sol_arrivo;
        }
        if(convoglio != "" && _soluzioni.length > 0){
            let sol_convoglio = [];
            _soluzioni.forEach(treno => {
                if(treno.convoglio == convoglio) sol_convoglio.push(treno);
            })
            _soluzioni = sol_convoglio;
        }
        return _soluzioni;
    }

    static getPosFermata(treno, fermata) {
        return treno.fermate.findFermateByName(fermata);
    }

    static getTrenoByNumber(numero) {
        for (let i = 0; i < FRECCE.treni.length; i++) {
            if(FRECCE.treni[i].treno === numero) return FRECCE.treni[i];
        }
        return false;
    }

}

export default Utility;