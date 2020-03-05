<template>
    <div>
        <el-table id="tbl"
        :data="tableData"
        :span-method="arraySpanMethod"
        border
        style="width: 100%">
        <el-table-column
            width="280px"
            label="*数量"
            >
            <template slot-scope="scope">
                <!-- <i class="el-icon-time"></i> -->
                <span>&le;</span>
                <el-input size="small" style="width: 100px" v-model.number="scope.row.count"></el-input>
            </template>
        </el-table-column>
        <el-table-column
            width="280px"
            label="*预计时间（天）">
            <template slot-scope="scope">
                <span>&le;</span>
                <el-input size="small" style="width: 100px" v-model.number="scope.row.days"></el-input>
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
            <template slot-scope="scope">
                
                <span>&le; {{ scope.row.count }}件，需 &le;{{ scope.row.days }}天</span>
               
            </template>
        </el-table-column>
            
        </el-table>
        
        <el-button @click="addrow" type="primary" style="margin-top:10px">添加</el-button>
        <span style="font-size=12px;color:grey">可设置不超过三个区间</span>
    </div>
</template>
<script>
export default {
    name:'tab',
    data() {
        return {
            tableData: [],
            rowNum:0   
        }
    },
    props:[
        

    ],
    computed: {
        showData(){
            if(this.tableData){
                return "--"
            }else{
                return 
            }
        }
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
                        days:'',
                    }
                this.tableData.push(row)
                this.rowNum++;
                // console.log(this.rowNum)
                if(this.rowNum <4){
                    // console.log(this.tableData)
                    for(let i= 2;i<this.rowNum;i++){
                        console.log(this.tableData[i-1].count,this.tableData[i-2].count)
                        // console.log(this.tableData)
                        if(this.tableData[i-1].count <= this.tableData[i-2].count){
                            alert("新增的数量必须比上一个大，请重新输入")
                            this.tableData.pop();
                            this.tableData.pop();
                            this.rowNum=this.rowNum-2;
                            break;
                            
                        }
                    }
                }
                
            else{
                
                alert("最多创建3个");
                this.tableData.pop()
                this.rowNum--
            }
            this.$emit('oncallback1',this.tableData)
            
        },
        handleDelete(index, row) {
            console.log(index, row);
            this.tableData.splice(index, 1)
            this.rowNum--;
            this.$emit('oncallback1',this.tableData)

        },
        isEmpty(obj) {
            if (typeof obj === "undefined" || obj == null || obj.trim() == "") {
                    return true;
            } else {
                    return false;
            }
}
    
    },
    

}
</script>