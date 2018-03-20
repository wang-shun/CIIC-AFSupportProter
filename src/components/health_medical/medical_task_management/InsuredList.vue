<template>
  <div>
    <Collapse v-model="value1" accordion>
      <Panel name="1">
        <div slot="content">
          <Form :model="formItem" ref="formItem" :label-width="100">
            <Row justify="start" class="mt20 mr10">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
              <FormItem label="投保日期" prop="insuranceDateRange">
                <DatePicker v-model="formItem.insuranceDateRange" type="daterange" placement="bottom-end"
                            placeholder="选择日期" style="width: 100%"></DatePicker>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
              <FormItem label="退保日期" prop="surrenderDateRange">
                <DatePicker v-model="formItem.surrenderDateRange" type="daterange" placement="bottom-end"
                            placeholder="选择日期" style="width: 100%"></DatePicker>
              </FormItem>
              </Col>
              <!--<Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="保险公司">
                <Select placeholder="请选择">
                  <Option value="1" v-for="item in insureCompany" :value="item.value" :key="item.value">{{item.label}}
                  </Option>
                </Select>
              </FormItem>
              </Col>-->
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="保险名称" prop="productName">
                <Select v-model="formItem.productName" placeholder="请选择">
                  <Option v-for="item in insureProject" :value="item.value"
                          :key="item.value">{{item.label}}
                  </Option>
                </Select>
              </FormItem>
              </Col>
              <!--<Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="状态">
                <Select placeholder="请选择">
                  <Option v-model="formItem.status" v-for="item in insureStatus" :value="item.value" :key="item.value">
                    {{item.label}}
                  </Option>
                </Select>
              </FormItem>
              </Col>-->
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="保额类型" prop="keyType">
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

    <div class="tr m20">
      <Button type="info" @click="modalInput = true" icon="ios-upload-outline">导入数据</Button>
    </div>
    <Table border
           stripe
           :columns="warrantyColumns"
           :data="warrantyData"></Table>
    <Page show-sizer show-elevator
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
              return warranty.insuredToChina(params.row.insured);
            }
          }
        ],
        warrantyData: [],
        insureProject: [
          {
            label: '家庭财产险', value: 'p1'
          },
          {
            label: '二十种重大疾病险', value: 'p2'
          },
          {
            label: '补充医疗险', value: 'p3'
          },
        ],
        keyTypeProperties: task.keyTypeProperties,
        insureCompany: [
          {
            label: '中智', value: 'p1'
          },
          {
            label: '中国平安保险', value: 'p2'
          },
          {
            label: '中国大地保险', value: 'p3'
          }
        ]
      }
    },
    created() {
      this.getByPage(1);
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
