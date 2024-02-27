// @ts-check

(() => {
    const table = new TableHtml(
        "/api/filaments",
        {
            id: "number",
            brand: { type: "select", from: "/api/brands", remoteName: "brands" },
            color: "color",
            material: { type: "select", from: "/api/filament-materials", remoteName: "filamentMaterials" },
            type: "string",
            colorName: "string",
            quantity: "number",
            name: "string",
            comment: "string",
            buyLink: "link",
            createdAt: "date",
            updatedAt: "date",
        },
        main,
        true
    );

    table.searchBy = ["brand", "material", "colorName", "name", "type"];

    table.createHeaderEl();

    (q(".table-header") || never()).insertAdjacentHTML(
        "beforeend",
        wrapTag("button", "", {
            id: "table-import",
            class: "fa fa-file-excel-o",
        })
    );

    // @ts-ignore
    q("#table-import").onclick = () => {
        const url = window.location.origin + "/api/filaments/filaments.xlsx";

        window.location.replace(url);
    };

    table.init();
})();
