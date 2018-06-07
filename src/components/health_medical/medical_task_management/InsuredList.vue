<template>
  <div>
    <Collapse v-model="value1" accordion>
      <Panel name="1">
        <div slot="content">
          <Form :model="formItem" ref="formItem" :label-width="100">
            <Row justify="start" class="mt20 mr10">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
                <FormItem label="投保日期" prop="insuranceDateRange">
                  <DatePicker v-model="formItem.insuranceDateRange" type="daterange" placement="bottom-start"
                              placeholder="选择日期" style="width: 100%"></DatePicker>
                </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
                <FormItem label="退保日期" prop="surrenderDateRange">
                  <DatePicker v-model="formItem.surrenderDateRange" type="daterange" placement="bottom-start"
                              placeholder="选择日期" style="width: 100%"></DatePicker>
                </FormItem>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="保险公司" prop="insuranceCompany">
                  <Select v-model="formItem.insuranceCompany" :clearable="true"
                          @on-change="queryIcProductRelationInfo(formItem.insuranceCompany)">
                    <Option v-for="item in insuranceCompanyProperties" :value="item.insuranceCompanyId"
                            :key="item.insuranceCompanyId">
                      {{item.insuranceCompanyName}}
                    </Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="保单" prop="afProductId">
                  <Select v-model="formItem.afProductId" :clearable="true">
                    <Option v-for="item in taskTypeItem" :value="item.insurancePolicyId" :key="item.insurancePolicyId">
                      {{item.insurancePolicyName}}
                    </Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="标的类型" prop="keyType">
                  <Select v-model="formItem.keyType" :clearable="true">
                    <Option v-for="item in keyTypeProperties" :value="item.value" :key="item.value">{{item.label}}
                    </Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="大于" prop="keyValueLarge">
                  <InputNumber v-model="formItem.keyValueLarge" style="width: 100%"></InputNumber>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="小于" prop="keyValueSmall">
                  <InputNumber v-model="formItem.keyValueSmall" style="width: 100%"></InputNumber>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
                <FormItem label="雇员编号" prop="employeeId">
                  <Input v-model="formItem.employeeId" placeholder="请输入"/>
                </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
                <FormItem label="雇员姓名" prop="employeeName">
                  <Input v-model="formItem.employeeName" placeholder="请输入"/>
                </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
                <FormItem label="证件号码" prop="idNum">
                  <Input v-model="formItem.idNum" placeholder="请输入"/>
                </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
                <FormItem label="公司编号" prop="companyId">
                  <Input v-model="formItem.companyId" placeholder="请输入"/>
                </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
                <FormItem label="公司名称" prop="companyName">
                  <Input v-model="formItem.companyName" placeholder="请输入"/>
                </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col :sm="{span: 24}" class="tr">
                <Button type="primary" icon="ios-search" @click="getByPage(1)">查询</Button>
                <Button type="warning" @click="resetSearchCondition('formItem')">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <Table border
           stripe
           :columns="warrantyColumns"
           :data="warrantyData"></Table>
    <Page show-elevator
          @on-change="getByPage"
          @on-page-size-change="pageSizeChange"
          :total="formItem.total"
          :current="formItem.current"
          :page-size="formItem.size"></Page>
  </div>
</template>
<script>
  import expandRow from './ExpandRow.vue';
  import ajax from "../../../data/health_medical/warranty.js";
  import taskAjax from "../../../data/health_medical/task_medica.js";
  import warranty from '../../../store/modules/health_medical/data_sources/warranty.js'
  import task from '../../../store/modules/health_medical/data_sources/medical_task.js'

  export default {
    components: {expandRow},
    data() {
      return {
        value1: '1',
        formItem: {
          total: 0,
          current: 1,
          size: 10,
          insuranceDateRange: [],
          surrenderDateRange: [],
          insuranceCompany: "1",
          afProductId: null,
          productName: null,
          employeeId: null,
          employeeName: null,
          idNum: null,
          companyId: null,
          companyName: null,
          keyType: null,
          keyValueLarge: null,
          keyValueSmall: null,
        },
        warrantyColumns: [
          {
            type: 'expand',
            width: 50,
            render: (h, params) => {
              return h(expandRow, {
                props: {
                  row: params.row
                }
              })
            }
          },
          {
            title: '险种名称', sortable: true, key: 'productName', align: 'center'
          },
          {
            title: '雇员编号', sortable: true, key: 'employeeId', align: 'center'
          },
          {
            title: '雇员姓名', sortable: true, key: 'employeeName', align: 'center'
          },
          {
            title: '是否在保', sortable: true, key: 'insured', align: 'center',
            render: (h, params) => {
              return h('div', warranty.insuredToChina(params.row.insured));
            }
          }
        ],
        warrantyData: [],
        taskTypeItem: [],
        keyTypeProperties: task.keyTypeProperties,
        insuranceCompanyProperties: []
      }
    },
    created() {
      this.getByPage(1);
      this.queryInsuranceCompanyInfo();
      this.queryIcProductRelationInfo(this.formItem.insuranceCompany);
    },
    methods: {
      queryWarrantyPage() {
        ajax.queryWarrantyPage(this.formItem).then(response => {
          this.warrantyData = response.data.object.records;
          this.formItem.total = response.data.object.total;
        }).catch(e => {
          console.info(e.message);
          this.$Message.error("服务器异常，请稍后再试");
        });
      },
      queryInsuranceCompanyInfo() {
        taskAjax.queryInsuranceCompany().then(response => {
          if (response.data.code === 200) {
            this.insuranceCompanyProperties = response.data.object;
            this.insuranceCompanyProperties.forEach(item => {
              item.insuranceCompanyId = item.insuranceCompanyId + "";
            });
          }
        });
      },
      queryIcProductRelationInfo(val) {
        taskAjax.queryIcProductRelation(val).then(response => {
          if (response.data.code === 200) {
            this.taskTypeItem = response.data.object;
            this.taskTypeItem.forEach(item => {
              item.insuranceProductId = item.insuranceProductId + "";
            });
          }
        });
      },
      getByPage(val) {
        this.formItem.current = val;
        this.queryWarrantyPage()
      },
      pageSizeChange(size) {
        this.formItem.size = size;
        this.queryWarrantyPage()
      },
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
    }
  }

</script>
