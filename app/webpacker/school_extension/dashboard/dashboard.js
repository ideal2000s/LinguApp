$(document).ready(function () {
  if ($('.chart-students-by-level').length > 0) {
    // calc chart data
    organizedChartData = organizeChartData();
    // draw chart
    canvas = document.getElementById('chart-students-by-level');
    context = canvas.getContext('2d');
    // organize gradients
    var gradientColors = [
      { start: '#BED62F', end: '#86B539' },
      { start: '#EE9238', middle: '#FBBC25', end: '#F9A450' },
      { start: '#4D30C0', end: '#7660CE' },
      { start: '#0FC1ED', middle: '#66CEFF', end: '#00A5D7' },
      { start: '#E3237D', end: '#F256A0' },
      { start: '#F7513F', end: '#FB765C' },
      { start: '#D04A4A', end: '#FF7D75' }
    ];
    var gradients = [];
    gradientColors.forEach(function (item) {
      var gradient = context.createLinearGradient(0, 0, 30, 30);
      gradient.addColorStop(0, item.start);
      if (item.middle) {
        gradient.addColorStop(0.5, item.middle);
      }
      gradient.addColorStop(1, item.end);
      gradients.push(gradient);
    });
    // chart config
    data = {
      labels: organizedChartData['labels'],
      datasets: [
        {
          backgroundColor: gradients,
          hoverBackgroundColor: gradients,
          hoverBorderColor: gradients,
          hoverBorderWidth: 1,
          borderWidth: 2,
          borderColor: '#F6F6F6',
          data: organizedChartData['values']
        }
      ]
    };
    options = {
      has_plugin: true,
      cutoutPercentage: 70,
      responsive: true,
      tooltips: {
        callbacks: {
          label: function(item, data) {
            label = $.trim(data.labels[item.index].slice(0, -1)) + ': ' + data.datasets[0].data[item.index];
            return label;
          }
        }
      },
      legend: {
        display: true,
        position: 'right',
        labels: {
          boxWidth: 12
        }
      },
      activePercent: { label: 'Active', value: organizedChartData['active_percent'] + '%' },
      inactivePercent: { label: 'Inactive', value: organizedChartData['inactive_percent'] + '%' }
    };
    // create chart
    doughnutChart = new Chart(context, {
      type: 'doughnut',
      data: data,
      options: options
    });
    addChartPluginService();
  }
});

function organizeChartData() {
  labels = [];
  values = [];
  active_percent = parseInt(window.currentTeamInfo['active_students'] * 100 / window.currentTeamInfo['total_students']);
  inactive_percent = parseInt(window.currentTeamInfo['inactive_students'] * 100 / window.currentTeamInfo['total_students']);
  $.each(window.chartData, function (key, value) {
    if (value['level'] != 'undefined') {
      level = value['level'].replace('zero_level', '0');
      labels.push(level.charAt(0).toUpperCase() + level.slice(1) + "   " + value['count']);
      values.push(value['count']);
    }
  });
  return { labels: labels, values: values, active_percent: active_percent, inactive_percent: inactive_percent }
}

function addChartPluginService() {
  Chart.pluginService.register({
    beforeDraw: function (chart) {
      if (chart.config.options.has_plugin) {
        width = chart.chart.width - 75;
        centerY = chart.chart.height / 2;
        ctx = chart.chart.ctx;
        options = chart.chart.options;
        ctx.restore();

        ctx.font = "14px sans-serif";
        ctx.fillStyle = 'grey';
        centerX = Math.round((width - ctx.measureText(options.activePercent['label']).width) / 2);
        ctx.fillText(options.activePercent['label'], centerX, centerY - 30);

        ctx.font = "18px sans-serif";
        ctx.fillStyle = 'black';
        centerX = Math.round((width - ctx.measureText(options.activePercent['value']).width) / 2);
        ctx.fillText(options.activePercent['value'], centerX, centerY - 10);

        ctx.strokeStyle = 'grey';
        ctx.strokeRect(centerX - 20, centerY, 80, 0.5);

        ctx.font = "14px sans-serif";
        ctx.fillStyle = 'grey';
        centerX = Math.round((width - ctx.measureText(options.inactivePercent['label']).width) / 2);
        ctx.fillText(options.inactivePercent['label'], centerX, centerY + 20);

        ctx.font = "18px sans-serif";
        ctx.fillStyle = 'black';
        centerX = Math.round((width - ctx.measureText(options.inactivePercent['value']).width) / 2);
        ctx.fillText(options.inactivePercent['value'], centerX, centerY + 40);

        ctx.save();
      }
    }
  });
}

