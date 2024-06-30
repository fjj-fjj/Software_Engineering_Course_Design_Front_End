<template>
    <div class="region">
        <div class="header">
            <el-input v-model="phone1_id" clearable style="flex:0 1 30%;" placeholder="请输入需要比较的手机1的id"
                @blur="onBlur1()" />
            <el-input v-model="phone2_id" clearable style="flex:0 1 30%;" placeholder="请输入需要比较的手机2的id"
                @blur="onBlur2()" />
        </div>
        <div class="container">
            <div id="comparePrice"></div>
            <div id="compareCommentCount"></div>
            <div id="compareCommentPercent"></div>
            <div id="compareSentimentScore"></div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref, toRaw, reactive, onBeforeMount } from 'vue'
import * as echarts from 'echarts'
import { getPhoneComments } from '../api';
const phone1_id = ref('')
const phone2_id = ref('')
const phone1Info = ref({
    price: 0,
    commentCount: 0,
    goodCommentPercent: 0,
    generalCommentPercent: 0,
    badCommentPercent: 0,
    sentimentScore: 0
})
const phone2Info = ref({
    price: 0,
    commentCount: 0,
    goodCommentPercent: 0,
    generalCommentPercent: 0,
    badCommentPercent: 0,
    sentimentScore: 0
})
onMounted(() => {
    initChart()
})
const onBlur1 = async () => {
    phone1_id.value = parseInt(phone1_id.value)
    if (phone1_id.value) {
        let data1 = await getPhoneComments({
            phone_id: phone1_id.value
        })
        console.log(data1)
        if (data1)
            data1 = data1.phone
        if (data1) {
            phone1Info.value.price = data1.phone_price
            phone1Info.value.commentCount = data1.comment_count
            phone1Info.value.goodCommentPercent = parseFloat(data1.good_count) / (data1.good_count + data1.general_count + data1.poor_count)
            phone1Info.value.generalCommentPercent = parseFloat(data1.general_count) / (data1.good_count + data1.general_count + data1.poor_count)
            phone1Info.value.badCommentPercent = parseFloat(data1.poor_count) / (data1.good_count + data1.general_count + data1.poor_count)
            phone1Info.value.sentimentScore = data1.sentiment_score
        }
    }
    else {
        phone1Info.value.price = 0
        phone1Info.value.commentCount = 0
        phone1Info.value.goodCommentPercent = 0
        phone1Info.value.generalCommentPercent = 0
        phone1Info.value.badCommentPercent = 0
        phone1Info.value.sentimentScore = 0
        phone1_id.value = null
    }
    initChart()
}
const onBlur2 = async () => {
    phone2_id.value = parseInt(phone2_id.value)
    if (phone2_id.value) {
        let data2 = await getPhoneComments({
            phone_id: phone2_id.value
        })
        if (data2)
            data2 = data2.phone
        console.log(data2)
        if (data2) {
            phone2Info.value.price = data2.phone_price
            phone2Info.value.commentCount = data2.comment_count
            phone2Info.value.goodCommentPercent = parseFloat(data2.good_count) / (data2.good_count + data2.general_count + data2.poor_count)
            phone2Info.value.generalCommentPercent = parseFloat(data2.general_count) / (data2.good_count + data2.general_count + data2.poor_count)
            phone2Info.value.badCommentPercent = parseFloat(data2.poor_count) / (data2.good_count + data2.general_count + data2.poor_count)
            phone2Info.value.sentimentScore = data2.sentiment_score
        }
    }
    else {
        phone2Info.value.price = 0
        phone2Info.value.commentCount = 0
        phone2Info.value.goodCommentPercent = 0
        phone2Info.value.generalCommentPercent = 0
        phone2Info.value.badCommentPercent = 0
        phone2Info.value.sentimentScore = 0
        phone2_id.value = null
    }
    initChart()
}
const initChart = () => {
    if (echarts.getInstanceByDom(document.getElementById('comparePrice'))) {
        echarts.dispose(document.getElementById('comparePrice'))
    }
    if (echarts.getInstanceByDom(document.getElementById('compareCommentCount'))) {
        echarts.dispose(document.getElementById('compareCommentCount'))
    }
    if (echarts.getInstanceByDom(document.getElementById('compareCommentPercent'))) {
        echarts.dispose(document.getElementById('compareCommentPercent'))
    }
    if (echarts.getInstanceByDom(document.getElementById('compareSentimentScore'))) {
        echarts.dispose(document.getElementById('compareSentimentScore'))
    }
    const mychart1 = echarts.init(document.getElementById('comparePrice'))
    const mychart2 = echarts.init(document.getElementById('compareCommentCount'))
    const mychart3 = echarts.init(document.getElementById('compareCommentPercent'))
    const mychart4 = echarts.init(document.getElementById('compareSentimentScore'))
    let price1 = []
    let price2 = []
    price1.push(phone1Info.value.price)
    price2.push(phone2Info.value.price)
    let commentCount1 = []
    let commentCount2 = []
    commentCount1.push(phone1Info.value.commentCount)
    commentCount2.push(phone2Info.value.commentCount)
    let commentPercent1 = []
    let commentPercent2 = []
    commentPercent1.push(phone1Info.value.goodCommentPercent, phone1Info.value.generalCommentPercent, phone1Info.value.badCommentPercent)
    commentPercent2.push(phone2Info.value.goodCommentPercent, phone2Info.value.generalCommentPercent, phone2Info.value.badCommentPercent)
    let sentimentScore1 = []
    let sentimentScore2 = []
    sentimentScore1.push(phone1Info.value.sentimentScore)
    sentimentScore2.push(phone2Info.value.sentimentScore)
    mychart1.setOption({
        title: {
            text: 'Compare Two Phones'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {},
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ['价格']
        },
        series: [
            {
                name: '手机型号1',
                type: 'bar',
                data: price1,
                itemStyle: {
                    color: "rgba(253, 2, 2, 1)"
                }
            },
            {
                name: '手机型号2',
                type: 'bar',
                data: price2,
                itemStyle: {
                    color: "rgba(2, 61, 253, 1)"
                }
            }
        ]
    })
    mychart2.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '0.2%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ['评论数量']
        },
        series: [
            {
                name: '手机型号1',
                type: 'bar',
                data: commentCount1,
                itemStyle: {
                    color: "rgba(253, 2, 2, 1)"
                }
            },
            {
                name: '手机型号2',
                type: 'bar',
                data: commentCount2,
                itemStyle: {
                    color: "rgba(2, 61, 253, 1)"
                }
            }
        ]
    })
    mychart3.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '0.2%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ['好评比例', '中评比例', '差评比例']
        },
        series: [
            {
                name: '手机型号1',
                type: 'bar',
                data: commentPercent1,
                itemStyle: {
                    color: "rgba(253, 2, 2, 1)"
                }
            },
            {
                name: '手机型号2',
                type: 'bar',
                data: commentPercent2,
                itemStyle: {
                    color: "rgba(2, 61, 253, 1)"
                }
            }
        ]
    })
    mychart4.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '0.2%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ['情感得分']
        },
        series: [
            {
                name: '手机型号1',
                type: 'bar',
                data: sentimentScore1,
                itemStyle: {
                    color: "rgba(253, 2, 2, 1)"
                }
            },
            {
                name: '手机型号2',
                type: 'bar',
                data: sentimentScore2,
                itemStyle: {
                    color: "rgba(2, 61, 253, 1)"
                }
            }
        ]
    })
    window.onresize = () => {
        mychart1.resize()
        mychart2.resize()
        mychart3.resize()
        mychart4.resize()
    }
}
</script>
<style lang="less" scoped>
.region {
    .header {
        display: flex;
        flex-direction: row;
        gap: 20px;
    }

    .container {
        //display: flex;
        //flex-direction: row;
        margin-top: 20px;
        width: 100%;
        //gap: 5%;

        #comparePrice {
            width: 100%;
            height: 150px;
        }

        #compareCommentCount {
            margin-top: -50px;
            width: 100%;
            height: 150px;
        }

        #compareCommentPercent {
            margin-top: -50px;
            width: 100%;
            height: 300px;
        }

        #compareSentimentScore {
            margin-top: -50px;
            width: 100%;
            height: 150px;
            margin-bottom: 20px;
        }
    }
}
</style>