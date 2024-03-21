// @ts-check

(() => {
    const wrap = wrapTag("div", "", { id: "wrap-static", class: "wrap-static" }, [
        wrapTag("div", "", { id: "table-brands" }, [wrapTag("h3", lang.labelBrands)]),
        wrapTag("div", "", { id: "table-materials" }, [wrapTag("h3", lang.labelMaterials)]),
        wrapTag("div", "", { id: "table-types" }, [wrapTag("h3", lang.labelTypes)]),
    ]);

    main.insertAdjacentHTML("beforeend", wrap);

    const brandsTable = new TableHtml(
        "/api/brands",
        {
            id: "number",
            name: "string",
            createdAt: "date",
            updatedAt: "date",
        },
        qStrict("#table-brands")
    );
    brandsTable.createHeaderEl({ create: true }, brandsTable.tableOuter);

    const materialsTable = new TableHtml(
        "/api/filament-materials",
        {
            id: "number",
            name: "string",
            createdAt: "date",
            updatedAt: "date",
        },
        qStrict("#table-materials")
    );
    materialsTable.createHeaderEl({ create: true }, materialsTable.tableOuter);

    const typesTable = new TableHtml(
        "/api/filament-types",
        {
            id: "number",
            name: "string",
            createdAt: "date",
            updatedAt: "date",
        },
        qStrict("#table-types")
    );
    typesTable.createHeaderEl({ create: true }, typesTable.tableOuter);

    brandsTable.init();
    materialsTable.init();
    typesTable.init();
})();
