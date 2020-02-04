//Data from : https://data.giss.nasa.gov/gistemp/

// Get specific data
getData();

// async function to select required data for display
async function getData() {
  const response = await fetch("temperatures.csv");
  const data = await response.text();
  const table = data.split("\n").slice(1);
  table.forEach(row => {
    const columns = row.split(",");
    const year = columns[0];
    const temp = columns[1];
    console.log(year, temp);
  });
}
