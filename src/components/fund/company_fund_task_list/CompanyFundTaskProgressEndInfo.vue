<template>
  <Form :label-width="150">
    <Collapse v-model="collapseInfo" class="mt20">
      <Panel name="1">
        企业公积金账户信息
        <div slot="content">
          <company-fund-account-info :companyFundAccountInfo="this.$route.params.companyFundAccountInfo"></company-fund-account-info>
        </div>
      </Panel>
      <Panel name="2">
        企业终止操作
        <div slot="content">
          <Form :label-width="100">
            <Row class="mt20" type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="终止月份：">
                  <Input v-model="endOperator.endMonth" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="终止类型：" prop="endType">
                <Select v-model="endOperator.endType" style="width: 100%;" transfer>
                  <Option v-for="item in endOperator.endTypeList" :value="item.value" :key="item.value" :disabled="item.disabled">{{item.label}}</Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="任务状态：" prop="taskStatus">
                  <Select v-model="endOperator.taskStatus" style="width: 100%;" transfer>
                    <Option v-for="item in endOperator.taskStatusList" :value="item.value" :key="item.value" :disabled="item.disabled">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="受理日期：">
                  <DatePicker v-model="endOperator.acceptDate" placement="bottom-end" placeholder="选择日期" style="width: 100%;"></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="送审日期：">
                  <DatePicker v-model="endOperator.deliveredDate" placement="bottom-end" placeholder="选择日期" style="width: 100%;"></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="完成日期：">
                  <DatePicker v-model="endOperator.finishDate" placement="bottom-end" placeholder="选择日期" style="width: 100%;"></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 24}" :lg="{span: 16}">
                <Form-item label="备注：">
                  <Input v-model="endOperator.remark" type="textarea" :rows=4 placeholder="请输入..."></Input>
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
        endOperator: {
          taskStatusList:[
            {value: '1', label: '受理中',disabled:false},
            {value: '2', label: '送审中',disabled:false},
            {value: '3', label: '已完成',disabled:false},
          ],
          endTypeList:[
            {value:'1',label:'销户'},
            {value:'2',label:'公司自做'},
            {value:'3',label:'转其他代理商'},
          ],
        }
      }
    },
    mounted() {
      let data=this.$route.params.endOperator;
      console.log(data);
      this.endOperator.endMonth = data.endMonth;
      this.endOperator.endType = data.endType;
      this.endOperator.taskStatus = data.taskStatus;
      this.endOperator.acceptDate = data.acceptDate;
      this.endOperator.deliveredDate = data.deliveredDate;
      this.endOperator.finishDate = data.finishDate;
      this.endOperator.remark = data.remark;
    },
    computed: {
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      commit(){
        let params = this.getParams()
        CompanyTaskListHF.stopCompAccountTask(params).then(data=>{
          console.log("企业任务单(终止)成功. 后台返回代码：" + data)
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
      refreshEndOperatorData(data){
        this.endOperator.endMonth = data.endMonth;
      },
      //获得更新任务单请求参数
      getParams(){
        return {
          //comTask
          comTaskId: this.$route.params.comTaskId,
          comAccountId:this.$route.params.comAccountId,
          comAccountClassId:this.$route.params.comAccountClassId,
          //endOperator
          endMonth: this.endOperator.endMonth,
          endType: this.endOperator.endType,
          acceptDate: this.endOperator.acceptDate,
          approvalDate: this.endOperator.approvalDate,
          finishDate: this.endOperator.finishDate,
          remark: this.endOperator.remark
        }
      }
    }
  }
</script>
