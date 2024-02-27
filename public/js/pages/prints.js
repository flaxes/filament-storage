// @ts-check

(() => {
    const table = new TableHtml(
        "/api/prints",
        {
            previewFile: "photo",
            id: 'number',
            name: "string",

            status: {
                from: ["new", "printed", "bad", "waiting"],
                remoteName: "status",
                type: "select",
            },

            originLink: "link",

            projectUploadFile: "link",
            openSlicer: {
                format: (_, data = {}) => {
                    const fields = [];
                    if (data.projectUploadFile) {
                        fields.push(wrapSlicerTag(data.projectUploadFile, data.name));
                    }

                    return wrapTag("div", "", {}, fields);
                },
                unformat: (val) => val,
            },

            weightGramms: "number",
            cost: "number",
        },
        main,
        true
    );

    table.searchBy = ["name", "status", "originLink"];

    table.createHeaderEl();

    table.init();
})();
