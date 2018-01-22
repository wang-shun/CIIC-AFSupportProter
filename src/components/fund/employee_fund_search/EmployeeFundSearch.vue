<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        雇员社保查询
        <div slot="content">
          <Form :label-width=150 ref="searchCondition" :model="searchCondition">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客服中心：" prop="serviceCenterValue">
                  <Cascader :data="serviceCenterData" v-model="searchCondition.serviceCenterValue" trigger="hover" transfer></Cascader>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员编号：" prop="employeeNumber">
                  <Input v-model="searchCondition.employeeNumber" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户公积金账户：" prop="customerFundAccount">
                  <Input v-model="searchCondition.customerFundAccount" @on-focus="isShowCompanyFoundAccountList = true" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="社保账户类型：" prop="accountTypeValue">
                  <Select v-model="searchCondition.accountTypeValue" style="width: 100%;" transfer>
                    <Option v-for="item in accountTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员姓名：" prop="employeeName">
                  <Input v-model="searchCondition.employeeName" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="缴费银行：" prop="payBankValue">
                  <Select v-model="searchCondition.payBankValue" style="width: 100%;" transfer>
                    <Option v-for="item in payBankList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客服经理：" prop="serviceManager">
                  <Input v-model="searchCondition.serviceManager" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="身份证号：" prop="idNumber">
                  <Input v-model="searchCondition.idNumber" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="上下岗状态：" prop="workStatusValue">
                  <Select v-model="searchCondition.workStatusValue" style="width: 100%;" transfer>
                    <Option v-for="item in workStatusList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="提示操作：" prop="tipsOperatorValue">
                <Select v-model="searchCondition.tipsOperatorValue" style="width: 100%;" transfer>
                  <Option v-for="item in operatorTipsList" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 24}" class="tr">
                <Button type="primary" icon="ios-search">查询</Button>
                <Button type="warning" @click="resetSearchCondition('searchCondition')" class="ml10">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>
    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="info">导出</Button>
        <Button type="info" class="ml10" @click="isShowImportFundAccount = true;">批量导入公积金账号</Button>
      </Col>
    </Row>
    <Table border class="mt20" :row-class-name="rowClassName" :columns="employeeFundColumns" :data="data.employeeFundData"></Table>
    <Page :total="100" show-sizer show-elevator></Page>

    <!-- 企业公积金账户分类 模态框 -->
    <Modal
      v-model="isShowCompanyFoundAccountList"
      title="企业公积金账户分类"
      width="720"
      @on-ok="ok"
      @on-cancel="cancel">
      <company-fund-account-search-modal :companyFundAccountData="data.companyFundAccountList"></company-fund-account-search-modal>
    </Modal>

    <!-- 公司名称 模态框 -->
    <Modal
      v-model="isShowCompanyName"
      title="公司名称"
      width="720"
      @on-ok="ok"
      @on-cancel="cancel">
      <company-modal :companyData="data.companyData"></company-modal>
    </Modal>

    <!-- 批量导入公积金账号 模态框 -->
    <Modal
      v-model="isShowImportFundAccount"
      title="批量导入操作">
      <Form :label-width=100>
        <Row type="flex" justify="start">
          <Col :sm="{span: 12, offset: 6}" class="tc">
            <Form-item label="上传Excel：">
              <Upload action="">
                <Button type="ghost" icon="ios-cloud-upload-outline">选择文件上传</Button>
              </Upload>
            </Form-item>
          </Col>
        </Row>
        <Alert type="error" closable show-icon v-show="isImported">导入文件格式验证失败！</Alert>
        <Alert type="warning" closable show-icon v-show="isImported">
          请注意导入结果反馈
          <template slot="desc">
          导入总数：213<br/>
          导入成功：200<br/>
          失败总数：<span class="tred">13</span><br/>
          <a href="javascript:;" @click="isShowImportFundAccount = false; isShowHistoryImported = true;">查看失败详细</a> | <a href="javascript:;" @click="isShowImportFundAccount = false;">结束操作</a>
        </template>
        </Alert>
        <Row>
          <Col :sm="{span: 22, offset: 1}" class="tr">
            <Button type="info" @click="isImported = true;">导入数据</Button>
            <Button type="primary" @click="gotoHistoryList">查看历史导入</Button>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="warning" @click="isShowImportFundAccount = false">返回</Button>
      </div>
    </Modal>

    <!-- 历史导入 模态框 -->
    <Modal
      v-model="isShowHistoryImported"
      title="历史导入"
      width="720">
      <Table border class="mt20" :columns="historyImportedColumns" :data="data.importFailedData"></Table>
      <div slot="footer">
        <Button type="warning" @click="isShowHistoryImported = false">返回</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import companyFundAccountSearchModal from '../common/CompanyFundAccountSearchModal.vue'
  import companyModal from '../../common_control/CompanyModal.vue'
  import EventTypes from '../../../store/event_types'

  export default {
    components: {companyFundAccountSearchModal, companyModal},
    data() {
      return {
        collapseInfo: [1], //展开栏
        searchCondition: {
          serviceCenterValue: "",
          employeeNumber: "",
          customerFundAccount: "",
          accountTypeValue: "",
          employeeName: "",
          payBankValue: "",
          serviceManager: "",
          idNumber: "",
          workStatusValue: "",
          tipsOperatorValue: ""
        },
        serviceCenterData: [
          {value: 1, label: '大客户', children: [{value: '1-1', label: '大客户1'}, {value: '1-2', label: '大客户2'}]},
          {value: 2, label: '日本客户'},
          {value: 3, label: '虹桥'},
          {value: 4, label: '浦东'}
        ], //客服中心
        accountTypeList: [
          {value: 0, label: '独立户'},
          {value: 1, label: '大库'},
          {value: 2, label: '外包'}
        ],
        isShowCompanyFoundAccountList: false, //显示企业公积金账户列表
        isShowCompanyName: false, //显示公司名称
        payBankList: [
          {value: 0, label: '徐汇支行'},
          {value: 1, label: '卢湾支行'},
          {value: 2, label: '西郊支行'},
          {value: 3, label: '东方路支行'},
          {value: 4, label: '其他'}
        ],
        workStatusList: [
          {value: 0, label: '在职'},
          {value: 1, label: '离职'}
        ],
        operatorTipsList: [
          {value: 0, label: '要做'},
          {value: 1, label: '中心'},
          {value: 2, label: '中智'},
          {value: 3, label: '原单位'},
          {value: 4, label: '其他独立开户公司'},
          {value: 5, label: '外包'}
        ],
        isShowImportFundAccount: false,
        employeeFundColumns: [
          {title: '操作', align: 'center', width: 120,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {type: 'success', size: 'small'},
                  style: {margin: '0 auto'},
                  on: {
                    click: () => {
                      this.$router.push({name: 'employeeFundBasicInfo'})
                    }
                  }
                }, '查看/修改'),
              ]);
            }
          },
          {title: '客户编号', key: 'customerNumber', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.customerNumber),
              ]);
            }
          },
          {title: '客户名称', key: 'customerName', align: 'center', width: 350,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.customerName),
              ]);
            }
          },
          {title: '企业账户类型', key: 'companyAccountType', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companyAccountType),
              ]);
            }
          },
          {title: '雇员编码', key: 'employeeNumber', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.employeeNumber),
              ]);
            }
          },
          {title: '雇员姓名', key: 'employeeName', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employeeName),
              ]);
            }
          },
          {title: '证件号', key: 'idNumber', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.idNumber),
              ]);
            }
          },
          {title: '基本公积金账号', key: 'basicFundAccount', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.basicFundAccount),
              ]);
            }
          },
          {title: '基本公积金状态', key: 'basicFundStatus', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.basicFundStatus),
              ]);
            }
          },
          {title: '补充公积金账号', key: 'addFundAccount', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.addFundAccount),
              ]);
            }
          },
          {title: '补充公积金状态', key: 'addFundStatus', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.addFundStatus),
              ]);
            }
          },
          {title: '上下岗状态', key: 'workStatus', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', {style: {color: params.row.workStatus === '离职' ? 'red' : '#495060'}}, params.row.workStatus),
              ]);
            }
          },
          {title: '客服中心', key: 'serviceCenter', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.serviceCenter),
              ]);
            }
          },
          {title: '客服经理', key: 'serviceManager', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.serviceManager),
              ]);
            }
          },
          {title: '操作提示', key: 'operatorTips', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.operatorTips),
              ]);
            }
          },
          {title: '操作提示日期', key: 'operatorTipDate', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.operatorTipDate),
              ]);
            }
          },
          {title: '操作提示日期', key: 'notes', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.notes),
              ]);
            }
          }
        ],
        isImported: false,
        isShowHistoryImported: false,
        historyImportedColumns: [
          {title: '公司编码', key: 'companyNumber', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.companyNumber),
              ]);
            }
          },
          {title: '公司名称', key: 'companyName', align: 'center', width: 350,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companyName),
              ]);
            }
          },
          {title: '雇员编码', key: 'employeeNumber', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.employeeNumber),
              ]);
            }
          },
          {title: '雇员姓名', key: 'employeeName', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employeeName),
              ]);
            }
          },
          {title: '证件号', key: 'idNumber', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.idNumber),
              ]);
            }
          },
          {title: '基本公积金账号', key: 'basicFundAccount', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.basicFundAccount),
              ]);
            }
          },
          {title: '补充公积金账号', key: 'addFundAccount', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.addFundAccount),
              ]);
            }
          }
        ]
      }
    },
    mounted() {
      this[EventTypes.EMPLOYEEFUNDSEARCHTYPE]()
    },
    computed: {
      ...mapState('employeeFundSearch', {
        data: state => state.data
      })
    },
    methods: {
      ...mapActions('employeeFundSearch', [EventTypes.EMPLOYEEFUNDSEARCHTYPE]),
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      gotoHistoryList() {
        this.$router.push({name: 'employeeFundHistory'})
      },
      rowClassName(row, index) {
        if(row.companyAccountType === "中智大库") {
          return "dk_bg"
        } else if(row.companyAccountType === "中智外包") {
          return "wb_bg"
        } else if(row.companyAccountType === "独立户") {
          return "dl_bg"
        } else {
          return ""
        }
      },
      ok() {

      },
      cancel() {

      }
    }
  }
</script>
<style>
  .tred {color: red;}
  .ivu-table .dk_bg td{
    background-color: #bdddfe;
  }
  .ivu-table .wb_bg td{
    background-color: #fee6c3;
  }
  .ivu-table .dl_bg td{
    background-color: #ffe2db;
  }
</style>
