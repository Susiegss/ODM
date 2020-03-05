<template>
<div>
    <Nav :active="active"/>

    <div class="check-container">
        <div class="round">
            <div class="small-round">
            <h3>已提交</h3>
            </div>
        </div>
        
        <div class="select">
            <el-button round type="primary" @click="toall" style="margin-right:80px;">查看已提交产品</el-button>
            <el-button round @click="toindex">返回首页</el-button>
            
        </div>
    </div>
</div>
</template>
<script>
import Nav from '@/components/nav'
export default {
    name:"check",
    components:{Nav },
    data() {
        return {
            active:2
        }
    },
    methods: {
        toall(){
            this.$router.push('/allSubmit')
        },
        toindex(){
            this.$router.push('/index')
        }
    },
}
</script>
<style scoped>
.check-container{
    position: relative;
    top: 40px;
    text-align: center
}
.round{
    width:200px;
    height: 200px;
    background-color: green;
    border-radius: 50%;
    /* position: absolute; */
    margin: 80px auto;
    display: flex;
    align-items: center
}
.small-round{
    width: 180px;
    height: 180px;
    background-color: white;
    border-radius: 50%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center 
    
}
.select{
    
}

</style>