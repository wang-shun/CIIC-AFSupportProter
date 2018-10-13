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
                <FormItem label="保险公司" prop="insuranceCompany">
                  <label>
                    <Select v-model="formItem.insuranceCompany" :clearable="true"
                            @on-change="queryIcProductRelationInfo(formItem.insuranceCompany)">
                      <Option v-for="item in insuranceCompanyProperties" :value="item.insuranceCompanyId"
                              :key="item.insuranceCompanyId">
                        {{item.insuranceCompanyName}}
                      </Option>
                    </Select>
                  </label>
                </FormItem>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <FormItem label="保单" prop="afProductId">
                  <label>
                    <Select v-model="formItem.afProductId" :clearable="true">
                      <Option v-for="item in taskTypeItem" :value="item.insurancePolicyId" :key="item.insurancePolicyId">
                        {{item.insurancePolicyName}}
                      </Option>
                    </Select>
                  </label>
                </FormItem>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <FormItem label="标的类型" prop="keyType">
                  <label>
                    <Select v-model="formItem.keyType" :clearable="true">
                      <Option v-for="item in keyTypeProperties" :value="item.value" :key="item.value">{{item.label}}
                      </Option>
                    </Select>
                  </label>
                </FormItem>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <FormItem label="大于" prop="keyValueLarge">
                  <InputNumber v-model="formItem.keyValueLarge" style="width: 100%"></InputNumber>
                </FormItem>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <FormItem label="小于" prop="keyValueSmall">
                  <InputNumber v-model="formItem.keyValueSmall" style="width: 100%"></InputNumber>
                </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
                <FormItem label="雇员编号" prop="employeeId">
                  <Input v-model="formItem.employeeId" placeholder="请输入"></Input>
                </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
                <FormItem label="雇员姓名" prop="employeeName">
                  <Input v-model="formItem.employeeName" placeholder="请输入"></Input>
                </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
                <FormItem label="证件号码" prop="idNum">
                  <Input v-model="formItem.idNum" placeholder="请输入"></Input>
                </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
                <FormItem label="公司编号" prop="companyId">
                  <Input v-model="formItem.companyId" placeholder="请输入"></Input>
                </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
                <FormItem label="公司名称" prop="companyName">
                  <Input v-model="formItem.companyName" placeholder="请输入"></Input>
                </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="在保" prop="insured">
                <i-switch v-model="formItem.insured" size="large" @on-change="getByPage(1)">
                  <span slot="open">Yes</span>
                  <span slot="close">No</span>
                </i-switch>
              </Form-item>
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
    <div class="tr m20">
      <Button type="info" @click="exportData()" icon="ios-download-outline">导出数据</Button>
    </div>
    <Table border
           stripe
           :columns="warrantyColumns"
           :data="warrantyData"></Table>
    <Page show-elevator
          show-total
          @on-change="getByPage"
          @on-page-size-change="pageSizeChange"
          :total="formItem.total"
          :current="formItem.current"
          :page-size="formItem.size"></Page>
  </div>
</template>
<script>
  import ajax from "../../../data/health_medical/warranty.js";
  import taskAjax from "../../../data/health_medical/task_medica.js";
  import warranty from '../../../store/modules/health_medical/data_sources/warranty.js'
  import task from '../../../store/modules/health_medical/data_sources/medical_task.js'
  import apiAjax from "../../../data/health_medical/task_medica.js";
  import {localStorage, sessionStorage} from '../../../assets/api/storage'
  import qs from "qs";

  export default {
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
        userInfo: {},
        warrantyColumns: [
          {
            title: '险种名称', sortable: true, key: 'productName', align: 'center', width: 150
          },
          {
            title: '雇员编号', sortable: true, key: 'employeeId', align: 'center', width: 150
          },
          {
            title: '雇员姓名', sortable: true, key: 'employeeName', align: 'center', width: 150
          },
          {
            title: '是否在保', sortable: true, key: 'insured', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', warranty.insuredToChina(params.row.insured));
            }
          },
          {
            title: '公司编号', sortable: true, key: 'companyId', align: 'center', width: 150
          },
          {
            title: '公司名称', sortable: true, key: 'companyName', align: 'center', width: 150
          },
//          {
//            title: '投保对象', sortable: true, key: 'employeeName', align: 'center', width: 150
//          },
          {
            title: '保险名称', sortable: true, key: 'productName', align: 'center', width: 150
          },
          {
            title: '投保公司', sortable: true, key: 'policyType', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', task.insuranceCompanyToString(params.row.policyType));
            }
          },
          {
            title: '投保日期', sortable: true, key: 'insuranceDate', align: 'center', width: 150,
            render: (h, params) => {
              if (params.row.insuranceDate !== null) {
                return h('div', this.$utils.formatDate(params.row.insuranceDate, "YYYY-MM-DD"));
              }
            }
          },
          {
            title: '退保日期', sortable: true, key: 'surrenderDate', align: 'center', width: 150,
            render: (h, params) => {
              if (params.row.surrenderDate !== null) {
                return h('div', this.$utils.formatDate(params.row.surrenderDate, "YYYY-MM-DD"));
              }
            }
          },
          {
            title: '类型', sortable: true, key: 'type', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', task.typeToChina(params.row.type));
            }
          },
          {
            title: '连带人编号', sortable: true, key: 'associatedInsurantId', align: 'center', width: 150
          },
          {
            title: '连带人姓名', sortable: true, key: 'associatedInsurantName', align: 'center', width: 150
          },
          {
            title: '性别', sortable: true, key: 'gender', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', task.genderToChina(params.row.gender));
            }
          },
          {
            title: '年龄', sortable: true, key: 'age', align: 'center', width: 150
          },
          {
            title: '出生日期', sortable: true, key: 'birthDate', align: 'center', width: 150,
            render: (h, params) => {
              if (params.row.birthDate !== null) {
                return h('div', this.$utils.formatDate(params.row.birthDate, "YYYY-MM-DD"));
              }
            }
          },
          {
            title: '标的', sortable: true, key: 'keyValue', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', task.reverseAmount(params.row.keyType, params.row.keyValue));
            }
          },
          {
            title: '保险起始日期', sortable: true, key: 'insuranceStartDate', align: 'center', width: 150,
            render: (h, params) => {
              if (params.row.insuranceStartDate !== null) {
                return h('div', this.$utils.formatDate(params.row.insuranceStartDate, "YYYY-MM-DD"));
              }
            }
          },
          {
            title: '保险截止日期', sortable: true, key: 'insuranceEndDate', align: 'center', width: 150,
            render: (h, params) => {
              if (params.row.insuranceEndDate !== null) {
                return h('div', this.$utils.formatDate(params.row.insuranceEndDate, "YYYY-MM-DD"));
              }
            }
          },
          {
            title: '说明', sortable: true, key: 'remark', align: 'center', width: 150,
          },
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
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
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
      exportData() {
        window.location = apiAjax.basePaths + "/warrantyService/exportWarranty?" + qs.stringify(this.formItem) + '&token=' + encodeURIComponent(this.userInfo.token);
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
