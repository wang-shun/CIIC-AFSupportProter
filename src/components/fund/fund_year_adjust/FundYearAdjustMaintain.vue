<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        导入结果维护
        <div slot="content">
          <Form :label-width=150 ref="operatorSearchData" :model="operatorSearchData">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="所属调整年份：" prop="belongAdjustYear">
                  {{operatorSearchData.belongAdjustYear}}
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户编号：" prop="customerNumber">
                  {{operatorSearchData.customerNumber}}
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户名称：" prop="customerNumber">
                  {{operatorSearchData.customerName}}
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员姓名：" prop="employeeName">
                  <Input v-model="operatorSearchData.employeeName" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员证件号：" prop="employeeIdNumber">
                  <Input v-model="operatorSearchData.employeeIdNumber" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公积金基数：" prop="fundBase">
                  <InputNumber :max="2000" :min="0" v-model="operatorSearchData.fundBase" style="width: 100%;"></InputNumber>
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
      <Col :sm="{span:24}" class="tr">
        <Button type="info">导出</Button>
        <Button type="warning" @click="goBack">返回</Button>
      </Col>
    </Row>
    <Row class="mt20">
      <Col :sm="{span:24}">
        <Table border :columns="maintainColumns" :data="data.maintainData"></Table>
        <Page :total="4" :page-size="5" :page-size-opts="[5, 10]" show-sizer show-total  class="pageSize"></Page>
      </Col>
    </Row>

    <Modal
      v-model="isShowModifyApplyBase"
      title="修改申报基数"
    >
      <Form :label-width=150>
        <Row>
          <Col :sm="{span: 16, offset: 2}">
            <Form-item label="申报基数">
              <InputNumber v-model="modifyApplyBase" style="width: 100%;"></InputNumber>
            </Form-item>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="isShowModifyApplyBase = false;">确认修改</Button>
        <Button type="warning" @click="isShowModifyApplyBase = false;">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventType from '../../../store/event_types'

  export default {
    data() {
      return {
        collapseInfo: [1],
        operatorSearchData: {
          belongAdjustYear: "2017",
          customerNumber: "2001",
          customerName: "XXX有限公司",
          employeeName: "",
          employeeIdNumber: "",
          fundBase: ""
        },
        isShowModifyApplyBase: false,
        modifyApplyBase: 0,
        maintainColumns: [
          {title: '操作', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('a', {
                  on: {
                    click: () => {
                      this.isShowModifyApplyBase = true;
                    }
                  }
                }, '修改'),
              ]);
            }
          },
          {title: '客户编码', key: 'customerNumber', align: 'center', width: 180,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.customerNumber),
              ]);
            }
          },
          {title: '客户名称', key: 'customerName', align: 'center', width: 250,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.customerName),
              ]);
            }
          },
          {title: '雇员编码', key: 'employeeNumber', align: 'center', width: 180,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.employeeNumber),
              ]);
            }
          },
          {title: '雇员姓名', key: 'employeeName', align: 'center', width: 180,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.employeeName),
              ]);
            }
          },
          {title: '证件号', key: 'IdNumber', align: 'center', width: 249,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.IdNumber),
              ]);
            }
          },
          {title: '入离职状态', key: 'workStatus', align: 'center', width: 180,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.workStatus),
              ]);
            }
          },
          {title: '公积金基数', key: 'fundBase', align: 'center', width: 180,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.fundBase),
              ]);
            }
          },
        ]
      }
    },
    mounted() {
      this[EventType.FUNDYEARADJUSTMAINTAIN]()
    },
    computed: {
      ...mapState('fundYearAdjustMaintain',{
        data:state => state.data
      })
    },
    methods: {
      ...mapActions('fundYearAdjustMaintain',[EventType.FUNDYEARADJUSTMAINTAIN]),
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>
