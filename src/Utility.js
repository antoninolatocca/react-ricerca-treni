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
        return {
            h: nDiffHour,
            min: nDiffMin,
            minuti_totali: (nDiffHour * 60) + nDiffMin
        };
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

    static displayDurata(valori) {
        let res = this.displayDigit(valori.h) + "h ";
        res += this.displayDigit(valori.min) + "min";
        return res;
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
        _soluzioni.sort((a, b) => {
            let a1 = a.fermate[a.fermate.findFermateByName(partenza)].orario.split(":");
            let b1 = b.fermate[b.fermate.findFermateByName(partenza)].orario.split(":");
            return this.isAfter(a1, b1) ? 1 : -1;
        })

        let faster = this.getFasterSolution(_soluzioni, partenza, arrivo);
        for(let i = 0; i < _soluzioni.length; i++) {
            if(faster.treni.includes(_soluzioni[i].treno)) {
                _soluzioni[i].faster = true;
            } else _soluzioni[i].faster = false;
        }

        return _soluzioni;
    }

    static getFasterSolution(soluzioni, partenza, arrivo) {
        let faster = {treni: [], durata: 0};
        for(let i = 0; i < soluzioni.length; i++) {
            let s = soluzioni[i];
            let durataInMin = this.getHourDiff(s.fermate[s.fermate.findFermateByName(partenza)].orario, s.fermate[s.fermate.findFermateByName(arrivo)].orario).minuti_totali;
            if(faster.treni.length == 0) {
                faster.treni = [s.treno];
                faster.durata = this.getHourDiff(s.fermate[s.fermate.findFermateByName(partenza)].orario, s.fermate[s.fermate.findFermateByName(arrivo)].orario).minuti_totali;
            } else if(faster.treni.length > 0 && durataInMin == faster.durata) {
                faster.treni.push(s.treno);
            } else if(faster.treni.length > 0 && durataInMin < faster.durata) {
                faster.treni = [s.treno];
                faster.durata = durataInMin;
            }
        }
        return faster;
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