<template>
  <div>
    <Collapse v-model="value1" accordion>
      <Panel name="1">
        <div slot="content">
          <Form ref="queryItem" :model="queryItem" :label-width="120">
            <Row type="flex" justify="start">
              <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="证件类型" prop="type">
                  <Select v-model="queryItem.type" placeholder="请选择" transfer>
                    <Option v-for="(value,key) in this.baseDic.credentialsType" :value="key" :key="key">{{ value }}</Option>
                  </Select>
                </Form-item>
              </i-col>
              <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="办理机构：" prop="name">
                  <Select v-model="queryItem.name" placeholder="请选择" transfer>
                    <Option v-for="(value,key) in this.baseDic.DealOrg" :value="value" :key="key">{{ value }}</Option>
                  </Select>
                </Form-item>
              </i-col>
            </Row>
            <Row type="flex" justify="start" class="tr">
              <i-col :sm="{span: 24}">
                <Button type="primary" @click="handleCurrentChange(1)" class="ml10" icon="ios-search">查询</Button>
                <Button type="warning" @click="$refs['queryItem'].resetFields();" class="ml10">重置</Button>
              </i-col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <Row style="margin: 10px; 0px; 5px; 0px;">
      <i-col style="text-align: right">
        <Button type="primary" @click="add">新增政策</Button>
      </i-col>
    </Row>

    <Table border :columns="colums" :data="data1" :disabled-hover="disablehover"></Table>
     <Page @on-change="handleCurrentChange"
              :current="pageNum"
              :page-size="pageSize"
              :total="total" show-elevator show-total></Page>

    <Modal
      v-model="modal1"
      title="办理机构政策">
      <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="120">
        <Row >
          <i-col span="12">
            <Form-item label="证件类型：" style="width:400px;" prop="type">
              <Select v-model="formItem.type" placeholder="请选择" style="width:260px" transfer>
                <Option v-for="(value,key) in this.baseDic.credentialsType" :value="key" :key="key">{{ value }}</Option>
              </Select>
            </Form-item>
          </i-col>
        </Row>
        <Row  >
          <i-col span="12">
            <Form-item label="办理机构：" style="width:400px;margin-top:10px" prop="name">
              <Select v-model="formItem.name" placeholder="请选择" style="width:260px" transfer>
                <Option v-for="(value,key) in this.baseDic.DealOrg" :value="value" :key="key">{{ value }}</Option>
              </Select>
            </Form-item>
          </i-col>
        </Row>
        <Row >
           <i-col span="12">
            <Form-item label="操作口径：" style="width:400px;margin-top:10px" prop="policyDescription">
              <Input v-model="formItem.policyDescription" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="请输入" style="width:260px" />
            </Form-item>
          </i-col>
        </Row>
      </Form>
      <div slot="footer">
        <Row type="flex" justify="start" class="tr">
          <i-col :sm="{span: 24}">
            <Button type="primary" @click="ok('formItem')" class="ml10">保存</Button>
            <Button type="warning" @click="$refs['formItem'].resetFields();modal1 = false" class="ml10">取消</Button>
          </i-col>
        </Row>
      </div>
    </Modal>
  </div>
</template>

<script>
import axios from "axios";
import Tools from "../../../lib/tools";
import Decode from "../../../lib/decode";
import ajax from "../../../lib/ajax";
const AJAX = ajax.ajaxCM;
const host = process.env.SITE_HOST;
export default {
  data() {
    return {
      value1: "1",
      modal1: false,
      disablehover: true,
      pageNum: 1,
      pageSize: 10,
      total: null,
      queryItem: {
        type: "",
        name: ""
      },
      formItem: {
        orgPolicyId: "",
        type: "",
        name: "",
        policyDescription: "",
        isActive: "",
        createdTime: "",
        createdBy: "",
        modifiedBy: "",
        modifiedTime: ""
      },
      ruleValidate: {
        type: [
          { required: true, message: "请选择证件类型", trigger: "change" }
        ],
        name: [
          { required: true, message: "请选择办理机构", trigger: "change" }
        ],
        policyDescription: [
          { required: true, message: "政策内容不能为空", trigger: "change" }
        ]
      },
      colums: [
        {
          title: "办理机构",
          key: "name",
          sortable: true
        },
        {
          title: "证件类型",
          key: "typeN"
        },
        {
          title: "创建人",
          key: "createdBy"
        },
        {
          title: "创建日期",
          key: "createdTime",
          sortable: true
        },
        {
          title: "操作口径",
          key: "policyDescription",
          ellipsis: true,
          render: (h, params) => {
            return h(
              "Tooltip",
              {
                props: {
                  placement: "bottom-start",
                  delay: 500,
                  transfer: true
                }
              },
              [
                h("div", params.row.policyDescription),
                h(
                  "div",
                  {
                    slot: "content"
                  },
                  [h("div", params.row.policyDescription)]
                )
              ]
            );
          }
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
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.formItem = { ...params.row };
                      this.formItem.type = params.row.type.toString();
                      this.modal1 = true;
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "警告",
                        content: "您真的要删除吗？",
                        okText: "删除",
                        onOk: () => {
                          this.del(params.row.orgPoilcyId);
                        }
                      });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data1: []
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
      params.params.name = this.queryItem.name;
      params.params.type = this.queryItem.type;
      AJAX.get(host + "/api/orgPolicy/find", params).then(response => {
        this.data1 = response.data.data.records;
        this.total = response.data.data.total;
      });
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.find();
    },
    add() {
      this.modal1 = true;
    },
    ok(value) {
      this.$refs[value].validate(valid => {
        if (valid) {
          AJAX
            .postJSON(host + "/api/orgPolicy/saveOrUpdate", this.formItem)
            .then(response => {
              if (response.data.errCode === "0") {
                this.$Notice.success({
                  title: "保存成功",
                  desc: ""
                });
                this.modal1 = false;
                this.find();
                this.$refs["formItem"].resetFields();
                this.formItem.orgPoilcyId = "";
              } else {
                this.$Notice.error({
                  title: "保存失败",
                  desc: ""
                });
              }
            })
            .catch(error => {
              this.$Notice.error({
                title: "保存失败",
                desc: ""
              });
            });
        }
      });
    },
    del(val) {
      if (val !== "" && val !== null) {
        AJAX
          .get(host + "/api/orgPolicy/delete?id=" + val)
          .then(response => {
            if (response.data.errCode === "0") {
              this.find();
              this.$Notice.success({
                title: "删除成功",
                desc: ""
              });
            } else if (response.data.errCode === "1") {
              this.$Notice.error({
                title: "删除失败",
                desc: response.data.message
              });
            } else {
              this.$Notice.error({
                title: "删除失败",
                desc: ""
              });
            }
          })
          .catch(error => {
            this.$Notice.error({
              title: "删除失败",
              desc: ""
            });
          });
      }
    }
  }
};
</script>

<style scoped>
.ivu-tooltip-inner {
  color: #211f1f;
  background-color: #e9eaec;
}
</style>
