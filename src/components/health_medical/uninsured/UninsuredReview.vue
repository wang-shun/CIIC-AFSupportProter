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
                <Input v-model="formItem.umAcceptanceId" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col v-if="formItem.status === true" :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
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
              <Form-item label="证件号码" prop="idNum">
                <Input v-model="formItem.idNum" placeholder="请输入"/>
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
    <Page :total="formItem.total"
          show-sizer
          show-elevator
          @on-change="getByPage"
          @on-page-size-change="pageSizeChange" :current.sync="formItem.current"
          :page-size="formItem.size"></Page>
  </div>
</template>
<script>
  import admissibility from '../../../store/modules/health_medical/data_sources/admissibility.js'
  import apiAjax from "../../../data/health_medical/uninsured_application.js";

  export default {
    data() {
      return {
        collapseInfo: [1, 2, 3], //展开栏
        formItem: {
          total: 0,
          current: 1,
          size: 10,
          umAcceptanceId: null,
          moneyType: null,
          caseType: null,
          status: false,
          managementId: null,
          managementName: null,
          companyId: null,
          companyName: null,
          employeeId: null,
          employeeName: null,
          idNum: null,
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
              return  h('div',admissibility.caseTypeToChina(params.row.caseType))
            }
          },
          {
            title: '款项类型', sortable: true, key: 'moneyType', align: 'center',
            render: (h, params) => {
              return  h('div',admissibility.moneyTypeToChina(params.row.moneyType))
            }
          },
          {
            title: '审核金额', sortable: true, key: 'auditAmount', align: 'center',
          },
          {
            title: '审核人', sortable: true, key: 'auditor', align: 'center',
          },
          {
            title: '审核日期', sortable: true, key: 'auditDate', align: 'center',
            render: (h, params) => {
              return  h('div',this.$utils.formatDate(params.row.auditDate, 'YYYY-MM-DD HH:mm:ss'));
            }
          },
          {
            title: '付款记录', sortable: true, key: 'payID', align: 'center',
          },
          {
            title: '连带人', sortable: true, key: 'jointPersonName', align: 'center'
          },
          {
            title: '操作', key: 'action', width: 125, align: 'center',
            render: (h, params) => {
              /**已受理并且款项类型不是子女托费的显示审核按钮*/
              if (params.row.status === 1) {
                return h('div', [
                  h('Button', {
                    props: {type: 'success', size: 'small'},
                    on: {
                      click: () => {
                        sessionStorage.setItem('umAcceptanceId', JSON.stringify(params.row.umAcceptanceId));
                        this.$router.push({name: 'uninsuredReviewDeal'});
                      }
                    }
                  }, '审核'),
                  h('Button', {
                    props: {type: 'success', size: 'small'},
                    style: {
                      marginLeft: '5px'
                    },
                    on: {
                      click: () => {
                        sessionStorage.setItem('umAcceptanceId', JSON.stringify(params.row.umAcceptanceId));
                        this.$router.push({name: 'LookAcceptanceUninsured'});
                      }
                    }
                  }, '查看')
                ]);
              } else {
                return h('div', [
                  h('Button', {
                    props: {type: 'success', size: 'small'},
                    on: {
                      click: () => {
                        sessionStorage.setItem('umAcceptanceId', JSON.stringify(params.row.umAcceptanceId));
                        this.$router.push({name: 'LookAcceptanceUninsured'});
                      }
                    }
                  }, '查看')
                ]);
              }
            }
          }
        ],
        uninsuredData: [],
        moneyTypes: admissibility.moneyTypes,
        caseTypes: admissibility.caseTypes,
        statusProperties: admissibility.statusProperties,
      }
    },
    created() {
      this.getByPage(1);
    },
    methods: {
      queryUninsuredList() {
        apiAjax.queryAcceptanceAuditList(this.formItem).then(response => {
          this.uninsuredData = response.data.object.records;
          this.formItem.total = response.data.object.total;
        }).catch(e => {
          console.info(e.message);
          this.$Message.error("服务器异常，请稍后再试");
        });
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
