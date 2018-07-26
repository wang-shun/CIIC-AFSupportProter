<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        礼品管理查询
        <div slot="content">
          <Form :model="seniorSearchInfo" ref="seniorSearchInfo" :label-width="100">
            <Row class="mt20 mr10">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员编号" prop="employeeId">
                  <Input v-model="seniorSearchInfo.employeeId" placeholder="请输入"></Input>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员姓名" prop="employeeName">
                  <Input v-model="seniorSearchInfo.employeeName" placeholder="请输入"></Input>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="状态" prop="status">
                  <Select v-model="seniorSearchInfo.status" @on-change="getByPage(1)" style="width:100%">
                    <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </Form-item>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col :sm="{span: 24}" class="tr">
                <Button type="primary" @click="getByPage(1)" icon="ios-search">查询</Button>
                <Button type="warning" @click="resetSearchCondition('seniorSearchInfo')">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>
    <div class="tr m20">
      <Button type="primary" icon="ios-upload-outline" @click="exportSeniorData">导出资深雇员编号</Button>
      <Button type="primary" icon="ios-download-outline" @click="modalInput = true">导入资深雇员编号</Button>
    </div>
    <Table border :columns="seniorEmpColumns" :data="seniorEmpDataList" ref="seniorEmpTable"></Table>
    <Page show-elevator
          @on-change="getByPage"
          @on-page-size-change="pageSizeChange"
          :total="seniorSearchInfo.total"
          :current="seniorSearchInfo.current"
          :page-size="seniorSearchInfo.size"></Page>

    <Modal
      v-model="modal1"
      title="资深雇员编号录入"
      width="80"
      :mask-closable=false
      :closable="false">
      <Form :model="seniorEmpData" ref="seniorEmpData" :rules="seniorEmpRules" :label-width="100">
        <Row class="mt20 mr10">
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="雇员编号">
              {{seniorEmpData.employeeId}}
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="雇员姓名">
              {{seniorEmpData.employeeName}}
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="身份证号码">
              {{seniorEmpData.idNum}}
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="客户编号">
              {{seniorEmpData.companyId}}
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="客户名称">
              {{seniorEmpData.companyName}}
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="资深雇员编号" prop="seniorEmployeeId">
              <Input v-model="seniorEmpData.seniorEmployeeId" placeholder="请输入"></Input>
            </Form-item>
          </Col>
        </Row>
      </Form>

      <div slot="footer">
        <Button @click="modal1 = false">关闭</Button>
        <Button type="primary" @click="updateSenior" :loading="loading">提交</Button>
      </div>
    </Modal>

    <Modal v-model="modalInput"
           title="上传数据"
           :closable="false"
           :mask-closable="false">
      <Upload
        ref="seniorUpload"
        type="drag"
        :before-upload="handleUpload"
        :action="uploadAction"
        :on-success="handleUploadSuccess"
        :default-file-list="fileList">
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>点击或将文件拖到此处</p>
        </div>
        <Progress :percent="percent" v-show="loading" hide-info></Progress>
      </Upload>
      <div slot="footer">
        <Button @click="uploadSuccess">关闭</Button>
        <Button type="primary" @click="seniorUploadFile" :loading="loading">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import ajax from "../../../lib/ajax";
  import qs from "qs";

  export default {
    data() {
      return {
        collapseInfo: [1, 2, 3], //展开栏
        loading: false,
        modal1: false,
        modalInput: false,
        percent: 0,
        file: null,
        fileList: [],
        uploadAction: ajax.fbcBasePaths + '/seniorEmpService/uploadFileCache',
        seniorSearchInfo: {
          employeeId: "",
          employeeName: "",
          status: "2",
          current: 1,
          size: 10,
          total: 0
        },
        seniorEmpColumns: [
          {
            title: "雇员姓名", sortable: true, key: "employeeName", align: "center"
          },
          {
            title: "雇员编号", sortable: true, key: "employeeId", align: "center"
          },
          {
            title: "性别", sortable: true, key: "sex", align: "center",
            render: (h, params) => {
              return h('div', this.genderToChina(params.row.gender));
            }
          },
          {
            title: "出生日期", sortable: true, key: "birthday", align: "center",
            render: (h, params) => {
              if (params.row.birthday !== null) {
                return h('div', this.$utils.formatDate(params.row.birthday, "YYYY-MM-DD"));
              }
            }
          },
          {
            title: "手机号", sortable: true, key: "mobile", align: "center"
          },
          {
            title: "证件号", sortable: true, key: "idNum", align: "center"
          },
          {
            title: "资深雇员编号", sortable: true, key: "seniorEmployeeId", align: "center"
          },
          {
            title: "操作", sortable: true, align: 'center',
            render: (h, params) => {
              if ((params.row.seniorEmployeeId === undefined || params.row.seniorEmployeeId === null || params.row.seniorEmployeeId === '') && params.row.status === 2) {
                return h("div", [
                  h("Button", {
                    props: {
                      type: 'success',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        // 解除数据绑定，防止修改取消时编辑按钮消失
                        this.seniorEmpData = JSON.parse(JSON.stringify(params.row));
                        this.modal1 = true;
                      }
                    }
                  }, '编辑')
                ]);
              } else if (params.row.seniorEmployeeId !== undefined && params.row.seniorEmployeeId !== null && params.row.seniorEmployeeId !== '' && params.row.status === 3) {
                return h("div", [
                  h("Button", {
                    props: {
                      type: 'success',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: '提示',
                          content: '确认要清除自设雇员编号吗？',
                          onOk: () => {
                            this.cleanSenior(params.row);
                          },
                          onCancel: () => {
                            this.$Message.info('取消操作');
                          }
                        });
                      }
                    }
                  }, '清除')
                ]);
              }
            }
          }
        ],
        seniorEmpDataList: [],
        statusList: [
          {
            value: '2', label: '在职'
          },
          {
            value: '3', label: '离职'
          }
        ],
        seniorEmpData: {},
        seniorEmpRules: {
          seniorEmployeeId: [
            {required: true, message: '请输入资深雇员编号', trigger: 'blur'},
            {type: 'string', pattern: !'/\s+/', message: '请输入有效的雇员编号', trigger: 'blur'}
          ]
        }
      };
    },
    created() {
      this.getByPage(1);
    },
    methods: {
      updateSenior() {
        this.$refs['seniorEmpData'].validate((valid) => {
          if (valid) {
            ajax.ajaxFbc.postJSON("/seniorEmpService/updateSeniorEmp", this.seniorEmpData).then(response => {
              if (response.data.code === 0) {
                this.$Message.success('提交成功')
                this.getByPage(1);
              } else {
                this.$Message.error('服务器异常，请稍后再试')
              }
            });
            this.modal1 = false
          }
        });
      },
      cleanSenior(param) {
        ajax.ajaxFbc.postJSON("/seniorEmpService/clearSeniorEmp", param).then(response => {
          if (response.data.code === 0) {
            this.$Message.success('提交成功')
            this.getByPage(1);
          } else {
            this.$Message.error('服务器异常，请稍后再试')
          }
        });
        this.modal1 = false
      },
      query() {
        ajax.ajaxFbq.postJSON("/seniorEmpQueryService/querySeniorPage", this.seniorSearchInfo).then(response => {
          this.seniorEmpDataList = response.data.object.records;
          this.seniorSearchInfo.total = response.data.object.total;
        })
      },
      seniorUploadFile() {
        if (this.file === null || this.file == null || this.file === '') {
          this.$Message.error('请选择要上传文件')
          return
        }
        let data = {'file': this.file};
        this.loading = true;
        console.info("====" + this.file);
        ajax.ajaxFbc.upload("/seniorEmpService/importSeniorEmpExcel", data).then(response => {
          this.loading = false;
          if (response.data.code === 0) {
            this.getByPage(1)
            this.$Message.success("上传成功");
          } else if (response.data.code === 400) {
            this.$Modal.confirm({
              title: '提示',
              content: response.data.message,
              onOk: () => {
                this.$Message.info('OK');
              },
              onCancel: () => {
                this.$Message.info('取消操作');
              }
            });
          } else if (response.data.code === 600) {
            this.$Message.error(response.data.message);
          }
          else {
            this.$Message.error("服务器异常，请稍后再试");
          }
        }).catch(e => {
          console.info(e.message);
          this.$Message.error("服务器异常，请稍后再试");
        });
        this.uploadSuccess();
      },
      handleUpload(file) {
        if (file === null) {
          return false
        }
        this.file = file;
        return true
      },
      // 文件上传成功时 页面只显示最新选择的文件
      handleUploadSuccess(response, file, fileList) {
        this.fileList = [];
        this.fileList.push(file)
      },
      // 重置上传文件内容
      uploadSuccess() {
        this.$refs['seniorUpload'].clearFiles()
        this.modalInput = false;
        this.loading = false;
        this.percent = 0
      },
      exportSeniorData() {
        window.location = ajax.fbqBasePaths + '/seniorEmpQueryService/exportSeniorEmpExcel?' + qs.stringify(this.seniorSearchInfo);
      },
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      getByPage(val) {
        this.seniorSearchInfo.current = val;
        this.query()
      },
      pageSizeChange(size) {
        this.seniorSearchInfo.size = size;

        this.query()
      },
      genderToChina(status) {
        switch (status) {
          case 1:
            return "男";
          case 0:
            return "女";
        }
      }
    }
  };
</script>

<style>

</style>
