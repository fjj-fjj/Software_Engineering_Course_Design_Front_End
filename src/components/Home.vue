<template>
    <div class="index-region">
        <div class="img-region">
            <img data-src="/assets/logo.png" height="50px" width="400px" class="home-img">
            <el-button class="enterLogin" size="large" style="width:100px;height: 40px;"
                @click="onLogOut">退出登录</el-button>
            <el-button class="enterManage" size="large" style="width:100px;height: 40px;"
                @click="enterManage">进入管理页</el-button>
        </div>
        <div class="input-search">
            <el-input v-model="msg" class="el_search" @blur="onBlur()"></el-input>
        </div>
        <div class="select-area">
            <el-select v-model="initialLetter" placeholder="请选择品牌" :multiple="false">
                <el-option v-for="item in brandList" :label="item" :value="item"
                    @click="selectGoodsByTags()"></el-option>
            </el-select>
            <el-select v-model="sortMethod" placeholder="请选择排序方式" :multiple="false">
                <el-option v-for="item in sortMethodList" :label="item.label" :value="item.value"
                    @click="selectGoodsByTags()"></el-option>
            </el-select>
            <span style="margin-left:2%;">爬虫时间：{{ crawlTime }}</span>
        </div>
        <div class="container">
            <div class="goods-list">
                <div class="goods-item" v-for="item in goodsList">
                    <el-card>
                        <router-link :to="{ name: 'ProductItem', params: { id: item.phone_id } }">
                            <el-image :src="item.phone_picture" fit="contain" style="width:150px;height:150px;" lazy />
                            <h1 class="title">{{ item.phone_title }}</h1>
                            <p class="info">
                                <span class="price">￥{{ parseFloat(item.phone_price).toFixed(2) }}</span>
                            </p>
                            <p class="info">
                                <span class="comment-count">评论数:{{ item.comment_count }}</span>
                            </p>
                            <p class="info">
                                <span class="good-count">好评数:{{ item.good_count }}</span>
                            </p>
                            <p class="info">
                                <span class="sentiment_score">情感得分:{{ item.sentiment_score }}</span>
                            </p>
                        </router-link>
                    </el-card>
                </div>
            </div>
        </div>
        <div class="footer">
            <el-pagination v-model:current-page="page" background layout="prev, pager, next" :total="total"
                :page-size="pagesize" @current-change="handleCurrentChange" style="margin-bottom: 50px;"
                class="pagination" />
        </div>
        <img data-src="/assets/cloud404.png" height="200px" class="home-img">
    </div>
</template>
<script setup>
import notification from '../utils/notification';
import { ref, onMounted, reactive, onBeforeMount, onUpdated, onBeforeUpdate } from 'vue'
import { getAllGoodsDetail, getGoodsDetailByQuary, logout, getCrawlTimeAndAllPhones } from '../api'
import router from '../router';
import { useRoute } from 'vue-router'
import useUser from '../store';
import useHome from '../store/home.js'
import { useIntersectionObserver } from '@vueuse/core';
const msg = ref('')
const phone_list = ref([])
const route = useRoute()
const initialLetter = ref('全部')
const year = ref()
const sortMethod = ref('goods_price_desc')
const page = ref(1)
const pagesize = ref(10)
const total = ref(0)
const goodsList = ref([])
const brandList = ref(['全部', '华为', 'APPLE', '小米', 'VIVO', 'OPPO', '三星'])
const crawlTime = ref()
const { removeUsername } = useUser()
const { homePage, homeSortMethod, homeInitialLetter, homeMsg,
    updateHomeMsg, updateHomePage, updateHomeSortMethod, updateHomeInitialLetter, removeHome } = useHome()
