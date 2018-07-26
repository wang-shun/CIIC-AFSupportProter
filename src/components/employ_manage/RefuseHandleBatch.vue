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
                <Form-item label="存档地：">
                  <Input v-model="materialHandleInfo.archivePlace" placeholder="请输入" :maxlength="50"/>
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
              <Button type="warning" @click="resetForm('materialHandleInfo')">重置</Button>
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
        yuliuDocTypeList: [],
        employmentInfo:{
          receiveDate:'',
          employDate:'',
        },
        materialHandleInfo: {
          yuliuDocType: '',
          yuliuDocNum: '',
          docType: '',
          docNum: '',
          archivePlace: '',
          archivePlaceAdditional: '',
          archiveCardState: '',
          docCode:'',
          docFrom:'',
          employFeedback:'',
          employFeedbackOptDate:'',
          diaodangFeedback:'',
          diaodangFeedbackOptDate:'',
          ukeyBorrowDate:'',
          ukeyReturnDate:'',
          hukouCode:'',
          employDocPaymentTo:'',
          storageDate:'',
          employWay: '',
          employOperateMan: '',
          employmentId:'',
          end:false,
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
      resetForm(form) {
        this.$refs[form].resetFields();
        this.materialHandleInfo.luyongHandleEnd = false;
        this.materialHandleInfo.yuliuDocType = '';
        this.materialHandleInfo.docType = '';
      },
      changeTypeYuliu(val){
        if(val == ''){
          Vue.set(this.materialHandleInfo,'yuliuDocNum','');
          return;
        }
        this.queryDocSeqByDocType(val);
      },

      queryDocSeqByDocType(val){
        api.queryDocSeqByDocType({type : 1,docType : val}).then(data => {
          if (data.code == 200) {
            Vue.set(this.materialHandleInfo,'yuliuDocNum',parseInt(data.data.docBo.docSeq)+1)
              this.materialHandleInfo.yuliuDocNum = parseInt(data.data.docBo.docSeq)+1;
          } else {
              this.$Message.error("服务器异常" + data.message);
          }
        })
      },

      changeTypeNumber(val){
        if(val == ''){
          Vue.set(this.materialHandleInfo,'docNum','');
          return;
        }
        this.queryDocSeqByDocType2(val);
      },

      queryDocSeqByDocType2(val){
        api.queryDocSeqByDocType({type : 2,docType : val}).then(data => {
          if (data.code == 200) {
            Vue.set(this.materialHandleInfo,'docNum',parseInt(data.data.docBo.docSeq)+1)
            this.materialHandleInfo.docNum = parseInt(data.data.docBo.docSeq)+1;
          } else {
            this.$Message.error("服务器异常" + data.message);
          }
        })
      },
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
            if (data.data.code == 200) {
              if(data.data.data.remark){
                  this.$Message.error(data.data.data.remark);
              }else{
                  //this.materialHandleInfo.end =data.data.data.end;
                  this.$Message.success("批量办理成功");
              }
             
            } else {
              this.$Message.error("保存失败！" + data.data.message);
            }

        })

      }, instanceEmployment(){
            var fromData = this.$utils.clear(this.employmentInfo,'');
            if(fromData.employDate){
              fromData.employDate = this.$utils.formatDate(this.employmentInfo.employDate, 'YYYY-MM-DD');
            }
            if(fromData.openAfDate){
              fromData.openAfDate = this.$utils.formatDate(this.employmentInfo.openAfDate, 'YYYY-MM-DD');
            }
            if(fromData.receiveDate){
              fromData.receiveDate = this.$utils.formatDate(this.employmentInfo.receiveDate, 'YYYY-MM-DD');
            }else{
              this.$Message.error("材料签收日期不能为空");
              return;
            }
            
           fromData.empTaskIds = this.$route.query.empTaskIds;
            this.isLoadingC = true;
          api.batchSaveEmployment(fromData).then(data => {
            if (data.code == 200) {
              this.$Message.success("批量办理成功");
            } else {
              this.$Message.error("保存失败！" + data.data.message);
            }
           
           this.isLoadingC = false;
            
         })

      },defaultVaule() {

        var fromData = this.$utils.clear(this.handleInfo, '');
        if (fromData.employDate) {
          fromData.employDate = this.$utils.formatDate(this.handleInfo.employDate, 'YYYY-MM-DD');
        }
        if (fromData.openAfDate) {
          fromData.openAfDate = this.$utils.formatDate(this.handleInfo.openAfDate, 'YYYY-MM-DD');
        }
        api.getDefualtEmployBO(fromData).then(data => {

          if (data.data.firstInDate) {
            this.handleInfo.employDate = data.data.firstInDate;
          }

          if (data.data.openAfDate) {
            this.handleInfo.openAfDate = data.data.openAfDate;
          }

          if (data.data.employStyle) {
            this.handleInfo.employStyle = data.data.employStyle;
          }

          if (data.data.handleType) {
            this.handleInfo.handleType = data.data.handleType;
          }

          if (data.data.archivePlace) {
            this.handleInfoMaterial.archivePlace = data.data.archivePlace;
          }

          if (data.data.employProperty) {
            this.handleInfo.employProperty = data.data.employProperty;
          }

        })
      }, handleChange(val) {

        if (this.handleInfoMaterial.defaultC == '0') {

        } else {

          var isf = false;
          if (val == '调档') {
            this.handleInfoMaterial.archivePlace = '空';
            isf = true;
          }
          if (val == '高校') {
            this.handleInfoMaterial.archivePlace = '就业指导中心';
            isf = true;
          }
          if (val == '经营者') {
            this.handleInfoMaterial.archivePlace = '经营者人才';
            isf = true;
          }
          if (val == '退工不调档') {
            this.handleInfoMaterial.archivePlace = '退工不调';
            isf = true;
          }
          if (val == '用工不调档') {
            this.handleInfoMaterial.archivePlace = '用工不调';
            isf = true;
          }
          if (val == '公司自行保管') {
            this.handleInfoMaterial.archivePlace = '公司自行保理';
            isf = true;
          }
          if (val == '漕虹路') {
            this.handleInfoMaterial.archivePlace = '漕虹分部';
            isf = true;
          }
          if (val == '农民工') {
            this.handleInfoMaterial.archivePlace = '农村富裕劳动力';
            isf = true;
          }
          if (val == '徐职') {
            this.handleInfoMaterial.archivePlace = '徐汇职介';
            isf = true;
          }
          if (isf == false) {
            this.handleInfoMaterial.archivePlace = val;
          }
        }
        this.handleInfoMaterial.defaultC = '1';

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
       },changeType(val){
          
          if(val==11)
          { 
              this.materialHandleInfo.ukeyBorrowDate=this.currentDate();
          }
          
          this.materialHandleInfo.employFeedbackOptDate = this.currentDate();
         
       },changeTypeDd(val){
          
          this.materialHandleInfo.diaodangFeedbackOptDate = this.currentDate();
         
       },setCurrentDate(e) {
        if(e){
          if(this.employmentInfo.receiveDate==''||this.employmentInfo.receiveDate==undefined)
          {
             this.employmentInfo.receiveDate = this.currentDate();
          }
        }
        
      },changeDate(e) {
        this.employmentInfo.receiveDate = e;
      },setCurrentDate1(e) {
        if(e){
          if(this.employmentInfo.employDate==''||this.employmentInfo.employDate==undefined)
          {
             this.employmentInfo.employDate = this.currentDate();
          }
        }
        
      },changeDate1(e) {
        this.employmentInfo.employDate = e;
      },setCurrentDate2(e) {
        if(e){
          if(this.employmentInfo.openAfDate==''||this.employmentInfo.openAfDate==undefined)
          {
             this.employmentInfo.openAfDate = this.currentDate();
          }
        }
        
      },changeDate2(e) {
        this.employmentInfo.openAfDate = e;
      },setCurrentDate3(e) {
        if(e){
          if(this.materialHandleInfo.employFeedbackOptDate==''||this.materialHandleInfo.employFeedbackOptDate==undefined)
          {
             this.materialHandleInfo.employFeedbackOptDate = this.currentDate();
          }
        }
        
      },changeDate3(e) {
        this.materialHandleInfo.employFeedbackOptDate = e;
      },setCurrentDate4(e) {
        if(e){
          if(this.materialHandleInfo.diaodangFeedbackOptDate==''||this.materialHandleInfo.diaodangFeedbackOptDate==undefined)
          {
             this.materialHandleInfo.diaodangFeedbackOptDate = this.currentDate();
          }
        }
        
      },changeDate4(e) {
        this.materialHandleInfo.diaodangFeedbackOptDate = e;
      },setCurrentDate5(e) {
        if(e){
          if(this.materialHandleInfo.ukeyReturnDate==''||this.materialHandleInfo.ukeyReturnDate==undefined)
          {
             this.materialHandleInfo.ukeyReturnDate = this.currentDate();
          }
        }
        
      },changeDate5(e) {
        this.materialHandleInfo.ukeyReturnDate = e;
      },setCurrentDate6(e) {
        if(e){
          if(this.materialHandleInfo.employDocPaymentTo==''||this.materialHandleInfo.employDocPaymentTo==undefined)
          {
             this.materialHandleInfo.employDocPaymentTo = this.currentDate();
          }
        }
        
      },changeDate6(e) {
        this.materialHandleInfo.employDocPaymentTo = e;
      },setCurrentDate7(e) {
        if(e){
          if(this.materialHandleInfo.storageDate==''||this.materialHandleInfo.storageDate==undefined)
          {
             this.materialHandleInfo.storageDate = this.currentDate();
          }
        }
        
      },changeDate7(e) {
        this.materialHandleInfo.storageDate = e;
      }

      

    }
  }
</script>
