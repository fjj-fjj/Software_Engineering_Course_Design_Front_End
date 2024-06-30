<template>
    <!--<div class="circle"></div>-->
    <!--<div class="outer">
        <div class="left">
        </div>
        <div class="right">
        </div>
    </div>-->
    <!--<div class="header">这里是头部</div>
    <div class="container">
        <div class="left">左边</div>
        <div class="right">右边</div>
        <div class="middle">中间部分</div>
    </div>
    <div class="footer">这里是底部</div>-->
    <!--<div class="container">
        <div class="center">
            <div class="inner">
                双飞翼布局
            </div>
        </div>
        <div class="left"></div>
        <div class="right"></div>
    </div>-->
    <!--<div class="par">
        <div class="child"></div>
    </div>-->
    <!--<div class="border"></div>-->
    <!--<p>
        这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本
        这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本
        这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本
        这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本
        这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本
        这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本
        这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本
        这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本
    </p>-->
    <!-- <el-image :src="url"/> -->
    <canvas id="cavsElem" width="400" height="300">
        您的浏览器不支持Canvas
    </canvas>
</template>
<script setup>
/* import {getAllGoods,getPhoneInfo,getAllGoodsDetail} from '../api'
import {ref,onMounted,onBeforeMount} from 'vue'  */
var canvas = document.getElementById('cavsElem')
var context = document.getContext('2d')
/* function format(num){
    if(!num||typeof(num)!=='number')
    {
        return
    }

} */
/* let data = ref()
let url = ref('')
onBeforeMount(()=>{
    loadData()
    //console.log(data.value.phone_url)
})
const loadData = async ()=>{
    //data = await getAllGoods({phone_id:1})
    data.value = await getAllGoodsDetail({brand:'三星'})
    data.value = data.value.rows[0]
    url.value = data.value.phone_url
} */
</script>
<style lang="less" scoped>

/*p{
    width:100%;
    border-radius: 1px solid red;
    background-color: red;
    -webkit-line-clamp:2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow:hidden;
}*/

/*.border{
    width:0;
    height: 0;
    border-style: solid;
    border-color: red transparent transparent; 
    border-width: 80px;
}*/
/*.border{
    width:0;
    height: 0;
    border-top: blue solid;
    border-right: transparent solid;
    border-width: 80px;
}*/
/*.border{
    width:0;
    height: 0;
    border-style:solid;
    border-width: 50px;
    border-color:red blue yellow;
    position: relative;
    //border-color: red blue green yellow;
}
.border::after{
    content: '';
    border-style: solid;
    border-width: 0 40px 40px;
    border-color: transparent transparent #96ceb4;
    position: absolute;
    top:0;
    left:0;
}*/
/*.par{
    position: relative;
    width:100%;
    height: 400px;
    background-color: red;
    .child{
        position: absolute;
        top:50%;
        left:50%;
        margin-left:-50px;
        margin-top:-50px;
        width:100px;
        height: 100px;
        background-color: blue;
    }
}*/
/*.container {
    min-width: 600px;
}

.left {
    float: left;
    width: 200px;
    height: 400px;
    background-color: red;
    margin-left: -100%;
}

.center {
    float: left;
    width: 100%;
    height: 500px;
    background-color: yellow;
}
.center .inner{
    margin:0 200px;
}
.right {
    float: left;
    width: 200px;
    height: 400px;
    background-color: blue;
    margin-left: -200px;
}*/

/*.header,.footer{
    height: 40px;
    width: 100%;
    background-color: red;
}
.container{
    min-height: 1.2em;
    position: relative;
}
.container>div{
    position: absolute;
}
.middle{
    left:200px;
    right:250px;
    background-color: yellow;
}
.left{
    left:0;
    width:200px;
    background-color: pink;
}
.right{
    right:0;
    width:250px;
    background-color: aqua;
}*/
/*.header,.footer{
    height: 40px;
    width: 100%;
    background-color: red;
}
.container{
    overflow: hidden;
}
.middle{
    background-color: yellow;
}
.left{
    float:left;
    width: 200px;
    background-color: pink;
}
.right{
    float: right;
    width: 250px;
    background-color: aqua;
}*/
/*.header,.footer{
    height: 40px;
    width: 100%;
    background-color: red;
}
.container{
    display: flex;
}
.middle{
    flex-grow: 1;
    background: yellow;
}
.left{
    width:200px;
    background-color: pink;
}
.right{
    width: 300px;
    background-color: aqua;
}*/
/*.circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 5px solid red;
}*/
/*.two-line{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp: 2;
}*/
/*.outer {
    height: 100px;
    position: relative;
    //display: flex;
    //flex-direction: row;
    //background-color: red;
    .left {
        //float: left;
        position: absolute;
        width: 200px;
        height: 100px;
        background-color: tomato;
    }
    .right{
        //margin-left: 200px;
        //overflow: hidden;
        //width:auto;
        //flex-grow: 1;
        margin-left: 200px;
        height: 200px;
        background-color: gold;
    }
}*/
/*.header,
.footer {
    height: 100px;
    width: 100%;
    background-color: red;
}
.footer{
    clear: both;
}
.container {
    padding-left: 200px;
    padding-right: 250px;
    div{
        position: relative;
        float: left;
    }
    .middle {
        width: 100%;
        background-color: yellow;
    }
    .left{
        width:200px;
        background-color: pink;
        margin-left: -100%;
        left:-200px;
    }
    .right{
        width:250px;
        background-color: aqua;
        margin-left:-250px;
        left:250px;
    }
    .left {
        width: 200px;
        background-color: pink;
        margin-left: -100%;
        left: -200px;
    }

    .right {
        width: 250px;
        background-color: aqua;
        margin-left: -250px;
        left:250px;
    }
}*/
</style>