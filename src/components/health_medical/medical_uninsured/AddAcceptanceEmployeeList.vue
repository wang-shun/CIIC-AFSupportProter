<template>
  <div>
    <Collapse v-model="value1">
      <Panel name="1">
        查询雇员
        <div slot="content">
          <Form ref="formItem" :model="formItem" :label-width="140">
            <Row justify="start" class="mt20 mr10">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员编号" prop="employeeId">
                  <Input v-model="formItem.employeeId" placeholder="请输入"/>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员姓名" prop="employeeName">
                  <Input v-model="formItem.employeeName" placeholder="请输入"/>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公司编号" prop="companyId">
                  <Input v-model="formItem.companyId" placeholder="请输入"/>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公司名称" prop="companyName">
                  <Input v-model="formItem.companyName" placeholder="请输入"/>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="证件号码" prop="idNum">
                  <Input v-model="formItem.idNum" placeholder="请输入"/>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="连带人" prop="jointPersonName">
                  <Input v-model="formItem.jointPersonName" placeholder="请输入"/>
                </Form-item>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col :sm="{span: 24}" class="tr">
                <Button type="primary" @click="getByPage(1)" icon="ios-search">查询</Button>
                <Button type="warning" @click="resetSearchCondition('formItem')">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <div class="tr m20">
      <router-link to="/acceptanceList">
        <Button type="warning">返回受理单列表</Button>
      </router-link>
    </div>
    <Table stripe
           border
           :columns="addAcceptanceColumns"
           :data="addAcceptanceData"></Table>
    <Page show-sizer show-elevator
          @on-change="getByPage"
          @on-page-size-change="pageSizeChange"
          :total="formItem.total"
          :current="formItem.current"
          :page-size="formItem.size"></Page>
  </div>
</template>
<script>
  import admissibility from '../../../store/modules/health_medical/data_sources/admissibility.js'
  import apiAjax from "../../../data/health_medical/uninsured_application.js";

  export default {
    data() {
      return {
        value1: '1',
        formItem: {
          total: 0,
          current: 1,
          size: 10,
          employeeId: null,
          employeeName: null,
          companyId: null,
          companyName: null,
          idNum: null,
          jointPersonName: null,
        },
        addAcceptanceColumns: [
          {
            title: '雇员编号', sortable: true, key: 'employeeId'
          },
          {
            title: '雇员姓名', sortable: true, key: 'employeeName'
          },
          {
            title: '公司编号', sortable: true, key: 'companyId'
          },
          {
            title: '公司名称', sortable: true, key: 'companyName'
          },
          {
            title: '雇员状态', sortable: true, key: 'status',
            render: (h, params) => {
              return admissibility.employeeStatusProperties(params.row.status);
            }
          },
          {
            title: '操作', key: 'action', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {type: 'success', size: 'small'},
                  on: {
                    click: () => {
                      sessionStorage.setItem('acceptanceEmployee', JSON.stringify(params.row));
                      this.$router.push({name: 'addAcceptance'});
                    }
                  }
                }, '新增受理单')
              ]);
            }
          }
        ],
        addAcceptanceData: [],
      }
    },
    created() {
      this.selectEmployeeList();
    },
    methods: {
      selectEmployeeList() {
        apiAjax.queryEmployeeList(this.formItem).then(response => {
          this.addAcceptanceData = response.data.object.records;
          this.formItem.total = response.data.object.total;
        }).catch(e => {
          console.info(e.message);
          this.$Message.error("服务器异常，请稍后再试");
        });
      },
      getByPage(val) {
        this.formItem.current = val;
        this.selectEmployeeList()
      },
      pageSizeChange(size) {
        this.formItem.size = size;
        this.selectEmployeeList()
      },
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      remove(index) {
        this.data6.splice(index, 1);
      }
    }
  }

</script>
<style>

</style>
