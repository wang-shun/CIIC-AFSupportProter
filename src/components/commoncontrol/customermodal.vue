<template>
  <!-- 客户名称 模态框内容 -->
  <Form :label-width=100>
    <Row type="flex" justify="start">
      <Col :sm="{span: 12}">
        <Form-item label="客户编号">
          <Input v-model="mCustomerNumber" icon="ios-search" placeholder="请输入..."></Input>
        </Form-item>
      </Col>
      <Col :sm="{span: 12}">
        <Form-item label="客户姓名">
          <Input v-model="mCustomerName" icon="ios-search" placeholder="请输入..."></Input>
        </Form-item>
      </Col>
    </Row>
    <Row>
      <Col :sm="{span: 24}" class="tr">
        <Button type="primary" icon="ios-search">查询</Button>
      </Col>
    </Row>
    <Row>
      <Table border="" :columns="customerColumns" :data="customerData" class="mt20" highlight-row ref="currentRowTable" @on-current-change="getCurrentRow"></Table>
      <Page :current="2" :total="50" simple></Page>
    </Row>
  </Form>
</template>
<script>
  import EventTypes from '../../store/EventTypes'
export default {
    name:"customerModal",
    props: {
      customerData: {
        require: true,
        type: Array
      }
    },
    data() {
      return {
        mCustomerNumber: '', //客户编号
        mCustomerName: '', //客户姓名
        customerColumns: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
          {title: '客户名称', key: 'name', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.name),
              ]);
            }
          },
          {title: '公司编号', key: 'code', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.code),
              ]);
            }
          },
          {title: '企业性质', key: 'nature', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.nature),
              ]);
            }
          },
          {title: '企业类型', key: 'type', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.type),
              ]);
            }
          },
        ]
      }
    },
    mounted() {

    },
    computed: {

    },
    methods: {
      getCurrentRow(currentRow,oldCurrentRow){
        debugger
        this.$store.commit(EventTypes.CTHISMONTHHANDLETYPE,currentRow)
      }

    }
  }
</script>