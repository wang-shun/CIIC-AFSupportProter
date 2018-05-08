<template>
  <div>
    <Collapse v-model="value1" accordion>
      <Panel name="1">
        <div slot="content">
          <Form ref="queryItem" :model="queryItem" :label-width="120"> 
            <Row type="flex" justify="start">
              <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">                      
                <Form-item label="客户编号：" prop="companyCode">
                  <Input v-model="queryItem.companyCode" placeholder="请输入"/>
                </Form-item>   
              </i-col>  
              <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">                                                                                   
                <Form-item label="客户姓名：" prop="companyName">
                  <Input v-model="queryItem.companyName" placeholder="请输入"/>
                </Form-item>
              </i-col>                                   
            </Row>   
            <Row type="flex" justify="start" class="tr">  
              <i-col :sm="{span: 24}">
                <Button type="primary" @click="handleCurrentChange(1)" class="ml10" icon="ios-search">查询</Button>
                <Button type="warning" @click="$refs['queryItem'].resetFields()" class="ml10">重置</Button>
              </i-col>
            </Row>                                  
          </Form>                                 
        </div>           
      </Panel>
    </Collapse>

    <div class="create"></div>

    <Table border :columns="colums" :data="companyPage" ></Table>
    <Page @on-change="handleCurrentChange"
        :current="pageNum"
        :page-size="pageSize"
        :total="total" show-elevator show-total></Page>

  </div>
</template>

<script>
import axios from "axios";
import Tools from "../../../lib/tools";

const host = process.env.SITE_HOST;
export default {
  data() {
    return {
      value1: "1",
      pageNum: 1,
      pageSize: 5,
      total: null,
      queryItem: {
        companyCode: "",
        companyName: ""
      },
      colums: [
        {
          title: "客户编号",
          key: "companyId",
          sortable: true
        },
        {
          title: "客户名称",
          key: "companyName"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "companyEdit",
                        query: { data: params.row.companyId }
                      });
                    }
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ],
      companyPage: []
    };
  },
  created() {
    this.find();
  },
  methods: {
    find() {
      var params = {};
      params.params = {};
      params.params.pageNum = this.pageNum;
      params.params.pageSize = this.pageSize;
      params.params.companyName = this.queryItem.companyName;
      params.params.companyId = this.queryItem.companyCode;
      axios.get(host + "/api/company/get", params).then(response => {
        this.companyPage = response.data.data.records;
        this.total = response.data.data.total;
      });
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.find();
    }
  }
};
</script>

<style scoped>

</style>
