import React, { useState } from "react";
import Menu from "../Menu/menu";
import * as d3 from "d3";
// import { useQuery } from "react-query";
import { QueryClient, QueryClientProvider } from "react-query";
const areaChart = async () => {
  d3.select("svg").remove();
  let data = await getData();

  var margin = { top: 10, right: 30, bottom: 30, left: 50 },
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
  var svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3
    .scaleBand()
    .range([0, width])
    .domain(
      data.map(function (d) {
        return d.date;
      })
    )
    .padding(1);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
  var y = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, function (d) {
        return +d.value;
      }),
    ])
    .range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));
  svg
    .append("path")
    .datum(data)
    .attr("fill", "#cce5df")
    .attr("stroke", "#69b3a2")
    .attr("stroke-width", 1.5)
    .attr(
      "d",
      d3
        .area()
        .x(function (d) {
          return x(d.date);
        })
        .y0(y(0))
        .y1(function (d) {
          return y(d.value);
        })
    );
};

const violinChart = async () => {
  d3.select("svg").remove();
  var margin = { top: 10, right: 30, bottom: 30, left: 40 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
  var svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  let data = await getData();

  var x = d3.scaleLinear().domain([0, 250]).range([0, width]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // set the parameters for the histogram
  var histogram = d3
    .histogram()
    .value(function (d) {
      return d.value;
    }) // I need to give the vector of value
    .domain(x.domain()) // then the domain of the graphic
    .thresholds(x.ticks(20)); // then the numbers of bins

  // And apply this function to data to get the bins
  var bins = histogram(data);

  // Y axis: scale and draw:
  var y = d3.scaleLinear().range([height, 0]);
  y.domain([
    0,
    d3.max(data, function (d) {
      return +d.value;
    }),
  ]);
  svg.append("g").call(d3.axisLeft(y));

  // append the bar rectangles to the svg element
  svg
    .selectAll("rect")
    .data(bins)
    .enter()
    .append("rect")
    .attr("x", 1)
    .attr("transform", function (d) {
      return "translate(" + x(d.x0) + "," + y(d.length) + ")";
    })
    .attr("width", function (d) {
      return x(d.x1) - x(d.x0) - 1;
    })
    .attr("height", function (d) {
      return height - y(d.length);
    })
    .style("fill", "#69b3a2");
};

const drawLineChart = async () => {
  d3.select("svg").remove();
  var margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  let data = await getData();

  var x = d3
    .scaleBand()
    .range([0, width])
    .domain(
      data.map(function (d) {
        return d.date;
      })
    )
    .padding(1);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear().domain([0, 200]).range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));

  // Add the line
  svg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr(
      "d",
      d3
        .line()
        .x(function (d) {
          return x(d.date);
        })
        .y(function (d) {
          return y(d.value);
        })
    );
};
const scatterplot = async () => {
  d3.select("svg").remove();
  let data = await getData();

  var margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  var x = d3
    .scaleBand()
    .range([0, width])
    .domain(
      data.map(function (d) {
        return d.date;
      })
    )
    .padding(1);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear().domain([50, 200]).range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));

  // Add dots
  svg
    .append("g")
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return x(d.date);
    })
    .attr("cy", function (d) {
      return y(d.value);
    })
    .attr("r", 1.5)
    .style("fill", "red");
};

const heatMap = async () => {
  d3.select("svg").remove();

  let data = await getData();
  var margin = { top: 30, right: 30, bottom: 30, left: 30 },
    width = 800 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Build X scales and axis:
  var x = d3
    .scaleBand()
    .range([0, width])
    .domain(
      data.map(function (d) {
        return d.date;
      })
    )
    .padding(0.1);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Build X scales and axis:
  var y = d3
    .scaleBand()
    .range([height, 0])
    .domain(
      data.map(function (d) {
        return d.value;
      })
    )
    .padding(0.01);
  svg.append("g").call(d3.axisLeft(y));

  // Build color scale
  var myColor = d3.scaleLinear().range(["white", "#69b3a2"]).domain([1, 200]);

  svg
    .selectAll()
    .data(data, function (d) {
      return d.date + ":" + d.value;
    })
    .enter()
    .append("rect")
    .attr("x", function (d) {
      return x(d.date);
    })
    .attr("y", function (d) {
      return y(d.value);
    })
    .attr("width", x.bandwidth())
    .attr("height", y.bandwidth())
    .style("fill", function (d) {
      return myColor(d.value);
    });
};

