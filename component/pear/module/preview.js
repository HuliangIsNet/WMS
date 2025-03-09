layui.define(['jquery', "apis", "common", "echarts"], function (exports) {
    "use strict";

    /**
     * 常用封装类
     * */
    var MOD_NAME = 'preview',
        $ = layui.jquery,
        common = layui.common,
        apis = layui.apis;

    var preview = new function () {
        this.render = function () {
            this.messageRender();
            this.billRender();
            this.perationAnalysisRender();
            this.useConditionRender();
            this.outorinputEchartRender();
            this.storageSpaceEchartRender();
        };
        //中屏信息展示  
        this.messageRender = function () {

            //获取到头部信息
            common.get(function (res) {

                CreateMessageHtml(res, "message");
            }, apis.GetMessage);
        }
        //出入库显示
        this.billRender = function () {
            common.get(function (res) {
                CreateOut_InPutHtml(res.item1, "tr_input");
                CreateOut_InPutHtml(res.item2, "tr_output");
            }, apis.GetOut_InPutMessage);
        }
        //运营分析
        this.perationAnalysisRender = function () {
            common.get(function (res) {
                CraeteGaugeEchart("echart5", "登录次数", res.item1, '#ae3df6');
                CraeteGaugeEchart("echart6", "入库次数", res.item2, '#1db0d2');
                CraeteGaugeEchart("echart7", "出库次数", res.item3, '#1ea899');
                CraeteGaugeEchart("echart8", "盘点次数", res.item4, '#e6658f');
            }, apis.GetOperationDetails);
        }
        //使用状况
        this.useConditionRender = function () {
            common.get(function (res) {
                CreateUseMessage("echart1", res);
            }, apis.GetUseMessage);
        }
        //出入库图标
        this.outorinputEchartRender = function () {
            common.get(function (res) {
                CreateTrendEchart("echart2", res);
            }, apis.GetBillDataForChartByType);

            common.get(function (res) {
                CreateTrendEchart("echart3", res);
            }, apis.GetBillDataForChartByType, { type: 1 });
        }
        this.storageSpaceEchartRender = function () { 
            common.get(function (res) {
                CreateUseSpaceEchart("echart4", res);
            }, apis.GetUsedSpaceForChart);


        }

        function CreateMessageHtml(list_Message, id) {
            var html = "<ul>";
            $.each(list_Message, function (i, item) {
                var html_li = "<li><div>";
                html_li += "<span>" + item.item1 + "</span>"
                html_li += "<p>" + item.item2 + "</p>"
                html_li += "</div></li>";
                html += html_li;
            });
            html += "</ul>";
            $("#" + id).html(html);
        }

        function CreateOut_InPutHtml(list, id) {
            var html;

            $.each(list, function (i, item) {
                html += "<tr>";
                html += "<td>" + item.productName + "</td>";
                html += "<td>" + item.quantity + "</td>";
                html += "<td>" + item.containerName + "</td>";
                html += "<td>" + layui.util.toDateString(item.createTime, 'MM-dd HH:mm') + "</td>";
                html += "</tr>";
            });
            $("#" + id).html(html);
        }

        function CraeteGaugeEchart(chartName, name, value, color) {
            var myChart = echarts.init(document.getElementById(chartName));
            option = {
                title: {
                    subtext: name,
                    left: 'center',
                    bottom: 15,
                    subtextStyle: {
                        color: 'rgba(255,255,255,.6)',
                        fontSize: 15
                    }
                },

                series: [
                    {
                        name: '',
                        type: 'gauge',
                        radius: '90%',
                        startAngle: 200,
                        endAngle: -20,
                        detail: { formatter: '{value}' },
                        data: [{ value: value, name: '' }],
                        axisLine: {
                            lineStyle: {
                                width: 10,
                                color: [
                                    [
                                        0.8, new echarts.graphic.LinearGradient(//0.8值为颜色显示百分比80%
                                            0, 0, 1, 0, [{
                                                offset: 0,
                                                color: color
                                            },
                                            {
                                                offset: 1,
                                                color: '#44ceef'
                                            }
                                        ]
                                        )
                                    ],
                                    [
                                        1, '#1c4e85'
                                    ]
                                ]
                            }
                        },
                        pointer: {
                            show: false,         //不显示指针
                            length: "70%",
                            width: 3,
                        },
                        axisLabel: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        detail: {
                            offsetCenter: [0, 1],
                            color: '#fff',
                            fontSize: 16,
                        }
                    },


                ]

            }
            myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        }

        function CreateUseMessage(echartName, data) {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById(echartName));
            option = {

                color: ['#9DD060', '#35C96E', '#4DCEF8'],

                tooltip: {},

                radar: {
                    center: ['50%', '60%'],
                    // radius: ["25%", "70%"],

                    name: {
                        textStyle: {
                            color: '#72ACD1'
                        }
                    },

                    splitLine: {

                        lineStyle: {

                            color: 'rgba(255,255,255,.0',

                            width: 2

                        }

                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,0.2)',
                            width: 1,
                            type: 'dotted'

                        },

                    },
                    splitArea: {
                        areaStyle: {
                            color: ['rgba(255,255,255,.1)', 'rgba(255,255,255,0)']
                        }
                    },
                    indicator: GetIndicator(data.item1)
                },
                series: [{
                    name: '',
                    type: 'radar',
                    data: [{ value: data.item2 }]
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize();
            });

            CreateMessageHtml(data.item3, "ul_warn");
        }
        function GetIndicator(data) {
            var indicator = [];
            $.each(data, function (i, item) {
                indicator.push({ name: item.item1, max: item.item2 });
            });
            return indicator;

        }
        function CreateTrendEchart(echartName, data) {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById(echartName));
            option = {
                //  backgroundColor: '#00265f',
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: data.item1,
                    top: '5%',
                    textStyle: {
                        color: "#fff",
                        fontSize: '12',

                    },

                    itemGap: 35
                },
                grid: {
                    left: '0%',
                    top: '40px',
                    right: '0%',
                    bottom: '0',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: data.item2,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "rgba(255,255,255,.1)",
                            width: 1,
                            type: "solid"
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        interval: 0,
                        // rotate:50,
                        show: true,
                        splitNumber: 5,
                        textStyle: {
                            color: "rgba(255,255,255,.6)",
                            fontSize: '12',
                        },
                    },
                }],
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        //formatter: '{value} %'
                        show: true,
                        textStyle: {
                            color: "rgba(255,255,255,.6)",
                            fontSize: '12',
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "rgba(255,255,255,.1	)",
                            width: 1,
                            type: "solid"
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,.1)",
                        }
                    }
                }],
                series: CreateLineSeries(data.item3)
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        }

        function CreateLineSeries(data) {
            var series = [];
            $.each(data, function (i, item) {
                series.push({ type: 'line', name: item.item1, data: item.item2, smooth: true, barWidth: '15' });
            });
            return series;
        }

        function CreateUseSpaceEchart(echartName, res) {
            console.log(data);
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById(echartName));
            var data = res.item2;
            var titlename = res.item1;
            var valdata = res.item3;

            option = {

                grid: {
                    left: '10',
                    top: '20',
                    right: '30',
                    bottom: '-25',
                    containLabel: true
                },
                xAxis: {
                    show: false
                },
                yAxis: [{
                    show: true,
                    data: titlename,
                    inverse: true,
                    axisLine: {
                        show: false
                    },

                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: "rgba(255,255,255,.6)",
                        },
                        formatter: function (value, index) {
                            return [
                                '{title|' + value + '} '
                            ].join('\n')
                        },
                        rich: {}
                    },

                }, {
                    show: true,
                    inverse: true,
                    data: valdata,
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(255,255,255,.5)'
                        }
                    },
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },

                }],
                series: [{
                    name: '条',
                    type: 'bar',
                    yAxisIndex: 0,
                    data: data,
                    barWidth: '40%',
                    itemStyle: {
                        normal: {
                            barBorderRadius: 30,
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: '#248ff7'
                            }, {
                                offset: 1,
                                color: '#3893e5'
                            }]),
                        }
                    },
                    label: {
                        normal: {
                            show: false,
                        }
                    },
                }, {
                    name: '框',
                    type: 'bar',
                    yAxisIndex: 1,
                    barGap: '-100%',
                    data: res.item4,
                    barWidth: '40%',
                    itemStyle: {
                        normal: {
                            color: 'none',
                            borderColor: 'rgba(255,255,255,.1)',
                            borderWidth: 1,
                            barBorderRadius: 15,
                        }
                    }
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize();
            });

        }
    };

    exports(MOD_NAME, preview);
});