<template>
  <Form>
    <Row>
      <Col :sm="{span: 10, offset: 1}">
        <Form>
          <Form-item>
            <Input v-model="mAccount" icon="ios-search" placeholder="企业公积金账户..."></Input>
          </Form-item>
        </Form>
      </Col>
      <Col :sm="{span: 10, offset: 2}">
        <Form>
          <Form-item>
            <Input v-model="mCompanyName" icon="ios-search" placeholder="企业名称..."></Input>
          </Form-item>
        </Form>
      </Col>
    </Row>
    <Row>
      <Col :sm="{span: 22, offset: 1}">
        <Table border highlight-row :columns="companyFundAccountColumns" :data="filterUser"></Table>
      </Col>
    </Row>
  </Form>
</template>
<script>
  export default {
    props: {
      companyFundAccountData: {
        require: true,
        type: Array
      }
    },
    data() {
      return {
        mAccount: '', //企业公积金账户
        mCompanyName: '', //企业名称
        companyFundAccountColumns: [
          {title: '企业公积金账户', key: 'companyFundAccount', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.companyFundAccount),
              ]);
            }
          },
          {title: '企业名称', key: 'companyName', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companyName),
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
        return this.filterData(this.mAccount, this.mCompanyName)
      }
    },
    methods: {
      filterData(filterKey1, filterKey2) {
        if(filterKey1 === '' && filterKey2 === '') {
          return this.companyFundAccountData;
        }
        return this.companyFundAccountData.filter(function(sType) {
          return Object.keys(sType).some(function(key) {
            return String(sType[key]).toLowerCase().indexOf(filterKey1) > -1
          })
        })
      }
    }
  }
</script>