const getData = async () => {
  const getPosts = async () => {
    const response = await fetch(
      "https://www.alphavantage.co/query?function=MIDPRICE&symbol=IBM&interval=daily&time_period=10&apikey=demo"
    );
    return response.json();
  };
  const queryClient = new QueryClient();
  const data1 = await queryClient.fetchQuery("posts", getPosts);
  let dataObj = [data1["Technical Analysis: MIDPRICE"]][0];
  let data = new Array();

  for (let i = 0; i < 10; i++) {
    let am = new Date(Object.keys(dataObj)[i]);
    let date = am.getFullYear() + "/" + am.getMonth() + "/" + am.getDate();
    let findObject: any = Object.values(dataObj)[i];
    let innerObject = Object.values(findObject);
    data.push({
      date: date,
      value: innerObject[0],
    });
  }
  return data;
};

const drawLollipopChart = async () => {
  d3.select("svg").remove();
  let data = await getData();

  var margin = { top: 10, right: 30, bottom: 90, left: 40 },
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3
    .scaleBand()
    .range([0, width])
    .domain(
      data.map(function (d) {
        return d.date;
      })
    )
    .padding(1);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  // Add Y axis
  var y = d3.scaleLinear().domain([0, 200]).range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));

  // Lines
  svg
    .selectAll("myline")
    .data(data)
    .enter()
    .append("line")
    .attr("x1", function (d) {
      return x(d.date);
    })
    .attr("x2", function (d) {
      return x(d.date);
    })
    .attr("y1", function (d) {
      return y(d.value);
    })
    .attr("y2", y(0))
    .attr("stroke", "grey");

  // Circles
  svg
    .selectAll("mycircle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return x(d.date);
    })
    .attr("cy", function (d) {
      return y(d.value);
    })
    .attr("r", "4")
    .style("fill", "#69b3a2")
    .attr("stroke", "black");
};

function Dashboard() {
  const [state, setState] = useState("");

  const DrawBarChart = async () => {
    d3.select("svg").remove();
    let data = await getData();
    var margin = { top: 10, right: 30, bottom: 90, left: 40 };
    const width = 800;
    const height = 400;

    let svg = d3
      .select("body")
      .append("svg")
      .attr("width", width - margin.left - margin.right)
      .attr("height", height - margin.top - margin.bottom)
      .append("g")
      .attr("viewBox", [0, 0, width, height]);

    var x = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    var y = d3
      .scaleLinear()
      .domain([0, 200])
      .range([height - margin.bottom, 0]);

    svg
      .append("g")
      .attr("fill", "royalblue")
      .selectAll("rect")
      .data(data.sort((a, b) => d3.descending(a.value, b.value)))
      .join("rect")
      .attr("x", (d, i) => x(i))
      .attr("y", (d) => y(d.value))
      .attr("height", (d) => y(0) - y(d.value))
      .attr("width", x.bandwidth());

    function xAaxis(g) {
      g.attr("transform", `translate(0, ${280})`).call(
        d3.axisBottom(x).tickFormat((i) => data[i].date)
      );
    }

    function yAaxis(g) {
      g.attr("transform", `translate(${margin.left},0)`).call(
        d3.axisLeft(y).ticks(null)
      );
    }
    svg.append("g").call(xAaxis);
    svg.append("g").call(yAaxis);

    svg.node();
  };

  const onchange = (value) => {
    setState(value);
    if (value === "bar chart") {
      DrawBarChart();
    } else if (value === "line chart") {
      drawLineChart();
    } else if (value === "lollipop chart") {
      drawLollipopChart();
    } else if (value === "heatmap") {
      heatMap();
    } else if (value === "scatterplot") {
      scatterplot();
    } else if (value === "violin chart") {
      violinChart();
    } else if (value === "area chart") {
      areaChart();
    }
  };
  return (
    <>
      <Menu onchange={onchange} />
      <h3>{state}</h3>
    </>
  );
}

export default Dashboard;
