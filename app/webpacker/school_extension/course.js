$(document).on('click', '.section-lesson-card-item', function() {
  $('.section-lesson-card-item').css({'z-index': 0, 'transform': ''});
  $(this).css({'z-index': 1, 'transform': 'scale(1.03)'}).find('.card-item-wrapper').removeClass('h-100').addClass('h-auto');
  $('.section-lesson-card-item').find('.collapse').collapse('hide');
  $(this).find('.collapse').collapse('show');
})

$(document).ready(function () {
  if($('#chart_course_by_tasks').length > 0) {
    var context = document.getElementById('chart_course_by_tasks').getContext('2d');

    // organize gradients
    var gradientColors = [
      { start: '#0FC1ED', end: '#0D82C3' },
      { start: '#7660CE', end: '#4D30C0' },
      { start: '#F256A0', end: '#E3237D' }
    ];
    var gradients = [];
    gradientColors.forEach(function (item) {
      var gradient = context.createLinearGradient(0, 0, 30, 30);
      gradient.addColorStop(0, item.start);
      gradient.addColorStop(1, item.end);
      gradients.push(gradient);
    });

    //labels and values to show
    var labels = Object.keys(window.courseTasksChartData).map(key => `${key.charAt(0).toUpperCase()}${key.slice(1)}  ${window.courseTasksChartData[key]} tasks`)
    var values = Object.values(window.courseTasksChartData)

    //chart config
    var data = {
      labels: labels,
      datasets: [
        {
          backgroundColor: gradients,
          hoverBackgroundColor: gradients,
          hoverBorderColor: gradients,
          hoverBorderWidth: 1,
          borderWidth: 2,
          borderColor: '#F6F6F6',
          data: values
        }
      ]
    }
    var options = {
      has_plugin: true,
      cutoutPercentage: 60,
      responsive: true,
      tooltips: {
        callbacks: {
          label: function(item, data) {
            label = $.trim(data.labels[item.index].split(' ')[0]) + ': ' + data.datasets[0].data[item.index];
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
    }

    // draw chart
    new Chart(context, {
      type: 'doughnut',
      data: data,
      options: options
    });
    if (data.labels.length > 0)
      showCourseTime();
  }
})

function showCourseTime() {
  Chart.pluginService.register({
    beforeDraw: function (chart) {
      if (chart.config.options.has_plugin) {
        var ctx = chart.chart.ctx;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
        var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
        ctx.font = 'bold 20px Inter';
        ctx.fillStyle = 'black';
        ctx.fillText(`${window.courseTime} h`, centerX, centerY);
      }
    }
  });
}

background_gradient = function(ctx) {
  var gradient = ctx.createLinearGradient(0, 0, 0, 500);
  gradient.addColorStop(0, 'rgba(227, 35, 125, 0.13)');
  gradient.addColorStop(1, 'rgba(227, 35, 125, 0)');
  return gradient;
}

  $(document).ready(function () {
  if($('.course-stats').length > 0) {
    var week_ctx = document.getElementById('course_per_week_chart').getContext('2d');
    var month_ctx = document.getElementById('course_per_month_chart').getContext('2d');
    var year_ctx = document.getElementById('course_per_year_chart').getContext('2d');

    var week_labels = Object.keys(window.courseDurations.week_duration);
    var month_labels = Object.keys(window.courseDurations.month_duration);
    var year_labels = Object.keys(window.courseDurations.year_duration);

    var datasets = {
      backgroundColor: background_gradient(week_ctx),
      borderWidth: 4,
      borderColor: "#E3237D",
      data: Object.values(window.courseDurations.week_duration),
    }
    var options = {
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
            stepSize: window.courseDurations.duration_steps.week,
            beginAtZero: true
          },
          gridLines: {
            color: '#E6E6F0',
            drawBorder: false,
            zeroLineColor: '#E6E6F0'
          }
        }]
      }
    }

    //per week chart
    new Chart(week_ctx, {
      type: 'line',
      data: {
        labels: week_labels,
        datasets: [
          datasets
        ]
      },
      options: options
    })

    //per month chart
    new Chart(month_ctx, {
      type: 'line',
      data: {
        labels: month_labels,
        datasets: [
          {...datasets, backgroundColor: background_gradient(month_ctx), data: Object.values(window.courseDurations.month_duration)}
        ]
      },
      options: {...options, scales: {...options.scales, yAxes: [{...options.scales.yAxes, ticks: {...options.scales.yAxes[0].ticks, stepSize: window.courseDurations.duration_steps.month}}]}},
    })

    //per year chart
    new Chart(year_ctx, {
      type: 'line',
      data: {
        labels: year_labels,
        datasets: [
          {...datasets, backgroundColor: background_gradient(year_ctx), data: Object.values(window.courseDurations.year_duration)}
        ]
      },
      options: {...options, scales: {...options.scales, yAxes: [{...options.scales.yAxes, ticks: {...options.scales.yAxes[0].ticks, stepSize: window.courseDurations.duration_steps.year}}]}},
    })
  }
})