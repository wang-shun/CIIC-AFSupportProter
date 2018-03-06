<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        公积金对账
        <div slot="content">
          <Form :label-width=150 ref="operatorSearchData" :model="operatorSearchData">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公积金月份：" prop="fundMonth">
                  <DatePicker type="month" placement="bottom" placeholder="选择日期" transfer @on-change="setSearchFundMonth"></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公积金企业账户：" prop="fundCompanyAccountCategoryValue">
                  <InputAccount v-model="operatorSearchData.fundCompanyAccountCategoryValue"></InputAccount>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 24}" class="tr">
                <Button type="primary" icon="ios-search">查询</Button>
                <Button type="warning" @click="resetSearchCondition('operatorSearchData')">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>
    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="primary" @click="isShowUpload = true">新建对账</Button>
      </Col>
    </Row>
    <Table border class="mt20" :columns="reconciliationColumns" :data="data.reconciliationData"></Table>
    <Page :total="4" :page-size="5" :page-size-opts="[5, 10]" show-sizer show-total  class="pageSize"></Page>

    <Modal
      v-model="isShowReconciliation"
      title="查看对账"
      width="720"
    >
      <Form :label-width=150>
        <Row type="flex" justify="start">
          <Col :sm="{span:12}">
            <Form-item label="公积金月份：">
              {{viewReconciliation.fundMonth}}
            </Form-item>
          </Col>
          <Col :sm="{span:12}">
            <Form-item label="公积金企业账户：">
              {{viewReconciliation.fundCompanyAccount}}
            </Form-item>
          </Col>
          <Col :sm="{span:12}">
            <Form-item label="导入记录总数：">
              {{viewReconciliation.importRecords}}
            </Form-item>
          </Col>
          <Col :sm="{span:12}">
            <Form-item label="差异记录总数：">
              {{viewReconciliation.differenceRecords}}
            </Form-item>
          </Col>
        </Row>
      </Form>
      <Table border class="mt20" height="200" :columns="viewReconciliationColumns" :data="data.viewReconciliationData"></Table>
      <div slot="footer">
        <Button type="info">导出Excel</Button>
        <Button type="warning" @click="isShowReconciliation = false;">返回</Button>
      </div>
    </Modal>

    <Modal
      v-model="isShowUpload"
      title="新建对账"
      width="720"
    >
      <Form :label-width=150 ref="newReconciliation" :model="newReconciliation" :rules="newReconciliationValidate">
        <Row type="flex" justify="start">
          <Col :sm="{span:24}">
            <Form-item label="公积金月份：" prop="fundMonth">
              <DatePicker type="month" @on-change="setFundMonth(false)"></DatePicker>
            </Form-item>
          </Col>
          <Col :sm="{span:24}">
            <Form-item label="公积金企业账户：" prop="fundCompanyAccountValue">
              <Select v-model="newReconciliation.fundCompanyAccountValue" style="width: 100%;" transfer>
                <Option v-for="item in fundCompanyAccountCategoryList" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm="{span:24}">
            <Form-item label="公积金类型：" prop="fundTypeValue">
              <Select v-model="newReconciliation.fundTypeValue" style="width: 100%;" transfer>
                <Option v-for="item in fundTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm="{span:24}">
            <Form-item label="选择对账文件：">
              <Upload action="//jsonplaceholder.typicode.com/posts/">
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件(支持xlsx,xls格式)</Button>
              </Upload>
            </Form-item>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="saveReconciliation">保存</Button>
        <Button type="warning" @click="resetSearchCondition('newReconciliation'); isShowUpload = false;">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventType from '../../../store/event_types'
  import InputAccount from "../common/input_account"

  export default {
    components: {InputAccount},
    data() {
      return {
        collapseInfo: [1],
        operatorSearchData: {
          fundMonth: "",
          fundCompanyAccountCategoryValue: ''
        },
        fundCompanyAccountCategoryList: [
          {label: "中智大库", value: 0},
          {label: "中智外包", value: 1},
          {label: "独立户客户1", value: 2},
          {label: "独立户客户2", value: 3},
        ],
        isShowReconciliation: false,
        isShowUpload:false,
        newReconciliation: {
          fundMonth: "",
          fundCompanyAccountValue: 0,
          fundTypeValue: 0
        },
        newReconciliationValidate: {
          fundMonth: [
            {required: true, type: 'date', message: '请选择月份', trigger: 'blur' }
          ],
          fundCompanyAccountValue: [
            { required: true, message: '请选择公积金企业账户', trigger: 'change' }
          ],
          fundTypeValue: [
            { required: true, message: '请选择公积金类型', trigger: 'change' }
          ]
        },
        viewReconciliation: {
          fundMonth: "",
          fundCompanyAccount: "",
          importRecords: "",
          differenceRecords: ""
        },
        viewReconciliationColumns: [
          {title: '导入公积金账号', key: 'importFundAccount', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.importFundAccount),
              ]);
            }
          },
          {title: '姓名', key: 'name', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.name),
              ]);
            }
          },
          {title: '导入月缴金额', key: 'importPayPrice', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.importPayPrice),
              ]);
            }
          },
          {title: '系统金额', key: 'systemPrice', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.systemPrice),
              ]);
            }
          },
          {title: '差异', key: 'difference', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.difference),
              ]);
            }
          }
        ],
        fundTypeList: [
          {label: "基本公积金", value: 0},
          {label: "补充公积金", value: 1}
        ],
        reconciliationColumns: [
          {title: '操作', fixed: 'left', width: 220, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('Button', {props: {type: 'success', size: 'small'},
                  on: {
                    click: () => {

                    }
                  }
                }, '执行对账'),
                h('Button', {props: {type: 'success', size: 'small'}, style: {marginLeft: '10px'},
                  on: {
                    click: () => {
                      this.isShowReconciliation = true;
                    }
                  }
                }, '查看'),
                h('Button', {props: {type: 'error', size: 'small'}, style: {marginLeft: '10px'},
                  on: {
                    click: () => {

                    }
                  }
                }, '删除'),
              ]);
            }
          },
          {title: '公积金月份', key: 'fundMonth', width: 176, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.fundMonth),
              ]);
            }
          },
          {title: '公积金企业账户名称', key: 'fundCompanyAccountName', width: 350, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.fundCompanyAccountName),
              ]);
            }
          },
          {title: '公积金导入文件', key: 'fundImportFile', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.fundImportFile),
              ]);
            }
          },
          {title: '公积金类型', key: 'fundType', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.fundType),
              ]);
            }
          },
          {title: '对账人', key: 'reconciliater', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.reconciliater),
              ]);
            }
          },
          {title: '对账时间', key: 'reconciliateDate', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.reconciliateDate),
              ]);
            }
          },
        ]
      }
    },
    mounted() {
      this[EventType.FUNDRECONCILIATION]()
    },
    computed: {
      ...mapState('fundReconciliation',{
        data:state => state.data
      })
    },
    methods: {
      ...mapActions('fundReconciliation', [EventType.FUNDRECONCILIATION]),
      saveReconciliation() {

      },
      setSearchFundMonth(month) {
        this.operatorSearchData.customerPayDate = month;
      },
      setFundMonth(month) {
        this.newReconciliation.fundMonth = month;
      },
      resetSearchCondition(name) {
        this.$refs[name].resetFields();
      },
    }
  }
</script>
