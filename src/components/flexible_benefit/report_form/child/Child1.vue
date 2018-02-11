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
          {title: '雇员姓名', key: ''},
          {title: '资深雇员编号',key: ''},
          {title: '性别',key: '',width:70},
          {title: '公司编号',key: ''},
          {title: '公司名称',key: ''},
          {title: '联系地址',key: ''},
          {title: '联系邮编',key: ''},
          {title: '联系电话',key: ''},
          {title: '手机号码',key: ''},
          {title: '客户经理',key: ''},
          {title: '服务中心',key: ''},
          {title: '雇员职位',key: ''},
          {title: '雇员生日',key: ''},
          {title: '首次进入中智日期',key: ''},
          {title: '输入日期',key: ''},
          {title: '身份证号码',key: '',width:100},
          {title: '所在城市',key: ''},
          {title: '有无活动费',key: '',width:100}
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
