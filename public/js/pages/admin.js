(() => {
    const wrap = document.createElement("div");
    wrap.className = "wrap-static";
    document.body.append(wrap);
    const versionPromise = request("/api/admin/version", {}, "GET");
    const usagePromise = request("/api/uploads/usage", {}, "GET");

    const renderVersion = async () => {
        // Version
        const updateDom = wrapTag("div", "", { class: "admin-update", id: "admin-update" }, [
            wrapTag("h2", lang.labelVersion),
            wrapTag("div", `${lang.current}: `),
            wrapTag("div", `${lang.last}: `),
            wrapTag("button", lang.actionUpdate, { id: "admin-update-button" }),
        ]);

        wrap.insertAdjacentHTML("beforeend", updateDom);
        const version = await versionPromise;

        qStrict("#admin-update").children[1].innerText += version.current + "";
        qStrict("#admin-update").children[2].innerText += version.last;

        qStrict("#admin-update-button").onclick = async () => {
            await request("/api/admin/version-update", {}, "POST");

            setTimeout(() => {
                window.location.reload();
            }, 3e3);
        };
    };

    // Disk Usage
    const renderUsage = async () => {
        const usageDom = wrapTag("div", "", { id: "admin-disk-usage" }, [
            wrapTag("h2", lang.labelDiskUsage),
            wrapTag("div", `${lang.labelFree} `),
            wrapTag("div", `${lang.labelUsed} `),
        ]);

        wrap.insertAdjacentHTML("beforeend", usageDom);

        const usage = await usagePromise;
        const toMb = (num) => (Number(num) / 1024 / 1024).toFixed(2);
        const total = toMb(usage.limit);
        const used = toMb(usage.usage);

        qStrict("#admin-disk-usage").children[1].innerText += `${total}MB`;
        qStrict("#admin-disk-usage").children[2].innerText += `${used}MB`;
    };

    Promise.all([renderVersion(), renderUsage()]).catch((err) => console.error(err));
})();
