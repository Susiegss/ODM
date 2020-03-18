<template>
    <div>       
     <Nav :active="active"/>
     <div class="insert">
         <!-- 定点导航栏 下拉时候要固定在顶部-->
         <div :class="navBarFixed == true ? 'navBarWrap' :'insert-nav'">
             <el-card body-style="padding:0;margin-bottom:10px" shadow="hover">
            <el-row>
             <ul>
                 <el-col :span="4"><a href="#base-card">基本信息</a></el-col>
                 <el-col :span="4"><a href="#desc-card">商品描述</a></el-col>
                 <el-col :span="4"><a href="#trade-card">交易信息</a></el-col>
                 <el-col :span="4"><a href="#logistic-card">物流信息</a></el-col>
                 <el-col :span="8"><a href="#scm-region-card">特殊服务及其他</a></el-col>
             </ul>
            </el-row>
             </el-card>
         </div>
         <div id="struct-category-title"  style="text-align:left;margin:10px 0 0 0">
             <el-card>
             <p style="font-size:14px">当前类目：{{this.$route.query.path}}</p>
             </el-card>
         </div>
         <div class="insert-content">
             <!-- 大表单 -->
             <el-form :model="form" :rules="rules" ref="form" :label-position="labelPosition" label-width="120px"  >
             <!--放各个模块内容-->
             <div id="struct-category-title" class="card">
                 <el-card>
                 <el-form-item label="产品类型"  style="text-align:center" required>
                    <el-radio-group v-model="form.productType">
                    <el-radio label="直接下单品" border></el-radio>
                    <el-radio label="非直接下单品" border></el-radio>
                    </el-radio-group>
                </el-form-item>
                 </el-card>
             </div>
             <!--基本信息-->
             <div id="base-card" class="card">
                 <el-card >
                     <div slot="header" style="text-align:left">
                        <span>基本信息</span>
                    </div>
                    
                    <el-form-item label="产品名称" prop="productName">
                        <el-input v-model="form.productName" >
                        </el-input>
                    </el-form-item>
                    <el-form-item label="产品关键词" prop="guanjianzi" id="guanjian">
                        
                        <el-input placeholder="请按正确格式填写：‘修饰词+产品中心词+应用场景’，如：‘Red 8GB mp3 for sports’" v-model="form.guanjianzi">
                        
                        </el-input>
                        <span style="color:grey;font-size:12px">最多填写3个关键字，之间用;分隔</span>
                        <!-- <el-button size="small" type="primary" @click="addGuanjian()">添加</el-button> -->
                    </el-form-item>
                    <el-form-item label="产品分组" prop="productGroup">
                        <el-select v-model="form.productGroup" placeholder="请选择分组"  clearable allow-create filterable default-first-option >
                                          
                                    <el-option v-for="choice in productGroupChoices"
                                    :key="choice"
                                    :label="choice"
                                    :value="choice">{{choice}}
                                    </el-option>
                                </el-select>
                    </el-form-item>
                    <hr style="height:1px;border:none;border-top:1px dashed #0066CC;"/>
                    <span style="font-size:12px;color:grey;width:800px;text-align:left!important">商品属性
                        <em>请填写准确完整的商品属性，以便买家迅速了解产品特征</em>
                    </span>
                    
                    <div v-for="item in attributes" :key="item.attribute" class="text item">
                        <!-- select 下拉单选 -->
                        <div v-if="item.type==='select'">
                            <el-form-item :label="item.attribute" :prop="item.name" :rules="{ required:true, message: `${item.attribute}为必填选项`, trigger: 'change' }">                              
                                <el-select v-model="form[item.name]" placeholder="请选择" clearable allow-create filterable default-first-option >                                         
                                    <el-option v-for="choice in item.choices"
                                    :key="choice"
                                    :label="choice"
                                    :value="choice">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <!-- radio单选 -->
                        <div v-else-if="item.type=='radio'">
                            <el-form-item :label="item.attribute" :prop="item.name" :rules="{ required: true, message: `${item.attribute}为必填选项`, trigger: 'blur' }">                    
                                <el-radio-group v-model="form[item.name]">
                                    <el-radio v-for="choice in item.choices" :label="choice" :key="choice"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </div>
                        <!-- 打勾多选 -->
                        <div v-else-if="item.type=='checkbox'">
                            <el-form-item :label="item.attribute" :prop="item.name" :rules="{ required:true, message: `${item.attribute}为必填选项`, trigger: 'change' }"> 
                                <el-checkbox-group v-model="form[item.name]" id="form[item.name]">
                                    <el-checkbox v-for="choice in item.choices" :label="choice" :key="choice"></el-checkbox>
                                </el-checkbox-group>
                                <input :id="item.name" class="add-input" />
                                <el-button size="small" type="primary" @click="addInputData(item.name)">添加</el-button>
                            </el-form-item>
                        </div>
                        <!-- write 输入类型 -->
                        <div v-else>
                            <el-form-item :label="item.attribute" :prop="item.name" :rules="{ required:true, message: `${item.attribute}为必填选项`, trigger: 'blur' }" >
                                <el-input v-model="form[item.name]"></el-input>
                            </el-form-item>
                        </div>
                        
                    </div>
                    <hr style="height:1px;border:none;border-top:1px dashed #0066CC;"/>
                    <span style="font-size:12px;color:grey;width:800px;text-align:left!important">产品规格</span>
                     
                 </el-card>
             </div>
             <!--商品描述-->
             <div id="desc-card" class="card">
                 <el-card >
                     <div slot="header" style="text-align:left">
                        <span>商品描述</span>
                        </div>
                    <el-form-item>
                        <el-upload
                            class="upload-demo"
                            action="aaa"
                            :on-change="handlePreview"
                            :on-remove="handleRemove"
                            :auto-upload="false"
                            multiple
                            :limit="6"
                            :file-list="fileList"
                            list-type="picture">
                            <el-button size="small" type="primary">浏览</el-button>
                            <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>
                    </el-form-item>
                 </el-card>
             </div>
             <!--交易信息-->
             <div id="trade-card" class="card">
                 <el-card >
                     <div slot="header" style="text-align:left">
                        <span>交易信息<em style="color:grey;font-size:12px"> 完善交易信息，方便买家做出采购决定</em></span>
                        </div>
                    <el-form-item label="计量单位"   style="text-align:left" required>
                        <el-select v-model="form.jiliangdanwei" filterable allow-create default-first-option placeholder="请选择" required>
                            <el-option v-for="choice in jiliangdanweiChoices" :key="choice" :label="choice">{{choice}}
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="销售方式"   style="text-align:left">
                        <el-radio-group v-model="form.xiaoshoufangshi">
                            <el-radio label="按件卖"></el-radio>
                            <el-radio label="按批卖"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="价格设置"   style="text-align:left" required>
                        
                            <span style="color:grey">根据数量设置价格</span>
                            <TabJY @oncallback2="getTab2"/>
                        
                    </el-form-item>
                    <el-form-item label="可售数量">
                        <el-input size=small style="width:180px" v-model="form.salecount"></el-input>
                    </el-form-item>
                    <el-form-item label="样品服务设置">
                        <el-radio-group v-model="form.modelService">
                            <el-radio label="支持样本服务"></el-radio>
                            <el-radio label="不支持"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                 </el-card>
             </div>
             <!--物流信息-->
             <div id="logistic-card" class="card">
                 <el-card >
                     <div slot="header" style="text-align:left">
                        <span>物流信息</span>
                        </div>
                    <el-form-item label="每个商品长宽高（含包装）" prop="size" :rules="{ required:true, message: `长宽高为必填选项`, trigger: 'change' }">
                        <span>
                            <el-input  style="width:70px;" placeholder="长" size="small" v-model.number="form.size.long" ></el-input>CM
                            <el-input  style="width:70px;" placeholder="宽" size="small" v-model.number="form.size.width" ></el-input>CM
                            <el-input  style="width:70px;" placeholder="高" size="small" v-model.number="form.size.height" ></el-input>CM/计量单位
                        </span>
                    </el-form-item>
                    <el-form-item label="每件商品毛重" prop="weight" :rules="{ required:true, message: `此为必填选项`, trigger: 'change' }">
                        <el-input style="width:200px;" size="small"  v-model="form.weight" required></el-input>KG/计量单位
                        <span>精确到小数点后三位</span>
                    </el-form-item>
                    <el-form-item label='发货期' required>
                        <!--引入tab-->
                        <Tab @oncallback1="getTab1"/>
                    </el-form-item>
                    <el-form-item label="运费模板">

                    </el-form-item>
                    <el-form-item label="包装方式" >
                        <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="form.bzstyle"
                            maxlength="1500"
                            show-word-limit
                            
                            >
                        </el-input>
                    </el-form-item>
                    <el-form-item label="包装图片" >
                        <label style="color:grey;font-size:14px">支持jpg、png。文件大小：小于2MB</label>
                        <el-upload
                            class="upload-demo"
                            action="aaa"
                            :on-change="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :auto-upload="false"
                            multiple
                            :limit="3"
                            
                            list-type="picture">
                            <el-button size="small" type="primary">选取文件</el-button>
                        </el-upload>
 
                    </el-form-item>
                 </el-card>
             </div>
             <!--特殊服务及其他-->
             <div id="scm-region-card" class="card">
                 <el-card >
                     <div slot="header" style="text-align:left">
                        <span>特殊服务及其他</span>
                        </div>
                    <el-form-item label="定制服务"   style="text-align:left">
                        <el-radio-group v-model="form.specialService">
                            <el-radio label="支持定制（推荐）"></el-radio>
                            <el-radio label="不支持"></el-radio>
                            
                        </el-radio-group>
                        <br><span style="color:grey;font-size:14px;">设置与表达定制能力，有助承接需要定制的买家需求与提升沟通效率</span>
                    </el-form-item>
                    <el-form-item label="私域品服务"   style="text-align:left;">
                        <el-radio-group v-model="form.siyupinService">
                            <el-radio label="私域产品"></el-radio>
                            <el-radio label="不支持"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="生产可视化服务"   style="text-align:left">
                        <el-radio-group v-model="form.keshihuaService">
                            <el-radio label="支持"></el-radio>
                            <el-radio label="不支持"></el-radio>
                            
                        </el-radio-group>
                        <br><span style="color:grey;font-size:14px;">具备对买家展示生产过程的能力，可帮助买家跟单。选择服务即同意平台五福要求及协议</span>
                    </el-form-item>
                    <el-form-item label="电商一站式服务"   style="text-align:left">
                        <el-radio-group v-model="form.yizhanService">
                            <el-radio label="支持"></el-radio>
                            <el-radio label="不支持"></el-radio>
                        </el-radio-group>
                        <br><span style="color:grey;font-size:14px;">具备服务海外电商平台卖家（如Amazon,Ebay等）的能力，可提高买家采购效率。选择服务即同意平台服务要求及协议</span>
                    </el-form-item>
                 </el-card>
             </div>
             <!-- 产品信息质量 -->
             <!--            
             <div id="struct-pinbar" class="card">
                 <el-card >
                     <div slot="header" style="text-align:left">
                        <span>产品信息质量</span>
                        </div>
                    <el-form-item>
                        <div v-for="o in 4" :key="o" class="text item">
                            {{'列表内容 ' + o }}
                        </div>
                    </el-form-item>
                 </el-card>
             </div>-->
             <div id="agreement-card" class="card" style="padding:10px 0;text-align:center">
                 <h4>商品发布协议</h4>
                 <el-checkbox v-model="checked">
                 请再次检查填写的信息真实、合法有效
                 </el-checkbox>
                 <br />
                 <label style="font-size:12px">信息发布上网或被退回后方可修改信息</label>
                 
             </div>
             <div class="insert-button">
             <!-- <el-button>预览</el-button> -->
                <el-button round style="margin-right:80px;width=200px">保存</el-button>
                <el-button round type="primary" native-type="submit" @click="SubmitForm('form')">提交</el-button>
            </div>
            </el-form>
         </div> 
         
     </div>
    </div> 
