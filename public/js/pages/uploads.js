// @ts-check

(() => {
    const table = new TableHtml(
        "/api/uploads",
        {
            id: "number",
            fileName: "link",
            sizeMb: "number",
            isPhoto: "boolean",
            name: "string",
        },
        main
    );

    table.createHeaderEl({ search: true });
    table.searchBy = ["id", "fileName", "name"];

    table.init();
})();
