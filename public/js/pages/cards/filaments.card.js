// @ts-check

(async () => {
    const filamentId = Number(LOC_SEARCH.id);

    const wrap = wrapTag("div", "", { id: "wrap-static", class: "wrap-static" }, [
        wrapTag("div", "", { id: "card-filament" }),
        wrapTag("div", "", { id: "table-filament-settings", class: "wrap" }),
    ]);

    main.insertAdjacentHTML("beforeend", wrap);

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
        qStrict("#card-filament"),
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
            /* filamentId: "number", */

            comment: "string",
        },
        qStrict("#table-filament-settings")
    );

    settingsTable.strictSearch = true;
    settingsTable.createHeaderEl({ create: true });
    settingsTable.onInitData = (data) => {
        data.filamentId = filamentId;

        return data;
    };

    await settingsTable.init([["filamentId", filamentId]]);

    filamentCard.onLinkButton = () => {
        const link = `${window.location.origin}/f${window.location.search}`;

        copyToClipboard(link);
    };
})();
