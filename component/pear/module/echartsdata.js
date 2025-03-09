layui.define(['jquery', 'layer', 'echarts'], function (exports) {
    "use strict";
    let $ = layui.jquery,
        layer = layui.layer,
        echarts = layui.echarts;
    var MOD_NAME = 'echartsdata';
    var option = {
        legend: {},
        tooltip: {},
        dataset: {
            // 提供一份数据。
            source: []
        },
        // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
        xAxis: { type: 'category' },
        // 声明一个 Y 轴，数值轴。
        yAxis: {},
        // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
        series: []
    };
    var echartsdata = new function () {
        this.setOption = function (echartsRecords, source) {
            var series = CreateSeries(source[0].length-1);
            var myOption = { dataset: { source: source }, series: series };
            option = $.extend(option, myOption);
            echartsRecords.setOption(option);
        }
    }

    function CreateSeries(sourcelength) {
        var series = [];
        for (var i = 0; i < sourcelength; i++) {
            series.push({ type: 'bar' });
        }
        return series;
    }

    exports(MOD_NAME, echartsdata);
});