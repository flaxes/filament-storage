// @ts-check

(() => {
    const table = new TableHtml(
        "/api/filaments",
        {
            id: "number",
            brand: { type: "select", from: "/api/brands", remoteName: "brands" },
            color: "color",
            material: { type: "select", from: "/api/filament-materials", remoteName: "filamentMaterials" },
            type: { type: "select", from: "/api/filament-types", remoteName: "filamentTypes" },
            colorName: "string",
            quantity: "number",
            weightGramms: "number",
            price: "number",
            comment: "string",
            buyLink: "link",
            isNoExport: "boolean",
            createdAt: "date",
            updatedAt: "date",
        },
        main,
        true
    );
    table.searchBy = ["brand", "material", "colorName", "name", "type"];

    const headerEl = table.createHeaderEl();
    headerEl.insertAdjacentHTML(
        "beforeend",
        wrapTag("button", "", {
            id: "table-import",
            class: "fa fa-file-excel-o",
        })
    );

    qStrict("#table-import", HTMLButtonElement, headerEl).onclick = () => {
        const url = `${window.location.origin}/api/uploads/get/filaments.xlsx?${filePostfix()}`;

        window.location.replace(url);
    };

    table.init();
})();
