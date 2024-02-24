/**
 * 
         <tr>
            <th>ID</th>
            <th>Brand</th>
            <th>Name</th>
            <th>Type</th>
            <th>Color</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>#</th>
        </tr>} urlPath 
 */

function createTable(urlPath, columns, appendTo) {
    const table = document.createElement("table");

    const columns = document.createElement("tr");

    for (const column of columns) {
        const th = document.createElement("th");
        th.innerText = lang._columns[column] || `?${column}?`;

        columns.append(th);
    }

    appendTo.append(table);
}
