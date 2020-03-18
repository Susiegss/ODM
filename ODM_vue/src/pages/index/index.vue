<template>
    <div>       
     <Nav :active="active"/>
     <div class="select-container">
         <div class="tip">
             <h3>选择产品类目</h3>
         </div>
        <div class="content">
            <div class="block">
                <el-cascader
                    placeholder="服装"
                    :options="options"
                    filterable 
                    @change="handleLastChild"
                ></el-cascader>
            </div>
        </div>
     </div>  
    </div> 
</template>
<script>
import Nav from '@/components/nav'
export default {
   name:'index',
   data() {
       return {
        active:0,
        options: [{
          value: 'nvzhuang',
          label: '女装',
          children: [{
            value: 'dress',
            label: '连衣裙',
            children: [{
              value: 'zhiye',
              label: '职业连衣裙'
            }, {
              value: 'xiuxian',
              label: '休闲连衣裙'
            }]
          }]
        }]
       }
   },
   components:{ Nav},
   methods: {
       handleLastChild(value){
           console.log(value[value.length-1]);
           const path=value.join('>>');
           //console.log(path);

        //    this.active ++;
        //    this.$router.push('/insert')
        this.$router.push({
            name:'insert',
            query:{
                path:path
            }
        })

       }
   },
}
</script>
<style scoped>
 .select-container{
     top:60px;
     position: relative;
     padding:10px;
     margin: 20px 40px;
     height: 500px;
     background-color:#f5f7fa;
 }
 .tip{
     height: 40px;
     padding: 20px 60px;
 }
 .content{
     padding:20px 60px;
     text-align: left;

 }
</style>