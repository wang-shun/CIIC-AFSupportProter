<template>
  <div>
    <Form :label-width="150">
      <Row type="flex" justify="start">

        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="组织机构代码：">
            {{employSpecial.organizationCode}}
          </Form-item>
        </Col>
        
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="">
            <Checkbox v-model="employSpecial.key" true-value="1" false-value="0">ukey</Checkbox>
          </Form-item>
        </Col>

         <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="Ukey类别：" prop="UkeyType">
            <Select v-model="employSpecial.keyType" transfer>
              <Option v-for="item in transferFeedbackList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </Form-item>
        </Col>

        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="uKey编号：">
            <Input v-model="employSpecial.keyCode" placeholder="请输入" :maxlength='50'/>
          </Form-item>
        </Col>

        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="档案部uKey密码：">
            <Input v-model="employSpecial.keyPwd" placeholder="请输入" :maxlength='50'/>
          </Form-item>
        </Col>

        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="uKey状态：">
            <Input v-model="employSpecial.keyStatus" placeholder="请输入" :maxlength='50'/>
          </Form-item>
        </Col>

      </Row>
      <Row type="flex" justify="start">
        <Col :sm="{span: 24}" class="tr">
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
      employIndependentInfo: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        
        transferFeedbackList: [
          {value:'空',label:'空'},
          {value:'已告知本人转档',label:'已告知本人转档'},
          {value:'无档自查',label:'无档自查'},
          {value:'浦东职介代管',label:'浦东职介代管'},
          {value:'黄浦职介代管',label:'黄浦职介代管'},
          {value:'长宁职介代管',label:'长宁职介代管'},
          {value:'静安职介代管',label:'静安职介代管'},
          {value:'普陀职介代管',label:'普陀职介代管'},
          {value:'虹口职介代管',label:'虹口职介代管'},
          {value:'金桥职介代管',label:'金桥职介代管'},
          {value:'徐汇职介代管',label:'徐汇职介代管'},
          {value:'档在高招办',label:'档在高招办'}

        ]
       
      }
    },
    computed: {
      employSpecial() {
        return this.employIndependentInfo;
      }
    },
    methods: {

       instance() {
         
       var fromData = this.$utils.clear(this.employIndependentInfo,'');
       
        api.saveCompanySet(fromData).then(data => {
              if (data.code == 200) {
                  this.$Message.success("保存成功");
                } else {
                  this.$Message.error("保存失败！" + data.message);
                }
        })
         
         
       }
       
    }
  }
</script>
