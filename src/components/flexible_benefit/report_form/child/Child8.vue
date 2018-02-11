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
          {title: '日常联系地址',key: ''},
          {title: '电话',key: ''},
          {title: '联系邮编',key: ''},
          {title: '传真',key: ''},
          {title: '雇员编号',key: ''},
          {title: '雇员姓名',key: ''},
          {title: '输入日期',key: ''},
          {title: '首次进入中智时间',key: ''},
          {title: '身份证号码',key: ''},
          {title: '中止',key: ''},
          {title: '职务职位',key: ''},
          {title: '服务中心',key: ''},
          {title: 'TEAM',key: ''},
          {title: '出生日期',key: ''},
          {title: '手机号码',key: ''},
          {title: '雇员卡已办日期',key: ''},
          {title: '雇员卡已发日期',key: ''},
          {title: '户口状况',key: ''},
          {title: '服装费月份',key: ''}
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
