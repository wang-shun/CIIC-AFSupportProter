<template>
  <div>
     <Row style="margin: 10px; 0px; 5px; 0px;">
      <i-col style="text-align: right">
        <Button type="primary" @click="imp">导出报表</Button>
      </i-col>
    </Row>

    <Table border :columns="colums1" :data="data1"></Table>
     <Page @on-change="handleCurrentChange"
              :current="pageNum"
              :page-size="pageSize"
              :total="total" show-elevator show-total></Page>
  </div>
</template>
<script>
  export default {
    props: {
      queryParam: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data () {
      return {
        pageNum: 1,
        pageSize: 5,
        total: null,
        colums1: [
          {title: '客户经理', key: 'manager'},
          {title: '客户总监',key: 'majordomo'},
          {title: '公司编号',key: 'companyId'},
          {title: '公司名称',key: 'companyName'},
          {title: '公司联系人',key: '',width:120},
          {title: '电话',key: ''},
          {title: '地址',key: ''},
          {title: '邮编',key: ''},
          {title: '服务产品',key: 'product'},
          {title: '人数',key: ''},
          {title: '电子邮箱',key: ''},
          {title: '联系电话',key: ''},
          {title: '手机',key: ''},
          {title: '传真号码',key: ''}
        ],
        data1: []
      }
    },
    created () {
      this.find()
    },
    methods: {
      find () {

      },
      handleCurrentChange (val) {
        this.pageNum = val
        this.find()
      },
      imp () {

      }
    }
  }
</script>
<style scoped>

</style>
