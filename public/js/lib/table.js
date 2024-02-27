// @ts-check

class TableHtml {
    /**
     *
     * @param {string} urlPath
     * @param {Record<string, ColumnType>} columns
     * @param {Element} appendTo
     * @param {boolean} [isCardAvailable]
     */
    constructor(urlPath, columns, appendTo, isCardAvailable) {
        this.urlPath = urlPath;
        this.columns = columns;
        this.appendTo = appendTo;

        this.isCardAvailable = isCardAvailable;

        this.data = {};

        this.tableOuter = document.createElement("div");
        this.table = document.createElement("table");

        /** @type {string[]} */
        this.searchBy = [];
        this.strictSearch = false;

        this.tableOuter.append(this.table);
        this.tableOuter.className = "table-outer";
        this.table.className = "table";

        const buttons = [
            wrapTag("button", "", { class: "delete-button fa fa-trash" }),
            wrapTag("button", "", { class: "save-button fa fa-floppy-o" }),
        ];

        if (this.isCardAvailable) {
            buttons.push(wrapTag("button", "", { class: "open-button fa fa-eye" }));
        }

        const buttonsHtml = wrapTag("td", "", {}, buttons);
        this.buttonsHtml = buttonsHtml;
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
            this.remoteValues[remoteName] = (await request(from, "", "POST")).map((item) => item.name);
        }
    }

    /**
     * @param {any} value
     * @param {ColumnType} type
     * @param {string} column
     * @param {object} [data]
     */
    static formatValue(value, type, column, data) {
        if (!value) value = "";

        let primitiveType;
        let remoteName;

        if (isColumnTypeFormatter(type)) {
            return type.format(value, data);
        }

        if (typeof type === "object") {
            primitiveType = type.type;
            remoteName = type.remoteName;
        } else {
            primitiveType = type;
        }
        /** @type {Record<string,string>} */
        const options = { name: column };
        if (column === "name") options.autocomplete = "off";

        switch (primitiveType) {
            case "boolean":
                Object.assign(options, { type: "checkbox" });

                if (value) {
                    options.checked = "";
                    value = true;
                }

                return wrapTag("input", "", options);

            case "color":
                Object.assign(options, { type: "color", value: value || "#000000" });
                return wrapTag("input", "", options);

            case "date":
                return wrapTag("input", "", {
                    type: "datetime-local",
                    value: value ? dateTimeLocal(new Date(value * 1000)) : "",
                    name: column,
                });

            case "number":
                if (column === "id") return wrapTag("span", `#${value}`, {});
                options.type = "number";
                if (value !== undefined) {
                    options.value = value;
                }

                return wrapTag("input", "", options);

            case "string":
                Object.assign(options, {
                    type: "text",
                    value,
                    name: column,
                });

                return wrapTag("input", "", options);

            case "photo":
                let src = value || "";
                if (value) {
                    if (!value.includes("https://")) {
                        src = `/api/uploads/get/${value}`;
                    }
                    Object.assign(options, { value });
                }

                options.class = "photo-file-path";

                return wrapTag("div", "", { class: "photo" }, [
                    wrapTag("img", "", { src, onclick: "openSrc(this)" }),
                    wrapTag("input", "", options),
                ]);

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

                return wrapTag("select", "", options, selectOptions);

            case "link":
                const link = [];
                if (value) {
                    const url = value.startsWith("http") ? value : `/api/uploads/get/${value}`;
                    link.push(wrapTag("a", "", { href: url, class: "fa fa-external-link" }));
                    options.value = value;
                }

                link.push(wrapTag("input", "", options));

                return wrapTag("div", "", { class: "field-link" }, link);

            default:
                throw new Error(`UNKNOWN TYPE [${type}] for ${column} (${value})`);
        }
    }

    /**
     *
     * @param {ColumnType} type
     * @param {string} value
     */
    toColumnType(type, value) {
        switch (type) {
            case "boolean":
                return value === "true";
            case "number":
                return Number(value);
            default:
                return value;
        }
    }

    /**
     * @param {HTMLInputElement | HTMLSelectElement} element
     * @param {ColumnType} type
     * @param {string} [column]
     */
    static unformatValue(element, type, column) {
        const value = element.value || "";
        let primitiveType;

        if (isColumnTypeFormatter(type)) {
            return type.unformat(type);
        }

        if (typeof type === "object") {
            primitiveType = type.type;
        } else {
            primitiveType = type || element.type;
        }

        switch (primitiveType) {
            case "boolean":
                // @ts-ignore
                return element.checked;
            case "color":
                return value;
            case "date":
                const ts = new Date(value).getTime();

                return ts ? ~~(ts / 1000) : 0;
            case "number":
                return Number(value) || 0;
            case "string":
                return value;
            case "select":
                return element.value;
            case "link":
                return element.value;
            case "photo":
                // @ts-ignore
                return element.value;
            default:
                throw new Error(`UNKNOWN TYPE [${type}] for ${column} (${value})`);
        }
    }

    /**
     *
     * @param {{ search?: boolean, create?: boolean }} [options]
     * @param {HTMLElement} [prependTo]
     */
    createHeaderEl(options, prependTo) {
        if (!options) options = { search: true, create: true };

        const headerEl = document.createElement("div");
        headerEl.className = "table-header";

        if (prependTo) {
            prependTo.prepend(headerEl);
        } else {
            this.appendTo.append(headerEl);
        }

        if (options.search) {
            headerEl.insertAdjacentHTML(
                "beforeend",
                [
                    wrapTag("input", "", { placeholder: ". . .", class: "table-header", name: "search" }),
                    wrapTag("button", "", { class: "search-button fa fa-search" }),
                ].join("")
            );

            const input = headerEl.querySelector(".table-header") || never("NO INPUT");

            const searchButton = headerEl.querySelector(".search-button") || never();
            const doSearch = (e) => this.onSearchButton(e, input);

            input.addEventListener("keypress", (e) => {
                // @ts-ignore
                if (e.key === "Enter") {
                    // e.preventDefault();
                    doSearch(e);
                }
            });

            if (LOC_SEARCH.s) {
                // @ts-ignore
                input.value = LOC_SEARCH.s;
            }

            // @ts-ignore
            searchButton.onclick = (e) => this.onSearchButton(e, input);
        }

        if (options.create) {
            headerEl.insertAdjacentHTML("beforeend", wrapTag("button", "", { class: "create-button fa fa-plus" }));

            // @ts-ignore
            headerEl.querySelector(".create-button").onclick = (e) => this.onCreateButton(e);
        }
    }

    async createRow(row) {
        const element = document.createElement("tr");
        const id = row.id;

        if (id) {
            element.dataset.id = id;
        }

        for (const column in this.columns) {
            const type = this.columns[column];
            const val = row[column];

            element.insertAdjacentHTML("beforeend", `<td>${await TableHtml.formatValue(val, type, column)}</td>`);
        }

        element.insertAdjacentHTML("beforeend", this.buttonsHtml + "</tr>");

        const afterAppend = () => {
            const openButton = element.querySelector(".open-button");
            if (openButton) {
                if (id) {
                    // @ts-ignore
                    element.querySelector(".open-button").onclick = (e) => this.onOpenButton(e);
                } else {
                    openButton.remove();
                }
            }

            // @ts-ignore
            element.querySelector(".delete-button").onclick = (e) => this.onDeleteButton(e);
            // @ts-ignore
            element.querySelector(".save-button").onclick = (e) => this.onSaveButton(e);
        };

        return { element, afterAppend };
    }

    init(search) {
        return this.initUnsafe(search).catch(console.error);
    }

    async fetchData(search) {
        const searchBody = {
            strict: this.strictSearch,
        };

        if (search) {
            searchBody.search = search;
        } else if (typeof LOC_SEARCH.s === "string") {
            if (LOC_SEARCH.s.includes(":")) {
                const [column, val] = LOC_SEARCH.s.split(":");

                searchBody.search = [[column, this.toColumnType(this.columns[column], val.trim())]];
                searchBody.strict = true;
            } else {
                searchBody.search = this.searchBy.map((item) => [item, LOC_SEARCH.s]);
            }
        }

        const data = await request(this.urlPath, searchBody, "POST");

        return data;
    }

    /** @private */
    async initUnsafe(search) {
        const columnsTr = document.createElement("tr");

        const remoteInitPromises = [];

        for (const column in this.columns) {
            const th = document.createElement("th");
            let columnText = lang._columns[column];
            if (typeof columnText === undefined) columnText = `?${column}?`;

            th.innerText = columnText;
            const columnType = this.columns[column];

            if (typeof columnType === "object" && !isColumnTypeFormatter(columnType)) {
                remoteInitPromises.push(TableHtml.initRemoteValues(columnType.remoteName, columnType.from));
            }

            columnsTr.append(th);
        }

        columnsTr.insertAdjacentHTML("beforeend", wrapTag("th", lang.labelActions));

        await Promise.all(remoteInitPromises);

        this.table.append(columnsTr);

        const data = await this.fetchData(search);

        for (let i = data.length - 1; i >= 0; i--) {
            const row = data[i];
            this.data[row.id] = row;

            const { afterAppend, element } = await this.createRow(row);

            this.onInitData(row);

            this.table.append(element);
            afterAppend();
        }

        this.appendTo.append(this.tableOuter);
    }

    onInitData(data) {}

    /** @private */
    async onDeleteButton(e) {
        const { data, element } = this.getDataFromE(e);

        if (data) {
            const isAgreed = confirm(lang.promptAreYouSure);
            if (!isAgreed) return;

            // const result =
            await request(`${this.urlPath}/delete`, { ids: [data.id] }, "POST");
        }

        element.remove();
    }

    onOpenButton(e) {
        const { id } = this.getDataFromE(e);
        let url = document.location.pathname;

        if (!url.endsWith("/")) url += "/";

        document.location.href = `${url}card?id=${id}`;
    }

    /** @private */
    onSearchButton(_e, input) {
        window.location.search = input.value ? `s=${input.value}` : "";
    }

    /** @private */
    async onSaveButton(e) {
        const { element, id } = this.getDataFromE(e);
        const newData = {};

        element.querySelectorAll("input,select").forEach(
            /** @param {HTMLInputElement | HTMLSelectElement} input */ // @ts-ignore
            (input) => {
                const column = input.name;
                const val = TableHtml.unformatValue(input, this.columns[column], column);

                if (val !== undefined) {
                    newData[column] = val;
                }
            }
        );

        const requestBody = { objects: [newData] };
        if (id) {
            newData.id = id;

            // const result =
            await request(`${this.urlPath}/update`, requestBody, "POST");
        } else {
            await request(`${this.urlPath}/create`, requestBody, "POST");
        }

        document.location.reload();
    }

    async onCreateButton(e) {
        const { afterAppend, element } = await this.createRow({});
        this.table.children[0].after(element);
        e.target.remove();

        afterAppend();
    }

    getDataFromE(e) {
        /** @type {Element} */
        const element = e.target.parentElement.parentElement;
        // @ts-ignore
        const id = element.dataset.id;

        if (id) {
            const data = this.data[id];

            return { element, id: data.id, data };
        }

        return { element };
    }
}

/** @type {Record<string, string[]>} */
TableHtml.remoteValues = {};
