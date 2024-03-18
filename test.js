const fs = require("fs");
const gdrive = require("./src/instances/gdrive.instance");

const fileId = "1FHuXMcbEqc-nHSD2tJE6ipLz7DnO4GIJ";

const app = require("express")();

async function test() {
    //gdrive.getAllFiles().then((res) => console.log(res.files));

    const res = await gdrive.getAllFiles();

    console.log(res);
}

test().catch((err) => console.error(err));

/* app.get("/", async (req, res) => {
    const headersToSet = ["content-type", "content-length"];
    const { headers, data } = await gdrive.downloadFile(fileId);

    for (const header of headersToSet) {
        const driveHeader = headers[header];
        console.log(driveHeader);
        res.setHeader(header, driveHeader);
    }

    data.pipe(res);
});

app.listen(80); */
