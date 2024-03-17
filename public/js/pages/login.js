(() => {
    const wrap = document.createElement("div");
    wrap.className = "wrap-static";

    main.append(wrap);

    wrap.insertAdjacentHTML(
        "beforeend",
        wrapTag("div", "", { class: "login-form" }, [
            wrapTag("label", lang._loginPage.username, { for: "username" }),
            wrapTag("input", "", { type: "text", id: "username" }),

            wrapTag("label", lang._loginPage.password, { for: "password" }),
            wrapTag("input", "", { type: "password", id: "password" }),

            wrapTag("button", lang._loginPage.login, { id: "login" }),
            wrapTag("div", "ERROR", { id: "login-error", hidden: "hidden", class: "danger-text" }),
        ])
    );

    // @ts-ignore
    const getVal = (sel) => qStrict(sel).value;

    const loginErrorEl = qStrict("#login-error");
    const gotoHome = () => (window.location.pathname = "/");

    FAuth.getAuth(true).then((data) => {
        // if (data) return gotoHome();
    });

    qStrict("#login").onclick = async (e) => {
        e.preventDefault();

        const username = getVal("#username");
        const password = getVal("#password");

        const isSuccess = await FAuth.login(username, password, loginErrorEl);

        if (isSuccess) {
            gotoHome();
        }
    };
})();
