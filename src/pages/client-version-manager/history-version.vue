/**
* Created by tangsicheng on 2018/3/1.
*/
<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%;overflow: scroll;" height="500">
      <el-table-column sortable fixed prop="createTime"  label="日期" width="150"></el-table-column>
      <el-table-column sortable prop="createBy" label="添加人" width="120"></el-table-column>
      <el-table-column sortable prop="iOS" label="ios版本" width="120"></el-table-column>
      <el-table-column sortable prop="android" label="android版本" width="150"></el-table-column>
      <el-table-column sortable prop="appName" label="应用名称" width="120"></el-table-column>
      <el-table-column sortable prop="jsVersion" label="js版本" width="300"></el-table-column>
      <el-table-column sortable prop="jsPath" label="下载地址" width="400"></el-table-column>
      <el-table-column label="操作" fixed="right" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small">
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--<el-pagination-->
      <!--style="display: flex;align-items: center;justify-content: center"-->
      <!--@size-change="handleSizeChange"-->
      <!--@current-change="handleCurrentChange"-->
      <!--:current-page="currentPage4"-->
      <!--:page-sizes="[100, 200, 300, 400]"-->
      <!--:page-size="100"-->
      <!--layout="total, sizes, prev, pager, next, jumper"-->
      <!--:total="400">-->
    <!--</el-pagination>-->
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    created() {
      this.$ajax.getVersion().then(res => {
        console.log(res);
        this.tableData = res.data
      })
    },
    data() {
      return {
        tableData: []
      }
    }
  }
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

</style>
