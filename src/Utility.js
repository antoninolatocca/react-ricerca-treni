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
        return stazioni;
    }

    static ricercaTreni(partenza, arrivo) {
        let _soluzioni = [];
        FRECCE.treni.forEach(treno => {
            treno.fermate.forEach(fermata => {
                if (fermata.stazione == partenza && fermata != treno.fermate[treno.fermate.length - 1]) {
                    _soluzioni.push(treno);
                }
            });
        });
        if (arrivo != "" && _soluzioni.length > 0){
            let solution = [];
            _soluzioni.forEach((treno, position)=> {
                let posPartenza = treno.fermate.findFermateByName(partenza);
                let posArrivo  = treno.fermate.findFermateByName(arrivo);
                if (posPartenza < posArrivo){
                    solution.push(treno);
                }
            });
            return solution;
        }
        return _soluzioni;
    }

    static getPosFermata(treno, fermata) {
        return treno.fermate.findFermateByName(fermata);
    }

}

export default Utility;