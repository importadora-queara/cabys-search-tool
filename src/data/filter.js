const fs = require("fs");
const data = require("./CAByS JSON Data.json");

const newData = [];

data.map((entry, index) => {
  if (index === 0) {
    return;
  }
  // filter 3 and 4.
  if (entry.field1 === "3" || entry.field1 === "4") {
    newData.push(entry);
  }
});

fs.writeFileSync("filteredData.json", JSON.stringify(newData));
