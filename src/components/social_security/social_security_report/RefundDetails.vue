<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
         退费明细
        <div slot="content">
          <Form :label-width='200'>
            <Row>
              <Col :sm="{span: 23}"  style="padding-bottom:10px">
                <Button type="warning" @click="goBack" >返回</Button>
              </Col>
            </Row>
            <Table border :columns="noticeInfo.noticeColumns" :data="noticeInfo.noticeData"></Table>
            
          </Form>
        </div>
      </Panel>
    </Collapse>
    
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventType from '../../../store/event_types'
import api from '../../../api/social_security/social_security_report'
  export default {
    data() {
      return{
        recentlyCalculatedPerson:'张三',//最近计算人
        reportYearAndMonth:'201701',//社保年月
        collapseInfo: [1], //展开栏
        ssMonth:this.$route.query.ssMonth,
        ssAccount:this.$route.query.ssAccount,
        noticeInfo: {
          noticeColumns: [
            {title: '客户编号', key: 'companyId', align: 'center', width: 100, className: 'mw100',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', params.row.companyId),
                ]);
              }
            },
            {title: '客户名称', key: 'title', align: 'center', width: 220, className: 'mw240',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', params.row.title),
                ]);
              }
            },
            {title: '企业社保账号', key: 'ssAccount', align: 'center', className: 'mw200',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', params.row.ssAccount),
                ]);
              }
            },
            {title: '雇员编号', key: 'employeeId', align: 'center', className: 'mw200',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', params.row.employeeId),
                ]);
              }
            },
            {title: '雇员姓名', key: 'employeeName', align: 'center', className: 'mw200',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', params.row.employeeName),
                ]);
              }
            },
            {title: '证件号', key: 'idNum', align: 'center', width: 240,className: 'mw200',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', params.row.idNum),
                ]);
              }
            },
            {title: '类型', key: 'ty', align: 'center', className: 'mw200',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'right'}}, [
                  h('span', params.row.ty),
                ]);
              }
            },
            {title: '退账开始月', key: 'startMonth', align: 'center', className: 'mw200',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', params.row.startMonth),
                ]);
              }
            },
            {title: '退账截至月', key: 'endMonth', align: 'center', className: 'mw200',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', params.row.endMonth),
                ]);
              }
            },
            {title: '个人部分金额', key: 'empAmount', align: 'center', className: 'mw200',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', params.row.empAmount),
                ]);
              }
            },
            {title: '企业部分金额', key: 'comAmount', align: 'center', className: 'mw200',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', params.row.comAmount),
                ]);
              }
            },
            {title: '退费总金额', key: 'amount', align: 'center', className: 'mw200',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', params.row.amount),
                ]);
              }
            }
          ],
          noticeData:[]
        }
      }
    },
    mounted() {
     this.queryRefundDetails();
    },
    computed: {
      
    },
    methods: {
      goBack() {
        this.$router.push({name: 'socialSecurityReport'})
      },
      ok () {

      },
      cancel () {

      },
      queryRefundDetails(){
        let params = {ssMonth:this.ssMonth,ssAccount:this.ssAccount}
        api.queryRefundDetails(params).then(data=>{
            if(data.code==500){
              this.$Message.error(data.message);
            }else{
              if(null!=data.data){
                this.noticeInfo.noticeData=data.data;
              }
            }
        })
      },
    }
  }
</script>
