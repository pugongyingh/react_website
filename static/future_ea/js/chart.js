let ctx;

//ctx = document.getElementById('comparison1').getContext('2d');
//new Chart(ctx, {
  //// The type of chart we want to create
  //type: 'bar',
  //// The data for our dataset
  //data: {
    //labels: ["1", "2"],
    //datasets: [{
    //label: "1",
    //backgroundColor: "red",
    //borderColor: "black",
    //data: [30, 25],
  //}, {
    //label: "2",
    //backgroundColor: "blue",
    //borderColor: "black",
    //data: [0, 15],
    //}],
  //},
  //options: {
    //legend: false,
  //}
//});

//ctx = document.getElementById('comparison2').getContext('2d');
//new Chart(ctx, {
  //// The type of chart we want to create
  //type: 'bar',
  //// The data for our dataset
  //data: {
    //labels: ["1", "2"],
    //datasets: [{
    //label: "1",
    //backgroundColor: "red",
    //borderColor: "black",
    //data: [30, 0],
  //}, {
    //label: "2",
    //backgroundColor: "blue",
    //borderColor: "black",
    //data: [0, 28],
  //}, {
    //label: "2",
    //backgroundColor: "blue",
    //borderColor: "black",
    //data: [0, 28],
  //}, {
    //label: "2",
    //backgroundColor: "blue",
    //borderColor: "black",
    //data: [0, 28],
  //}, {
    //label: "2",
    //backgroundColor: "blue",
    //borderColor: "black",
    //data: [0, 28],
  //}, {
    //label: "2",
    //backgroundColor: "blue",
    //borderColor: "black",
    //data: [0, 28],
  //}],
  //},
  //options: {
    //legend: false,
    //scales: {
      //xAxes: [{
        //categoryPercentage: 1.0,
        //barPercentage: 1.0,
      //}]
    //}
  //}
//});

//ctx = document.getElementById('comparison3').getContext('2d');
//new Chart(ctx, {
  //// The type of chart we want to create
  //type: 'bar',
  //// The data for our dataset
  //data: {
    //labels: ["1", "2"],
    //datasets: [{
    //label: "1",
    //backgroundColor: "red",
    //borderColor: "black",
    //data: [30, 0],
  //}, {
    //label: "2",
    //backgroundColor: "blue",
    //borderColor: "black",
    //data: [0, 30],
    //}],
  //},
  //options: {
    //legend: false,
    //scales: {
      //xAxes: [{
        //barThickness: 75,
      //}]
    //}
  //}
//});

//ctx = document.getElementById('comparison4').getContext('2d');
//new Chart(ctx, {
  //// The type of chart we want to create
  //type: 'bar',
  //// The data for our dataset
  //data: {
    //labels: ["1", "2"],
    //datasets: [{
    //label: "1",
    //backgroundColor: "red",
    //borderColor: "black",
    //data: [30, 0],
  //}, {
    //label: "2",
    //backgroundColor: "purple",
    //borderColor: "black",
    //data: [0, 15],
  //}, {
    //label: "2",
    //backgroundColor: "purple",
    //borderColor: "black",
    //data: [0, 15],
  //}, {
    //label: "2",
    //backgroundColor: "purple",
    //borderColor: "black",
    //data: [0, 15],
    //}],
  //},
  //options: {
    //legend: false,
    //scales: {
      //xAxes: [{
        //categoryPercentage: 1.0,
        //barPercentage: 1.0,
      //}]
    //}
  //}
//});
ctx = document.getElementById('popChart1').getContext('2d');
new Chart(ctx, {
  // The type of chart we want to create
  type: 'line',

  // The data for our dataset
  data: {
    labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(a => a + ""),
    datasets: [{
      label: "World Populations",
      backgroundColor: 'rgb(55, 99, 132)',
      borderColor: 'black',
      data: [.17, .18, .19, .19, .19, .19, .2, .21, .22, .22, .25, .3, .36, .36, .36, .43, .55, .6, 1, 1.8, 7,],
    }]
  },

  // Configuration options go here
  options: { pointStyle: "line" }
});

ctx = document.getElementById('popChart2').getContext('2d');
new Chart(ctx, {
  // The type of chart we want to create
  type: 'line',

  // The data for our dataset
  data: {
    labels: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map(a => a + ""),
    datasets: [{
      label: "Past",
      backgroundColor: 'rgb(55, 99, 132)',
      borderColor: 'black',
      data: [.25, .3, .36, .36, .36, .43, .55, .6, 1, 1.8, 6.1,],
    }, {
      label: "Future Low",
      backgroundColor: 'darkred',
      borderColor: 'black',
      data: [null, null, null, null, null, null, null, null, null, null, 6.1, 5.5, 3.2, 2.3,],
    }, {
      label: "Future Medium",
      backgroundColor: 'red',
      borderColor: 'black',
      data: [null, null, null, null, null, null, null, null, null, null, 6.1, 9.1, 8.5, 9,],
    }, {
      label: "Future High",
      backgroundColor: 'pink',
      borderColor: 'black',
      data: [null, null, null, null, null, null, null, null, null, null, 6.1, 14, 21.2, 36.5,],
    }]
  },

  // Configuration options go here
  options: { pointStyle: "line" }
});

//ctx = document.getElementById('totalview').getContext('2d');
//new Chart(ctx, {
  //// The type of chart we want to create
  //type: 'bar',
  //// The data for our dataset
  //data: {
    //labels: ["1", "2", "3"],
    //datasets: [{
    //label: "1",
    //backgroundColor: "red",
    //borderColor: "black",
    //data: [0, 20, 30],
    //}, {
    //label: "2",
    //backgroundColor: "blue",
    //borderColor: "black",
    //data: [0, 20, 30],
    //}, {
    //label: "3",
    //backgroundColor: "green",
    //borderColor: "black",
    //data: [0, 0, 10],
    //}],
  //},
//});