$(document).ready(function () {
  if ($('#chart_students_visit').length > 0) {
    var yPosition = 0;
    $('#chart_students_visit').mousemove(function (e) {
      yPosition = e.pageY;
    })
    var ctx = document.getElementById('chart_students_visit').getContext('2d');
    var gradient = ctx.createLinearGradient(0, 0, 0, 500);
    gradient.addColorStop(0, 'rgba(0, 165, 215, 0.13)');
    gradient.addColorStop(1, 'rgba(0, 165, 215, 0)');
    var studentVisitChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: window.durationLabel,
        datasets: [
          {
            backgroundColor: gradient,
            borderWidth: 4,
            borderColor: "#00A5D7",
            data: window.thisMonthDuration,
            pointHoverBackgroundColor: "#00A5D7",
            pointHoverBorderColor: 'white',
            pointHoverBorderWidth: '2px',
            pointHoverBorderRadius: '10px',
            pointHoverRadius: 8,
            pointBackgroundColor: "#00A5D7",
            pointRadius: 2,
          },
          {
            fill: false,
            borderWidth: 4,
            borderColor: "#E6E6F0",
            data: window.lastMonthDuration,
            pointHoverBackgroundColor: "#E6E6F0",
            pointHoverBorderColor: 'white',
            pointHoverBorderWidth: '2px',
            pointHoverBorderRadius: '10px',
            pointHoverRadius: 8,
            pointBackgroundColor: "#E6E6F0",
            pointRadius: 2,
          }
        ]
      },
      options: {
        legend: {
          display: false,
        },
        elements: {
          point: {
            radius: 0,
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              fontColor: 'rgba(128, 127, 145, 0.5)',
              padding: 15,
              fontSize: 14,
            },
            gridLines: {
              display: false,
            },
          }],
          yAxes: [{
            ticks: {
              fontColor: 'rgba(128, 127, 145, 0.5)',
              padding: 20,
              fontSize: 14,
              stepSize: window.durationStep,
              beginAtZero: true
            },
            gridLines: {
              color: '#E6E6F0',
              drawBorder: false,
              zeroLineColor: '#E6E6F0'
            }
          }]
        },
        tooltips: {
          enabled: false,
          callbacks: {
            title: function (t) {
              if (t[0].datasetIndex === 1) {
                return window.prevMonthLabel[t[0].index];
              } else {
                return t[0].label;
              }
            }
          },
          custom: function(tooltipModel){
            var tooltipEl = document.getElementById('chartjs-tooltip');

            // Create element on first render
            if (!tooltipEl) {
              tooltipEl = document.createElement('div');
              tooltipEl.id = 'chartjs-tooltip';
              tooltipEl.innerHTML = '<table style="display: flex; flex-direction: column; align-items: center"></table>';
              document.body.appendChild(tooltipEl);
            }

            // Hide if no tooltip
            if (tooltipModel.opacity === 0) {
              tooltipEl.style.cssText = "opacity: 0; z-index: -100; display: none";
              return;
            }

            function getBody(bodyItem) {
              return bodyItem.lines;
            }

            // Set Text
            if (tooltipModel.body) {
              var titleLines = tooltipModel.title || [];
              var bodyLines = tooltipModel.body.map(getBody);

              var innerHtml = '<thead>';

              titleLines.forEach(function(title) {
                innerHtml += '<tr><th style="font-size: 12px; color: #807F91;">' + title + '</th></tr>';
              });
              innerHtml += '</thead><tbody>';

              var originalData = parseInt(bodyLines[0], 10);
              var displayData = Math.floor(originalData/3600) + 'h ' + Math.floor((originalData%3600)/60) + 'm';
              innerHtml += '<tr><td style="font-size: 18px; font-weight: bold; color: #2d2d3a">' + displayData + '</td></tr>';
              innerHtml += '</tbody>';

              var tableRoot = tooltipEl.querySelector('table');
              tableRoot.innerHTML = innerHtml;
            }

            // `this` will be the overall tooltip
            var position = this._chart.canvas.getBoundingClientRect();

            // Display, position, and set styles for font
            tooltipEl.style.cssText = "width: 113px; height: 67px; background-color: rgba(246, 246, 248, 0.3);" +
              "backdrop-filter: blur(10px); border-radius: 10px; opacity: 1; position: absolute;"
            tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX - 60 + 'px';
            tooltipEl.style.top = yPosition - 90 + 'px';
            tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
          }
        }
      }
    })
  }
})

$(document).on('input', '#processor_name', function () {
  if ($(this).val().length)
    $(this).next().removeClass('disabled');
  else
    $(this).next().addClass('disabled');
})