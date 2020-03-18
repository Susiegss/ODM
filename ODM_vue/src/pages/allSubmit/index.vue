<template>
    <div>
        <Header />
        <hr>
        <div class="table-container">
        
            <h3 style="margin-left:10px;padding-top:20px"><i class="el-icon-menu"></i>已提交表单</h3>
             
            <div class="container">
                <!-- <div class="handle-box">
                    <el-input v-model="query.formid" placeholder="表单号" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                </div> -->
                <el-table
                    :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                    border
                    stripe
                    class="table"
                    ref="multipleTable"                  
                >
                    <el-table-column prop="formid" label="表单号" width="320" align="center"></el-table-column>                   
                    <el-table-column prop="date" align="center" label="提交时间"></el-table-column>
                    <el-table-column label="操作" width="320" align="center">
                        <template slot-scope="scope">
                            <el-button
                                type="text"
                                icon="el-icon-document"                                
                                @click="handleLook(scope.$index, scope.row)"
                            >查看</el-button>
                            <el-button
                                type="text"
                                icon="el-icon-edit"
                                class="red"
                                @click="handleEdit(scope.$index, scope.row)"
                            >编辑</el-button>
                            
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
                </div>                
            </div>
        </div>
        <div class="returnbut">
            <el-button round type="primary" @click="returnindex">返回首页</el-button>
        </div>
    </div>
</template>
<script>
import Header from '@/components/Header'
import {getAllSubmit} from '@/api/index.js'
export default {
    name:'allSubmit',
    components:{Header},
    data() {
        return {
            //pageSiz每页显示几条
            currentPage:1,
            pageSize: 6,
            tableData: [
                // {formid:"12345",date:"2020-2-26"},
                // {formid:"12345",date:"2020-2-26"},
                // {formid:"12345",date:"2020-2-26"},
                // {formid:"12345",date:"2020-2-26"},
                // {formid:"12345",date:"2020-2-26"},
                // {formid:"12345",date:"2020-2-26"},
                // {formid:"12345",date:"2020-2-26"},
                // {formid:"12345",date:"2020-2-26"},
                // {formid:"12345",date:"2020-2-26"},
                // {formid:"12345",date:"2020-2-26"},
                // {formid:"12345",date:"2020-2-26"},
                
            ],
            editVisible: false,
            pageTotal: 11,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        getAllSubmit(localStorage.getItem('userInfo'))
        .then(res =>{
            console.log(res)
            let a=res.data.forms;
            this.tableData=a;
            console.log(this.tableData)
            
        })
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(this.query).then(res => {
                console.log(res);
                this.tableData = res.list;
                this.pageTotal = res.pageTotal || 50;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        //查看
        handleLook(index, row){
            console.log(row.formid);
            
            //this.$router.push("/look");
            this.$router.push({
            name:'look',
            query:{
                formid:row.formid
            }
        })
        },
        //修改编辑
        handleEdit(index, row) {
            console.log(row.formid);
            //通过表单号拿到后端传来的本表单数据，带着表单号，传给edit页面
            //this.$router.push("edit")
            this.$router.push({
            name:'edit',
            query:{
                formid:row.formid
            }
            })
        },
        // 分页导航
        handlePageChange(val) {
            this.currentPage = val;
        },
        returnindex(){
            this.$router.push('/index')
        }
    }
}
</script>
<style  scoped>
.table-container{
    top: 40px;
    height: 666px;
    margin:40px 80px;
    background-color: #f0f0f0;
    /* border: rgb(165, 165, 165) solid 2px; */

}
.crumbs{
    font-size: 40px;
}
.handle-box {
    margin-bottom: 20px;
    margin-left: 90px
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
   margin: 0 90px;
    width: 80%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    margin: 0 90px;
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
.returnbut{
    position:fixed;
    bottom: 40px;
    padding-left:50%;
    left: -20px;
}
</style>