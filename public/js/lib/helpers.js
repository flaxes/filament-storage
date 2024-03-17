/**
 *
 * @param {string} sel
 * @returns {HTMLElement | null}
 */
function q(sel) {
    return document.querySelector(sel);
}

/**
 *
 * @param {string} sel
 * @returns {HTMLElement}
 */
function qStrict(sel) {
    const el = q(sel);

    if (!el) throw new Error(`NO ELEMENT ${sel}`);

    return el;
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

    const overlay = q("#overlay") || never();
    overlay.onclick = () => overlay.remove();

    overlay.onpaste = (e) => {
        console.log(e);
    };

    console.log(e);
}

/**
 *
 * @param {string} url
 * @param {object} body
 * @param {'GET' | 'POST'} [method]
 * @param {number} timeoutMs
 * @param {HeadersInit} [headers]
 * @returns
 */
async function createRequest(url, body, method = "POST", timeoutMs = 60000, headers = {}) {
    const timeoutControl = new AbortController();

    /** @type {RequestInit} */
    const options = {
        method,
        signal: timeoutControl.signal,
        headers,
    };

    if (body) {
        if (method === "POST") {
            options.body = JSON.stringify(body, (_key, val) => {
                if (val && typeof val.toStringJson === "function") return val.toStringJson();

                return val;
            });
            headers["Content-Type"] = "application/json";
        } else {
            url += `?${new URLSearchParams(body)}`;
            headers["Content-Type"] = "application/x-www-form-urlencoded";
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

    const json = await response.json().catch(() => "");

    if (response.status > 399) {
        console.log(response.status);
        if (response.status === 401) {
            console.warn("NO AUTH!");
            await FAuth.resetAuth();

            return;
        }

        const err = json.error || json.message || JSON.stringify(json);

        throw new Error(err, { cause: json });
    }

    return json;
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
    const auth = await FAuth.getAuth();

    const headers = { token: auth.token };

    return createRequest(url, body, method, timeoutMs, headers);
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

const FAuth = (function () {
    this.storageKey = "_auth_";
    this.authData = null;

    this.gotoLogin = () => {
        window.location.pathname = "/login";

        return {};
    };

    this.updateAuthPromise = null;

    this.login = async (username, password, errorEl) => {
        const result = await createRequest("/api/auth/login", { username, password }, "POST").catch((err) => {
            if (err.error) return err;

            return { error: err };
        });

        console.log(result);

        if (result.error) {
            if (errorEl) {
                errorEl.innerText = result.error;
                errorEl.removeAttribute("hidden");
            }

            console.error(result);
            return false;
        }

        this.setAuth(result);

        return true;
    };

    this.updateAuth = (token) => {
        if (this.updateAuthPromise) return this.updateAuthPromise;

        this.updateAuthPromise = createRequest("/api/auth/refresh", { token }).then((result) => {
            if (result) {
                this.setAuth(result);
                return true;
            }

            this.resetAuth(true);
            this.updateAuthPromise = null;
            return false;
        });
    };

    this.getAuth = async (withoutRedirect) => {
        if (!this.authData) {
            const data = localStorage.getItem(this.storageKey);
            if (data) {
                const json = JSON.parse(data);

                if (json) {
                    this.authData = json;
                    return this.getAuth(withoutRedirect);
                }
            }

            if (!withoutRedirect) {
                return this.gotoLogin();
            }

            return;
        }

        const now = Date.now();
        const { expireAt, token } = this.authData;
        // before 30 minutes
        const updateTokenAt = expireAt - 30 * 60e3;

        if (now >= expireAt) {
            return this.gotoLogin();
        }

        if (now >= updateTokenAt) {
            await this.updateAuth(token);
        }

        return this.authData;
    };

    this.setAuth = (data) => {
        this.authData = data;
        return localStorage.setItem(this.storageKey, JSON.stringify(data));
    };

    this.resetAuth = async (skipRemote) => {
        if (this.authData) {
            if (!skipRemote) {
                await createRequest("/api/auth/logout", { token: this.authData.token }, "POST", 2e3).catch((err) => {
                    console.error(err);
                });
            }
        }

        localStorage.removeItem(this.storageKey);
        return this.gotoLogin();
    };

    return this;
})();
