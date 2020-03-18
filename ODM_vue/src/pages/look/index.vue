<template>
  <div class="look">
    <Header />
    <hr />
    <el-card class="box-card">
      <div v-for="item in formdata" :key="item.name" class="text item">
        <el-row>
          <el-col :span="6">{{item.attribute}}:</el-col>
          <el-col :span="18">
            <el-input style="font-size:20px" v-model="item.choices" :disabled="true"></el-input>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <div class="rotate-wrap">
      <div class="front circle" style="transform: translateZ(1px);"></div>
      <div class="reverse circle"></div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header";
import {lookForm} from "@/api/index"
export default {
  name: "look",
  components: { Header },
  provide() {
    return {
      rwDispatcherProvider: this
    };
  },
  data() {
    return {
      rwDispatcherState: "write",
      formdata: []
    };
  },
  created() {
    const formid=this.$route.query.formid
    lookForm(formid).then(
      res =>{
        console.log(res)
        if(res.code==='0'){
          this.formdata=res.data.formdata
        }
      }
    )
  },
  methods: {
    
    
  },
  
};
</script>
<style scoped>
.content {
  width: 80%;
  margin: 20px 80px;
  background-color: #f0f0f0;
  font-size: 20px;
}
.text {
  font-size: 20px;
}

.item {
  padding: 18px 0;
}

.box-card {
  margin: 20px 80px;
  width: 80%;
}

.rotate-wrap {
  width: 100px;
  height: 100px;
  margin: 100px;
  transform-style: preserve-3d;
  animation: rotate 5s linear infinite;
  position: relative;
}
.rotate-wrap:hover {
  animation-play-state: paused;
}
.rotate-wrap .front,
.rotate-wrap .reverse {
  width: 100px;
  height: 100px;
  background-size: cover;
}
.rotate-wrap .front {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: url("https://picsum.photos/id/935/100/100");
}
.rotate-wrap .reverse {
  background-image: url("https://picsum.photos/id/835/100/100");
}

.circle {
  border-radius: 50%;
}
@keyframes rotate {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}
</style>