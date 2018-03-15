<template>
  <div>
    <Form :label-width="150">
      <Row type="flex" justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="实际录用日期：">
            <DatePicker v-model="handleInfo.employDate" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="开F单日期：">
            <DatePicker v-model="handleInfo.openAfDate" type="date"  placeholder="" transfer></DatePicker>
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
            <Select v-model="handleInfo.handleType" transfer>
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
            <Input v-model="handleInfo.employOperateMan" placeholder="请输入"/>
            <input type="text" v-model="handleInfo.employmentId" hidden>
            <input type="text" v-model="handleInfo.empTaskId" hidden>
          </Form-item>
        </Col>
      </Row>
      <Row type="flex" justify="start">
        <Col :sm="{span: 24}" class="tr">
          <Button type="warning">默认</Button>
          <Button type="primary" @click="instance()">保存</Button>
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
      }
    },
    data() {
      return {
        employmentFormList: [
          {value: '1', label: '全日制'},
          {value: '2', label: '其它'}
        ],
        handleTypeList: [
          {value: '空', label: '空'},
          {value: '外来从业人员', label: '外来从业人员'},
          {value: '居住证', label: '居住证'},
          {value: '调档', label: '调档'},
          {value: '市人才', label: '市人才'},
          {value: '梅园路', label: '梅园路'},
          {value: '商城路', label: '商城路'},
          {value: '漕虹路', label: '漕虹路'},
          {value: '区人才', label: '区人才'},
          {value: '属地管理', label: '属地管理'},
          {value: '大柏树工作站', label: '大柏树工作站'},
          {value: '农民工', label: '农民工'},
          {value: '中智', label: '中智'},
          {value: '高校', label: '高校'},
          {value: '经营者', label: '经营者'},
          {value: '厂长经理人才', label: '厂长经理人才'},
          {value: '农民工', label: '农民工'},
          {value: '退休', label: '退休'},
          {value: '协保', label: '协保'},
          {value: '退工不调档', label: '退工不调档'},
          {value: '用工不调档', label: '用工不调档'},
          {value: '非全日制', label: '非全日制'},
          {value: '徐职', label: '徐职'},
          {value: '公司自行保管', label: '公司自行保管'}
        ],                            
        employmentPropertyList: [
           {value: '空', label: '空'},
           {value: '中智', label: '中智'},
           {value: '外包', label: '外包'},
           {value: '独立', label: '独立'}
        ],
        employmentMethodList: [
           {value: '空', label: '空'},
           {value: 'Ukey', label: 'Ukey'},
           {value: '集体转入', label: '集体转入'},
           {value: '用工自办', label: '用工自办'},
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
                 history.go(-1);
              } else {
                this.$Message.error("保存失败！" + data.message);
              }
        })
         
       }
       
    }
  }
</script>
