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

}

export default Utility;