</template>
<script>
import Nav from '@/components/nav'
import Tab from '@/components/table'
import TabJY from '@/components/common/table_jiaoyi'
import {getAttributes} from '@/api/index.js'
export default {
    name:'insert',
    components:{Nav,Tab,TabJY},
    props:{
        dialogType: { //是新增还是编辑，用于判断
            type: String
        },
        formList: { //表单的原始值
            type: Object
        },
        type: { //表单的原始值
            type: String
        },
    },
    data() {
        return {
            
            //固定选项
            productGroupChoices:["ladies'jean",'lady pants','lady shirt','lady outwear','lady T-shirt','lady shortskit'],
            jiliangdanweiChoices:["Acre","Ampere","Bag","Box"],
            fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                    }],
            //模拟后台传来的动态属性数据
            attributes:[],
            //存储用户填写信息
            form:{   
                // formid:'',
                productName:'',
                guanjianzi:[],
                productType:'直接下单品',
                productGroup:[],
                //商品描述
                descphotoslist:[],
                //交易信息表
                jiliangdanwei:'',
                xiaoshoufangshi:'按件卖',
                pricetable:[],
                salecount:'',
                
                modelService:'不支持',
                //物流信息表
                size:{
                    long:'',
                    width:'',
                    height:''
                },
                long:'',
                width:'',
                height:'',
                weight:'',
                fahuoqi:[],
                bzstyle:'',
                bzphotoslist:[],
                //特殊服务
                specialService:'不支持',
                siyupinService:'不支持',
                keshihuaService:'不支持',
                yizhanService:'不支持',
                
            },
            active:1,
            checked:true,
            navBarFixed:null,
            labelPosition:'right',
    //如果要验证的话
            rules: {
                productName: [
                    { required: true, message: '请输入产品名称', trigger: 'blur' },
                    { min: 1, max: 128, message: '长度在 1 到 128 个字符', trigger: 'blur' }
                ],
                guanjianzi: [
                    { required: true, message: '请填写关键字', trigger: 'blur' }
                ],
                productGroup: [
                    { required: true, message: '请选择产品分组', trigger: 'change' }
                ]
                },
            }
    },
    created(){
        //先判断是新建还是修改
        console.log(this.dialogType)
        console.log("insert"+this.type)
        if(this.dialogType){
            this.form="",
            this.form=this.formList;
            let t=this.type
            getAttributes(this.t)
            .then(res =>{
            let a=res.data.attributes
            this.attributes=a;
            console.log(this.attributes)
            })           
        }
        
        else{
            //拿到选的类型-上一个最后一个选项值,获取动态属性
            let t=this.$route.query.path.split(">>").pop()
        
        //console.log(t);
        getAttributes(this.t)
        .then(res =>{
            let a=res.data.attributes
            this.attributes=a;
            console.log(this.attributes)
            if(res.code ==='0'){
                for(let i=0; i< a.length; i++){
                    let obj=a[i]
                    //将后端传来的动态的属性的名字都添加到用户需要填写的form中
                    console.log(obj.type)
                    //只有checkbox类型是多选是数组
                    if(obj.type == 'checkbox'){
                        this.$set(this.form,obj.name,[])
                    }else{         
                        this.$set(this.form,obj.name,'')
                    }
                }
            }else{
                console.log("请求错误")
            }
        })
        console.log(this.form)
        }
    },
    mounted () {
      // 事件监听滚动条
      window.addEventListener('scroll', this.watchScroll)
      //console.log(this.$route)

    },
    methods: {

        watchScroll(){
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            //  当滚动超过 50 时，实现吸顶效果
            if (scrollTop > 49) {
            this.navBarFixed = true
            } else {
            this.navBarFixed = false
            }
            //console.log(this.form)
        },
        //图片预览
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
            this.form.descphotoslist.push(file.url)
            console.log(this.form.descphotoslist)
      },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      submitUpload() {
        //this.$refs.upload.submit();//上传图片
      },
      //包装图片
      handlePictureCardPreview(file) {
        
        console.log(this.form)
        this.form.bzphotoslist.push(file.url)
        console.log(this.form.bzphotoslist)

      },
      //图片限制
      beforeAvatarUpload(file){
          console.log(file)
        const isJPG = file.type === 'image/jpeg';
        const isPNG=file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG && !isPNG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
         return isJPG && isLt2M;
        // return false;
      },
      addInputData(arr){
        //拿到用户输入的值,判断是否为空
        let val=document.getElementById(arr).value;
        if(val){           
            this.form[arr].push(val);
            //过滤
            let c=this.attributes.filter(o=>{return o.name===arr});//加到选择中
            c[0].choices.push(val);
            document.getElementById(arr).value=""
        }
      },
      getTab1(val){
          this.form.fahuoqi=val;
          //console.log(this.form.fahuoqi)
      },
      getTab2(val){
          this.form.pricetable=val;
          //console.log(this.tradeform.pricetable)
      },
      addGuanjian(){
          //document.getElementById("guanjian").appendChild();
          this.form.guanjianzi.push(' ');
          
      },
      SubmitForm(formName){
          //要先submit 符合规则之后 将form表单提交
          //提交成功后，跳转到审核页面
          
          this.$refs[formName].validate((valid) => {
          if (valid) {
              //执行提交表单的接口
            alert('submit!');
            console.log(this.form)
            this.$router.push('/check')
          } else {
            console.log('error submit!!');
            return false;
          }
        });         
      },
    },
    
    
}
</script>
<style  scoped >
.insert{
    top:80px;
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 0 300px;
    font-size: 120%;
    
}
.nav-card{
    padding:0 !important;
    height: 40px;
}
.navBarWrap{
    position:fixed;
    top:0;
    width: 100%;
    z-index:999;
   
}
 .insert-nav ul a {
    padding:0 20px;
       
    
} 
a:link{
    color:#1e1e1e;
    text-decoration-line: none; 
}
a:visited{
    color:#1e1e1e;
}
a:active{
    color:grey;
}
.card{
    height: auto;
    width: 100%;
    background-color: #f5f7fa;
    margin: 10px 0 0 0;
}
.insert-button{
    margin: 20px 0;
    text-align: center;
}
.add-input{
    border:1px solid #dcdfe6;
    height: 25px;
}
</style>