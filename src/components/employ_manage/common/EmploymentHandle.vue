<template>
  <div>
    <Form :label-width="150">
      <Row type="flex" justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="实际录用日期：">
            <DatePicker v-model="handleInfo.employDate" @on-open-change="setCurrentDate" @on-change="changeDate" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="开F单日期：">
            <DatePicker v-model="handleInfo.openAfDate" @on-open-change="setCurrentDate1" @on-change="changeDate1" type="date"  placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="用工形式：">
            <Select v-model="handleInfo.employStyle" transfer>
              <Option v-for="item in employmentFormList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="办理类型：">
            <Select v-model="handleInfo.handleType" @on-change="handleChange" transfer>
              <Option v-for="item in handleTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="用工属性：">
            <Select v-model="handleInfo.employProperty" transfer>
              <Option v-for="item in employmentPropertyList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="用工方式：">
            <Select v-model="handleInfo.employWay" transfer>
              <Option v-for="item in employmentMethodList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="用工操作专员：">
            {{handleInfo.employOperateMan}}
            <input type="text" v-model="handleInfo.employmentId" hidden>
            <input type="text" v-model="handleInfo.empTaskId" hidden>
          </Form-item>
        </Col>
      </Row>
      <Row type="flex" justify="start">
        <Col :sm="{span: 24}" class="tr">
          <Button type="warning" @click="defaultVaule()">默认</Button>
          <Button type="primary"  :loading="isLoading"  @click="instance()">保存</Button>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
