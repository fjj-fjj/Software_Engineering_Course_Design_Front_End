<template>
    <div class="region">
        <el-table :data="goodsList" style="width:100%;margin-bottom:20px;" row-key="id" border default-expand-all
            scrollbar-always-on="false">
            <el-table-column prop="phone_id" label="手机编号" min-width="5%" />
            <el-table-column prop="phone_title" label="手机名称" min-width="10%" />
            <el-table-column prop="phone_price" label="手机价格" min-width="5%" />
            <el-table-column prop="phone_picture" label="手机图片" min-width="10%">
                <template #default="{ row }">
                    <el-image v-if="row.phone_picture !== ''" :src="row.phone_picture" fit="contain" style="display:flex;align-items: center;
                    height: 60px;" lazy/>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" min-width="5%">
                <template #default="{ row }">
                    <el-button type="danger" @click="delRow(row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="page" background layout="prev,pager,next" :total="total"
            :page-size="pagesize" @current-change="handleCurrentChange" style="margin-bottom: 50px;" />
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getCollectTableItems, deleteCollectGoods } from '../api'
const goodsList = ref([])
const page = ref(1)
const pagesize = ref(10)
const total = ref(0)
onMounted(() => {
    loadList()
})
const loadList = async ()=>{
    const params = {
        pageNum:page.value
    }
    const data = await getCollectTableItems(params)
    goodsList.value = data.data.rows
    total.value = data.data.pages
    console.log(data.data)
}
const delRow = async row => {
    const params = {
        phone_id:row.phone_id
    }
    const data = await deleteCollectGoods(params)
    loadList()
}
const handleCurrentChange = value => {
    page.value = value
    loadList()
}
</script>
<style lang="less" scoped>
.el-pagination {
    justify-content: center;
}
</style>