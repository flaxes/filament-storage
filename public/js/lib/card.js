// @ts-check

class CardHtml {
    constructor(urlPath, columns, appendTo) {
        this.urlPath = urlPath;
        this.columns = columns;

        const card = document.createElement("div");
        card.className = "card";
        this.card = card;

        this.containers = {};
        this.appendTo = appendTo;

        const params = new URL(document.location.href).searchParams;

        this.search = Object.fromEntries(params.entries());
        this.id = this.search.id;
        this.data = {};

        this.card.innerHTML = wrapTag("label", lang.labelCard);

        if (!this.id) {
            this.dropPage();
        }

        this.init();
    }

    dropPage() {
        window.location.href = window.location.pathname.split("/").slice(0, -1).join("/");
    }

    createContainer(name) {
        const container = document.createElement("div");

        this.card.append(container);
        this.containers[name] = container;

        return container;
    }

    getContainer(name) {
        return this.containers[name] || never(`Unknown container name "${name}"`);
    }

    async renderCard() {
        this.data = await request(`${this.urlPath}/id/${this.search.id}`, {}, "GET");

        if (!this.data) {
            return this.dropPage();
        }

        const entiries = await Object.entries(this.columns).map(([column, columnType]) =>
            wrapTag("div", "", { class: "card-field" }, [
                wrapTag("label", `${lang._columns[column]}: `, { class: "card-field-label", for: "input" }),
                TableHtml.formatValue(this.data[column], columnType, column),
            ])
        );

        entiries.push(
            wrapTag("div", "", { class: "card-field" }, [
                wrapTag("button", "", { class: "delete-button fa fa-trash" }),
                wrapTag("button", "", { class: "save-button fa fa-floppy-o" }),
            ])
        );

        let html = wrapTag("div", "", { class: "card-main" }, entiries);

        const mainContainer = this.createContainer("main");
        mainContainer.innerHTML = html;
    }

    async init() {
        await this.renderCard();

        this.appendTo.append(this.card);
        return;
        const columnsTr = document.createElement("tr");

        for (const column in this.columns) {
            const th = document.createElement("th");
            th.innerText = lang._columns[column] || `?${column}?`;

            columnsTr.append(th);
        }

        this.table.append(columnsTr);

        const data = await request(this.urlPath, null, "GET");
        const buttons = `<td>
        <button class="delete-button fa fa-trash"></button>
        <button class="open-button fa fa-eye"></button>
        <button class="save-button fa fa-floppy-o"></button>
        </td>`;

        for (const row of data) {
            this.data[row.id] = row;

            const trEl = document.createElement("tr");
            trEl.dataset.id = row.id;

            for (const column in this.columns) {
                const type = this.columns[column];
                const val = row[column];

                trEl.innerHTML += `<td>${TableHtml.formatValue(val, type, column)}</td>`;
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
}
