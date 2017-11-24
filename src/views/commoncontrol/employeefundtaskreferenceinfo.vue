<template>
  <Form label-width=150>
    <Row type="flex" justify="start">
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="变更类型">
          <Select v-model="changeTypeValue" style="width: 100%;" transfer>
            <Option v-for="item in changeTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Form-item>
      </Col>
    </Row>
    <Row>
      <Col :sm="{span: 24}"></Col>
    </Row>
  </Form>
</template>
<script>
  export default {
    data() {
      return {
        changeTypeValue: '',
        changeTypeList: [
          {label: '新开', value: 0},
          {label: '转入', value: 1}
        ],
        taskReferenceInfoColumns: [
          {title: '变更内容', key: 'changeContent', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.changeContent),
              ]);
            }
          },
          {title: '公积金基数', key: 'fundBase', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.fundBase),
              ]);
            }
          },
          {title: '公积金比例', key: 'fundPercent', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.fundPercent),
              ]);
            }
          },
          {title: '起缴月份', key: 'startPayMonth', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.startPayMonth),
              ]);
            }
          },
          {title: '截至月份', key: 'endPayMonth', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.endPayMonth),
              ]);
            }
          },
          {title: '金额', key: 'price', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.price),
              ]);
            }
          }
        ],
        taskReferenceInfoData: [
          {changeContent: '汇缴', fundBase: '19000', fundPercent: '0.14', startPayMonth: '201701', endPayMonth: '', price: ''},
          {changeContent: '补缴', fundBase: '', fundPercent: '', startPayMonth: '', endPayMonth: '', price: ''},
        ]
      }
    }
  }
</script>
