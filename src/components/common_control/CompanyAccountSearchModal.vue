<template>
  <Form>
    <Row>
      <Col :sm="{span: 10, offset: 1}">
        <Form>
          <Form-item>
            <Input v-model="mUserNumber" icon="ios-search" placeholder="请输入参保户登记码..."></Input>
          </Form-item>
        </Form>
      </Col>
      <Col :sm="{span: 10, offset: 2}">
        <Form>
          <Form-item>
            <Input v-model="mCompanyName" icon="ios-search" placeholder="请输入养老金用公司名称..."></Input>
          </Form-item>
        </Form>
      </Col>
    </Row>
    <Row>
      <Col :sm="{span: 22, offset: 1}">
        <Table border highlight-row :columns="sSocialSecurityTypeColumns" :data="filterUser"></Table>
      </Col>
    </Row>
  </Form>
</template>
<script>
  export default {
    name: 'company-account-search-modal',
    props: {
      sSocialSecurityTypeData: {
        require: true,
        type: Array
      }
    },
    data() {
      return {
        mUserNumber: '', //参保户登记码
        mCompanyName: '', //养老金用公司名称
        sSocialSecurityTypeColumns: [
          {title: '参保户登记码', key: 'id', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.id),
              ]);
            }
          },
          {title: '企业社保账户名称', key: 'name', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.name),
              ]);
            }
          }
        ]
      }
    },
    mounted() {
    },
    computed: {
      filterUser() {
        return this.filterData(this.mUserNumber, this.mCompanyName)
      }
    },
    methods: {
      filterData(filterKey1, filterKey2) {
        if(filterKey1 === '' && filterKey2 === '') {
          return this.sSocialSecurityTypeData;
        }
        return this.sSocialSecurityTypeData.filter(function(sType) {
          return Object.keys(sType).some(function(key) {
            return String(sType[key]).toLowerCase().indexOf(filterKey1) > -1
          })
        })
      }
    }
  }
</script>
