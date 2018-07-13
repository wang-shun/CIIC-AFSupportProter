<template>
  <div>
    <Form :label-width="150">
      <Row type="flex" justify="start">
        
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="">
            <Checkbox v-model="employSpecial.companySpecial21" true-value="1" false-value="0">社保自办</Checkbox>
          </Form-item>
        </Col>

         <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="">
            <Checkbox v-model="employSpecial.companySpecial22" true-value="1" false-value="0">公司特殊情况</Checkbox>
          </Form-item>
        </Col>

         <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="备注：">
            <Input v-model="employSpecial.remark" placeholder="请输入" :maxlength="50"/>
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

        var employStr = '';
        if(this.employIndependentInfo.companySpecial0==1)
        {
          employStr = employStr + '无材料用工'+',';
        }

        if(this.employIndependentInfo.companySpecial1==1)
        {
          employStr = employStr + '提交材料复印件件无材料用工'+',';
        }

        if(this.employIndependentInfo.companySpecial2==1)
        {
          employStr = employStr + '用工自办'+',';
        }

        if(this.employIndependentInfo.companySpecial3==1)
        {
          employStr = employStr + '公司更名'+',';
        }

        if(this.employIndependentInfo.companySpecial4==1)
        {
          employStr = employStr + '有盖章录用名册'+',';
        }

        if(this.employIndependentInfo.companySpecial5==1)
        {
          employStr = employStr + '公司自开录用名册'+',';
        }

        if(this.employIndependentInfo.companySpecial6==1)
        {
          employStr = employStr + '用工成功录用名册归还公司'+',';
        }

        if(this.employIndependentInfo.companySpecial7==1)
        {
          employStr = employStr + '公司不同意名册盖章（电子章）'+',';
        }

        fromData.employSpecial = employStr;

        var archiveStr = '';
        if(this.employIndependentInfo.companySpecial8==1)
        {
          archiveStr = archiveStr + '具有档案保管资质'+',';
        }

        if(this.employIndependentInfo.companySpecial9==1)
        {
          archiveStr = archiveStr + '公司自行保管档案'+',';
        }

        if(this.employIndependentInfo.companySpecial10==1)
        {
          archiveStr = archiveStr + '用工不调档'+',';
        }

        if(this.employIndependentInfo.companySpecial11==1)
        {
          archiveStr = archiveStr + '客服跟催档案'+',';
        }

        fromData.archiveSpecial = archiveStr;

        var refuseStr = '';
        if(this.employIndependentInfo.companySpecial12==1)
        {
          refuseStr = refuseStr + '公司自开退工单'+',';
        }

        if(this.employIndependentInfo.companySpecial13==1)
        {
          refuseStr = refuseStr + '退工材料公司自行归档'+',';
        }

        if(this.employIndependentInfo.companySpecial14==1)
        {
          refuseStr = refuseStr + '公司自留存根联'+',';
        }

        if(this.employIndependentInfo.companySpecial15==1)
        {
         refuseStr = refuseStr + '退工自办'+',';
        }

        if(this.employIndependentInfo.companySpecial16==1)
        {
          refuseStr = refuseStr + '上海人退工单'+',';
        }

        if(this.employIndependentInfo.companySpecial17==1)
        {
          refuseStr = refuseStr + '外来从业人员退工单'+',';
        }

        if(this.employIndependentInfo.companySpecial18==1)
        {
          refuseStr = refuseStr + '退工单人事章'+',';
        }

        if(this.employIndependentInfo.companySpecial19==1)
        {
          refuseStr = refuseStr + '不寄退工单'+',';
        }

        fromData.refuseSpecial = refuseStr;

        var str = '';
        if(this.employIndependentInfo.companySpecial21==1)
        {
          str = str + '社保自办'+',';
        }

        if(this.employIndependentInfo.companySpecial22==1)
        {
          str = str + '公司特殊情况'+',';
        }

        fromData.socialSpecial = str;
       
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
