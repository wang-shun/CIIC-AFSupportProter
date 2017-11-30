<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        企业社保账户信息
        <div slot="content">
          <company-social-security-info :company="operatorType == 0 ? company1:company2"></company-social-security-info>
        </div>
      </Panel>
      <Panel name="2">
        雇员信息
        <div slot="content">
          <employee-info :operatorType='operatorType' :employee="operatorType == 0 ? employee1 : employee2"></employee-info>

        </div>
      </Panel>
      <Panel name="3">
        任务单参考信息
        <div slot="content">
          <task-refrence-info :operatorType='operatorType' :taskNewInfo="data.taskNewInfo" :taskNewInfoData="data.taskNewInfoData" :taskChangeInfo="data.taskChangeInfo" :taskOutInfo="data.taskOutInfo"></task-refrence-info>
        </div>
      </Panel>
      <Panel name="4">
        <span v-if="operatorType === '0'">社保汇缴操作</span><span v-else-if="operatorType === '1'">社保调整操作</span><span v-else>社保转出操作</span>
        <div slot="content">
          <social-security-operator :operatorType='operatorType'></social-security-operator>
        </div>
      </Panel>
    </Collapse>
    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="primary" v-show="operatorType !== '2'" @click="instance('save')">暂存</Button>
        <Button type="primary" @click="instance('success')" v-if="operatorType !== '2'">办理</Button>
        <Button type="primary" @click="instance('success')" v-else>办理</Button>
        <Button type="error" @click="instance('error')">批退</Button>
        <Button type="warning" @click="goBack">返回</Button>
      </Col>
    </Row>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import companySocialSecurityInfo from '../../commoncontrol/companysocialsecurityinfo.vue'
  import employeeInfo from '../../commoncontrol/employeeinfo.vue'
  import taskRefrenceInfo from './taskRefrenceInfo.vue'
  import socialSecurityOperator from '../../commoncontrol/socialsecurityoperator.vue'
  import EventTypes from '../../../store/EventTypes'

  export default {
    components: {companySocialSecurityInfo, employeeInfo, taskRefrenceInfo, socialSecurityOperator},
    data() {
      return {
        currentIndex: this.$route.params.index,
        operatorType: this.$route.query.operatorType,
        sourceFrom: this.$route.query.sourceFrom,
        collapseInfo: [1, 2, 3, 4],
        employee1: {
          code: 'GY0001',
          name: '郑杰',
          idNo: '320106198310290811',
          checkInTime: '2017-12-1',
          education: '本科',
          socialSecurityIndex: '123235564',
          companySocialSecurityAccount: '中智大库',
          residenceAddress: '上海市长宁区虹桥路996弄71号105室',
          contactAddress: '上海市长宁区虹桥路996弄71号105室',
          personType: '外地',
          socialSecurityType: '中智大库'
        },
        employee2: {
          code: 'GY0003',
          name: '潘玉麟',
          idNo: '31010519821011939x',
          checkInTime: '2017-12-1',
          education: '本科',
          socialSecurityIndex: '123235564',
          companySocialSecurityAccount: '中智大库',
          residenceAddress: '广州市白云区汇侨中路29号',
          contactAddress: '广州市白云区汇侨中路29号',
          personType: '外地',
          socialSecurityType: '中智大库'
        },
      company1: {
        companySocialSecurityAccount: '12123235',
        companyNumber: 'GS170001',
        companyName: '普思埃商业（上海）有限公司',
        socialSecurityCenter: '徐汇',
        uKey: '152243',
        accountType: '独立户',
        companySocialSecurityState: '有效\\封存\\终止',
        companySocialSecurityEndData: '本月18日',
        companyServicer: '金翔云',
        serviceCenter: '大客户2'
      }, //企业社保账户信息
      company2: {
        companySocialSecurityAccount: '12123235',
        companyNumber: 'GS170003',
        companyName: '广州特利普斯埃商业有限公司',
        socialSecurityCenter: '徐汇',
        uKey: '152243',
        accountType: '独立户',
        companySocialSecurityState: '有效\\封存\\终止',
        companySocialSecurityEndData: '本月18日',
        companyServicer: '金翔云',
        serviceCenter: '大客户2'
      } //企业社保账户信息
      }
    },
    mounted() {
      console.log( this.$route.query.operatorType)
      this[EventTypes.COMPANYSOCIALSECURITYNEWTYPE]()
    },
    computed: {
      ...mapState('companySocialSecurityNew', {
          data: state => state.data
      })
    },
    methods: {
      ...mapActions('companySocialSecurityNew', [EventTypes.COMPANYSOCIALSECURITYNEWTYPE]),
      goBack() {
        this.sourceFrom !== 'search' ? this.$router.push({name:'employeeoperatorview'}) : this.$router.push({name: 'employeesocialsecurityinfo'});
      },
      instance (type) {
        let title = '';
        const content = '<p>点击确定后，将自动返回查询列表</p>';
        switch (type) {
          case 'info':
           title = '办理操作成功！'
             this.$Modal.info({
               title: title,
               content: content
             });
           
            break;
          case 'success':
           let self = this;
           title='<p>确认操作成功！</p>'
            self.$Modal.success({
                title: title,
                content: content,
                okText: '确定',
                onOk:function(){
                  //self.$Modal.remove();
                   history.go(-1);
                },
                 error:function(error){
                   self.$Message.error('停用失败!');
                   self.$Modal.remove();
               }
            });
            break;
          case 'warning':
           title = '办理操作成功！'
            self.$Modal.warning({
              title: title,
              content: content
            });
            
            break;
          case 'error':
            this.$Message.success({
              content: '批退操作成功！',
              duration: 0.8
            });
             
            break;
            case 'save':
             title = '暂存操作成功！'
            this.$Message.success({
               content: '暂存操作成功!',
                duration: 0.8
            })
            break;
        }
      }
    }
  }
</script>
