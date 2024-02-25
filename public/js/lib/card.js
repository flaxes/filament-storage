// @ts-check

class CardHtml {
    constructor(urlPath, columns, appendTo, entityName) {
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

        this.card.innerHTML = wrapTag("label", `${lang._columns[entityName] || entityName} ${lang.labelCard}`);

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

        if (!this.data || !this.data.id) {
            return this.dropPage();
        }

        const entiries = [];
        for (const [column, columnType] of Object.entries(this.columns)) {
            if (typeof columnType === "object" && columnType.from) {
                await TableHtml.initRemoteValues(columnType.remoteName, columnType.from);
            }

            entiries.push(
                wrapTag("div", "", { class: "card-field" }, [
                    wrapTag("label", `${lang._columns[column]}: `, { class: "card-field-label", for: "input" }),
                    TableHtml.formatValue(this.data[column], columnType, column),
                ])
            );
        }

        entiries.push(
            wrapTag("div", "", { class: "card-field" }, [
                wrapTag("button", "", { class: "delete-button fa fa-trash" }),
                wrapTag("button", "", { class: "save-button fa fa-floppy-o" }),
                wrapTag("button", "", { class: "link-button fa fa-link" }),
            ])
        );

        let html = wrapTag("div", "", { class: "card-main" }, entiries);

        const mainContainer = this.createContainer("main");
        mainContainer.innerHTML = html;

        // @ts-ignore
        mainContainer.querySelector(".delete-button").onclick = (e) => this.onDeleteButton(e);
        // @ts-ignore
        mainContainer.querySelector(".link-button").onclick = () => this.onLinkButton();
        // @ts-ignore
        mainContainer.querySelector(".save-button").onclick = (e) => this.onSaveButton(e);
    }

    async init() {
        await this.renderCard();

        this.appendTo.append(this.card);
    }

    /** @private */
    async onDeleteButton(e) {
        const isAgreed = confirm(lang.promptAreYouSure);
        if (!isAgreed) return;

        // const result =
        await request(`${this.urlPath}/delete`, { ids: [this.id] }, "POST");

        document.location.reload();
    }

    /** @private */
    async onSaveButton(e) {
        const newData = { id: this.id };

        this.containers.main.querySelectorAll("input,select").forEach((input) => {
            const column = input.name;
            const val = TableHtml.unformatValue(input, this.columns[column], column);

            if (val !== undefined) {
                newData[column] = val;
            }
        });

        await request(`${this.urlPath}/update`, { objects: [newData] }, "POST");

        document.location.reload();
    }

    onLinkButton() {
        const link = window.location.href;

        copyToClipboard(link);
    }
}
