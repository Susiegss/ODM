<template>
  <div>
    <Header />
    <div class="top-nav">
      <el-steps :active="active" finish-status="success" simple style="margin-top: 10px">
        <el-step title="选择语言市场及类目" ></el-step>
        <el-step title="填写产品营销信息" ></el-step>
        <el-step title="提交" ></el-step>
      </el-steps>
  </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  name: 'Nav',
  data () {
    return {
      
    }
  },
  props:{
    active:Number
  },
  components:{ Header}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.top-nav{  
  position: absolute;
  top: 60px;
  height: 40px;
  width: 100%;
}

</style>
