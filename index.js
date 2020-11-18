const show = document.querySelector('#show');
const show_2 = document.querySelector('#show_2');

// #region [rgba(0,0,120,0.1)] --> clear function

const objectToInner = (obj, deep = 0) => {
    let txt = '';
    let prfix = '';
    for (let i = 0; i < deep; i++) { prfix += ' &nbsp; &nbsp;' }
    // if (obj instanceof Date) { txt += 'Date' }

    if (obj == null) {
        txt += 'null';

    } else if (typeof obj != 'object') {
        if (typeof obj == 'string') {

            txt += '"' + obj + '"';
        } else {

            txt += obj;
        }

    } else if (obj instanceof Array) {
        let last = true;
        for (let ob of obj) {
            if (typeof ob == 'object') { last = false; break; }
        }

        let sufix = last ? ' ' : '<br>';
        txt += '[' + sufix;
        deep++;

        for (let i = 0, len = obj.length; i < len; i++) {
            txt += (last ? '' : prfix + ' &nbsp; &nbsp;') + objectToInner(obj[i], deep);
            txt += i < obj.length - 1 ? ',' + sufix : sufix;
        }

        txt += (last ? '' : prfix) + ']';
        deep--;

    } else if (obj instanceof Object) {
        let last = true;
        for (let key in obj) {
            if (typeof obj[key] == 'object' && ((obj[key] instanceof Object) || (obj[key] instanceof Array))) { last = false; break; }
        }

        let sufix = last ? ' ' : '<br>';
        txt += '{' + sufix;
        deep++;

        let keyAll = Object.keys(obj)
        for (let i = 0, len = keyAll.length; i < len; i++) {
            let key = keyAll[i];
            txt += (last ? '' : prfix + ' &nbsp; &nbsp;') + key + ': ' + objectToInner(obj[key], deep);
            txt += i < keyAll.length - 1 ? ',' + sufix : sufix;
        }

        txt += (last ? '' : prfix) + '}';
        deep--;
    }

    return txt;
}

// #endregion

// #region [rgba(120,0,0,0.1)] --> function with exceptions

const objectToInnerException = (obj, deep = 0, exception = false) => {
    let exceptionList = ['way'];
    let txt = '';
    let prfix = '';
    for (let i = 0; i < deep; i++) { prfix += ' &nbsp; &nbsp;' }
    // if (obj instanceof Date) { txt += 'Date' }

    if (obj == null) {
        txt += 'null';

    } else if (typeof obj != 'object') {
        if (typeof obj == 'string') {

            txt += '"' + obj + '"';
        } else {

            txt += obj;
        }

    } else if (obj instanceof Array) {
        let last = true;
        for (let ob of obj) {
            if (typeof ob == 'object') { last = false; break; }
        }
        last = exception ? true : last;

        let sufix = last ? ' ' : '<br>';
        txt += '[' + sufix;
        deep++;

        for (let i = 0, len = obj.length; i < len; i++) {
            txt += (last ? '' : prfix + ' &nbsp; &nbsp;') + objectToInnerException(obj[i], deep);
            txt += i < obj.length - 1 ? ',' + sufix : sufix;
        }

        txt += (last ? '' : prfix) + ']';
        deep--;

    } else if (obj instanceof Object) {
        let last = true;
        for (let key in obj) {
            if (typeof obj[key] == 'object' && ((obj[key] instanceof Object) || (obj[key] instanceof Array))) { last = false; break; }
        }

        let sufix = last ? ' ' : '<br>';
        txt += '{' + sufix;
        deep++;

        let keyAll = Object.keys(obj)
        for (let i = 0, len = keyAll.length; i < len; i++) {
            let key = keyAll[i];
            let ext = exceptionList.some(e => e == key);
            txt += (last ? '' : prfix + ' &nbsp; &nbsp;') + key + ': ' + objectToInnerException(obj[key], deep, ext);
            txt += i < keyAll.length - 1 ? ',' + sufix : sufix;
        }

        txt += (last ? '' : prfix) + '}';
        deep--;
    }

    return txt;
}

// #endregion

// #region [rgba(110,200,0,0.02)] --> dataset and test

const hexData = {
    type: 1,
    pass: [1, 2, 3, 4, 5, 6],

    big_city: [{
        coord: { x: 0, y: 0 },
        way: [
            [2]
        ],
        stations: 1,
        base: 'nnh'
    }, {
        coord: { x: 0, y: 0 },
        way: [
            [5]
        ],
        stations: 1
    }],
    small_city: 2,
    label: 'ny',
    value: 40,
    cost: 80,
    way: [1, 2, 3],
}

let res = objectToInner(hexData);
show.innerHTML = 'hexData = ' + res;

let res_2 = objectToInnerException(hexData);
show_2.innerHTML = 'hexData = ' + res_2;

// #endregion