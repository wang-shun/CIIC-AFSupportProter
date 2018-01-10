<template>
  <div>
    <Table border :columns="injuryReportManageColumns" :data="injuryReportManage" class="mt20"></Table>
    <Row type="flex" justify="start" class="mt20">
      <Col class="tr">
        <Button type="primary">新增</Button>
        <Button type="error">删除</Button>
        <Button type="primary">提交</Button>
      </Col>
    </Row>
  </div>
</template>
<script>
  export default {
    props: {
      injuryReportManageInfo: {
        type: Array
      }
    },
    data() {
      return {
        injuryReportManageColumns: [
          {title: '工伤认定日期', key: 'injuryComfirmDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.injuryComfirmDate),
              ]);
            }
          },
          {title: '鉴定结论', key: 'identifyResult', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('Select', [
                  h('Option', {props: {value: 0}}, '无等级'),
                  h('Option', {props: {value: 1}}, '1'),
                  h('Option', {props: {value: 2}}, '2'),
                  h('Option', {props: {value: 3}}, '3'),
                  h('Option', {props: {value: 4}}, '4'),
                  h('Option', {props: {value: 5}}, '5'),
                  h('Option', {props: {value: 6}}, '6'),
                  h('Option', {props: {value: 7}}, '7'),
                  h('Option', {props: {value: 8}}, '8'),
                  h('Option', {props: {value: 9}}, '9'),
                  h('Option', {props: {value: 10}}, '10'),
                ], params.row.identifyResult),
              ]);
            }
          },
          {title: '鉴定结论日期', key: 'indentifyResultDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.indentifyResultDate),
              ]);
            }
          },
          {title: '收到人', key: 'reciever', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.reciever),
              ]);
            }
          },
          {title: '申报单位', key: 'reportCompany', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('Select', [
                  h('Option', {props: {value: 0}}, '中智'),
                  h('Option', {props: {value: 1}}, '中智外包'),
                  h('Option', {props: {value: 2}}, '独立户'),
                ], params.row.reportCompany),
              ]);
            }
          },
          {title: '是否放弃鉴定', key: 'isGiveUpIndentify', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('Checkbox', {props: {value: false}}, params.row.isGiveUpIndentify),
              ]);
            }
          },
          {title: '完成', key: 'finish', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('Checkbox', {props: {value: false}}, params.row.finish),
              ]);
            }
          },
          {title: '操作员', key: 'operator', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.operator),
              ]);
            }
          },
          {title: '操作日期', key: 'operateDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.operateDate),
              ]);
            }
          },
        ]
      }
    },
    computed: {
      injuryReportManage() {
        return this.injuryReportManageInfo
      }
    }
  }
</script>
