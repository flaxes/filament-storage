// @ts-check

(async () => {
    const filamentId = Number(LOC_SEARCH.id);
    const wrap = document.createElement("div");
    wrap.className = "wrap-static";

    main.append(wrap);

    const filamentCard = new CardHtml(
        "/api/filaments",
        {
            id: "number",
            material: { type: "select", from: "/api/filament-materials", remoteName: "filamentMaterials" },
            brand: { type: "select", from: "/api/brands", remoteName: "brands" },
            color: "color",
            type: "string",
            colorName: "string",
            quantity: "number",
            name: "string",
            comment: "string",
            buyLink: "link",
            createdAt: "date",
            updatedAt: "date",
        },
        wrap,
        "filament"
    );

    await filamentCard.init();

    const settingsTable = new TableHtml(
        "/api/filament-settings",
        {
            id: "number",
            name: "string",

            initialNozzleTemp: "number",
            nozzleTemp: "number",

            initialBedTemp: "number",
            bedTemp: "number",

            flowRatio: "number",
            kFactor: "number",

            comment: "string",
        },
        wrap
    );
    settingsTable.strictSearch = true;
    await settingsTable.init([["filamentId", filamentId]]);

    filamentCard.onLinkButton = () => {
        const link = `${window.location.origin}/f${window.location.search}`;

        copyToClipboard(link);
    };
})();
