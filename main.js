//Data from : https://data.giss.nasa.gov/gistemp/

getChart();

// Drawing chart in Canvas element
async function getChart() {
  const data = await getData();
  const ctx = document.getElementById("chart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.xs,
      datasets: [
        {
          label: "Global Temperature variation from Average Temperature",
          data: data.ys,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              callback: function(value, index, values) {
                return value + "°C";
              }
            }
          }
        ]
      }
    }
  });
}

// async function to select required data for display
async function getData() {
  const xs = [];
  const ys = [];
  const response = await fetch("temperatures.csv");
  const data = await response.text();
  const table = data.split("\n").slice(1);
  table.forEach(row => {
    const columns = row.split(",");
    const year = columns[0];
    xs.push(year);
    const temp = columns[1];
    ys.push(temp);
    console.log(year, temp);
  });
  return { xs, ys };
}
