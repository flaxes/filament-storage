// @ts-check

class CardHtml {
    /**
     *
     * @param {string} urlPath
     * @param {Record<string, ColumnType>} columns
     * @param {Element} appendTo
     * @param {string} entityName
     * @param {boolean} [isNew]
     */
    constructor(urlPath, columns, appendTo, entityName, isNew) {
        this.urlPath = urlPath;
        this.columns = columns;

        const card = document.createElement("div");
        card.className = "card";
        this.card = card;

        this.isNew = isNew === true;

        this.containers = {};
        this.appendTo = appendTo;

        if (!isNew) {
            this.id = LOC_SEARCH.id || void 0;
        }

        this.data = {};

        this.card.insertAdjacentHTML(
            "beforeend",
            wrapTag("label", `${lang._columns[entityName] || entityName} ${lang.labelCard}`)
        );

        if (!this.id) {
            this.dropPage();
        }

        this.createContainer("main");
    }

    dropPage() {
        window.location.href = window.location.pathname.split("/").slice(0, -1).join("/");
    }

    createContainer(name) {
        const container = document.createElement("div");

        this.card.append(container);

        /** @type {Record<string, HTMLElement>} */
        this.containers[name] = container;

        return container;
    }

    getContainer(name) {
        return this.containers[name] || never(`Unknown container name "${name}"`);
    }

    /**
     *
     * @param {[string, string][]} fields - [name, placeholder]
     * @param {string} [label]
     * @param {boolean} [isPhoto]
     * @param {(files: File[], response: any) => any} [onUpload] - callback triggered with request of client and response of server
     * @param {string} [uploadUrl] - url
     */
    createUploadForm(fields, label, isPhoto, onUpload, uploadUrl = "/api/uploads/upload") {
        const form = document.createElement("div");
        form.className = "upload-form";

        const inputs = [];

        fields.forEach(([name, placeholder]) =>
            inputs.push(wrapTag("input", "", { type: "text", class: "upload-form-field", placeholder, name }))
        );

        /* for (const file of files) {
            const options = { type: "file", name: file.name };
            if (file.isMultiple) {
                options.name += "[]";
                options.multiple = "multiple";
            }

            inputs.push(wrapTag("input", "", options));
        } */

        inputs.push(
            wrapTag("button", "", {
                class: "upload-form-submit fa fa-upload",
            })
        );

        if (label) {
            form.insertAdjacentHTML("beforeend", wrapTag("label", label));
        }

        form.insertAdjacentHTML("beforeend", inputs.join(""));

        const sendCb = async () => {
            const headers = await fauth.getAuthHeaders();
            const formData = new FormData();

            // Add a text field
            if (isPhoto) {
                formData.append("isPhoto", "1");
            }

            try {
                // @ts-expect-error
                const selection = await window.showOpenFilePicker({ multiple: true });

                for (const s of selection) {
                    const file = await s.getFile();
                    formData.append("files[]", file);
                }

                const response = await fetch(uploadUrl, {
                    method: "POST",
                    body: formData,
                    headers,
                });

                const json = await response.json();
                if (onUpload) {
                    await onUpload(selection, json);
                }
            } catch (e) {
                console.error(e);
            }
        };

        qStrict("button", HTMLButtonElement, form).onclick = sendCb;

        return form;
    }

    async renderCard() {
        if (this.id) {
            this.data = await request(`${this.urlPath}/id/${this.id}`, {}, "GET");

            if (!this.data || !this.data.id) {
                return;
            }
        }

        const entiries = [];
        for (const [column, columnType] of Object.entries(this.columns)) {
            if (typeof columnType === "object") {
                if (!isColumnTypeFormatter(columnType)) {
                    await TableHtml.initRemoteValues(columnType.remoteName, columnType.from);
                }
            }

            const columnTextLang = lang._columns[column];
            const columnText = columnTextLang ? `${columnTextLang}: ` : "";

            entiries.push(
                wrapTag("div", "", { class: "card-field" }, [
                    wrapTag("label", column.startsWith("_") ? "" : columnText, {
                        class: "card-field-label",
                        for: "input",
                    }),
                    TableHtml.formatValue(this.data[column], columnType, column, this.data),
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

        const mainContainer = this.getContainer("main");
        mainContainer.innerHTML = html;

        mainContainer.querySelector(".delete-button").onclick = (e) => this.onDeleteButton(e);
        mainContainer.querySelector(".link-button").onclick = () => this.onLinkButton();
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

    async onSaveButton(e) {
        const newData = {};

        this.containers.main.querySelectorAll("input,select").forEach((input) => {
            const column = input.name;
            const val = TableHtml.unformatValue(input, this.columns[column], column);

            if (val !== undefined) {
                newData[column] = val;
            }
        });

        if (this.isNew) {
        } else {
            newData.id = this.id;
            await request(`${this.urlPath}/update`, { objects: [newData] }, "POST");
        }

        document.location.reload();
    }

    onLinkButton() {
        const link = window.location.href;

        copyToClipboard(link);
    }
}
