// @ts-check

/**
 * @typedef {'string' | 'number' | 'date' | 'color' | 'boolean'} ColumnTypePrimitive
 */

/**
 * @typedef {'select'} ColumnTypeComplex
 */

/**
 * @typedef {ColumnTypePrimitive | { type: ColumnTypeComplex, from: string | string[], remoteName:string }} ColumnType
 */

class TableHtml {
    /**
     *
     * @param {string} urlPath
     * @param {Record<string, ColumnType>} columns
     * @param {Element} appendTo
     */
    constructor(urlPath, columns, appendTo) {
        this.urlPath = urlPath;
        this.columns = columns;
        this.appendTo = appendTo;

        this.data = {};

        this.tableOuter = document.createElement("div");
        this.table = document.createElement("table");

        this.tableOuter.append(this.table);
        this.tableOuter.className = "table-outer";
        this.table.className = "table";

        this.init();
    }

    /**
     *
     * @param {string} remoteName
     * @param {string | string[]} from
     */
    static async initRemoteValues(remoteName, from) {
        if (Array.isArray(from)) {
            this.remoteValues[remoteName] = from;
        } else {
            this.remoteValues[remoteName] = (await request(from, "", "GET")).map((item) => item.name);
        }
    }

    /**
     * @param {any} value
     * @param {ColumnType} type
     * @param {string} column
     */
    static formatValue(value, type, column) {
        if (!value) value = "";

        let primitiveType;
        let remoteName;

        if (typeof type === "object") {
            primitiveType = type.type;
            remoteName = type.remoteName;
        } else {
            primitiveType = type;
        }

        switch (primitiveType) {
            case "boolean":
                /** @type {Record<string,string>} */
                const options = { type: "checkbox", name: column };
                if (value) {
                    options.checked = "";
                    value = true;
                }

                return wrapTag("input", "", options);
            case "color":
                return wrapTag("input", "", { type: "color", value, name: column });
            case "date":
                return wrapTag("input", "", {
                    type: "datetime-local",
                    value: value ? dateTimeLocal(new Date(value * 1000)) : "",
                    name: column,
                });
            case "number":
                if (column === "id") return wrapTag("span", `#${value}`, { name: column });
                return wrapTag("input", "", { type: "number", value, name: column });
            case "string":
                return wrapTag("input", "", { type: "text", value, name: column });
            case "select":
                if (!remoteName) return never(`remoteName not provided for ${column}`);

                const possibles =
                    TableHtml.remoteValues[remoteName] || never(`"${remoteName}" not inited for "${column}" column`);

                const selectOptions = possibles.map((item) => {
                    const elOptions = { value: item };

                    if (value === item) {
                        elOptions.selected = "";
                    }

                    return wrapTag("option", item, elOptions);
                });

                return wrapTag("select", "", { name: column }, selectOptions);
            default:
                throw new Error(`UNKNOWN TYPE [${type}] for ${column} (${value})`);
        }
    }

    /**
     * @param {HTMLInputElement} element
     * @param {ColumnType} type
     * @param {string} [column]
     */
    static unformatValue(element, type, column) {
        const value = element.value || "";
        let primitiveType;

        if (typeof type === "object") {
            primitiveType = type.type;
        } else {
            primitiveType = type;
        }

        switch (primitiveType) {
            case "boolean":
                return element.checked;
            case "color":
                return value;
            case "date":
                const ts = new Date(value).getTime();

                return ts ? ~~(ts / 1000) : 0;
            case "number":
                return value || 0;
            case "string":
                return value;
            case "select":
                return element.value;
            default:
                throw new Error(`UNKNOWN TYPE [${type}] for ${column} (${value})`);
        }
    }

    /** @private */
    createSearchEl() {
        const searchEl = wrapTag("div", "", { class: "table-search" }, [
            wrapTag("b", lang.labelSearch),
            wrapTag("input", "", { placeholder: "" }),
            wrapTag("button", lang.actionSearch),
        ]);

        this.appendTo.innerHTML += searchEl;
        q(".table-search > button").onclick = (e) => this.onSearchButton(e);
    }

    async init() {
        this.createSearchEl();
        const columnsTr = document.createElement("tr");

        const remoteInitPromises = [];

        for (const column in this.columns) {
            const th = document.createElement("th");
            th.innerText = lang._columns[column] || `?${column}?`;
            const columnVal = this.columns[column];

            if (typeof columnVal === "object" && columnVal.from) {
                remoteInitPromises.push(TableHtml.initRemoteValues(columnVal.remoteName, columnVal.from));
            }

            columnsTr.append(th);
        }

        await Promise.all(remoteInitPromises);

        this.table.append(columnsTr);

        const data = await request(this.urlPath, null, "GET");
        const buttons = wrapTag("td", "", {}, [
            wrapTag("button", "", { class: "delete-button fa fa-trash" }),
            wrapTag("button", "", { class: "open-button fa fa-eye" }),
            wrapTag("button", "", { class: "save-button fa fa-floppy-o" }),
        ]);

        for (const row of data) {
            this.data[row.id] = row;

            const trEl = document.createElement("tr");
            trEl.dataset.id = row.id;

            for (const column in this.columns) {
                const type = this.columns[column];
                const val = row[column];

                trEl.innerHTML += `<td>${await TableHtml.formatValue(val, type, column)}</td>`;
            }

            trEl.innerHTML += buttons + "</tr>";

            this.table.append(trEl);

            // @ts-ignore
            trEl.querySelector(".delete-button").onclick = (e) => this.onDeleteButton(e);
            // @ts-ignore
            trEl.querySelector(".open-button").onclick = (e) => this.onOpenButton(e);
            // @ts-ignore
            trEl.querySelector(".save-button").onclick = (e) => this.onSaveButton(e);
        }

        this.appendTo.append(this.tableOuter);
    }

    /** @private */
    async onDeleteButton(e) {
        const { data } = this.getDataFromE(e);

        const isAgreed = confirm(lang.promptAreYouSure);
        if (!isAgreed) return;

        // const result =
        await request(`${this.urlPath}/delete`, { ids: [data.id] }, "POST");

        document.location.reload();
    }

    /** @private */
    onOpenButton(e) {
        const { id } = this.getDataFromE(e);
        let url = document.location.pathname;

        if (!url.endsWith("/")) url += "/";

        document.location.href = `${url}card?id=${id}`;
    }

    /** @private */
    onSearchButton(e) {
        console.log(e.target.parentElement);
    }

    /** @private */
    async onSaveButton(e) {
        const { element, id } = this.getDataFromE(e);
        const newData = { id };

        element.querySelectorAll("input,select").forEach((input) => {
            const column = input.name;
            const val = TableHtml.unformatValue(input, this.columns[column], column);

            if (val) {
                newData[column] = val;
            }
        });

        // const result =
        await request(`${this.urlPath}/update`, { objects: [newData] }, "POST");

        document.location.reload();
    }

    /** @private */
    getDataFromE(e) {
        /** @type {Element} */
        const element = e.target.parentElement.parentElement;
        // @ts-ignore
        const id = element.dataset.id;
        const data = this.data[id];

        return { element, id: data.id, data };
    }
}

/** @type {Record<string, string[]>} */
TableHtml.remoteValues = {};
