// @ts-check

(() => {
    const wrap = document.createElement("div");
    wrap.className = "wrap-static";

    main.append(wrap);

    const brandsTable = new TableHtml(
        "/api/brands",
        {
            id: "number",
            name: "string",
            isBanned: "boolean",
            createdAt: "date",
            updatedAt: "date",
        },
        wrap
    );

    brandsTable.createHeaderEl({ create: true }, brandsTable.tableOuter);

    // @ts-check
    const materialsTable = new TableHtml(
        "/api/filament-materials",
        {
            id: "number",
            name: "string",
            createdAt: "date",
            updatedAt: "date",
        },
        wrap
    );

    materialsTable.createHeaderEl({ create: true }, materialsTable.tableOuter);

    brandsTable.init();
    materialsTable.init();
})();
