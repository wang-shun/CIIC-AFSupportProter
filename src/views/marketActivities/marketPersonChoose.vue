<template>
  <div class="smList">
    <Collapse v-model="value1" accordion>
      <Panel name="1">
        <div slot="content">
          <Row>
            <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
              <Form :model="formItem" :label-width="100">
                <Form-item label="公司编号：">
                  <Input v-model="formItem.code" placeholder="请输入"/>
                </Form-item>
              </Form>
            </Col>
            <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
              <Form :model="formItem" :label-width="100">
                <Form-item label="类型">
                  <Select  placeholder="请选择">
                    <Option value="0">全部</Option>
                    <Option value="1">公共关系</Option>
                    <Option value="2">AF客户</Option>
                    <Option value="3">潜在客户</Option>
                    <Option value="4">法务客户</Option>
                    <Option value="5">其他</Option>
                  </Select>
                </Form-item>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
              <Form :model="formItem" :label-width="100">
                <Form-item label="公司名称：">
                  <Input v-model="formItem.code" placeholder="请输入"/>
                </Form-item>
              </Form>
            </Col>
            <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
              <Form :model="formItem" :label-width="100">
                <Form-item label="联系人：">
                  <Input v-model="formItem.code" placeholder="请输入"/>
                </Form-item>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col :xs="{ span: 6, offset: 8 }" :lg="{ span: 6, offset: 8 }">
              <Button type="primary">查询</Button>
              <Button type="warning" @click="resetSearchCondition('formItem')">重置</Button>
            </Col>
          </Row>
        </div>
      </Panel>
    </Collapse>
    <div class="create">
      <router-link to="/applyActivity">
        <Button type="info">加入申请列表</Button>
      </router-link>
      <router-link to="/applyActivity">
        <Button type="info">加入申请列表并下一步</Button>
      </router-link>
    </div>
    <Table border :columns="columns7" :data="data6" ref="table"></Table>
    <Page :total="100" show-sizer show-elevator></Page>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        modal1:false,
        modal11:false,
        value1:'1',
        formItem:{
          input:'',
          select:'',
          select1:'',
          radio:'male',
          checkbox:[],
          switch:true,
          date:'',
          time:'',
          slider:'',
          textarea:''
        },
        columns7: [{
          type: 'selection',
          width: 60,
          align: 'center'
        },{
          title: '类型',
          sortable: true,
          key: 'acceptanceId'
        },{
          title: '公司编号',
          sortable: true,
          key: 'employeeId'
        },{
          title: '公司名称',
          sortable: true,
          key: 'employeeName'
        },{
          title: '联系人',
          sortable: true,
          key: 'companyId'
        },{
          title: '部门',
          sortable: true,
          key: 'companyname'
        },{
          title: '职位',
          sortable: true,
          key: 'state'
        },{
          title: '中智联系人',
          sortable: true,
          key: 'pm1'
        },{
          title: '客户状态',
          sortable: true,
          key: 'pm2'
        }],
        data6: [{
          acceptanceId: '公共关系',
          employeeId: '0',
          employeeName: '朱家角阿婆茶馆',
          companyId:'钟夏琪',
          companyname:'市场部',
          state:'采购专员'
        },{
          acceptanceId: '公共关系',
          employeeId: '0',
          employeeName: '富士通（中国）',
          companyId:'朱艺华',
          companyname:'营销策划部',
          state:'高级经理'
        }],
        peopleTypes: [{
          value: '0',
          label: '全部'
        },{
          value: '1',
          label: '雇员'
        },{
          value: '2',
          label: '子女'
        },{
          value: '3',
          label: '配偶'
        }]
      }
    }
  }
</script>

<style>
  .ivu-card {
    background: rgba(246, 246, 246, 1);
  }
  .checkBtn .ivu-btn{
    float: right;
  }
</style>