import api from '../../../api/employ_manage/hire_operator'
  export default {
    props: {
      handleInfo: {
        type: Object
      },handleInfoMaterial:{
        type: Object
      }
    },
    data() {
      return {
        isLoading: false,
        employmentFormList: [
          {value: '', label: ''},
          {value: '1', label: '全日制'},
          {value: '2', label: '非全日制'}
        ],
        handleTypeList: [
          {value: '', label: ''},
          {value: '外来从业人员', label: '外来从业人员'},
          {value: '居住证', label: '居住证'},
          {value: '调档', label: '调档'},
          {value: '属地管理', label: '属地管理'},
          {value: '市人才', label: '市人才'},
          {value: '梅园路', label: '梅园路'},
          {value: '商城路', label: '商城路'},
          {value: '漕虹路', label: '漕虹路'},
          {value: '区人才', label: '区人才'},
          {value: '高校', label: '高校'},
          {value: '经营者人才', label: '经营者人才'},
          {value: '厂长经理人才', label: '厂长经理人才'},
          {value: '农民工', label: '农民工'},
          {value: '退休', label: '退休'},
          {value: '协保', label: '协保'},
          {value: '退工不调档', label: '退工不调档'},
          {value: '用工不调档', label: '用工不调档'},
          {value: '其他', label: '其他'},
          {value: '非全日制', label: '非全日制'},
          {value: '中智', label: '中智'},
          {value: '徐职', label: '徐职'},
          {value: '公司自行保管', label: '公司自行保管'}
        ],                            
        employmentPropertyList: [
           {value: '', label: ''},
           {value: '中智', label: '中智'},
           {value: '外包', label: '外包'},
           {value: '独立', label: '独立'}
        ],
        employmentMethodList: [
           {value: '', label: ''},
           {value: 'Ukey', label: 'Ukey'},
           {value: '集体转入，用工自办', label: '集体转入，用工自办'},
           {value: '翻牌', label: '翻牌'},
           {value: '无材料用工', label: '无材料用工'},
           {value: '网办无材料', label: '网办无材料'},
           {value: '转人员性质', label: '转人员性质'},
           {value: '新进转人员性质', label: '新进转人员性质'},
           {value: '送外区办', label: '送外区办'},
           {value: '修改信息', label: '修改信息'},
           {value: '外来新进', label: '外来新进'},
           {value: '外来转入', label: '外来转入'}
        ]
      }
    },
    computed: {
      handle() {
        return this.handleInfo;
      }
    },
    methods: {

       instance() {
         this.isLoading = true;
        var fromData = this.$utils.clear(this.handleInfo,'');
        
        if(fromData.employDate){
           fromData.employDate = this.$utils.formatDate(this.handleInfo.employDate, 'YYYY-MM-DD');
        }
        if(fromData.openAfDate){
           fromData.openAfDate = this.$utils.formatDate(this.handleInfo.openAfDate, 'YYYY-MM-DD');
        }
       
        api.saveEmployee(fromData).then(data => {
              if (data.code == 200) {
                this.$Message.success("保存成功");
                 this.handle.employmentId = data.data.employmentId;
                 this.handle.employOperateMan = data.data.employOperateMan;
                 this.handleInfoMaterial.employmentId = data.data.employmentId; 
                
              } else {
                this.$Message.error("保存失败！" + data.message);
              }
               this.isLoading = false;
        })
         
       },defaultVaule(){
         
           var fromData = this.$utils.clear(this.handleInfo,'');
            if(fromData.employDate){
           fromData.employDate = this.$utils.formatDate(this.handleInfo.employDate, 'YYYY-MM-DD');
        }
        if(fromData.openAfDate){
           fromData.openAfDate = this.$utils.formatDate(this.handleInfo.openAfDate, 'YYYY-MM-DD');
        }
         api.getDefualtEmployBO(fromData).then(data =>{

           if(data.data.firstInDate){
               this.handleInfo.employDate = data.data.firstInDate;
           }

           if(data.data.openAfDate){
              this.handleInfo.openAfDate = data.data.openAfDate;
           }

           if(data.data.employStyle){
               this.handleInfo.employStyle = data.data.employStyle;
           }

           if(data.data.handleType){
             this.handleInfo.handleType = data.data.handleType;
           }

           if(data.data.archivePlace){
             this.handleInfoMaterial.archivePlace = data.data.archivePlace;
           }

           if(data.data.employProperty){
              this.handleInfo.employProperty = data.data.employProperty;
           }

         })
       },handleChange(val){
        
         if(this.handleInfoMaterial.defaultC=='0')
         {
            
         }else{
           
           var isf = false;
            if(val=='调档'){
                this.handleInfoMaterial.archivePlace = '空';
                isf = true;
            }if(val=='高校'){
              this.handleInfoMaterial.archivePlace = '就业指导中心';
              isf = true;
            }if(val=='经营者'){
              this.handleInfoMaterial.archivePlace = '经营者人才';
              isf = true;
            }if(val=='退工不调档'){
              this.handleInfoMaterial.archivePlace = '退工不调';
              isf = true;
            }if(val=='用工不调档'){
                this.handleInfoMaterial.archivePlace = '用工不调';
                isf = true;
            }if(val=='公司自行保管'){
                this.handleInfoMaterial.archivePlace = '公司自行保理';
                isf = true;
            }if(val=='漕虹路'){
                this.handleInfoMaterial.archivePlace = '漕虹分部';
                isf = true;
            }if(val=='农民工'){
                this.handleInfoMaterial.archivePlace = '农村富裕劳动力';
                isf = true;
            }if(val=='徐职'){
              this.handleInfoMaterial.archivePlace = '徐汇职介';
                isf = true;
            }
            if(isf==false){
                this.handleInfoMaterial.archivePlace = val;
            }
         }
         this.handleInfoMaterial.defaultC='1';
        
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
          if(this.handleInfo.employDate==''||this.handleInfo.employDate==undefined)
          {
             this.handleInfo.employDate = this.currentDate();
          }
        }
      },changeDate(e) {
        this.handleInfo.employDate = e;
      },setCurrentDate1(e) {
        if(e){
          if(this.handleInfo.openAfDate==''||this.handleInfo.openAfDate==undefined)
          {
             this.handleInfo.openAfDate = this.currentDate();
          }
        }
      },changeDate1(e) {
        this.handleInfo.openAfDate = e;
      }
       
    }
  }
</script>
