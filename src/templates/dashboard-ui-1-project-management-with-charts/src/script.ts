import $ from 'jquery';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import 'selectric';

class Selectize {
  constructor() {
    this.init();
  }
  
  init() {
    var initValue: string;
    $('.action-box').each(function() {
      $(this).on('change', function() {
        if ($(this).val() !== initValue) {
          $(this).parents('form').submit();
        }
      });
    });
  }
}

class Charts {
  colors: string[];
  tickColor: string;
  
  constructor() {
    this.colors = ["#DB66AE", "#8185D6", "#89D9DF", "#E08886"];
    this.tickColor = "#757681";

    this.initRadar();
    this.initBarHorizontal();
    this.initDoughnut();
  }
  
  initRadar(): void {
    const ctxD = $('#radarChartDark')[0] as HTMLCanvasElement;
    if (!ctxD) return;

    const chartData: ChartConfiguration = {
      type: 'radar',
      data: {
        labels: ["Education", "Food", "Transport", "Drinks", "Other"],
        datasets: [
          {
            label: "2014",
            backgroundColor: this.convertHex(this.colors[0], 20),
            borderColor: this.colors[0],
            borderWidth: 1,
            pointRadius: 2,
            data: [51, 67, 90, 31, 16],
          },
          {
            label: "2015",
            backgroundColor: this.convertHex(this.colors[1], 20),
            borderColor: this.colors[1],
            borderWidth: 1,
            pointRadius: 2,
            data: [75, 44, 19, 22, 43],
          },
          {
            label: "2015",
            backgroundColor: this.convertHex(this.colors[2], 20),
            borderColor: this.colors[2],
            borderWidth: 1,
            pointRadius: 2,
            data: [7, 14, 29, 82, 33]
          }
        ]
      },
      options: {
        scales: {
          r: {
            pointLabels: {
              color: this.tickColor
            },
            ticks: {
              display: false,
              stepSize: 25
            }
          }
        },
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              boxWidth: 11,
              color: this.tickColor,
              font: {
                size: 11
              }
            }
          }
        }
      }
    };
    
    new Chart(ctxD, chartData);
  }

  initBarHorizontal(): void {
    const ctxD = $("#barChartHDark")[0] as HTMLCanvasElement;
    if (!ctxD) return;

    const chartData: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
          data: [27, 59, 68, 26, 79, 55, 36, 43, 44, 30, 55, 64],
          backgroundColor: this.colors[0],
          hoverBackgroundColor: this.convertHex(this.colors[0], 70)
        },
        {
          data: [136, 23, 44, 30, 79, 55, 61, 94, 27, 59, 98, 91],
          backgroundColor: this.colors[1],
          hoverBackgroundColor: this.convertHex(this.colors[1], 70)
        },
        {
          data: [88, 31, 87, 61, 77, 27, 59, 58, 136, 26, 79, 85],
          backgroundColor: this.colors[2],
          hoverBackgroundColor: this.convertHex(this.colors[2], 70)
        }]
      },
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            stacked: true,
            ticks: {
              color: this.tickColor,
            },
            grid: {
              display: false
            }
          },
          y: {
            stacked: true,
            ticks: {
              color: this.tickColor,
              stepSize: 25
            },
            suggestedMax: 175
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    };
    
    new Chart(ctxD, chartData);
  }
  
  initDoughnut(): void {
    const ctxD = $('#doughnutChartDark')[0] as HTMLCanvasElement;
    if (!ctxD) return;

    const chartData: ChartConfiguration = {
      type: 'doughnut',
      data: {
        labels: ["Brasil", "India", "China"],
        datasets: [{
          data: [300, 50, 100],
          borderWidth: 0,
          backgroundColor: [
            this.convertHex(this.colors[0], 60),
            this.convertHex(this.colors[1], 60),
            this.convertHex(this.colors[2], 60),
          ],
          hoverBackgroundColor: [
            this.colors[0],
            this.colors[1],
            this.colors[2],
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              boxWidth: 11,
              color: this.tickColor,
              font: {
                size: 11
              }
            }
          }
        }
      }
    };
    
    new Chart(ctxD, chartData);
  }
  
  convertHex(hex: string, opacity: number): string {
    hex = hex.replace('#','');
    const r = parseInt(hex.substring(0,2), 16);
    const g = parseInt(hex.substring(2,4), 16);
    const b = parseInt(hex.substring(4,6), 16);
    
    return `rgba(${r},${g},${b},${opacity/100})`;
  }
}

new Selectize();
new Charts();