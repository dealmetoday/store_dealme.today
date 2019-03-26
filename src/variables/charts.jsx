var Chartist = require("chartist");

const chartAnimation = {
  draw: function(data) {
    if (data.type === "line" || data.type === "area") {
      data.element.animate({
        d: {
          begin: 600,
          dur: 700,
          from: data.path
            .clone()
            .scale(1, 0)
            .translate(0, data.chartRect.height())
            .stringify(),
          to: data.path.clone().stringify(),
          easing: Chartist.Svg.Easing.easeOutQuint
        }
      });
    } else if (data.type === "point") {
      data.element.animate({
        opacity: {
          begin: (data.index + 1) * 80,
          dur: 500,
          from: 0,
          to: 1,
          easing: "ease"
        }
      });
    }
  }
};

const chartOptions = function(maxval){
  return {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0
    }),
    low: 0,
    high: maxval * 1.1,
    chartPadding: {
      top: 5,
      right: 5,
      bottom: 5,
      left: 5
    }
  }
};

module.exports = {
  chartAnimation,
  chartOptions,
};
