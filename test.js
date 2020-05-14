{
  type: "heatmap",
  coordinateSystem: "calendar",
  data: this.chartData.dataSet[y].data.map(d => [
    d[0],
    d[1] === " " ? "-" : d[1]
  ]),
  label: {
    show: form.dateShow,
    formatter: function(params) {
      var d = echarts.number.parseDate(params.value[0]);
      return d.getDate();
    },
    textStyle: {
      color: "#000"
    }
  },
  itemStyle: {
    color: "#D1EEEE"
  },
  tooltip: {
    formatter(p) {
      let [t, v] = p.value;
      return `${t}<br />${v} ${form.dataUnit}`;
    }
  }
}