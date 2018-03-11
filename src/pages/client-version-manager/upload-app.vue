/**
* Created by tangsicheng on 2018/3/1.
*/
<template>
  <div>
    <el-container v-loading.fullscreen.lock="isLoading"
                  element-loading-text="上传中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-header style="height: auto">
        <el-button type="primary" @click="openDialog('iOS')">iOS客户端上传<i class="el-icon-upload el-icon--right"></i></el-button>
        <el-button type="primary" @click="openDialog('android')">android客户端上传<i class="el-icon-upload el-icon--right"></i></el-button>
      </el-header>
      <el-main>
        <el-table :data="tableData" border >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="table-expand">
                <el-form-item label="发布描述">
                  <span>{{ props.row.description }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="上传日期"   sortable prop="createTime"></el-table-column>
          <el-table-column label="客户端名称" prop="clientName"></el-table-column>
          <el-table-column label="客户端ID" prop="clientID"></el-table-column>
          <el-table-column label="发布时间" sortable prop="issueDate"></el-table-column>
          <el-table-column label="客户端类型" prop="clientType"></el-table-column>
          <el-table-column label="客户端版本" prop="clientVersion"></el-table-column>
          <el-table-column label="客户端类型" prop="downloadUrl"></el-table-column>
        </el-table>
      </el-main>

    </el-container>
    <el-dialog  :title="dialogType+'客户端上传'" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :before-close="closeDialog">
      <el-form :model="form" class="upload-package-dialog" :rules="rules" ref="uploadFrom">
        <el-form-item ref="fileUploadDiv" label="上传客户端:"  prop="file">
          <label for="file-upload" class="el-button el-button--primary">
            上传<i class="el-icon-upload el-icon--right"></i>
          </label>
          <el-tag v-if="form.file" :key="form.file.name" closable @close="tagClose">
            {{form.file.name}}
          </el-tag>
          <input ref="fileUpload" id="file-upload" type="file"  @change="handleFileChange" autocomplete="off">
        </el-form-item>
        <el-form-item label="客户端id:" prop="clientID">
          <el-input v-model="form.clientID" ></el-input>
        </el-form-item>
        <el-form-item label="客户端名称:" prop="clientName">
          <el-input v-model="form.clientName" ></el-input>
        </el-form-item>
        <el-form-item label="期望发布时间:" prop="issueDate">
          <el-date-picker v-model="form.issueDate"  type="datetime" placeholder="选择日期时间" align="right" >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="版本号:" prop="clientVersion">
          <el-input v-model="form.clientVersion" ></el-input>
        </el-form-item>
        <el-form-item label="下载地址:" prop="downloadUrl">
          <el-input v-model="form.downloadUrl" ></el-input>
        </el-form-item>

        <el-form-item label="发布描述:">
          <el-input  v-model="form.description" type="textarea" :rows="3" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as mUtils from '@/utils/mUtils'
    export default {
        created() {
          this.getClientInfo();
        },
        data() {
            return {
              dialogType:'',
              dialogFormVisible: false,
              isLoading:false,
              rules: {
                file:[
                  { required: true, message: '请上传客户端', trigger: 'change' }
                ],
                clientName: [
                  { required: true, message: '请输入客户端名称', trigger: 'blur' }
                ],
                clientID: [
                  { required: true, message: '请输入客户端ID', trigger: 'blur' }
                ],
                issueDate: [
                  { type: 'date', required: true, message: '请选择发布时间', trigger: 'change' }
                ],
                clientVersion: [
                  { required: true, message: '请输入客户端版本号', trigger: 'blur' }
                ],
                downloadUrl: [
                  { required: true, message: '请输入下载地址', trigger: 'blur' }
                ]
              },
              form: {
                file:'',
                clientID: '',
                clientName:'',
                issueDate:'',
                issueDateFormate:'',
                clientVersion: '',
                downloadUrl: '',
                description: '',
                createTime:'',
                createTimeFormate:''
              },
              formLabelWidth: '120px',
              tableData: []
            }
        },

        methods: {
           getClientInfo(){
               this.$ajax.getClentInfos().then(res => {
                 console.log(res)
                 var data = res.data;

                 for(let i = 0 ;i<data.length;i++){
                    data[i].issueDate = mUtils.formatDate(new Date(data[i].issueDate))
                    data[i].createTime = mUtils.formatDate(new Date(data[i].createTime))
                 }
                 this.tableData = data;
               },err =>{
                 this.$message.error(err.message);
               })
           },
          openDialog(type){
              this.dialogFormVisible = true
              this.dialogType = type
          },
          saveInfo(){

            this.$refs.uploadFrom.validate((valid) => {
              if (valid) {
                this.$confirm('是否确认上传包信息？', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.isLoading = true;
                  let formData = new FormData();
                  formData.append('file', this.form.file);
                  formData.append('clientID', this.form.clientID);
                  formData.append('clientName', this.form.clientName);
                  formData.append('issueDate', this.form.issueDate);
                  formData.append('clientVersion', this.form.clientVersion);
                  formData.append('downloadUrl', this.form.downloadUrl);
                  formData.append('description', this.form.description);
                  let config = {
                    url:`/app/uploadFile/${this.dialogType}`,
                  }
                  this.$ajax.uploadFile(formData,config).then(res => {
                    this.getClientInfo();
                    this.$message.success('新版本发布成功');
                    this.clearDialor();
                    this.dialogFormVisible = false;
                    this.isLoading = false;
                  },err =>{
                    this.$message.error(err.message);
                  })
                });
              } else {
                this.isLoading = false;
                return false;
              }
            });
          },
          handleFileChange(e){
            if(this.dialogType == 'iOS'){
              if (typeof e.target === 'undefined') {
                this.$message.error('未获取到文件');
              }else {
                let appName = e.target.files[0].name;
                let strRegex = "(.ipa)$";
                let re = new RegExp(strRegex);
                if(re.test(appName)){
                  this.form.file = e.target.files[0];
                  this.$refs.fileUploadDiv.clearValidate();
                }else{
                  this.$message.error('只能上传.ipa文件');
                  this.$refs.fileUpload.value='';
                }
              }
            }else if(this.dialogType == 'android'){
              if (typeof e.target === 'undefined') {
                this.$message.error('未获取到文件');
              }else {
                let appName = e.target.files[0].name;
                let strRegex = "(.apk)$";
                let re = new RegExp(strRegex);
                if(re.test(appName)){
                  this.form.file = e.target.files[0];
                  this.$refs.fileUploadDiv.clearValidate();
                }else{
                  this.$message.error('只能上传.apk文件');
                  this.$refs.fileUpload.value='';
                }
              }
            }
          },
          closeDialog(done){
            this.$confirm('是否确认取消?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.clearDialor();
              done();
            });

          },
          clearDialor(){
            this.form= {file:'',
              clientID: '',
              clientName:'',
              issueDate:'',
              clientVersion: '',
              downloadUrl: '',
              description: ''}
            this.$refs.uploadFrom.clearValidate();
            this.$refs.fileUpload.value='';
          },
          tagClose(){
            this.form.file = ''
            this.$refs.fileUpload.value='';
          }
        }
    }
</script>

<style lang="scss">
  @import 'upload-app.scss';

</style>
