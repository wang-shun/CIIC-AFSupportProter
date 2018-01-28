<template>
  <div>
    <Card class="mt15">
      <p slot="title">雇员信息</p>
      <Row justify="start" class="m15">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <span>雇员编号:</span>
        <span>423135465</span>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <span>雇员姓名:</span>
        <span>wisdom</span>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <span>公司编号:</span>
        <span>423135465</span>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <span>公司名称:</span>
        <span>wisdom</span>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <span>终止日期:</span>
        <span>2015-12-13</span>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <span>退保日期:</span>
        <span>2015-12-13</span>
        </Col>
      </Row>
    </Card>

    <Card class="mt15">
      <p slot="title">受理单信息</p>
      <Row justify="start" class="m15">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <span>案卷号:</span>
        <span>CIICY201801241037</span>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <span>发票合计:</span>
        <span>2</span>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <span>导入日期:</span>
        <span>2015-12-13</span>
        </Col>
      </Row>
    </Card>

    <div class="tr m20">
      <Button type="info" @click="exportData(1)" icon="ios-download-outline">导出</Button>
    </div>

    <Table border :columns="columns7" :data="data6" ref="table"></Table>
  </div>
</template>

<script>
  import invoiceExpend from './InvoiceExpend.vue';

  export default {
    components: {invoiceExpend},
    data() {
      return {
        collapseInfo: [1, 2, 3], //展开栏
        value1: '1',
        formItem: {
          input: '',
          select: '',
          select1: '',
          radio: 'male',
          checkbox: [],
          switch: true,
          date: '',
          time: '',
          slider: [20, 50],
          textarea: ''
        },
        columns7: [
          {
            type: 'expand', width: 50,
            render: (h, params) => {
              return h(invoiceExpend, {
                props: {
                  row: params.row
                }
              })
            }
          },
          {
            title: '雇员编号', sortable: true, key: 'employeeId'
          },
          {
            title: '雇员姓名', sortable: true, key: 'employeeName'
          },
          {
            title: '连带被保险人', sortable: true, key: 'column3'
          },
          {
            title: '所属保单', sortable: true, key: 'column12'
          },
          {
            title: '申请金额', sortable: true, key: 'applicationAmount'
          },
          {
            title: '核准金额', sortable: true, key: 'approvedAmount'
          },
          {
            title: '疾病名称', sortable: true, key: 'diseaseName'
          },
          {
            title: '投保日期', sortable: true, key: 'column7'
          },
          {
            title: '退保日期', sortable: true, key: 'column8'
          },
          {
            title: '受理日期', sortable: true, key: 'auditTime'
          },
          {
            title: '发票类型', sortable: true, key: 'column10'
          }
        ],
        data6: [
          {
            column1: '10E2143',
            column2: '张若',
            column3: '张维',
            column4: '59',
            column5: '59',
            column6: '急性扁桃体',
            column7: '2016-01-06',
            column8: '',
            column9: '2017-08-06',
            column10: '无医保',
            column12: '意外伤害2017'
          },
          {
            column1: '10E2143',
            column2: '张若',
            column3: '张维',
            column4: '59',
            column5: '59',
            column6: '急性扁桃体',
            column7: '2016-01-06',
            column8: '',
            column9: '2017-08-06',
            column10: '无医保',
            column12: '意外伤害2017'
          }
        ],

        taskStatus: [
          {
            value: 'status1', label: '未审核'
          },
          {
            value: 'status2', label: '已审核未付款'
          },
          {
            value: 'status3', label: '已完成'
          }
        ]
      }
    },
    methods: {
      update() {
        this.$router.push({name: "SupplementaryMedicalList"});
      },
      remove(index) {
        this.data6.splice(index, 1);
      },
      // 导出csv
      exportData(type) {
        if (type === 1) {
          this.$refs.table.exportCsv({
            filename: '原始数据'
          });
        } else if (type === 2) {
          this.$refs.table.exportCsv({
            filename: '排序和过滤后的数据',
            original: false
          });
        } else if (type === 3) {
          this.$refs.table.exportCsv({
            filename: '自定义数据',
            columns: this.columns8.filter((col, index) => index < 4),
            data: this.data7.filter((data, index) => index < 4)
          });
        }
      }
    }
  }
</script>
