<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        补充医疗查询
        <div slot="content">
          <Form ref="formItem" :model="formItem" :label-width="140">
            <Row justify="start" class="mt20 mr10">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="导入日期" prop="inputDateRange">
                <DatePicker v-model="formItem.inputDateRange" type="daterange" placement="bottom-end"
                            placeholder="选择日期" style="width: 100%"></DatePicker>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="审核日期" prop="auditTimeRange">
                <DatePicker v-model="formItem.auditTimeRange" type="daterange" placement="bottom-end"
                            placeholder="选择日期" style="width: 100%"></DatePicker>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="状态" prop="status">
                <Select v-model="formItem.status" placeholder="请选择" :clearable="true">
                  <Option value="1" v-for="item in statusProperties" :value="item.value" :key="item.value">
                    {{item.label}}
                  </Option>
                </Select>
              </Form-item>
              </Col>
              <!--TODO 待确认字段-->
              <!--<Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="分类" prop="invoiceNumber">
                <Select v-model="formItem.invoiceNumber" placeholder="请选择" :clearable="true">
                  <Option v-for="item in category" :value="item.value" :key="item.value">{{item.label}}
                  </Option>
                </Select>
              </Form-item>
              </Col>-->
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="案卷号" prop="dossierNumber">
                <Input v-model="formItem.dossierNumber" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="受理编号" prop="acceptanceId">
                <Input v-model="formItem.acceptanceId" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员编号" prop="employeeId">
                <Input v-model="formItem.employeeId" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员姓名" prop="employeeName">
                <Input v-model="formItem.employeeName" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="公司编号" prop="companyId">
                <Input v-model="formItem.companyId" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="公司名称" prop="companyName">
                <Input v-model="formItem.companyName" placeholder="请输入"/>
              </Form-item>
              </Col>
              <!--<Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="保单号">
                <Input v-model="formItem.code" placeholder="请输入"/>
              </Form-item>
              </Col>-->
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="管理方编号" prop="managementId">
                <Input v-model="formItem.managementId" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="管理方名称" prop="managementName">
                <Input v-model="formItem.managementName" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="连带人" prop="insuredName">
                <Input v-model="formItem.insuredName" placeholder="请输入"/>
              </Form-item>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col :sm="{span: 24}" class="tr">
              <Button type="primary" icon="ios-search" @click="getByPage(1)">查询</Button>
              <Button type="warning" @click="resetSearchCondition('formItem')">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <Card :bordered="true" class="mt15">
      <p slot="title">统计信息</p>
      <Row justify="start" class="m15">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 6}">
        <span>记录总数:</span>
        <span>{{statisticsData.total}}</span>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 6}">
        <span>公司理赔金额总计:</span>
        <span>{{statisticsData.totalCompanyMoney}}</span>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 6}">
        <span>保险公司理赔金额总计:</span>
        <span>{{statisticsData.totalInsuranceCompanyMoney}}</span>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 6}">
        <span>发票张数:</span>
        <span>{{statisticsData.invoiceTotal}}</span>
        </Col>
      </Row>
    </Card>

    <div class="tr m20">
      <Button type="info" @click="modalButton(true)">审核通过</Button>
      <Button type="info" @click="modalButton(false)">批退</Button>
      <Button type="info" @click="exportData()" icon="ios-download-outline">导出数据</Button>
      <Button type="info" @click="modalInput = true" icon="ios-upload-outline">导入数据</Button>
    </div>

    <Table border
           stripe
           :columns="supplementColumns"
           :data="supplementData"
           @on-selection-change="selectTableData"></Table>
    <Page show-sizer show-elevator
          @on-change="getByPage"
          @on-page-size-change="pageSizeChange"
          :total="formItem.total"
          :current="formItem.current"
          :page-size="formItem.size"></Page>

    <Modal
      v-model="modalAccept"
      title="审核操作对话框"
      @on-ok="updateSupplementaryList(2)">
      <Input v-model="dealMeg.remark" placeholder="备注："/>
    </Modal>

    <Modal
      v-model="modalRefuse"
      title="批退操作对话框"
      @on-ok="updateSupplementaryList(1)">
      <Input v-model="dealMeg.remark" placeholder="备注："/>
    </Modal>

    <Modal
      v-model="modalInput"
      title="上传数据">
      <Upload
        :before-upload="handleUpload"
        action="">
        <Button type="ghost" icon="ios-cloud-upload-outline">选择要上传的Excel文件</Button>
      </Upload>
      <div v-if="file !== null">待上传文件：{{ file.name }}
        <Button type="text" @click="upload">点击上传</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import supplementaryMedica from '../../../store/modules/health_medical/data_sources/supplementary_medica.js'
  import apiAjax from "../../../data/health_medical/supplementary_medica.js";
  import qs from "qs"

  export default {
    data() {
      return {
        collapseInfo: [1, 2, 3], //展开栏
        modalAccept: false,
        modalRefuse: false,
        modalInput: false,
        file: null,
        formItem: {
          total: 0,
          current: 1,
          size: 10,
          inputDateRange: [],
          auditTimeRange: [],
          status: null,
          dossierNumber: null,
          acceptanceId: null,
          employeeId: null,
          employeeName: null,
          companyId: null,
          companyName: null,
          managementId: null,
          managementName: null,
          insuredName: null,
        },
        selectData: [],
        statisticsData: {},
        statusProperties: supplementaryMedica.statusProperties,
        supplementColumns: [
          {
            type: 'selection', width: 60, align: 'center'
          },
          {
            title: '受理编号', sortable: true, key: 'acceptanceId'
          },
          {
            title: '案卷号', sortable: true, key: 'dossierNumber'
          },
          {
            title: '导入日期', sortable: true, key: 'inputDate',
            render: (h, params) => {
              return h('div', this.$utils.formatDate(params.row.inputDate, 'YYYY-MM-DD HH:mm:ss'));
            }
          },
          {
            title: '雇员编号', sortable: true, key: 'employeeId'
          },
          {
            title: '雇员姓名', sortable: true, key: 'employeeName'
          },
          {
            title: '公司编号', sortable: true, key: 'companyId'
          },
          {
            title: '公司名称', sortable: true, key: 'companyName'
          },
          {
            title: '状态', sortable: true, key: 'status',
            render: (h, params) => {
              return h('div', supplementaryMedica.statusToChina(params.row.status));
            }
          },
          {
            title: '处理日期', sortable: true, key: 'auditTime',
            render: (h, params) => {
              if (params.row.auditTime !== null) {
                return h('div', this.$utils.formatDate(params.row.auditTime, 'YYYY-MM-DD HH:mm:ss'));
              }
            }
          },
          {
            title: '发票合计', sortable: true, key: 'invoiceNumber'
          },
          {
            title: '公司理赔金额', sortable: true, key: 'totalCompanyAmount'
          },
          {
            title: '保险公司理赔金额', sortable: true, key: 'totalInsuranceCompanyMoney'
          },
          {
            title: '操作', key: 'action', width: 240, align: 'center',
            render: (h, params) => {
              // if (params.row.status === 0) {
              //   return h('div', [
              //     h('Button', {
              //       props: {type: 'success', size: 'small'},
              //       style: {marginRight: '5px'},
              //       on: {
              //         click: () => {
              //           // this.updateSupplementary(1);
              //           this.$Modal.success({title: '补充医疗理赔受理', content: `审核通过`});
              //         }
              //       }
              //     }, '审核通过'),
              //     h('Button', {
              //       props: {type: 'success', size: 'small'},
              //       style: {marginRight: '5px'},
              //       on: {
              //         click: () => {
              //           this.$Modal.info({title: '补充医疗理赔受理', content: `批退完成`});
              //         }
              //       }
              //     }, '批退'),
              //     h('Button', {
              //       props: {
              //         type: 'success', size: 'small'
              //       },
              //       on: {
              //         click: () => {
              //           sessionStorage.setItem('acceptanceId', JSON.stringify(params.row.acceptanceId));
              //           this.$router.push({name: 'InvoiceList'});
              //         }
              //       }
              //     }, '发票明细')
              //   ]);
              // } else {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success', size: 'small'
                  },
                  on: {
                    click: () => {
                      sessionStorage.setItem('acceptanceId', JSON.stringify(params.row.acceptanceId));
                      this.$router.push({name: 'InvoiceList'});
                    }
                  }
                }, '发票明细')
              ]);
              // }
            }
          }
        ],
        supplementData: [],
        userInfo: {},
        dealMeg: {
          auditor: null,
          auditTime: new Date(),
          status: null,
          rejectType: null,
          remark: null,
        },
        category: [
          {
            value: 'status4', label: '补充医疗'
          },
          {
            value: 'status0', label: '保前保后'
          },
          {
            value: 'status1', label: '特需'
          },
          {
            value: 'status2', label: '本部特需'
          }
        ]
      }
    },
    created() {
      this.getByPage(1);
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      this.dealMeg.handler = this.userInfo.displayName;
    },
    methods: {
      handleUpload(file) {
        this.file = file;
        return false;
      },
      upload() {
        let data = {file: this.file};
        apiAjax.importAcceptanceXls(data).then(response => {
          if (response.data.code === 200) {
            this.$Message.success("上传成功");
          } else {
            this.$Message.error("服务器异常，请稍后再试");
          }
        }).catch(e => {
          console.info(e.message);
          this.$Message.error("服务器异常，请稍后再试");
        });
      },
      querySupplementaryList() {
        apiAjax.queryAcceptancePage(this.formItem).then(response => {
          this.supplementData = response.data.object.records;
          // 已经审核的屏蔽复选框
          this.supplementData.forEach(item => {
            if (item.status !== 0) {
              item._disabled = true;
            }
          });
          this.formItem.total = response.data.object.total;
        }).catch(e => {
          console.info(e.message);
          this.$Message.error("服务器异常，请稍后再试");
        });

        apiAjax.queryAcceptanceTotal(this.formItem).then(response => {
          this.statisticsData = response.data.object;
        }).catch(e => {
          console.info(e.message);
          this.$Message.error("服务器异常，请稍后再试");
        });
      },
      updateSupplementaryList(val) {
        this.selectData.forEach(item => {
          item.status = val;
          item.remark = this.dealMeg.remark;
          item.auditTime = new Date();
          item.auditor = this.dealMeg.auditor;
        });
        apiAjax.updateAcceptanceList(this.selectData).then(response => {
          if (response.data.code === 200) {
            this.getByPage(1);
          } else {
            this.$Message.error("服务器异常，请稍后再试");
          }
        }).catch(e => {
          console.info(e.message);
          this.$Message.error("服务器异常，请稍后再试");
        });
        // modal数据重置
        this.dealMeg.remark = null;
      },
      modalButton(val) {
        if (this.selectData.length === 0) {
          this.$Message.error("请选择受理单");
          return;
        }
        if (val) {
          this.modalAccept = true;
        } else {
          this.modalRefuse = true;
        }
      },
      selectTableData(rows) {
        this.selectData = rows;
      },
      getByPage(val) {
        this.formItem.current = val;
        this.querySupplementaryList()
      },
      pageSizeChange(size) {
        this.formItem.size = size;
        this.querySupplementaryList()
      },
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      remove(index) {
        this.data6.splice(index, 1);
      },
      exportData() {
        window.location = process.env.HOST_SUPPLEMENTMEDICAL + '/supplyMedicalService/export?' + qs.stringify(this.formItem)
      }
    }
  }
</script>
