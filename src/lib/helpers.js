const crypto = require("crypto");

const notImplemented = (namespace) => {
    throw new Error(`[${namespace}] not implemented`);
};

const getNowSeconds = () => ~~(new Date().getTime() / 1000);

const ABC = "qwertyuiopasdfghjklzxcvbnm";
const ABC_NUM = "1234567890";
const ABC_SPEC = "!@#$%^&*()_+-=[{}]";

function getRandomLetters(abc, count = 0, randomCase = false) {
    let str = "";

    if (randomCase) {
        while (count-- > 0) {
            const letter = abc[~~(Math.random() * abc.length)];
            str += Math.random() > 0.5 ? letter.toUpperCase() : letter;
        }
    } else {
        while (count-- > 0) {
            str += abc[~~(Math.random() * abc.length)];
        }
    }

    return str;
}

/**
 * @template {unknown[]} T
 * @param {T} array
 * @returns {T}
 */
function arrayShuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

/**
 *
 * @param {number} length
 * @param {{ hasSpecialChars?: boolean; upper?: number; lower?: number; numbers?: number}} [opts]
 * @returns
 */
const randomString = (length, opts = {}) => {
    let abc = ABC + ABC_NUM;
    if (opts.hasSpecialChars) abc += ABC_SPEC;

    let letters = "";

    if (opts.lower) {
        letters += getRandomLetters(ABC, opts.lower).toLowerCase();
    }

    if (opts.upper) {
        letters += getRandomLetters(ABC, opts.upper).toUpperCase();
    }

    if (opts.numbers) {
        letters += getRandomLetters(ABC_NUM, opts.numbers);
    }

    const countLeft = length - letters.length;

    if (countLeft > 0) {
        letters += getRandomLetters(abc, countLeft, true);
    }

    return arrayShuffle(letters.split("")).join("");
};

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 *
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
const randomInt = (min, max) => crypto.randomInt(min, max);

const safeJsonParse = (str) => {
    try {
        const json = JSON.parse(str);

        if (json && typeof json === "object") {
            return json;
        }
    } catch (err) {}

    return null;
};

/**
 * @template T
 * @param {T} err
 * @returns {{ err: T }}
 */
const convertError = (err) => {
    return { err };
};

module.exports = {
    notImplemented,
    getNowSeconds,
    randomString,
    ABC,
    ABC_NUM,
    ABC_SPEC,
    wait,
    randomInt,
    arrayShuffle,
    safeJsonParse,
    convertError,
};
