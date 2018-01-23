<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        查看差异
        <div slot="content">
          <Form :label-width=150 ref="operatorSearchData" :model="operatorSearchData">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员姓名：" prop="employeeName">
                  <Input v-model="operatorSearchData.employeeName" placeholder="请输入..." :disabled="disabled"></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="差异：" prop="differenceValue">
                  <Select v-model="operatorSearchData.differenceValue" style="width: 100%;" transfer>
                    <Option v-for="item in differenceList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Button type="primary" icon="ios-search">查询</Button>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公积金月份：">
                  {{fundMonth}}
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公积金企业账户名称：">
                  {{fundCompanyAccountName}}
                </Form-item>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <Form :label-width=150 >
      <Row class="mt20">
        <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="导入总记录数：">
            {{importCount}}
          </Form-item>
        </Col>
        <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="系统不存在总数：">
            {{systemNotExistCount}}
          </Form-item>
        </Col>
        <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="金额差异总数：">
            {{priceDifferenceCount}}
          </Form-item>
        </Col>
      </Row>
    </Form>
    <Row class="mt20">
      <Col :sm="{span:24}">
        <Table border :columns="fundYearAdjustViewDifferenceColumns" :data="data.fundYearAdjustViewDifferenceData"></Table>
        <Page :total="4" :page-size="5" :page-size-opts="[5, 10]" show-sizer show-total  class="pageSize"></Page>
      </Col>
    </Row>
    <Row class="mt20">
      <Col :sm="{span:24}" class="tr">
        <Button type="info">导出Excel</Button>
        <Button type="warning" @click="goBack">返回</Button>
      </Col>
    </Row>

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
          employeeName: "",
          differenceValue: 0
        },
        fundMonth: "201705",
        fundCompanyAccountName: "独立户客户1",

        importCount: "788",
        systemNotExistCount: "33",
        priceDifferenceCount: "66",

        differenceList: [
          {label: "系统不存在", value: 0},
          {label: "金额差异", value: 1}
        ],

        fundYearAdjustViewDifferenceColumns: [
          {title: '导入公积金账号', key: 'importFundAccount', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.importFundAccount),
              ]);
            }
          },
          {title: '姓名', key: 'name', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.name),
              ]);
            }
          },
          {title: '导入值', key: 'importValue', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.importValue),
              ]);
            }
          },
          {title: '系统值', key: 'systemValue', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.systemValue),
              ]);
            }
          },
          {title: '差异', key: 'difference', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.difference),
              ]);
            }
          }
        ]
      }
    },
    mounted() {
      this[EventType.FUNDYEARADJUSTVIEWDIFFERENCE]()
    },
    computed: {
      ...mapState('fundYearAdjustViewDifference',{
        data:state => state.data
      })
    },
    methods: {
      ...mapActions('fundYearAdjustViewDifference',[EventType.FUNDYEARADJUSTVIEWDIFFERENCE]),
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>
