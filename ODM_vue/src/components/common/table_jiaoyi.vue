<template>
    <div>
        <el-table id="tbl"
        :data="tableData"
        :span-method="arraySpanMethod"
        border
        style="width: 100%">
        <el-table-column
            width="280px"
            label="最小起订量"
            
            >
            <template slot-scope="scope">
                <!-- <i class="el-icon-time"></i> -->
                <span>&ge;</span>
                <el-input size="small" style="width: 100px" v-model.number="scope.row.count"></el-input>
            </template>
        </el-table-column>
        <el-table-column
            width="280px"
            label="产品价格">
            <template slot-scope="scope">
                <span> $</span>
                <el-input size="small" style="width: 100px" v-model.number="scope.row.price"></el-input>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="180px"> 
            <template slot-scope="scope">
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
        <el-table-column
            
            label="预览">
            <div v-for="(item,index) in show" :key="index"><span>{{item}}</span><br></div>
            <!-- <span v-for="(item,index) in show" :key="index">{{item}}</span> -->
            <!-- <template slot-scope="scope">
                
                <span>&le; {{ scope.row.count }}件，US ${{ scope.row.price }}</span>
               
            </template> -->
        </el-table-column>
            
        </el-table>
        
        <el-button @click="addrow" type="primary" style="margin-top:10px">添加</el-button>
        <span style="font-size=12px;color:grey">可设置不超过四个区间</span>
    </div>
</template>
<script>
export default {
    name:'tab_jiaoyi',
    data() {
        return {
            tableData: [],
            show:[],
            rowNum:0   
        }
    },
    props:[
        

    ],
    computed: {
        
    },
    methods: {
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            //合并
            // if (columnIndex==3) {
            //     if (rowIndex ===0 ) {
            //         return [3, 1];
            //     }
                
            // }
        },
        addrow(){
            
            
                let row={
                        count:'',
                        price:'',
                    }
                this.tableData.push(row)
                this.rowNum++;
                // console.log(this.rowNum)
                if(this.rowNum <5){
                    // if(this.rowNum==2){
                    //     console.log(0+"~"+this.tableData[0].count+"$"+this.tableData[0].price)
                    //     this.show.push(0+"~"+this.tableData[0].count+"$"+this.tableData[0].price)
                    // }
                    for(let i= 2;i<this.rowNum;i++){
                        console.log(this.tableData[i-1].count,this.tableData[i-2].count)
                        
                        if(this.tableData[i-1].count <= this.tableData[i-2].count ||this.tableData[i-1].price > this.tableData[i-2].price){
                            alert("最小起订量必须由小到大,产品价格必须由大到小")
                            this.tableData.pop();
                            this.tableData.pop();
                            this.rowNum=this.rowNum-2;
                            break;
                            
                        }else{
                            
                            this.show.push(this.tableData[i-2].count+"~"+this.tableData[i-1].count+" $"+this.tableData[i-1].price)
                            this.show=this.unique(this.show)
                        }
                        
                    }
                }
                
            else{
                
                this.show.push(">"+this.tableData[3].count+" $"+this.tableData[3].price)
                alert("最多创建4个");
                this.tableData.pop()
                this.rowNum--
            }
            this.$emit('oncallback1',this.tableData)
            
        },
        handleDelete(index, row) {
            console.log(index, row);
            this.tableData.splice(index, 1)
            this.rowNum--;
            this.$emit('oncallback2',this.tableData)

        },
        isEmpty(obj) {
            if (typeof obj === "undefined" || obj == null || obj.trim() == "") {
                    return true;
            } else {
                    return false;
            }
        },
        //ES6语法利用set来数组去重
        unique(arr){
            var x = new Set(arr);
            return [...x];
        }
    
    },
    

}
</script>