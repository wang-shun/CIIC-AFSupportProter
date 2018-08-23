<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="2">
        退工批量办理
        <div slot="content">
          <Form :model="materialHandleInfo" ref="materialHandleInfo" :label-width="100">
            <Row type="flex" justify="start">
              
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="终止类型：">
                  <Select v-model="materialHandleInfo.endType" transfer>
                    <Option v-for="item in endTypeList" :value="item.value" :key="item.value" :disabled="item.disabled">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="打印日期：">
                  <DatePicker v-model="materialHandleInfo.printDate"  type="date" @on-open-change="setCurrentDate" @on-change="changeDate" placeholder="" :readonly="materialHandleInfo.printDateR" transfer ></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="人员性质：">
                  <Select v-model="materialHandleInfo.empCharacter" transfer>
                    <Option v-for="item in personPropertyList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="退档方向：">
                  <Select v-model="materialHandleInfo.returnDocDirect" transfer>
                    <Option v-for="item in refuseFileDirectionList" :value="item.value" :key="item.value" :disabled="item.disabled">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="退档日期：">
                  <DatePicker v-model="materialHandleInfo.returnDocDate" @on-open-change="setCurrentDate1" @on-change="changeDate1"  type="date" placeholder="" transfer></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="转移方式：">
                  <Select v-model="materialHandleInfo.transferWay" transfer>
                    <Option v-for="item in transferMethodList" :value="item.value" :key="item.value" :disabled="item.disabled">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="转移备注：">
                  <Select v-model="materialHandleInfo.transferRemark" transfer>
                    <Option v-for="item in transferNotesList" :value="item.value" :key="item.value" :disabled="item.disabled">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="转移备注补充：">
                  <Input v-model="materialHandleInfo.transferRemark1" placeholder="请输入" :maxlength="50"/>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="暂存日期：">
                  <DatePicker v-model="materialHandleInfo.cacheDate" @on-open-change="setCurrentDate2" @on-change="changeDate2" type="date" placeholder="" transfer></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="退工送办日期：">
                  <DatePicker v-model="materialHandleInfo.resignHandleDate" @on-open-change="setCurrentDate3" @on-change="changeDate3" type="date" placeholder="" transfer></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="退工反馈：">
                  <Select v-model="materialHandleInfo.resignFeedback" transfer @on-change="changeEndType">
                    <Option v-for="item in refuseFeedbackList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="退工反馈日期：">
                  <DatePicker v-model="materialHandleInfo.resignFeedbackDate" @on-open-change="setCurrentDate4" @on-change="changeDate4" type="date" placeholder="" transfer></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="退工操作员：">
                  {{materialHandleInfo.resignOperateMan}}
                </Form-item>
              
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="退工UKey外借日期：">
                  <DatePicker v-model="materialHandleInfo.ukeyBorrowDate" @on-open-change="setCurrentDate5" @on-change="changeDate5"  type="date" placeholder="" transfer></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="退工UKey返回日期：">
                  <DatePicker v-model="materialHandleInfo.ukeyReturnDate" @on-open-change="setCurrentDate6" @on-change="changeDate6"  type="date" placeholder="" transfer></DatePicker>
                </Form-item>
              </Col>
            
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公司集体转出方向：">
                  <Select v-model="materialHandleInfo.comGroupOutDirect" transfer>
                    <Option v-for="item in companyGroupTransferDirectionList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="">
                  <Checkbox v-model="materialHandleInfo.ifNetwork" true-value="1" false-value="0">是否网办</Checkbox>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="退工成功日期：">
                  <DatePicker v-model="materialHandleInfo.jobCentreFeedbackDate"  @on-open-change="setCurrentDate7" @on-change="changeDate7" type="date" placeholder="" transfer></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="退工材料交付日期：">
                  <DatePicker v-model="materialHandleInfo.resignMaterialDeliveryDate" @on-open-change="setCurrentDate8" @on-change="changeDate8"  type="date" placeholder=""  transfer></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item    label=""  >
                  <Checkbox v-model="materialHandleInfo.ifLaborManualReturn" true-value="1" false-value="0">劳动手册是否交被退人员</Checkbox>
                </Form-item>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col :sm="{span: 24}" class="tr">
              <Button type="primary"  :loading="isLoading"  @click="instance()"  >批理办理</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>
  </div>
