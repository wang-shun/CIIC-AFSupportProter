<template>
  <div>
    <Collapse v-model="collapseInfo" accordion>
      <Panel name="1">
        受理单查询
        <div slot="content">
          <Form ref="formItem" :model="formItem" :label-width="140">
            <Row justify="start" class="mt20 mr10">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="款项类型" prop="moneyType">
                <Select v-model="formItem.moneyType" placeholder="请选择" :clearable="true">
                  <Option v-for="item in moneyTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="受理类型" prop="caseType">
                <Select v-model="formItem.caseType" placeholder="请选择" :clearable="true">
                  <Option v-for="item in caseTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="受理单编号" prop="umAcceptanceId">
                <Input v-model="formItem.umAcceptanceId" placeholder="请输入"></Input>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="审核日期" prop="auditDateRange">
                <DatePicker v-model="formItem.auditDateRange" type="daterange" placement="bottom-end"
                            placeholder="选择日期" style="width: 100%"></DatePicker>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="受理日期" prop="handlerDateRange">
                <DatePicker v-model="formItem.handlerDateRange" type="daterange" placement="bottom-end"
                            placeholder="选择日期" style="width: 100%"></DatePicker>
              </Form-item>
              </Form-item>
              </Col>
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
              <Form-item label="公司编号" prop="companyId">
                <Input v-model="formItem.companyId" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="公司名称" prop="companyName">
                <Input v-model="formItem.companyName" placeholder="请输入"/>
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
              <Form-item label="证件号码" prop="idCardType">
                <Input v-model="formItem.idCardType" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="审核" prop="status">
                <i-switch v-model="formItem.status" size="large">
                  <span slot="open">Yes</span>
                  <span slot="close">No</span>
                </i-switch>
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

    <Table border stripe ref="uninsuredTable" :columns="uninsuredColumns" :data="uninsuredData"></Table>
    <Page :total="100" show-sizer show-elevator></Page>
  </div>
</template>
<script>
  import admissibility from '../../../store/modules/health_medical/data_sources/admissibility.js'

  export default {
    data() {
      return {
        collapseInfo: [1, 2, 3], //展开栏
        formItem: {
          current: 1,
          size: 10,
          umAcceptanceId: null,
          moneyType: null,
          caseType: null,
          status: null,
          managementId: null,
          managementName: null,
          companyId: null,
          companyName: null,
          employeeId: null,
          employeeName: null,
          idCardType: null,
          handlerDateRange: [],
          auditDateRange: [],
        },
        uninsuredColumns: [
          {
            title: '受理编号', sortable: true, key: 'umAcceptanceId', align: 'center',
          },
          {
            title: '雇员编号', sortable: true, key: 'employeeId', align: 'center'
          },
          {
            title: '雇员姓名', sortable: true, key: 'employeeName', align: 'center'
          },
          {
            title: '公司编号', sortable: true, key: 'companyId', align: 'center'
          },
          {
            title: '公司名称', sortable: true, key: 'companyName', align: 'center'
          },
          {
            title: '受理类型', sortable: true, key: 'caseType', align: 'center',
            render: (h, params) => {
              return admissibility.caseTypeToChina(params.row.caseType)
            }
          },
          {
            title: '款项类型', sortable: true, key: 'moneyType', align: 'center',
            render: (h, params) => {
              return admissibility.moneyTypeToChina(params.row.moneyType)
            }
          },
          {
            title: '连带人', sortable: true, key: 'jointPersonName', align: 'center'
          },
          {
            title: '性别', sortable: true, key: 'gender', align: 'center',
          },
          {
            title: '报销金额', sortable: true, key: 'reimbursementMoney', align: 'center',
          },
          {
            title: '审核人', sortable: true, key: 'auditor', align: 'center',
          },
          {
            title: '审核日期', sortable: true, key: 'auditDate', align: 'center',
          },
          {
            title: '付款记录', sortable: true, key: 'payID', align: 'center',
          },
          {
            title: '操作', key: 'action', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {type: 'success', size: 'small'},
                  on: {
                    click: () => {
                      this.$router.push({name: 'uninsuredReviewDeal', params: {data: params.row}});
                    }
                  }
                }, '审核')
              ]);
            }
          }
        ],
        uninsuredData: [
          {
            umAcceptanceId: '20160215072',
            employeeId: '11L2674',
            employeeName: '戴敏',
            companyId: '13684',
            companyName: '苹果科技公司',
            caseType: 1,
            moneyType: 2,
            jointPersonName: '段嘉晨',
            gender: '女',
            reimbursementYearMonth: '2016-02',
            reimbursementMoney: '1500',
            auditor: '王正微',
            auditDate: '2016-02-15',
            payID: '1983865'
          },
          {
            umAcceptanceId: '20160215072',
            employeeId: '11L2674',
            employeeName: '戴敏',
            companyId: '13684',
            companyName: '苹果科技公司',
            caseType: 2,
            moneyType: 4,
            jointPersonName: '段嘉晨',
            gender: '女',
            reimbursementYearMonth: '2016-02',
            reimbursementMoney: '1500',
            auditor: '王正微',
            auditDate: '2016-02-15',
            payID: '1983865'
          }
        ],
        moneyTypes: admissibility.moneyTypes,
        caseTypes: admissibility.caseTypes,
        statusProperties: admissibility.statusProperties,
      }
    },
    methods: {
      queryUninsuredList() {
      },
      getByPage(val) {
        this.formItem.current = val;
        this.queryUninsuredList()
      },
      pageSizeChange(size) {
        this.formItem.size = size;
        this.queryUninsuredList()
      },
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
    },
  }

</script>
