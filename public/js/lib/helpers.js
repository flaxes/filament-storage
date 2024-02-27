function q(sel) {
    return document.querySelector(sel);
}

function qq(sel) {
    return document.querySelectorAll(sel);
}

const LOC_RAW_PARAMS = new URL(document.location.href).searchParams;
// @ts-ignore
const LOC_SEARCH = Object.fromEntries(LOC_RAW_PARAMS.entries());

function dateTimeLocal(date) {
    const result = new Date(date.getTime() - date.getTimezoneOffset() * 60e3).toISOString().slice(0, -1);

    return result;
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
}

/**
 *
 * @param {string} [err]
 * @returns {never}
 */
function never(err = "never appears") {
    throw new Error(err);
}

/**
 *
 * @param {keyof HTMLElementTagNameMap} tag
 * @param {string} [text]
 * @param {Record<string, string> | null} [props]
 * @param {string[]} [elements]
 * @returns
 */
function wrapTag(tag, text, props, elements) {
    let html = `<${tag}`;

    if (props) {
        for (const key in props) {
            html += ` ${key}="${props[key]}"`;
        }
    }

    html += ">";

    if (elements) {
        html += elements.join("");
    }

    html += `${text || ""}</${tag}>`;

    return html;
}

function openSrc(e) {
    const dom = wrapTag("div", "", { class: "fullscreen", id: "overlay" }, [wrapTag("img", "", { src: e.src })]);

    document.body.insertAdjacentHTML("afterbegin", dom);

    const overlay = q("#overlay");
    overlay.onclick = () => overlay.remove();

    overlay.onpaste = e => {
        console.log(e);
    }

    console.log(e);
}

/**
 *
 * @param {string} url
 * @param {object} body
 * @param {'GET' | 'POST'} [method]
 * @param {number} timeoutMs
 * @returns
 */
async function request(url, body, method = "POST", timeoutMs = 60000) {
    const timeoutControl = new AbortController();

    /** @type {RequestInit} */
    const options = {
        method,
        signal: timeoutControl.signal,
    };

    if (body) {
        if (method === "POST") {
            options.body = JSON.stringify(body, (_key, val) => {
                if (val && typeof val.toStringJson === "function") return val.toStringJson();

                return val;
            });
            options.headers = { "Content-Type": "application/json" };
        } else {
            url += `?${new URLSearchParams(body)}`;
            options.headers = { "Content-Type": "application/x-www-form-urlencoded" };
        }
    }

    const req = fetch(url, options).catch((err) => err);
    const timeout = setTimeout(() => timeoutControl.abort(), timeoutMs);

    const response = await req;
    clearTimeout(timeout);

    if (response instanceof DOMException) {
        throw new Error("REQ_TIMEOUT");
    }

    if (response instanceof Error) {
        throw response;
    }

    const json = await response.json();

    if (response.status > 399) throw new Error(json.message || json, { cause: json });

    return json;
}

/** @typedef {'string' | 'number' | 'date' | 'color' | 'boolean' | 'link' | 'photo'} ColumnTypePrimitive */
/** @typedef {{ format: (value: any, data?: object) => any; unformat: (value: any) => any }} ColumnTypeFormatter */
/** @typedef {'select'} ColumnTypeComplex */

/**
 * @typedef {ColumnTypeFormatter | ColumnTypePrimitive | { type: ColumnTypeComplex, from: string | string[], remoteName:string }} ColumnType
 */

/**
 *
 * @param {ColumnType} type
 * @returns {type is ColumnTypeFormatter}
 */
function isColumnTypeFormatter(type) {
    if (typeof type === "object") {
        // @ts-ignore
        if (type.format) return true;
    }

    return false;
}

function wrapSlicerTag(fileName, projectName, text = "") {
    const fileLink = `${document.location.origin}/api/uploads/get/${fileName}`;
    const extension = fileName.split(".").pop();

    const file = encodeURIComponent(`${fileLink}&name=${projectName || "model"}`);
    const url = `bambustudio://open?file=${file}.${extension}`;

    return wrapTag("a", text, { href: url, class: "fa fa-print" });
}
