<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        企业社保账户信息
        <div slot="content">
          <company-social-security-info :company="data.company"></company-social-security-info>
        </div>
      </Panel>
      <Panel name="2">
        雇员信息
        <div slot="content">
          <employee-info :operatorType='operatorType' :employee="data.employee"></employee-info>
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
  import taskRefrenceInfo from './taskrefrenceinfo.vue'
  import socialSecurityOperator from '../../commoncontrol/socialsecurityoperator.vue'
  import EventTypes from '../../../store/EventTypes'

  export default {
    components: {companySocialSecurityInfo, employeeInfo, taskRefrenceInfo, socialSecurityOperator},
    data() {
      return {
        operatorType: this.$route.query.operatorType,
        sourceFrom: this.$route.query.sourceFrom,
        collapseInfo: [1, 2, 3, 4] //展开栏
      }
    },
    mounted() {
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
                  self.$Modal.remove();
                    self.goBack()
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
