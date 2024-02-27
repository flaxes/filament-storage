// @ts-check
/** @type {import('../langs/en.json')} */ // @ts-ignore
const lang = {};
const main = document.querySelector("main") || never("NO MAIN");
let CDN_TOKEN = "???";

async function app() {
    const render = {
        header: () => {
            const links = [
                {
                    name: lang._header.index,
                    link: "/",
                },
                {
                    name: lang._header.filaments,
                    link: "/filaments",
                },
                {
                    name: lang._header.prints,
                    link: "/prints",
                },
                {
                    name: lang._header.uploads,
                    link: "/uploads",
                },
                {
                    name: lang._header.static,
                    link: "/static",
                },

                {
                    name: lang._header.admin,
                    link: "/admin",
                },

                {
                    name: lang._header.logout,
                    link: "/logout",
                },
            ];

            const d = document.createElement("header");
            d.className = "header";

            for (const link of links) {
                d.insertAdjacentHTML(
                    "beforeend",
                    wrapTag("div", "", {}, [wrapTag("a", link.name, { class: "header-link", href: link.link })])
                );

                // d.innerHTML += wrapTag("a", link.name, { class: "header-link", href: link.link });
            }

            document.body.prepend(d);
        },
    };

    const PAGES = {
        "/login": {
            key: "_loginPage",
            scripts: ["/js/pages/login.js"],
        },

        "/": {
            redirect: "/filaments",
            /* key: "_homePage",
            scripts: ["/js/pages/home.js"], */
        },

        "/filaments": {
            key: "_filamentsPage",
            scripts: ["/js/pages/filaments.js"],
        },

        "/filaments/card": {
            key: "_filamentsPage",
            scripts: ["/js/pages/cards/filaments.card.js"],
        },

        "/prints": {
            key: "_printsPage",
            scripts: ["/js/pages/prints.js"],
        },

        "/prints/card": {
            key: "_printsPage",
            scripts: ["/js/pages/cards/prints.card.js"],
        },

        "/static": {
            key: "_staticPage",
            scripts: ["/js/pages/static.js"],
        },

        "/uploads": {
            key: "_uploadsPage",
            scripts: ["/js/pages/uploads.js"],
        },

        "/admin": {
            key: "_adminPage",
            scripts: ["/js/pages/admin.js"],
        },

        "/f": {
            redirect: "/filaments/card",
        },
    };

    // Setup lang
    Object.assign(lang, await request("/lang", null, "GET"));

    render.header();

    const headTitle = document.querySelector("head > title");
    const pageName = document.location.pathname;

    const PAGE = PAGES[pageName];
    if (!PAGE) {
        const d = document.createElement("div");

        d.innerText = `PAGE UNKNOWN "${pageName}"`;
        // @ts-ignore
        headTitle.innerText = "PAGE UNKNOWN";

        main.append(d);

        return;
    }

    if (PAGE.redirect) {
        document.location.href = `${PAGE.redirect}${document.location.search}`;
        return;
    }

    // @ts-ignore
    headTitle.innerText = lang[PAGE.key].h1;

    for (const script of PAGE.scripts) {
        const s = document.createElement("script");
        s.type = "text/javascript";
        s.src = script;
        document.body.append(s);
    }

    // @ts-ignore
    app = null;
}

app();
