<template>
  <div>
    <Form :label-width="150">
      <Row type="flex" justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="材料提交人：">
            {{materials.materialCommiter}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="分机号：">
            {{materials.extNumber}}
          </Form-item>
        </Col>
      </Row>
      <Table border :columns="materialsColumns" :data="materials.materialsData" class="mt20"></Table>
      <Row type="flex" justify="start" class="mt20">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="材料批退原因：">
            <Select v-model="materials.reasonValue" transfer>
              <Option v-for="item in reasonList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </Form-item>
        </Col>
      </Row>
      <Row type="flex" justify="start">
        <Col :sm="{span: 24}" class="tr">
          <Button type="primary"  @click="instance()">材料全部签收</Button>
          <Button type="error" @click="refuseAll">材料全部批退</Button>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
import api from '../../../api/employ_manage/hire_operator'
  export default {
    props: {
      materialsInfo: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        materialsColumns: [
          {title: '材料名称', key: 'materialName', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.materialName),
              ]);
            }
          },
          {title: '前道提交时间', key: 'beforeCommitDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.submitDate),
              ]);
            }
          },
          {title: '后道收到时间', key: 'afterSignDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.receiveDate),
              ]);
            }
          },
        ],
        reasonList: [
          {value: '空', label: '空'},
          {value: '前道要求批退', label: '前道要求批退'},
          {value: '提交材料与AF库不一致', label: '提交材料与AF库不一致'},
          {value: '未提交联系单', label: '未提交联系单'},
          {value: '综保未退工', label: '综保未退工'},
          {value: '外来从业未退工', label: '外来从业未退工'},
          {value: '上家未退工', label: '上家未退工'},
          {value: '居住证用工时间错误', label: '居住证用工时间错误'},
          {value: '未审核雇员个人信息', label: '未审核雇员个人信息'},
          {value: '未审核档案方向', label: '未审核档案方向'},
          {value: '录用名册未盖章', label: '录用名册未盖章'},
          {value: '曾用名未提交户口本复印件', label: '曾用名未提交户口本复印件'},
          {value: '其他', label: '其他'},
          {value: 'AF库提交日期与实际提交材料不符', label: 'AF库提交日期与实际提交材料不符'},
          {value: '未审核实际录用日期', label: '未审核实际录用日期'},
          {value: '采集表信息不全', label: '采集表信息不全'},
          {value: '采集表照片不一致', label: '采集表照片不一致'},
          {value: '未提交独立开户公司材料', label: '未提交独立开户公司材料'},
          {value: '未到实际用工时间', label: '未到实际用工时间'},
          {value: '多领失业金', label: '多领失业金'},
          {value: '采集表提交错误', label: '采集表提交错误'}
          
        ]
      }
    },
    methods: {
      refuseAll() {
         if(this.materialsInfo.reasonValue==''){
           alert("请选择拒绝签收原因");
           return;
         }
         for(var i=0;i<this.materialsInfo.materialsData.length;i++){
           this.materialsInfo.materialsData[i].rejectReason = this.materialsInfo.reasonValue;
           
         }

        api.rejectMaterial(this.materialsInfo.materialsData).then(data => {
                  if (data.data.data == true) {
                    this.$Message.success("保存成功");
                    history.go(-1);
                  } else {
                    this.$Message.error("保存失败！");
                  }
            })
      },instance() {
          
            api.receiveMaterial(this.materialsInfo.materialsData).then(data => {
                  if (data.data.data == true) {
                    this.$Message.success("保存成功");
                    history.go(-1);
                  } else {
                    this.$Message.error("保存失败！");
                  }
            })
          
       }
      
    },
    computed: {
      materials() {
        return this.materialsInfo;
      }
    }
  }
</script>
