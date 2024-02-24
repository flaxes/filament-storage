function q(sel) {
    return document.querySelector(sel);
}

function qq(sel) {
    return document.querySelectorAll(sel);
}

/**
 * 
 * @param {string} tag 
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

    html += `${text || ''}</${tag}>`;

    return html;
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
