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

    const usernameEl = qStrict("#username", HTMLInputElement);
    const passwordEl = qStrict("#password", HTMLInputElement);

    const loginErrorEl = qStrict("#login-error");
    const gotoHome = () => (window.location.pathname = "/");

    fauth.getAuth().then((data) => {
        if (data) {
            console.info('session found. skip login', data)
            return gotoHome();
        }
    });

    const cb = async (e) => {
        e.preventDefault();

        const isSuccess = await fauth.login(usernameEl.value, passwordEl.value, loginErrorEl);

        if (isSuccess) {
            gotoHome();
        }
    };

    enterEvent(usernameEl, cb);
    enterEvent(passwordEl, cb);

    qStrict("#login").onclick = cb;
})();
