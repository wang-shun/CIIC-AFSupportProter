<template>
  <div class="smList">
    <Steps :current="0">
      <Step title="选择联系人"></Step>
      <Step title="选择礼品"></Step>
      <Step title="确认信息"></Step>
    </Steps>
    <Collapse v-model="value1" accordion>
      <Panel name="1">
        <div slot="content">
          <Row>
            <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
              <Form :model="formItem" :label-width="100">
                <Form-item label="赠送对象">
                  <Select v-model="modal1" placeholder="请选择">
                    <Option v-for="item in peopleTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </Form-item>
              </Form>
            </Col>
          </Row>
          <Row v-if="modal1 != '7'">
            <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
              <Form :model="formItem" :label-width="100">
                <Form-item label="联系人">
                  <Input v-model="formItem.code" placeholder="请输入"></Input>
                </Form-item>
              </Form>
            </Col>
            <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
              <Form :model="formItem" :label-width="100">
                <Form-item label="公司名称">
                  <Input v-model="formItem.code" placeholder="请输入"/>
                </Form-item>
              </Form>
            </Col>
            <Col :xs="{ span: 6, offset: 8 }" :lg="{ span: 6, offset: 8 }">
              <Button type="primary" icon="ios-search">查询</Button>
              <Button type="warning" @click="resetSearchCondition('formItem')">重置</Button>
            </Col>
          </Row>
        </div>
      </Panel>
    </Collapse>

    <div class="create"  v-if="modal1 != '7'">
      <router-link  to="/giftApplicationManager">
        <Button type="info">返回</Button>
      </router-link>
      <router-link  to="/giftApply">
        <Button type="info">确认申请</Button>
      </router-link>
    </div>

    <br/>

    <Card  v-if="modal1 === '7'">
      <Form :model="formItem" :label-width="120">
        <Row>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
            <Form-item label="类型">
              <Select v-model="model1" placeholder="请选择">
                <Option value="1">个人</Option>
                <Option value="2">公司</Option>
              </Select>
            </Form-item>
            <Form-item label="申请人">
              <Input v-model="formItem.code" placeholder="请输入"/>
            </Form-item>
            <Form-item label="申请人分机号">
              <Input v-model="formItem.code" placeholder="请输入"/>
            </Form-item>
          </Col>
        </Row>
        <Row>
          <Col :xs="{ span: 6, offset: 2 }" :lg="{ span: 6, offset: 2 }">
            <router-link  to="/giftApplicationManager">
              <Button type="info">返回</Button>
            </router-link>
            <router-link  to="/giftApply">
              <Button type="info">确认申请</Button>
            </router-link>
          </Col>
        </Row>
      </Form>
    </Card>

    <br/>
    <Table v-if="modal1 === '0'" highlight-row stripe border :columns="columns6" :data="data6" ref="table"></Table>
    <Table v-else-if="modal1 != '0' && modal1 != '7'" stripe border :columns="columns7" :data="data6" ref="table"></Table>
    <Page :total="100" show-sizer show-elevator v-if="modal1 != '7'"></Page>

  </div>
</template>

<script>
  export default {
    data(){
      return {
        modal1:1,
        modal11:false,
        value1:'1',
        gongsi:'0',
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
        columns6: [{
          title: "选择",
          key: "action",
          width: 80,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Radio",
                {
                  props: {
                    multiple:"false",
                    size: "default"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "giftAdd",
                        params: {
                          data: params.row
                        }
                      });
                    }
                  }
                }
              )
            ]);
          }
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
        }],

        columns7: [{
          title: "选择",
          key: "action",
          width: 80,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Radio",
                {
                  props: {
                    multiple:"false",
                    size: "default"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "giftAdd",
                        params: {
                          data: params.row
                        }
                      });
                    }
                  }
                }
              )
            ]);
          }
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
          label: '公司'
        },{
          value: '1',
          label: '商户个体（联系人）'
        },{
          value: '2',
          label: '公共关系（联系人）'
        },{
          value: '3',
          label: '投诉慰问（雇员）'
        },{
          value: '4',
          label: 'AF客户（联系人）'
        },{
          value: '5',
          label: '潜在客户（联系人）'
        },{
          value: '6',
          label: '法务客户（联系人）'
        },{
          value: '7',
          label: '其他'
        }]
      }
    }
  }
</script>

<style>

</style>
