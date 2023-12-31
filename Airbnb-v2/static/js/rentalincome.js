

function BuildRental_incomeChart2(city_id, nbh_id){


    url = "/api/rental_size/";
    url = url.concat(city_id)
    url = url.concat("/")
    url = url.concat(nbh_id)
    console.log(url)
  
    
    // Load data from rental size
    d3.json(url).then(function(data) {
    
    
      // Cast the hours value to a number for each piece of data
      data.forEach(function(d) {
       
        d.RentalSizeinfo.rental_income = +parseFloat(d.RentalSizeinfo.rental_income);
        d.RentalSizeinfo.median_occupancy = + (parseFloat(d.RentalSizeinfo.median_occupancy)) ; 
        d.RentalSizeinfo.count = +parseFloat(d.RentalSizeinfo.count) ; 
  
      });

    data =  data.sort(function(a, b) {
      return d3.ascending(a.RentalSizeinfo.rental_income, b.RentalSizeinfo.rental_income)
    })

var property = data.map(function(d){
  return d.RentalSizeinfo.bed_number 
})
var incomes = data.map(function(d){
  return d.RentalSizeinfo.rental_income 
})
     
var occupancy = data.map(function(d){
  return d.RentalSizeinfo.median_occupancy 
})

      
      var trace1 = {
        x: property,
        y: incomes,
        name: 'Average Incomes',
        type: 'bar'
      };
      
      var trace2 = {
        x: property,
        y: occupancy,
      
        yaxis : 'y2',
        name: 'Median Occupancy',
        type: 'scatter'
      };
      
      var data = [trace1, trace2];
      
      var layout = {
        title: 'Bed Number vs Rental Income and Occupancy',
        yaxis: {title: 'Avg Rental Income',
                range :[0,5000]},
        yaxis2: {
          title: 'Median Occupancy',
          titlefont: {color: 'rgb(148, 103, 189)'},
          tickfont: {color: 'rgb(148, 103, 189)'},
          rangemode: 'tozero',
          range :[0, 100],
          overlaying: 'y',
          side: 'right',
          position : 1
        },
        autosize: true, 
        width: 900, 
        height: 300,  
        margin: { l: 60,  r: 1, b: 25,  t: 25 },
        legend: {
          x: 1.4,
          xanchor: 'right',
          y: 1
        }
      };
      
      // var layout = {
      //   title: "Average Rental Income Vs Occupancy",
      //   xaxis: { title: "Rental Size"},
      //   yaxis: { title: "Avgerage Incomes"}
      // };

      var config = { responsive: true };
      //var layout = { autosize: true, width: 600, height: 300,  margin: { l: 60,  r: 10, b: 25,  t: 25 } };
      Plotly.newPlot('incomeChart2', data, layout, config);
    
       
    }).catch(function(error) {
      console.log(error);
    });
    
    
        
    }
     
    BuildRental_incomeChart2("28719", "0")