// @ts-check

/**
 * @typedef {'string' | 'number' | 'date' | 'color' | 'boolean'} ColumnType
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
        this.table = document.createElement("table");
        this.table.className = "table";

        this.init();
    }

    /**
     * @private
     * @param {any} value
     * @param {ColumnType} type
     * @param {string} [column]
     */
    formatValue(value, type, column) {
        if (!value) return "";

        switch (type) {
            case "boolean":
                return value ? "+" : "-";
            case "color":
                return wrapTag("div", "-", { style: `background-color: ${value}` });
            case "date":
                return new Date(value * 1000).toLocaleString();
            case "number":
                return value;
            case "string":
                return value;
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

        for (const column in this.columns) {
            const th = document.createElement("th");
            th.innerText = lang._columns[column] || `?${column}?`;

            columnsTr.append(th);
        }

        this.table.append(columnsTr);

        const data = await request(this.urlPath, null, "GET");
        const buttons = `<td>
        <button class="delete-button">${lang.actionDelete}</button>
        <button class="open-button">${lang.actionOpen}</button>
        </td>`;

        for (const row of data) {
            const trEl = document.createElement("tr");
            trEl.dataset.id = row.id;

            for (const column in this.columns) {
                const type = this.columns[column];
                const val = row[column];

                trEl.innerHTML += `<td>${this.formatValue(val, type, column)}</td>`;
            }

            trEl.innerHTML += buttons + "</tr>";

            this.table.append(trEl);

            // @ts-ignore
            trEl.querySelector(".delete-button").onclick = (e) => this.onDeleteButton(e);
            // @ts-ignore
            trEl.querySelector(".open-button").onclick = (e) => this.onOpenButton(e);
        }

        this.appendTo.append(this.table);
    }

    /** @private */
    onDeleteButton(e) {
        console.log(e.target.parentElement);
    }

    /** @private */
    onOpenButton(e) {
        console.log(e.target.parentElement);
    }

    /** @private */
    onSearchButton(e) {
        console.log(e.target.parentElement);
    }
}