</template>
<script>
  import api from '../../api/employ_manage/hire_operator'
  import Utils from '../../lib/utils'
  import Vue from 'vue'

  export default {
    props: {
      handleInfo: {
        type: Object
      }, handleInfoMaterial: {
        type: Object
      }
    },
    data() {
      return {
         isLoading: false,
         isLoadingC:false,
        collapseInfo: [2], //展开栏
        docTypeList: [],
        employmentInfo:{
          receiveDate:'',
          employDate:'',
        },
        materialHandleInfo: {
          printDateR:false,
          empTaskIds:[]
        },
        employeeBatchData:{
          empTaskIds:[],
          employWay:''
        },
        endTypeList: [
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
          {value: '16', label: '重复任务单'},
          {value: '17', label: '退工自办'}
         
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

    mounted(){
      
      api.queryAmArchiveDocType().then(data => {
          if (data.code == 200) {
              this.docTypeList = data.data.docSeqList;
              this.yuliuDocTypeList = data.data.docSeqList2;
          } else {
              this.$Message.error("服务器异常" + data.message);
          }
        })
    },
    computed: {
      handle() {
        return this.handleInfo;
      }
    },
    methods: {
      instance() {
       
        var fromData = this.$utils.clear(this.materialHandleInfo,'');
        
        if(this.materialHandleInfo.resignMaterialDeliveryDate){
            fromData.employDate = this.$utils.formatDate(this.materialHandleInfo.resignMaterialDeliveryDate, 'YYYY-MM-DD');
        }
        if(this.materialHandleInfo.printDate){
            fromData.printDate = this.$utils.formatDate(this.materialHandleInfo.printDate, 'YYYY-MM-DD');
        }
        if(this.materialHandleInfo.returnDocDate){
            fromData.returnDocDate = this.$utils.formatDate(this.materialHandleInfo.returnDocDate, 'YYYY-MM-DD');
        }
        if(this.materialHandleInfo.cacheDate){
           fromData.cacheDate = this.$utils.formatDate(this.materialHandleInfo.cacheDate, 'YYYY-MM-DD');
        }
        if(this.materialHandleInfo.resignHandleDate){
            fromData.resignHandleDate = this.$utils.formatDate(this.materialHandleInfo.resignHandleDate, 'YYYY-MM-DD');
        }
        if(this.materialHandleInfo.resignFeedbackDate){
            fromData.resignFeedbackDate = this.$utils.formatDate(this.materialHandleInfo.resignFeedbackDate, 'YYYY-MM-DD');
        }
        if(this.materialHandleInfo.ukeyBorrowDate){
            fromData.ukeyBorrowDate = this.$utils.formatDate(this.materialHandleInfo.ukeyBorrowDate, 'YYYY-MM-DD');
        }
        if(this.materialHandleInfo.ukeyReturnDate){
            fromData.ukeyReturnDate = this.$utils.formatDate(this.materialHandleInfo.ukeyReturnDate, 'YYYY-MM-DD');
        }
        if(this.materialHandleInfo.storageDate){
            fromData.storageDate = this.$utils.formatDate(this.materialHandleInfo.storageDate, 'YYYY-MM-DD');
        }
        if(this.materialHandleInfo.intermediaryFeedbackDate){
            fromData.intermediaryFeedbackDate = this.$utils.formatDate(this.materialHandleInfo.intermediaryFeedbackDate, 'YYYY-MM-DD');
        }
        if(this.materialHandleInfo.resignMaterialDeliveryDate){
            fromData.resignMaterialDeliveryDate = this.$utils.formatDate(this.materialHandleInfo.resignMaterialDeliveryDate, 'YYYY-MM-DD');
        }
        if(this.materialHandleInfo.jobCentreFeedbackDate){
             fromData.jobCentreFeedbackDate = this.$utils.formatDate(this.materialHandleInfo.jobCentreFeedbackDate, 'YYYY-MM-DD');
        }
       
        fromData.empTaskIds = this.$route.query.empTaskIds;
       
        api.saveAmResignBatch(fromData).then(data => {
            if (data.code == 200) {
              if(data.data.remark){
                  this.$Message.error(data.data.remark);
              }else{
                  this.$Message.success("批量办理成功");
              }
             
            } else {
              this.$Message.error("保存失败！" + data.data.message);
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
           case '17':
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

          if(val=='17')
          {
              var date = new Date();
              var seperator1 = "-";
              var year = date.getFullYear();
              var month = date.getMonth() + 1;
              var strDate = date.getDate();
              if (month >= 1 && month <= 9) {
                  month = "0" + month;
              }
              if (strDate >= 0 && strDate <= 9) {
                  strDate = "0" + strDate;
              }
              var currentdate = year + seperator1 + month + seperator1 + strDate;
              
              this.materialHandleInfo.resignFeedbackDate=currentdate;
          }
       },currentDate(){
              var date = new Date();
              var seperator1 = "-";
              var year = date.getFullYear();
              var month = date.getMonth() + 1;
              var strDate = date.getDate();
              if (month >= 1 && month <= 9) {
                  month = "0" + month;
              }
              if (strDate >= 0 && strDate <= 9) {
                  strDate = "0" + strDate;
              }
              var currentdate = year + seperator1 + month + seperator1 + strDate;
              return currentdate;
       },setCurrentDate(e) {
       
        if(e){
          
          if(this.materialHandleInfo.printDate==''||this.materialHandleInfo.printDate==undefined)
          {
             this.materialHandleInfo.printDate = this.currentDate();
          }
        }
        
      },changeDate(e) {
        this.materialHandleInfo.printDate = e;
      },setCurrentDate1(e) {
        if(e){
          if(this.materialHandleInfo.returnDocDate==''||this.materialHandleInfo.returnDocDate==undefined)
          {
             this.materialHandleInfo.returnDocDate = this.currentDate();
          }
        }
        
      },changeDate1(e) {
        this.materialHandleInfo.returnDocDate = e;
      },setCurrentDate2(e) {
        if(e){
          if(this.materialHandleInfo.cacheDate==''||this.materialHandleInfo.cacheDate==undefined)
          {
             this.materialHandleInfo.cacheDate = this.currentDate();
          }
        }
        
      },changeDate2(e) {
        this.materialHandleInfo.cacheDate = e;
      },setCurrentDate3(e) {
        if(e){
          if(this.materialHandleInfo.resignHandleDate==''||this.materialHandleInfo.resignHandleDate==undefined)
          {
             this.materialHandleInfo.resignHandleDate = this.currentDate();
          }
        }
        
      },changeDate3(e) {
        this.materialHandleInfo.resignHandleDate = e;
      },setCurrentDate4(e) {
        if(e){
          if(this.materialHandleInfo.resignFeedbackDate==''||this.materialHandleInfo.resignFeedbackDate==undefined)
          {
             this.materialHandleInfo.resignFeedbackDate = this.currentDate();
          }
        }
        
      },changeDate4(e) {
        this.materialHandleInfo.resignFeedbackDate = e;
      },setCurrentDate5(e) {
        if(e){
          if(this.materialHandleInfo.ukeyBorrowDate==''||this.materialHandleInfo.ukeyBorrowDate==undefined)
          {
             this.materialHandleInfo.ukeyBorrowDate = this.currentDate();
          }
        }
        
      },changeDate5(e) {
        this.materialHandleInfo.ukeyBorrowDate = e;
      },setCurrentDate6(e) {
        if(e){
          if(this.materialHandleInfo.ukeyReturnDate==''||this.materialHandleInfo.ukeyReturnDate==undefined)
          {
             this.materialHandleInfo.ukeyReturnDate = this.currentDate();
          }
        }
        
      },changeDate6(e) {
        this.materialHandleInfo.ukeyReturnDate = e;
      },setCurrentDate7(e) {
        if(e){
          if(this.materialHandleInfo.jobCentreFeedbackDate==''||this.materialHandleInfo.jobCentreFeedbackDate==undefined)
          {
             this.materialHandleInfo.jobCentreFeedbackDate = this.currentDate();
          }
        }
        
      },changeDate7(e) {
        this.materialHandleInfo.jobCentreFeedbackDate = e;
      },setCurrentDate8(e) {
        if(e){
          if(this.materialHandleInfo.resignMaterialDeliveryDate==''||this.materialHandleInfo.resignMaterialDeliveryDate==undefined)
          {
             this.materialHandleInfo.resignMaterialDeliveryDate = this.currentDate();
          }
        }
        
      },changeDate8(e) {
        this.materialHandleInfo.resignMaterialDeliveryDate = e;
      }
      
    }
  }
</script>
