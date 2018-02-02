<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        年调客户雇员信息维护
        <div slot="content">
          <Form :label-width=150 ref="employeeSearchData" :model="employeeSearchData">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="调整年份：" prop="adjustYear">
                <Label>{{employeeSearchData.adjustYear}}</Label>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="客户编号：" prop="companyId">
                <Label>{{employeeSearchData.companyId}}</Label>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="客户名称：" prop="companyName">
                <Label>{{employeeSearchData.companyName}}</Label>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员姓名：" prop="employeeName">
                <Input v-model="employeeSearchData.employeeName"></Input>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员身份证号：" prop="idNum">
                <Input v-model="employeeSearchData.idNum"></Input>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="社保基数：">
                <Col span="10">
                  <Form-item prop="baseAmountStart">
                    <Input v-model="employeeSearchData.baseAmountStart"></Input>
                  </Form-item>
                </Col>
                <Col span="2" offset="2">-</Col>
                <Col span="10">
                <Form-item prop="baseAmountEnd">
                  <Input v-model="employeeSearchData.baseAmountEnd"></Input>
                </Form-item>
                </Col>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 24}" class="tr">
              <Button type="primary" icon="ios-search" @click="handlePageNum(1)">查询</Button>
              <Button type="warning" @click="$refs['employeeSearchData'].resetFields()">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>

    </Collapse>

    <Row class="mt20">
      <Col :sm="{span: 24}">
      <Button type="info" @click="goBack">返回</Button>
      <Button type="info" @click="delSelected">删除选中</Button>
      <Button type="info" @click="updateSelected">批量修改工资</Button>
      <Button type="info" @click="addNew">新增</Button>
      </Col>
    </Row>

    <Row class="mt20">
      <Col :sm="{span:24}">
      <Table border ref="employeeResultData"
             :columns="employeeResultColumns"
             :data="employeeResultData"
             @on-selection-change="handleSelectChange"
      ></Table>
      <Page
        class="pageSize"
        @on-change="handlePageNum"
        @on-page-size-change="handlePageSize"
        :total="employeeResultPageData.total"
        :page-size="employeeResultPageData.pageSize"
        :page-size-opts="employeeResultPageData.pageSizeOpts"
        :current="employeeResultPageData.pageNum"
        show-sizer show-total></Page>
      </Col>
    </Row>

    <Modal v-model="addEmployee" :width="960" :mask-closable="false">
      <div style="margin-bottom: 20px">
          <span style="font-weight: bold">请任意输入下列某一项，来确定所要添加的雇员信息</span>
      </div>
      <div style="margin-bottom: 25px">
        <Form :label-width=150 ref="empSearchData" :model="empSearchData">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员编号：" prop="employeeId">
                <Input v-model="empSearchData.employeeId"></Input>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员身份证号：" prop="idNum">
                <Input v-model="empSearchData.idNum"></Input>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="社保序号：" prop="ssSerial">
                <Input v-model="empSearchData.ssSerial"></Input>
              </Form-item>
              </Col>
          </Row>
          <Row class="tr">
            <Col :sm="{span: 24}">
            <Button type="info" @click="checkExistsEmployee">验证雇员是否存在</Button>
            </Col>
          </Row>
        </Form>
        <span id="check_result" style="color: red">{{checkResult}}</span>
      </div>
      <div id="emp_info" style="display:none">
        <Form :label-width=150 ref="empInputData" :model="empInputData">
         <Row>
           <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
           <Form-item label="雇员编号：" prop="employeeId">
             <Label>{{empInputData.employeeId}}</Label>
           </Form-item>
           </Col>
           <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
           <Form-item label="雇员姓名：" prop="idNum">
             <Label>{{empInputData.employeeName}}</Label>
           </Form-item>
           </Col>
           <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
           <Form-item label="社保序号：" prop="ssSerial">
             <Label>{{empInputData.ssSerial}}</Label>
           </Form-item>
           </Col>
         </Row>
          <Row>
            <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="工资：" prop="salary">
              <Label>{{empInputData.salary}}</Label>
            </Form-item>
            </Col>
            <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="待调工资：" prop="salary">
              <Input v-model="empInputData.chgSalary"></Input>
            </Form-item>
            </Col>
            <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="身份证号：" prop="idNum">
              <Label>{{empInputData.idNum}}</Label>
            </Form-item>
            </Col>
          </Row>
          <Row>
            <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="社保状态：" prop="archiveStatus">
              <Label>{{this.$decode.archiveStatus(empInputData.archiveStatus)}}</Label>
            </Form-item>
            </Col>
            <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="社保基数：" prop="baseAmount">
              <Label>{{empInputData.baseAmount}}</Label>
            </Form-item>
            </Col>
            <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="社保类型：" prop="ssAccountType">
              <Label>{{this.$decode.accountType(empInputData.ssAccountType)}}</Label>
            </Form-item>
            </Col>
          </Row>
          <Row>
            <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="人员分类：" prop="empClassify">
              <Label>{{this.$decode.empClassify(empInputData.empClassify)}}</Label>
            </Form-item>
            </Col>
            <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="结束区县：" prop="settlementArea">
              <Label>{{empInputData.settlementArea}}</Label>
            </Form-item>
            </Col>
            <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="企业社保账户：" prop="ssAccount">
              <Label>{{empInputData.ssAccount}}</Label>
            </Form-item>
            </Col>
          </Row>
          <Row>
            <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="养老金独立开户用户名：" prop="ssUsername">
              <Label>{{empInputData.ssUsername}}</Label>
            </Form-item>
            </Col>
            <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="养老金独立开户密码：" prop="ssPwd">
              <Label>{{empInputData.ssPwd}}</Label>
            </Form-item>
            </Col>
            <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="客户经理：" prop="lowDepartmentName">
              <Label>{{empInputData.lowDepartmentName}}</Label>
            </Form-item>
            </Col>
          </Row>
          <Row>
            <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="客户总监：" prop="highDepartmentName">
              <Label>{{empInputData.highDepartmentName}}</Label>
            </Form-item>
            </Col>
          </Row>
        </Form>
      </div>

      <div slot="footer">
        <button type="button" class="ivu-btn ivu-btn-text ivu-btn-large" @click="cancel"><span>取消</span></button>
        <button type="button" class="ivu-btn ivu-btn-primary ivu-btn-large" @click="ok"><span>确定</span></button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import api from '../../../api/social_security/year_base_applicate/annual_adjust_company_emp'

  export default {
    data() {
      return {
        collapseInfo: [1], //展开栏
        employeeSearchData: {
          adjustYear: (new Date()).getFullYear(),
          annualAdjustCompanyId: this.$route.query.annualAdjustCompanyId,
          companyId: this.$route.query.companyId,
          companyName: this.$route.query.companyName,
          employeeName: '',
          idNum: '',
          baseAmountStart: '',
          baseAmountEnd: '',
        },

        checkResult: '',
        empSearchData: {
          annualAdjustCompanyId: this.$route.query.annualAdjustCompanyId,
          companyId: this.$route.query.companyId,
          employeeId: '',
          idNum: '',
          ssSerial: ''
        },
        empInputData: {
          annualAdjustCompanyEmpId: '',
          annualAdjustCompanyId: this.$route.query.annualAdjustCompanyId,
          companyId: this.$route.query.companyId,
          employeeId: '',
          employeeName: '',
          ss_serial: '',
          salary: '',
          chgSalary: '',
          idNum: '',
          archiveStatus: '',
          baseAmount: '',
          ssAccountType: '',
          empClassify: '',
          settlementArea: '',
          ssAccount: '',
          ssUsername: '',
          ssPwd: '',
          lowDepartmentName: '',
          highDepartmentName: '',
        },

        addEmployee: false,
        employeeData: [],
        modifiedResultData: [],
        deletedResultData: [],

        employeeResultData: [],
        employeeResultPageData: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.DEFAULT_PAGE_SIZE_OPTS
        },

        employeeResultColumns: [
          {
            type: 'selection', width: 60, align: 'center'
          },
          {
            title: '雇员编号', key: 'employeeId', width: 100, align: 'center'
          },
          {
            title: '雇员姓名', key: 'employeeName', width: 100, align: 'center'
          },
          {
            title: '社保账号', key: 'ssSerial', width: 120, align: 'center'
          },
          {
            title: '工资', key: 'salary', width: 120, align: 'center'
          },
          {
            title: '待调工资', key: 'chgSalary', width: 120, align: 'center',
            render: (h,params) => {
              return h('div', [
                h('Input', {
                    style: {
                      border: '0px',
                      width: '84px',
                    },
                    attrs: {
                      name: 'chgSalary',
                      value: params.row.chgSalary
                    },
                    on: {
                      'on-change': (event) => {
                        event.target.style.backgroundColor = 'pink';
                        this.handleChange(params.row.annualAdjustCompanyEmpId, event.target.value)
                      }
                    }
                  }
                )
              ])
            }
          },
          {
            title: '身份证号', key: 'idNum', width: 160, align: 'center'
          },
          {
            title: '社保状态', key: 'archiveStatus', width: 80, align: 'center',
            render: (h, params) => {
              return this.$decode.archiveStatus(params.row.archiveStatus)
            }
          },
          {
            title: '社保类型', key: 'ssAccountType', width: 100, align: 'center',
            render: (h, params) => {
              return this.$decode.accountType(params.row.ssAccountType)
            }
          },
          {
            title: '人员分类', key: 'empClassify', width: 100, align: 'center',
            render: (h, params) => {
              return this.$decode.empClassify(params.row.empClassify)
            }
          },
          {
            title: '社保基数', key: 'baseAmount', width: 120, align: 'center'
          },
          {
            title: '结算区县', key: 'settlementArea', width: 80, align: 'center'
          },
          {
            title: '企业社保账户', key: 'ssAccount', width: 100, align: 'center'
          },
          {
            title: '养老金独立开户用户名', key: 'ssUsername', width: 120, align: 'center'
          },
          {
            title: '养老金独立开户密码', key: 'ssPwd', width: 120, align: 'center'
          },
          {
            title: '客户经理', key: 'lowDepartmentName', width: 120, align: 'center'
          },
          {
            title: '客户总监', key: 'highDepartmentName', width: 120, align: 'center'
          }
        ]
      }
    },
    mounted() {
      let rparams = {annualAdjustCompanyId: this.$route.query.annualAdjustCompanyId};
      api.annualAdjustCompanyEmpQuery(
        {
          pageSize: this.employeeResultPageData.pageSize,
          pageNum: this.employeeResultPageData.pageNum,
          params: rparams,
        }
      ).then(data => {
        if (data.code == 200) {
          this.employeeResultData = data.data.rows;
          this.employeeResultPageData.total = Number(data.data.total);
        } else {
          this.$Message.error(data.message);
        }
      })
    },
    methods: {
      addNew() {
        this.addEmployee = true;
      },
      checkExistsEmployee() {
        if (this.empSearchData.employeeId == '' && this.empSearchData.idNum == '' && this.empSearchData.ssSerial == '') {
          this.$Message.error("请输入查询条件");
          return;
        }
        api.checkExistsEmployee({
            params: this.empSearchData,
          }
        ).then(data => {
          if (data.code == 200) {
            this.empInputData = data.data;
            this.empInputData.companyId = this.$route.query.companyId;
            this.empInputData.annualAdjustCompanyId = this.$route.query.annualAdjustCompanyId;
            if (this.empInputData.annualAdjustCompanyEmpId && this.empInputData.annualAdjustCompanyEmpId != '') {
              this.checkResult = '该雇员信息已添加过，但仍可进行修改';
            } else {
              this.checkResult = '请添加该雇员信息';
            }
            document.getElementById("emp_info").style.display="inline";
          } else {
            this.checkResult = data.message;
            this.employeeResultData.length = 0;
            this.employeeResultPageData.total = 0;
            document.getElementById("emp_info").style.display="none";
          }
        })
      },
      ok() {
        if (this.empInputData.employeeId != '') {
          if (this.empInputData.chgSalary != '') {
            var reg = /(^[1-9]([0-9]{1,7})?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
            if (!reg.test(this.empInputData.chgSalary)) {
              this.$Message.error("待调工资项输入格式有误");
              return false;
            }
          } else {
            this.$Message.error("待调工资为必填项");
            return false;
          }
        } else {
          this.$Message.error("请先验证雇员是否存在");
          return false;
        }
        // submit form data
        api.annualAdjustCompanyEmpInsertOrUpdate({
          params: this.empInputData
        }).then(data => {
          if (data.code == 200) {
            this.$Message.info("雇员信息保存成功");
            this.$refs['empSearchData'].resetFields()
            this.$refs['empInputData'].resetFields()
            //this.empInput = false;
            document.getElementById("emp_info").style.display="none";
            this.addEmployee = false;
            this.annualAdjustCompanyEmpQuery();
          } else {
            this.$Message.error(data.message);
          }
        })
      },
      cancel() {
        this.$refs['empSearchData'].resetFields()
        this.$refs['empInputData'].resetFields()
        //this.empInput = false;
        document.getElementById("emp_info").style.display="none";
        this.addEmployee = false;
      },
      resetDeletedResultData(selection) {
        this.deletedResultData.splice(0, this.deletedResultData.length);
        if(selection) {
          selection.forEach((element, index, array) => {
            this.deletedResultData.push({annualAdjustCompanyEmpId: element.annualAdjustCompanyEmpId});
          })
        }
      },
      handleSelectChange(selection) {
        this.resetDeletedResultData(selection);
      },
      handleChange(aaceid, value) {
        if (this.modifiedResultData) {
          if (this.modifiedResultData.find((x) => {
            var rtn = x.annualAdjustCompanyEmpId == aaceid;
            if (rtn) {
              x.chgSalary = value;
            }
            return rtn;
          }) == undefined) {
             this.modifiedResultData.push({annualAdjustCompanyEmpId: aaceid, chgSalary: value});
          }
        }
      },
      goBack() {
        this.$router.push({name:'annualadjustcompany'});
      },
      updateSelected() {
//        for(var i=0; i<this.modifiedResultData.length; i++) {
//          if (this.modifiedResultData[i]) {
//            var reg = /(^[1-9]([0-9]{1,7})?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
//            if (!reg.test(this.modifiedResultData[i].chgSalary)) {
//              this.$Message.error("工资项输入内容[" + this.modifiedResultData[i].chgSalary + "]格式有误");
//              return false;
//            }
//          }
//        }
        this.autoSubmitAndDiscard();
      },
      delSelected() {
        if (this.deletedResultData && this.deletedResultData.length > 0) {
          var rtn = confirm("是否删除已选中的项？")
          if (rtn) {
            api.annualAdjustCompanyEmpsDelete(this.modifiedResultData).then(data => {
              if (data.code == 200) {
                this.$Message.info("删除成功");
                this.annualAdjustCompanyEmpQuery();
              } else {
                this.$Message.error(data.message);
              }
            })
          } else {
            return false;
          }
        } else {
          this.$Message.error("请先选中要删除的项");
          return false;
        }
      },
      annualAdjustCompanyEmpQuery() {
        // 处理参数
        var params = {};
        {
          // 清除 '[全部]'
          params = this.$utils.clear(this.employeeSearchData);
          // 清除空字符串
          params = this.$utils.clear(params, '');

        }
        api.annualAdjustCompanyEmpQuery(
          {
            pageSize: this.employeeResultPageData.pageSize,
            pageNum: this.employeeResultPageData.pageNum,
            params: params,
          }
        ).then(data => {
          if (data.code == 200) {
            this.employeeResultData = data.data.rows;
            this.employeeResultPageData.total = Number(data.data.total);
          } else {
            this.$Message.error(data.message);
          }
        })

        if (this.deletedResultData && this.deletedResultData.length > 0) {
          this.deletedResultData.splice(0, this.deletedResultData.length);
        }
        if (this.modifiedResultData && this.modifiedResultData.length > 0) {
          this.modifiedResultData.splice(0, this.modifiedResultData.length);
        }
      },
      autoSubmitAndDiscard(type, val) {
        if (this.modifiedResultData && this.modifiedResultData.length > 0) {
          var rtn = confirm("是否保存已修改内容？")
          if (rtn) {
              for(var i=0; i<this.modifiedResultData.length; i++) {
                if (this.modifiedResultData[i]) {
                  if (this.modifiedResultData[i].chgSalary == null || this.modifiedResultData[i].chgSalary == '') {
                    this.$Message.error("请输入待调工资项");
                    return false;
                  }
                  var reg = /(^[1-9]([0-9]{1,7})?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
                  if (!reg.test(this.modifiedResultData[i].chgSalary)) {
                    this.$Message.error("待调工资项输入内容[" + this.modifiedResultData[i].chgSalary + "]格式有误");
                    return false;
                  }
                }
              }
              // submit update modifiedResultData
              api.annualAdjustCompanyEmpsUpdate(this.modifiedResultData).then(data => {
                if (data.code == 200) {
                  this.$Message.info("修改成功");
                  if (val) {
                    this.employeeResultPageData.pageNum = val;
                  }
                  this.annualAdjustCompanyEmpQuery();
                } else {
                  this.$Message.error(data.message);
                }
              })
          } else {
            console.log("no saved")
          }
        } else if (type && type == 1 && val) {
          this.employeeResultPageData.pageNum = val;
          this.annualAdjustCompanyEmpQuery();
        } else if (type && type == 2 && val) {
          this.employeeResultPageData.pageSize = val;
          this.annualAdjustCompanyEmpQuery();
        } else {
          this.$Message.error("请先修改内容");
          return false;
        }
      },
      handlePageNum(val) {
        this.autoSubmitAndDiscard(1, val);
      },
      handlePageSize(val) {
        this.employeeResultPageData.pageNum = 1;
        this.autoSubmitAndDiscard(2, val);
      }
    }
  }
</script>
