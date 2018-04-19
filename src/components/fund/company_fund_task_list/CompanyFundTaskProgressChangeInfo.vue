<template>
  <Form :label-width='150'>
    <Collapse v-model="collapseInfo" class="mt20">
      <Panel name="1">
        企业公积金账户信息
        <div slot="content">
          <company-fund-account-info :companyFundAccountInfo="this.$route.params.companyFundAccountInfo"></company-fund-account-info>
        </div>
      </Panel>
      <Panel name="2">
        企业变更操作
        <div slot="content">
          <Form :label-width='150'>
            <Row class="mt20" type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业账户名称：">
                  <Input v-model="changeOperator.comAccountName" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="付款方式：" prop="paymentType">
                  <Select v-model="changeOperator.paymentType" style="width: 100%;" transfer>
                    <Option v-for="item in changeOperator.paymentTypeList" :value="item.value" :key="item.value" :disabled="item.disabled">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="任务状态：" prop="taskStatus">
                  <Select v-model="changeOperator.taskStatus" style="width: 100%;" transfer>
                    <Option v-for="item in changeOperator.taskStatusList" :value="item.value" :key="item.value" :disabled="item.disabled">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="受理日期：">
                  <DatePicker v-model="changeOperator.acceptDate" placement="bottom-end" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="送审日期：">
                  <DatePicker v-model="changeOperator.deliveredDate" placement="bottom-end" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="完成日期：">
                  <DatePicker v-model="changeOperator.finishDate" placement="bottom-end" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 24}" :lg="{span: 16}">
                <Form-item label="备注：">
                  <Input v-model="changeOperator.remark" type="textarea" :rows=4 ></Input>
                </Form-item>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span:24}" class="tr">
        <Button type="primary" @click="commit">提交</Button>
        <Button type="error" @click="rejection">批退</Button>
        <Button type="warning" @click="goBack">返回</Button>
      </Col>
    </Row>
  </Form>
</template>
<script>
  import companyFundAccountInfo from '../common/CompanyFundAccountInfo.vue'
  import {CompanyTaskListHF} from '../../../api/house_fund/company_task_list/company_task_list_hf'

  export default {
    components: {companyFundAccountInfo},
    data() {
      return {
        collapseInfo: [1, 2], //展开栏
        changeOperator: {
          taskStatusList:[
            {value: '1', label: '受理中',disabled:false},
            {value: '2', label: '送审中',disabled:false},
            {value: '3', label: '已完成',disabled:false},
          ],
          paymentTypeList:[]
        }
      }
    },
    mounted() {
      CompanyTaskListHF.getCompanyTaskPaymentWayData().then(data=>{
          this.refreshCompanyTaskPaymentWayData(data)
        }
      ).catch(error=>{
        console.log(error);
      });
      this.refreshChangeOperatorData(this.$route.params.changeOperator);
    },
    computed: {
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      commit(){
        let params = this.getParams()
        CompanyTaskListHF.updateCompanyTaskChangeInfo(params).then(data=>{
            if(data){
                this.$Message.success('提交成功');
                this.goBack();
            }else{
                this.$Message.error('提交失败');
            }
        }).catch(error=>{
          console.log(error)
        })
      },
      rejection(){
           this.$Modal.confirm({
              title: "您确认批退操作？",
              cancelText: "取消",
              onOk: () => {
                  let params={
                    comTaskId:this.$route.params.comTaskId
                  }
                  CompanyTaskListHF.rejection(params).then(data=>{
                    if(data){
                        this.$Message.success('提交成功');
                        this.goBack();
                    }else{
                        this.$Message.error('提交失败');
                    }
                  }).catch(error=>{
                    console.log(error)
                  })
              }
            });        
      },
      refreshCompanyTaskPaymentWayData(data){
        this.changeOperator.paymentTypeList = data.data.paymentTypeList;
      },
      refreshChangeOperatorData(data){
        this.changeOperator.comAccountName = data.comAccountName;
        this.changeOperator.paymentType = data.paymentTypeValue;
        this.changeOperator.taskStatus = data.taskStatusValue;
        this.changeOperator.acceptDate = data.acceptDate;
        this.changeOperator.deliveredDate = data.deliveredDate;
        this.changeOperator.finishDate = data.finishDate;
        this.changeOperator.remark=data.remark;
      },
      //获得更新任务单请求参数
      getParams(){
        return {
          //comTask
          comTaskId: this.$route.params.comTaskId,
          comAccountId:this.$route.params.comAccountId,
          comAccountClassId:this.$route.params.comAccountClassId,
          //changeOperator
          comAccountName: this.changeOperator.comAccountName,
          paymentType: this.changeOperator.paymentType,
          taskStatus: this.changeOperator.taskStatus,
          acceptDate: this.changeOperator.acceptDate,
          approvalDate: this.changeOperator.approvalDate,
          finishDate: this.changeOperator.finishDate,
          remark: this.changeOperator.remark
        }
      }
    }
  }
</script>
