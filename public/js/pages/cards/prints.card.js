// @ts-check

(async () => {
    const wrap = document.createElement("div");
    wrap.className = "wrap-static";

    main.append(wrap);

    const printCard = new CardHtml(
        "/api/prints",
        {
            previewFile: "photo",
            name: "string",

            status: {
                from: ["new", "printed", "bad", "waiting"],
                remoteName: "status",
                type: "select",
            },

            originLink: "link",

            projectUploadFile: "link",
            _projectSlicer: {
                format: (_, data) => {
                    const fields = [];
                    if (data.projectUploadFile) {
                        fields.push(wrapSlicerTag(data.projectUploadFile, data.name, lang._columns.openSlicer));
                    }

                    return wrapTag("div", "", {}, fields);
                },
                unformat: (val) => val,
            },

            weightGramms: "number",
            cost: "number",
        },
        wrap,
        "print"
    );

    await printCard.init();

    // Append uploader for project
    const projectFileDom = printCard.card.querySelector('[name="projectUploadFile"]') || never();
    const projectFileUploadDom = printCard.createUploadForm("", [], false, (_files, response) => {
        const [file] = response;
        // @ts-ignore
        projectFileDom.value = file.fileName;

        printCard.onSaveButton();
    });
    // @ts-ignore
    projectFileDom.parentElement.append(projectFileUploadDom);

    // Append uploader for preview.
    const previewFileDom = printCard.card.querySelector('[name="previewFile"]') || never();
    // @ts-ignore
    previewFileDom.parentElement.parentElement.classList.add('hidden-label');

    const previewUploadForm = printCard.createUploadForm(lang.preview, [], true, (_files, response) => {
        const [file] = response;
        // @ts-ignore
        previewFileDom.value = file.fileName;

        printCard.onSaveButton();
    });
    // @ts-ignore
    previewFileDom.parentElement.append(previewUploadForm);

    // printCard.createContainer("photos").append(previewUploadForm);
})();