const sortMethodList = reactive([
    {
        label: '按价格降序排序',
        value: 'goods_price_desc'
    },
    {
        label: '按价格升序排列',
        value: 'goods_price_asc'
    },
    {
        label: '按好评数量排序',
        value: 'good_count'
    },
    {
        label: '按情感得分排序',
        value: 'sentiment_score'
    },
    {
        label: '按评论数量排序',
        value: 'comment_count'
    }
])
const brand = ref()
function lazyLoadWithObserver() {
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let image = entry.target
                let src = image.getAttribute('data-src')
                if (src) {
                    console.log(src)
                    image.src = src
                    image.removeAttribute('data-src')
                    observer.unobserve(image)
                }
            }
        })
    })
    document.querySelectorAll('.home-img').forEach(img => {
        observer.observe(img)
    })
}
onMounted(() => {
    FetchCrawlTime()
    msg.value = homeMsg
    sortMethod.value = homeSortMethod
    initialLetter.value = homeInitialLetter
    page.value = homePage
    loadHomeData()
})
onBeforeUpdate(()=>{
    lazyLoadWithObserver()
})
const FetchCrawlTime = async () => {
    const data = await getCrawlTimeAndAllPhones()
    console.log(data)
    crawlTime.value = data.crawl_time
}
const loadHomeData = async () => {
    if (msg.value !== '') {
        const params = {
            query: msg.value,
            order: sortMethod.value,
            pageNum: page.value
        }
        const data = await getGoodsDetailByQuary(params)
        total.value = data.pages
        goodsList.value = data.rows
    }
    else {
        if (initialLetter.value !== '全部') {
            const params = {
                brand: initialLetter.value,
                order: sortMethod.value,
                pageNum: page.value
            }
            const data = await getAllGoodsDetail(params)
            total.value = data.pages
            goodsList.value = data.rows
        }
        else {
            const params = {
                order: sortMethod.value,
                pageNum: page.value
            }
            const data = await getCrawlTimeAndAllPhones(params)
            total.value = data.pages
            goodsList.value = data.rows
        }
    }
}
const selectGoodsByTags = async () => {
    updateHomeSortMethod(sortMethod.value)
    updateHomeInitialLetter(initialLetter.value)
    loadHomeData()
}
const enterManage = () => {
    router.push({ name: 'Manage' })
}
const onBlur = async () => {
    updateHomeMsg(msg.value)
    loadHomeData()
}
const handleCurrentChange = value => {
    updateHomePage(page.value)
    page.value = value
    loadHomeData()
}
const onLogOut = async () => {
    const data = await logout()
    if (data.code == 0) {
        removeUsername()
        removeHome()
        router.push({ name: 'Login' })
        notification({
            message: '退出成功',
            type: 'success'
        })
    }
}
</script>
<style lang="less">
.index-region {
    text-align: center;
    overflow-y: scroll;
    height: 100vh;
    max-width: 100vw;

    .img-region {

        img {
            margin-top: 3%;
        }

        .enterLogin {
            display: inline-block;
            position: relative;
            right: -24%;
            top: 8%;
        }

        .enterManage {
            display: inline-block;
            position: relative;
            right: -25%;
            top: 8%;
            padding-left: 10px;
            padding-right: 10px;
        }
    }
}

.input-search {
    margin-top: 4%;
    margin-left: -10%;
    display: flex;
    justify-content: center;

    .el_search {
        width: 50%;
        border-style: solid;
        border-radius: 5px;
    }
}

.select-area {
    margin-top: 5%;
    margin-left: 2%;
    display: flex;
    flex-direction: row;
    justify-content: center;

    .el-select {
        margin-left: 2%;
    }
}

.goods-list {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    padding-left: 10px;
    gap: 10px;
    clear: both;
    margin-top: 2%;

    .goods-item {
        width: 250px;
        height: 400px;
        margin-top: 5%;

        .el-card {
            //flex-basis: calc(calc(100%/4)-1px);
            margin: 10px 10px 20px 0;
            padding: 10px 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            clear: both;

            .title {
                text-align: left;
                font-size: 14px;
                color: #333;
                margin: 10px 0 0;
                padding: 0 5px;
            }

            .info {
                display: flex;
                justify-content: space-between;
                margin-bottom: 0;
                padding: 0 5px;

                .price {
                    color: red;
                    font-weight: bold;
                    font-size: 12px;
                }

                .comment-count,
                .good-count,
                .sentiment_score {
                    color: #333;
                    font-size: 12px;
                }

            }
        }
    }
}

.footer {
    .el-pagination {
        justify-content: center;
        margin-top: 8%;
    }
}
</style>