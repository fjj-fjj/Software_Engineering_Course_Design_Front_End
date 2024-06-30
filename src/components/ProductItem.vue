<template>
    <el-card class="region">
        <div v-if="visible">
            <div class="image">
                <el-image :src="phoneData.phone_picture" lazy/>
            </div>
            <div class="button">
                <el-button @click="onClickCollect" v-if="isCollected == false">收藏</el-button>
                <el-button @click="onClickCollect" v-else>取消收藏</el-button>
                <el-button @click="backToIndex">返回主页</el-button>
            </div>
            <div class="info">
                <h1 class="title">{{ phoneData.phone_title }}</h1>
                <p>
                    <span class="price" style="text-align: center;">价格:&nbsp;&nbsp;￥{{ parseFloat(phoneData.phone_price).toFixed(2)
                        }}</span>
                </p>
                <p>
                    <span class="comment-count">评论数:&nbsp;&nbsp;{{ phoneData.comment_count }}</span>
                </p>
                <p>
                    <span class="good-count">好评数:&nbsp;&nbsp;{{ phoneData.good_count }}</span>
                </p>
                <p>
                    <span class="sentiment_score">情感得分:&nbsp;&nbsp;{{ phoneData.sentiment_score }}</span>
                </p>
                <p>
                    <span>手机id号:&nbsp;&nbsp;{{ phoneData.phone_id }}</span>
                </p>
            </div>
            <div class="comment_border">
                <span class="line"></span>
                <span class="txt">用户评论</span>
                <span class="line"></span>
            </div>
            <div>
                <el-select v-model="selectTable" @change="handleSelectChange" style="margin-top: 5%;">
                    <el-option v-for="item in options" :key="item.key" :label="item.label"
                        :value="item.value"></el-option>
                </el-select>
            </div>
            <div class="comment_info">
                <el-table :data="comments" style="width: 100%">
                    <el-table-column prop="comment_id" label="评论编号" width="180" />
                    <el-table-column prop="content" label="评论内容" width="180" />
                    <el-table-column prop="creation_time" label="评论时间" />
                </el-table>
            </div>
            <div class="footer">
                <el-pagination v-model:current-page="page" background layout="prev, pager, next" :total="total"
                    :page-size="pagesize" @current-change="handleCurrentChange" style="margin-bottom: 50px;"
                    class="pagination" />
            </div>
            <div class="comment_border">
                <span class="line"></span>
                <span class="txt">词云图片</span>
                <span class="line"></span>
            </div>
            <div class="wordle-space">
                <el-image :src="phoneData.wordle" lazy/>
            </div>
        </div>
    </el-card>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getPhoneInfo, getPhoneComments, collectGoods, deleteCollectGoods } from '../api'
import router from '../router';
const route = useRoute()
const phoneData = ref()
const visible = ref(false)
const isCollected = ref(false)
const page = ref(1)
const pagesize = ref(10)
const total = ref(0)
const commentsData = ref()
const comments = ref()
const selectTable = ref(1)
onMounted(() => {
    loadGoodsDetail()
})
const options = [
    {
        label: '全部',
        value: 1
    },
    {
        label: '好评',
        value: 2
    },
    {
        label: '中评',
        value: 3
    },
    {
        label: '差评',
        value: 4
    }
]
const loadGoodsDetail = async () => {
    console.log(route.params.id)
    commentsData.value = await getPhoneComments({ phone_id: route.params.id })
    phoneData.value = commentsData.value.phone
    comments.value = commentsData.value.rows
    total.value = commentsData.value.pages
    isCollected.value = commentsData.value.collection
    phoneData.value.wordle = "/"+phoneData.value.wordle
    visible.value = true
    console.log(phoneData.value)
    console.log(commentsData.value)
}
const backToIndex = ()=>{
    router.go(-1)
}
const onClickCollect = async () => {
    isCollected.value = !isCollected.value
    console.log(isCollected.value)
    if(isCollected.value)
    {
        //收藏
        const res = await collectGoods({phone_id: route.params.id})
        console.log(777)
        console.log(res)
        console.log(888)
    }
    else
    {
        //取消收藏
        const res = await deleteCollectGoods({phone_id: route.params.id})
        console.log(777)
        console.log(res)
        console.log(888)
    }
}
const handleSelectChange = async value => {
    page.value = 1
    if (value == 1) 
    {
        commentsData.value = await getPhoneComments({ phone_id: route.params.id, comment:'all', pageNum: page.value })
        comments.value = commentsData.value.rows
        total.value = commentsData.value.pages
    }
    else if (value == 2) 
    {
        commentsData.value = await getPhoneComments({ phone_id: route.params.id, comment:'good', pageNum: page.value })
        comments.value = commentsData.value.rows
        total.value = commentsData.value.pages
    }
    else if (value == 3) 
    {
        commentsData.value = await getPhoneComments({ phone_id: route.params.id, comment:'general', pageNum: page.value })
        comments.value = commentsData.value.rows
        total.value = commentsData.value.pages
    }
    else if(value == 4)
    {
        commentsData.value = await getPhoneComments({ phone_id: route.params.id, comment:'poor', pageNum: page.value })
        comments.value = commentsData.value.rows
        total.value = commentsData.value.pages
    }
}
const handleCurrentChange = async value => {
    page.value = value
    if (selectTable.value == 1) 
    {
        commentsData.value = await getPhoneComments({ phone_id: route.params.id, comment:'all', pageNum: page.value })
        comments.value = commentsData.value.rows
    }
    else if (selectTable.value == 2) 
    {
        commentsData.value = await getPhoneComments({ phone_id: route.params.id, comment:'good', pageNum: page.value })
        comments.value = commentsData.value.rows
    }
    else if (selectTable.value == 3) 
    {
        commentsData.value = await getPhoneComments({ phone_id: route.params.id, comment:'general', pageNum: page.value })
        comments.value = commentsData.value.rows
    }
    else if(selectTable.value == 4)
    {
        commentsData.value = await getPhoneComments({ phone_id: route.params.id, comment:'poor', pageNum: page.value })
        comments.value = commentsData.value.rows
    }
}
</script>
<style scoped="less">
.region {
    height: 100vh;
    overflow-y: scroll;
    width: 50%;
    margin: 0 auto;

    .image {
        text-align: center;
    }

    .button {
        .el-button {
            width: 40%;
        }
    }

    .info {
        .title {
            font-size: 30px;
            text-align: center;
        }

        p {
            text-align: center;
        }
    }

    .comment_border {
        text-align: center;

        .line {
            display: inline-block;
            border: 1px solid #333;
            width: 40%;
        }

        .txt {
            font-size: 20px;
        }
    }

    .footer {
        .el-pagination {
            justify-content: center;
            margin-top: 20px;
        }
    }
    .wordle-space{
        margin-top:5%;
        width:100%;
    }
}
</style>