import { Component } from '@angular/core';

@Component({
  selector: 'app-demand-charts',
  templateUrl: './demand-charts.component.html',
  styleUrl: './demand-charts.component.css'
})
export class DemandChartsComponent {

   skillsetChartOptions = {
    animationEnabled: true,
    title: {
      text: "Demands by Primary Skillset"
    },
    axisY: {
      title: "Number of Demands"
    },
    data: [{
      type: "column",
      dataPoints: [
        { label: "Java", y: 40 },
        { label: "Python", y: 30 },
        { label: "Angular", y: 20 },
        { label: "React", y: 25 },
        { label: "DevOps", y: 15 }
      ]
    }]
  };

  competencyChartOptions = {
  animationEnabled: true,
  title: {
    text: "Demand Status by Competency"
  },
  axisY: {
    title: "No. of Demands"
  },
  toolTip: {
    shared: true
  },
  legend: {
    cursor: "pointer"
  },
  data: [
    {
      type: "stackedColumn",
      name: "Open",
      showInLegend: true,
      dataPoints: [
        { label: "Cloud", y: 10 },
        { label: "Analytics", y: 15 },
        { label: "Testing", y: 12 }
      ]
    },
    {
      type: "stackedColumn",
      name: "In Progress",
      showInLegend: true,
      dataPoints: [
        { label: "Cloud", y: 8 },
        { label: "Analytics", y: 10 },
        { label: "Testing", y: 6 }
      ]
    },
    {
      type: "stackedColumn",
      name: "Closed",
      showInLegend: true,
      dataPoints: [
        { label: "Cloud", y: 5 },
        { label: "Analytics", y: 4 },
        { label: "Testing", y: 8 }
      ]
    }
  ]
};

demandTrendChartOptions = {
  animationEnabled: true,
  title: {
    text: "Monthly Demand Trend"
  },
  axisX: {
    valueFormatString: "MMM"
  },
  axisY: {
    title: "Total Demands"
  },
  data: [{
    type: "line",
    dataPoints: [
      { x: new Date(2025, 0), y: 20 },
      { x: new Date(2025, 1), y: 35 },
      { x: new Date(2025, 2), y: 40 },
      { x: new Date(2025, 3), y: 28 },
      { x: new Date(2025, 4), y: 50 },
      { x: new Date(2025, 5), y: 45 }
    ]
  }]
};


  chartOptions = {
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: "Demand Status Overview"
    },
    data: [{
      type: "pie",
      dataPoints: [
        { y: 45, label: "Open" },
        { y: 25, label: "In Progress" },
        { y: 20, label: "Closed" },
        { y: 10, label: "On Hold" }
      ]
    }]
  };

}
