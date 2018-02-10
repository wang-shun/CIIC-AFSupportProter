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
          {title: '公司编号', key: ''},
          {title: '公司名称',key: ''},
          {title: '录入日期',key: ''},
          {title: '日常联系地址',key: ''},
          {title: '联系邮编',key: ''},
          {title: '电话',key: ''},
          {title: '传真',key: ''},
          {title: '联系人',key: ''},
          {title: '电子邮箱',key: ''},
          {title: '主营产品',key: ''},
          {title: '英文名称',key: ''},
          {title: '客户总监',key: ''},
          {title: '客户经理',key: ''},
          {title: '雇员人数',key: ''},
          {title: '中止',key: ''},
          {title: '独立用工',key: ''},
          {title: '客户属性',key: ''},
          {title: '机构性质',key: ''},
          {title: '服务类型',key: ''}
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
