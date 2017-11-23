<template>
  <!-- 客户名称 模态框内容 -->
  <Form :label-width=80>
    <Row type="flex" justify="start">
      <Col :sm="{span: 10, offset: 1}">
        <Form-item label="企业编号：">
          <Input v-model="mCompanyNumber" icon="ios-search" placeholder="请输入..."></Input>
        </Form-item>
      </Col>
      <Col :sm="{span: 10, offset: 2}">
        <Form-item label="企业名称：">
          <Input v-model="mCompanyName" icon="ios-search" placeholder="请输入..."></Input>
        </Form-item>
      </Col>
    </Row>
    <Row>
      <Col :sm="{span: 23}" class="tr">
        <Button type="primary" icon="ios-search">查询</Button>
      </Col>
    </Row>
    <Row>
      <Col :sm="{span: 22, offset: 1}">
        <Table border="" :columns="customerColumns" :data="companyData" class="mt20"></Table>
        <Page :current="2" :total="50" simple></Page>
      </Col>
    </Row>
  </Form>
</template>
<script>
  export default {
    props: {
      companyData: {
        require: true,
        type: Array
      }
    },
    data() {
      return {
        mCompanyNumber: '', //公司编号
        mCompanyName: '', //公司姓名
        customerColumns: [
          {title: '公司名称', key: 'name', align: 'center',
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

    }
  }
</script>
