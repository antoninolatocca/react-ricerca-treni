class Utility {

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

    static ricercaTreni(partenza, arrivo, treni) {
        let _soluzioni = [];
        treni.forEach(treno => {
            treno.fermate.forEach(fermata => {
                if (fermata.stazione == partenza && fermata != treno.fermate[treno.fermate.length - 1]) {
                    let _pos = treno.fermate.indexOf(fermata);
                    let _soluzione_temp = treno.fermate.slice(_pos);
                    _soluzione_temp.slice(1).forEach(fermata_arrivo => {
                        if (fermata_arrivo.stazione == arrivo) {
                            let _pos_arrivo = treno.fermate.indexOf(fermata_arrivo);
                            let _treno = treno;
                            console.log(_treno);
                            _treno.fermate = treno.fermate.slice(_pos, _pos_arrivo);
                            _soluzioni.push(_treno);
                        }
                    });
                }
            });
        });
        console.log(_soluzioni.length + ' Soluzioni da ' + partenza + ' a ' + arrivo);
        console.log('Restituisco le soluzioni: ');
        console.log(_soluzioni);
        return _soluzioni;
    }

}

export default Utility;