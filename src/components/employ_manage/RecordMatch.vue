<template>
  <div>
    <div class="smList">
      <Collapse v-model="collapseInfo">
        <Panel name="1">
          档案配对
          <div slot="content">
            <Form :model="recordMatchInfo" ref="recordMatchInfo" :label-width="150">
              <Row type="flex" justify="start">
                <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                  <Form-item label="导入时间：" prop="importDate">
                    <DatePicker v-model="recordMatchInfo.importDate" type="date" placeholder="" transfer></DatePicker>
                  </Form-item>
                </Col>
                <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                  <Form-item label="配对失败人数：" prop="matchFailedNumbers">
                    <Input-number v-model="recordMatchInfo.matchFailedNumbers" style="width: 100%;"></Input-number>
                  </Form-item>
                </Col>
              </Row>
              <Row type="flex" justify="start">
                <Col :sm="{span: 24}">
                  <Button type="primary">查询</Button>
                  <Button type="warning" @click="handleReset('recordMatchInfo')">重置</Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Panel>
      </Collapse>
      <Row type="flex" justify="start" class="mt20">
        <Col :sm="{span: 24}" class="tr">
          <Button type="primary" @click="isShowUpload = true;">导入外部配对文件</Button>
          <Button type="primary" @click="isShowStockTitle = true;">生成入库贴头</Button>
        </Col>
      </Row>
      <Table border :columns="recordMatchColumns" :data="recordMatchData" class="mt20"></Table>
    </div>

    <Modal
      v-model="isShowUpload"
      title="导入外部配对文件"
    >
      <Row type="flex" justify="start" v-if="uploadStep === 0">
        <Col :sm="{span: 24}" class="tc">
          <Upload action="//jsonplaceholder.typicode.com/posts/" :format="['xlsx', 'xls']" @on-success="uploadSuccess" @on-error="uploadError" @on-format-error="formatError">
            <i-button type="ghost" icon="ios-cloud-upload-outline" style="width: 200px;">选择文件</i-button>
          </Upload>
        </Col>
        <Col :sm="{span: 24}" class="tc">支持扩展名：xlsx，xls</Col>
      </Row>
      <Row type="flex" justify="start" v-else-if="uploadStep === 1">
        <Col :sm="{span: 24}">
          <Alert type="success" show-icon>
            已成功
            <span slot="desc">
              第一步导入数据成功，您可以
              <a href="goMatch">继续操作进入下一步匹配操作</a>
            </span>
          </Alert>
        </Col>
      </Row>
      <Row type="flex" justify="start" v-else>
        <Col :sm="{span: 24}">
          <Alert type="error" show-icon>您上传的文件无法通过校验，请检查文件格式是否匹配</Alert>
        </Col>
      </Row>
      <div slot="footer">
        <Button type="primary">导入文件</Button>
      </div>
    </Modal>

    <Modal
      v-model="isShowStockTitle"
      title="生成入库贴头"
    >
      <employee-info :customerInfo="info" v-for="(info, index) in customerInfos" :key="index" :style="{borderBottom: index !== customerInfos.length - 1 ? '1px solid #ccc' : '', marginBottom: index !== customerInfos.length - 1 ? '20px' : ''}"></employee-info>
      <div slot="footer">
        <Button type="primary" @click="isShowStockTitle = false;">生成入库贴头</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import {customerInfo} from "../../assets/js/employ_manage/common_filed"
  import employeeInfo from "./common/EmployeeInfo.vue"

  export default {
    components: {employeeInfo},
    data() {
      return {
        collapseInfo: [1],
        recordMatchInfo: {
          importDate: "",
          matchFailedNumbers: 0
        },
        isShowUpload: false,
        uploadStep: 0,
        isShowStockTitle: false,
        customerInfos: [customerInfo, customerInfo, customerInfo],
        recordMatchColumns: [
          {title: '导入批号', key: 'importBatchNumber', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('a', {
                  on: {
                    click: () => {
                      this.$router.push({name: 'matchImportFile'})
                    }
                  }
                }, params.row.importBatchNumber),
              ]);
            }
          },
          {title: '导入人', key: 'importer', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.importer),
              ]);
            }
          },
          {title: '导入时间', key: 'importDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.importDate),
              ]);
            }
          },
          {title: '配对失败人数', key: 'matchFailedNumbers', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.matchFailedNumbers),
              ]);
            }
          }
        ],
        recordMatchData: [
          {importBatchNumber: "20171201001", importer: "周蕾", importDate: "2017-7-3 13:33:45", matchFailedNumbers: "6"},
          {importBatchNumber: "20171201002", importer: "周蕾", importDate: "2017-7-3 13:33:45", matchFailedNumbers: "7"},
          {importBatchNumber: "20171201003", importer: "余好", importDate: "2017-7-3 13:33:45", matchFailedNumbers: "0"},
          {importBatchNumber: "20171201004", importer: "余好", importDate: "2017-7-3 13:33:45", matchFailedNumbers: "0"},
        ]
      }
    },
    methods: {
      handleReset(form) {
        this.$refs[form].resetFields();
      },
      uploadSuccess(response, file) {
        console.log(response, file);
        this.uploadStep = 1;
      },
      uploadError(response, file) {
        this.uploadStep = -1;
      },
      formatError(file) {
        this.$Notice.error({
          title: '文件格式错误',
          desc: '请上传文件格式为xls或xlsx的文件'
        });
      },
      goMatch() {

      }
    }
  }
</script>
