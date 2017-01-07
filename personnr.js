const personNr = (function () {
    let isValidBirthday = (day, month, year) => {

        const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

        const days = {
            1: 31,
            2: isLeapYear ? 29 : 28,
            3: 31,
            4: 30,
            5: 31,
            6: 30,
            7: 31,
            8: 31,
            9: 30,
            10: 31,
            11: 30,
            12: 31
        };

        if (year < 1900 || year > 2039) return false;
        if (month < 1 || month > 12) return false;

        if (day < 1 ||  day > days[month]) return false;

        return true;
    }

    let getRange = (year) => {
        let isBetween = (min, max, x) => x >= min && x < max;

        return isBetween(1900, 1999, year) ? [0, 499] :
            isBetween(2000, 2039, year) ? [500, 999] : [null, null];
    }

    let generatefrom = (dd, mm, yyyy) => {
        if (!dd ||  !mm ||  !yyyy) throw new Error('Expected a day, month and year with the following format: dd, mm, yyyy');
        if (!isValidBirthday(dd, mm, yyyy)) throw new Error('Expected format: dd, mm, yyyy');

        const [min, max] = getRange(yyyy);
        const [d, m, y] = [dd, mm, yyyy].map(n => n.toString());
        const result = [];
        
        [...Array(max - min + 1)]
        .map((u, i) => (min + i) < 10 ? '00' + (min + i) : (min + i) < 100 ? '0' + (min + i) : '' + (min + i))
            .forEach(n => {
                const k1 = 11 - ((3 * d[0] + 7 * d[1] + 6 * m[0] + 1 * m[1] + 8 * y[2] + 9 * y[3] + 4 * n[0] + 5 * n[1] + 2 * n[2]) % 11);
                const k2 = 11 - ((5 * d[0] + 4 * d[1] + 3 * m[0] + 2 * m[1] + 7 * y[2] + 6 * y[3] + 5 * n[0] + 4 * n[1] + 3 * n[2] + 2 * k1) % 11);
                if (k1 < 10 && k2 < 10) result.push(d + m + y[2] + y[3] + n + k1 + k2);
            });

        return result;
    }


    return {
        generatefrom
    };
})();



console.log(personNr.generatefrom(16, 10, 1990));
