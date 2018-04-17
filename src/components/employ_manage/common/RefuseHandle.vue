<template>
  <div>
    <Form :label-width="150">
      <Row type="flex" justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退工日期：">
            {{refuse.outDate}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="首次进入日期：">
            {{refuse.firstInDate}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="终止类型：">
            <Select v-model="refuse.endType" transfer>
              <Option v-for="item in endTypeList" :value="item.value" :key="item.value" :disabled="item.disabled">{{item.label}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="打印日期：">
            <DatePicker v-model="refuse.printDate" type="date" placeholder="" :readonly="refuse.printDateR" transfer ></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="人员性质：">
            <Select v-model="refuse.empCharacter" transfer>
              <Option v-for="item in personPropertyList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退档方向：">
            <Select v-model="refuse.returnDocDirect" transfer>
              <Option v-for="item in refuseFileDirectionList" :value="item.value" :key="item.value" :disabled="item.disabled">{{item.label}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退档日期：">
            <DatePicker v-model="refuse.returnDocDate" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="转移方式：">
            <Select v-model="refuse.transferWay" transfer>
              <Option v-for="item in transferMethodList" :value="item.value" :key="item.value" :disabled="item.disabled">{{item.label}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="转移备注：">
            <Select v-model="refuse.transferRemark" transfer>
              <Option v-for="item in transferNotesList" :value="item.value" :key="item.value" :disabled="item.disabled">{{item.label}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="转移备注补充：">
            <Input v-model="refuse.transferRemark1" placeholder="请输入" maxlength="50"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="暂存日期：">
            <DatePicker v-model="refuse.cacheDate" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退工原因：">
            {{refuse.outReason}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="档案保管意向：">
            {{refuse.archiveDirection}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退工送办日期：">
            <DatePicker v-model="refuse.resignHandleDate" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退工反馈：">
            <Select v-model="refuse.resignFeedback" transfer @on-change="changeEndType">
              <Option v-for="item in refuseFeedbackList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退工反馈日期：">
            <DatePicker v-model="refuse.resignFeedbackDate" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退工操作员：">
            <Input v-model="refuse.resignOperateMan" placeholder="请输入" maxlength="50"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退工UKey外借日期：">
            <DatePicker v-model="refuse.ukeyBorrowDate" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退工UKey返回日期：">
            <DatePicker v-model="refuse.ukeyReturnDate" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="档案编号：">
            <Input v-model="refuse.docNum" placeholder="请输入" maxlength="50"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="存档地：">
            <Input v-model="refuse.archivePlace" placeholder="请输入" maxlength="50"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="入库日期：">
            {{refuse.storageDate}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="调档反馈：">
            {{refuse.diaodangFeedback}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="用工反馈：">
             {{refuse.employFeedback}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="公司集体转出方向：">
            <Select v-model="refuse.comGroupOutDirect" transfer>
              <Option v-for="item in companyGroupTransferDirectionList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="预留档案编号：">
            {{refuse.yuliuDocNum}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="存档地补充：">
            {{refuse.archivePlaceAdditional}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="档案号：">
            {{refuse.docNum}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="存档卡状态：">
            {{refuse.archiveCardState}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="办理类型：">
            {{refuse.handleType}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="">
            <Checkbox v-model="refuse.ifNetwork" true-value="1" false-value="0">是否网办</Checkbox>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退工成功日期：">
            <DatePicker v-model="refuse.jobCentreFeedbackDate" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退工材料交付日期：">
            <DatePicker v-model="refuse.resignMaterialDeliveryDate"  type="date" placeholder=""  transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="劳动手册是否交被退人员：">
            <Select v-model="refuse.ifLaborManualReturn" transfer>
              <Option v-for="item in LaborManualIsDeliverRefuserList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="对应用工序号：">
            <Input v-model="refuse.matchEmployIndex" placeholder="请输入" maxlength="50"/>
            <input type="text" v-model="refuse.companyId" hidden>
            <input type="text" v-model="refuse.employeeId" hidden>
            <input type="text" v-model="refuse.employmentId" hidden>
            <input type="text" v-model="refuse.empTaskId" hidden>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="用工档案缴费止：">
            {{refuse.employDocPaymentTo}}
          </Form-item>
        </Col>
      </Row>
      <Row type="flex" justify="start">
        <Col :sm="{span: 24}" class="tr">
          <Button type="primary" @click="instance()">保存</Button>
          <Button type="primary" @click="binding">绑定</Button>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
 import api from '../../../api/employ_manage/hire_operator'
  export default {
    props: {
      refuseInfo: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        endTypeList: [
          {value: '空', label: '空',disabled:false},
          {value: '合同终止', label: '合同终止',disabled:false},
          {value: '合同解除', label: '合同解除',disabled:false}
        ],
        personPropertyList: [
          {value: '空', label: '空'},
          {value: '上海户籍', label: '上海户籍'},
          {value: '居住证', label: '居住证'},
          {value: '外来从业人员', label: '外来从业人员'}
        ],
        refuseFileDirectionList: [
          {value: '户口所在地', label: '户口所在地',disabled:false},
          {value: '市区人才', label: '市区人才',disabled:false},
          {value: '徐汇', label: '徐汇',disabled:false},
          {value: '科技人才', label: '科技人才',disabled:false},
          {value: '暂存', label: '暂存',disabled:false},
          {value: '其他', label: '其他',disabled:false},
          {value: '转公司用工', label: '转公司用工',disabled:false}
        ],
        transferMethodList: [
          {value: '空', label: '空',disabled:false},
          {value: '职介所', label: '职介所',disabled:false},
          {value: '其他', label: '其他',disabled:false}
        ],
        transferNotesList: [
          {value: '空', label: '空',disabled:false},
          {value: '档案未退先退工', label: '档案未退先退工',disabled:false},
          {value: '徐职', label: '徐职',disabled:false},
          {value: '转公司', label: '转公司',disabled:false},
          {value: '转公司/暂存', label: '转公司/暂存',disabled:false},
          {value: '转户口转档', label: '转户口转档',disabled:false},
          {value: '无档,退工单自行归档', label: '无档,退工单自行归档',disabled:false},
          {value: '用工不调', label: '用工不调',disabled:false},
          {value: '退工不调档', label: '退工不调档',disabled:false},
          {value: '居住证', label: '居住证',disabled:false},
          {value: '用工不调,红联自归', label: '用工不调,红联自归',disabled:false},
          {value: '退工不调,红联自归', label: '退工不调,红联自归',disabled:false},
          {value: '属地管理', label: '属地管理'},
          {value: '农村富裕劳动力', label: '农村富裕劳动力',disabled:false},
          {value: '自开退工单', label: '自开退工单',disabled:false}
        ],
        refuseFeedbackList: [
          {value: '1', label: '退工任务单签收'},
          {value: '2', label: '档未到先退工'},
          {value: '3', label: '退工盖章未返回'},
          {value: '4', label: '退工失败'},
          {value: '5', label: '前道要求批退'},
          {value: '6', label: '撤销退工'},
          {value: '7', label: '等修改备案表'},
          {value: '8', label: '自开退工单,未交'},
          {value: '9', label: '用工已办未反馈'},
          {value: '10', label: '等翻牌联系单'},
          {value: '11', label: '退工Ukey外借'},
          {value: '12', label: '单项服务,原退工成功'},
          {value: '13', label: '转外地社保,原退工成功'},
          {value: '14', label: '转人员性质无需退工'},
          {value: '15', label: '退工成功,改社保'},
          {value: '16', label: '重复任务单'}
         
        ],
        companyGroupTransferDirectionList: [
          {value: '空', label: '空'},
          {value: '公司自行管理', label: '公司自行管理'},
          {value: '外服', label: '外服'},
          {value: '四达', label: '四达'},
          {value: '北京外企', label: '北京外企'}
        ],
        LaborManualIsDeliverRefuserList: [
          {value: '0',label: "已交"},
          {value: '1',label: "未交"}
        ]
      }
    },
    computed: {
      refuse() {
        return this.refuseInfo;
      }
    },
    methods: {

       instance() {
         if(this.refuseInfo.employmentId==undefined)
         {
            this.$Message.success("没有对应的用工序号");
            retrun;
         }
        
        var fromData = this.$utils.clear(this.refuseInfo,'');
        if(this.refuseInfo.resignMaterialDeliveryDate){
            fromData.employDate = this.$utils.formatDate(this.refuseInfo.resignMaterialDeliveryDate, 'YYYY-MM-DD');
        }
        if(this.refuseInfo.printDate){
            fromData.printDate = this.$utils.formatDate(this.refuseInfo.printDate, 'YYYY-MM-DD');
        }
        if(this.refuseInfo.returnDocDate){
            fromData.returnDocDate = this.$utils.formatDate(this.refuseInfo.returnDocDate, 'YYYY-MM-DD');
        }
        if(this.refuseInfo.cacheDate){
           fromData.cacheDate = this.$utils.formatDate(this.refuseInfo.cacheDate, 'YYYY-MM-DD');
        }
        if(this.refuseInfo.resignHandleDate){
            fromData.resignHandleDate = this.$utils.formatDate(this.refuseInfo.resignHandleDate, 'YYYY-MM-DD');
        }
        if(this.refuseInfo.resignFeedbackDate){
            fromData.resignFeedbackDate = this.$utils.formatDate(this.refuseInfo.resignFeedbackDate, 'YYYY-MM-DD');
        }
        if(this.refuseInfo.ukeyBorrowDate){
            fromData.ukeyBorrowDate = this.$utils.formatDate(this.refuseInfo.ukeyBorrowDate, 'YYYY-MM-DD');
        }
        if(this.refuseInfo.ukeyReturnDate){
            fromData.ukeyReturnDate = this.$utils.formatDate(this.refuseInfo.ukeyReturnDate, 'YYYY-MM-DD');
        }
        if(this.refuseInfo.storageDate){
            fromData.storageDate = this.$utils.formatDate(this.refuseInfo.storageDate, 'YYYY-MM-DD');
        }
        if(this.refuseInfo.intermediaryFeedbackDate){
            fromData.intermediaryFeedbackDate = this.$utils.formatDate(this.refuseInfo.intermediaryFeedbackDate, 'YYYY-MM-DD');
        }
        if(this.refuseInfo.resignMaterialDeliveryDate){
            fromData.resignMaterialDeliveryDate = this.$utils.formatDate(this.refuseInfo.resignMaterialDeliveryDate, 'YYYY-MM-DD');
        }
        if(this.refuseInfo.jobCentreFeedbackDate){
             fromData.jobCentreFeedbackDate = this.$utils.formatDate(this.refuseInfo.jobCentreFeedbackDate, 'YYYY-MM-DD');
        }
       
        api.saveAmResign(fromData).then(data => {
              if (data.code == 200) {
                  this.$Message.success("保存成功");
                  history.go(-1);
                } else {
                  this.$Message.error("保存失败！" + data.message);
                }
        })
         
       },binding(){
         
          if(!(this.refuseInfo.employmentId==undefined)&&this.refuseInfo.employmentId!=''){
            this.$Message.success("重在用工序号");
              return;
          }

         
          if(this.refuseInfo.matchEmployIndex==undefined||this.refuseInfo.matchEmployIndex==''){
              this.$Message.success("对应用工序号为空");
              return;
          }else{
            if(isNaN(this.refuseInfo.matchEmployIndex))
            {
                this.$Message.success("对应用工序号为字符串");
                 return;
            }
          }
          this.refuseInfo.employmentId = this.refuseInfo.matchEmployIndex;

        var fromData = this.$utils.clear(this.refuseInfo,'');
        if(this.refuseInfo.resignMaterialDeliveryDate){
            fromData.employDate = this.$utils.formatDate(this.refuseInfo.resignMaterialDeliveryDate, 'YYYY-MM-DD');
        }
        if(this.refuseInfo.printDate){
            fromData.printDate = this.$utils.formatDate(this.refuseInfo.printDate, 'YYYY-MM-DD');
        }
        if(this.refuseInfo.returnDocDate){
            fromData.returnDocDate = this.$utils.formatDate(this.refuseInfo.returnDocDate, 'YYYY-MM-DD');
        }
        if(this.refuseInfo.cacheDate){
           fromData.cacheDate = this.$utils.formatDate(this.refuseInfo.cacheDate, 'YYYY-MM-DD');
        }
        if(this.refuseInfo.resignHandleDate){
            fromData.resignHandleDate = this.$utils.formatDate(this.refuseInfo.resignHandleDate, 'YYYY-MM-DD');
        }
        if(this.refuseInfo.resignFeedbackDate){
            fromData.resignFeedbackDate = this.$utils.formatDate(this.refuseInfo.resignFeedbackDate, 'YYYY-MM-DD');
        }
        if(this.refuseInfo.ukeyBorrowDate){
            fromData.ukeyBorrowDate = this.$utils.formatDate(this.refuseInfo.ukeyBorrowDate, 'YYYY-MM-DD');
        }
        if(this.refuseInfo.ukeyReturnDate){
            fromData.ukeyReturnDate = this.$utils.formatDate(this.refuseInfo.ukeyReturnDate, 'YYYY-MM-DD');
        }
        if(this.refuseInfo.storageDate){
            fromData.storageDate = this.$utils.formatDate(this.refuseInfo.storageDate, 'YYYY-MM-DD');
        }
        if(this.refuseInfo.intermediaryFeedbackDate){
            fromData.intermediaryFeedbackDate = this.$utils.formatDate(this.refuseInfo.intermediaryFeedbackDate, 'YYYY-MM-DD');
        }
        if(this.refuseInfo.resignMaterialDeliveryDate){
            fromData.resignMaterialDeliveryDate = this.$utils.formatDate(this.refuseInfo.resignMaterialDeliveryDate, 'YYYY-MM-DD');
        }
        if(this.refuseInfo.jobCentreFeedbackDate){
             fromData.jobCentreFeedbackDate = this.$utils.formatDate(this.refuseInfo.jobCentreFeedbackDate, 'YYYY-MM-DD');
        }
        
          api.saveAmResign(fromData).then(data => {
              if (data.code == 200) {
                this.$Message.success("绑定成功");
                 history.go(-1);
              } else {
                this.$Message.error("绑定失败！" + data.message);
              }
          })

       },callbackValue(val){
         
         switch(val){
           case '1':
             return true;
             break;
           case '6':
             return true;
             break;
           case '12':
             return true;
             break;
           case '13':
             return true;
             break;
           case '15':
             return true;
             break; 
           case '16':
             return true;
             break;  
           default:
             return false;
             break;   

         }
       },changeEndType(val){
        
        var isCon = this.callbackValue(val);
        
          if(isCon){
             this.endTypeList[0].disabled=true;
             this.endTypeList[1].disabled=true;
             this.endTypeList[2].disabled=true;

             this.refuse.printDateR = true;
            
             this.refuseFileDirectionList[0].disabled = true;
             this.refuseFileDirectionList[1].disabled = true;
             this.refuseFileDirectionList[2].disabled = true;
             this.refuseFileDirectionList[3].disabled = true;
             this.refuseFileDirectionList[4].disabled = true;
             this.refuseFileDirectionList[5].disabled = true;
             this.refuseFileDirectionList[6].disabled = true;

             this.transferMethodList[0].disabled = true;
             this.transferMethodList[1].disabled = true;
             this.transferMethodList[2].disabled = true;

             this.transferNotesList[0].disabled = true;
             this.transferNotesList[1].disabled = true;
             this.transferNotesList[2].disabled = true;
             this.transferNotesList[3].disabled = true;
             this.transferNotesList[4].disabled = true;
             this.transferNotesList[5].disabled = true;
             this.transferNotesList[6].disabled = true;
             this.transferNotesList[7].disabled = true;
             this.transferNotesList[8].disabled = true;
             this.transferNotesList[9].disabled = true;
             this.transferNotesList[10].disabled = true;
             this.transferNotesList[11].disabled = true;
             this.transferNotesList[12].disabled = true;
             this.transferNotesList[13].disabled = true;
             this.transferNotesList[14].disabled = true;
            
          }else{
             this.endTypeList[0].disabled=false;
             this.endTypeList[1].disabled=false;
             this.endTypeList[2].disabled=false;
            
             this.refuse.printDateR = false;

             this.refuseFileDirectionList[0].disabled = false;
             this.refuseFileDirectionList[1].disabled = false;
             this.refuseFileDirectionList[2].disabled = false;
             this.refuseFileDirectionList[3].disabled = false;
             this.refuseFileDirectionList[4].disabled = false;
             this.refuseFileDirectionList[5].disabled = false;
             this.refuseFileDirectionList[6].disabled = false;

             this.transferMethodList[0].disabled = false;
             this.transferMethodList[1].disabled = false;
             this.transferMethodList[2].disabled = false;

             this.transferNotesList[0].disabled = false;
             this.transferNotesList[1].disabled = false;
             this.transferNotesList[2].disabled = false;
             this.transferNotesList[3].disabled = false;
             this.transferNotesList[4].disabled = false;
             this.transferNotesList[5].disabled = false;
             this.transferNotesList[6].disabled = false;
             this.transferNotesList[7].disabled = false;
             this.transferNotesList[8].disabled = false;
             this.transferNotesList[9].disabled = false;
             this.transferNotesList[10].disabled = false;
             this.transferNotesList[11].disabled = false;
             this.transferNotesList[12].disabled = false;
             this.transferNotesList[13].disabled = false;
             this.transferNotesList[14].disabled = false;
            

          }
       }
       
    }
  }
</script>
