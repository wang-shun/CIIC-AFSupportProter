<template>
<div class="smList">
<Collapse v-model="collapseInfo">
<Panel name="1">
  Ukey管理 {{$route.query.id != 0 ? "维护详情" : "新增UKEY"}}
  <div slot="content">
  <Form :label-width=150 ref="uekyFile" :model="uekyFile">
    <Row type="flex" justify="start">
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="公司编号：">
          <input-company v-model="uekyFile.companyId" v-on:input="updateData" :only="true"></input-company>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="公司名称：">
          <Input  placeholder="请输入..." :disabled="(uekyFile.companyId=='')" v-model="uekyFile.companyName" :maxlength="30" ></Input>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="组织机构代码：">
          <Input  placeholder="请输入..." :disabled="(uekyFile.companyId=='')" v-model="uekyFile.organizationCode" :maxlength="30" ></Input>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="社保登记码：">
          <Input  placeholder="请输入..." :disabled="(uekyFile.companyId=='')" v-model="uekyFile.ssAccount" :maxlength="30" ></Input>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="服务中心：">
          <Input  placeholder="请输入..." :disabled="(uekyFile.companyId=='')" v-model="uekyFile.serviceCenter" :maxlength="30" ></Input>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="客户经理：">
          <Input  placeholder="请输入..." :disabled="(uekyFile.companyId=='')" v-model="uekyFile.team" :maxlength="30" ></Input>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="材料签收日期：">
          <DatePicker  type='date' :disabled="(uekyFile.companyId=='')" placement="bottom-end" placeholder="选择日期" v-model="uekyFile.materialReceiveDate"  style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="材料送办日期：">
          <DatePicker  type='date' :disabled="(uekyFile.companyId=='')" placement="bottom-end" placeholder="选择日期" v-model="uekyFile.materialDeliveryDate"  style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="材料反馈日期：">
          <DatePicker  type='date' :disabled="(uekyFile.companyId=='')" placement="bottom-end" placeholder="选择日期" v-model="uekyFile.materialFeedbackDate"  style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="注销日期：">
          <DatePicker  type='date' :disabled="(uekyFile.companyId=='')" placement="bottom-end" placeholder="选择日期" v-model="uekyFile.logoutDate"  style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="类别：">
          <Select transfer v-model="uekyFile.keyType" @on-change="changeType" :disabled="(uekyFile.companyId=='')">
              <Option v-for="item in transferFeedbackList" :value="item.docType" :key="item.docType">{{item.docType}}</Option>
          </Select>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="编号：">
          <Input  placeholder="请输入..." :disabled="(uekyFile.companyId=='')" v-model="uekyFile.keyCode" :maxlength="9" ></Input>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="密码：">
          <Input  placeholder="请输入..." :disabled="(uekyFile.companyId=='')" v-model="uekyFile.keyPwd" :maxlength="9" ></Input>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="收费标准：">
          <Input placeholder="请输入..." :disabled="(uekyFile.companyId=='')" v-model="uekyFile.keyFee" :maxlength="18"></Input>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="序列号：">
          <Input placeholder="请输入..." :disabled="(uekyFile.companyId=='')" v-model="uekyFile.keySeq" :maxlength="50"></Input>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="到期日期：">
          <DatePicker  type='date' :disabled="(uekyFile.companyId=='')" placement="bottom-end" placeholder="选择日期" v-model="uekyFile.dueDate"  style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
    </Row>
    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="primary" v-if="$route.query.id!=0" @click="add">续签</Button>
        <Button type="primary" @click="doSave" :disabled="this.isDisable">保存</Button>
        <Button type="warning" @click="goBack">返回</Button>
      </Col>
    </Row>
    <Modal
        v-model="modal1"
        title="Ukey更新"
        @on-ok="ok"
        :loading="isLoading"
        :model="renewUkey" ref="renewUkey"
        @on-cancel="cancel">
      <Form :label-width="150">
       <Row type="flex" justify="start">
         <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
          <Form-item label="操作日期：" prop="renewDate">
            <DatePicker type="date" :readonly="true" v-model="renewUkey.renewDate" transfer></DatePicker>
          </Form-item>
         </Col>
      </Row>
      <Row type="flex" justify="start">
         <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
          <Form-item label="到期日期：" prop="renewDueDate">
            <DatePicker type="date" v-model="renewUkey.renewDueDate" transfer></DatePicker>
          </Form-item>
         </Col>
      </Row>
      <Row type="flex" justify="start">
         <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
          <Form-item label="序列号：" prop="keySeq">
            <Input  placeholder="请输入..."  v-model="renewUkey.keySeq" transfer ></Input>
          </Form-item>
         </Col>
      </Row>
      <Row type="flex" justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
          <Form-item label="更新方式：" prop="type" transfer>
            <Select transfer v-model="renewUkey.type">
              <Option v-for="item in typeList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </Form-item>
        </Col>
       </Row>
    </Form>
    </Modal>
  </Form>
  </div>
  </Panel>
  <Panel name="2" v-if="$route.query.id!=0">
    续签记录 
    <div slot="content">
      <Table border :width="880" :columns="notesColumns" :data="notesData" class="mt20"></Table>
    </div>
  </Panel>
</Collapse>
</div>
</template>
<script>

import Utils from '../../lib/utils'
import api from '../../api/employ_manage/hire_operator'
import InputCompanyName from '../common_control/form/input_company/InputCompanyName.vue'
import InputCompany from '../common_control/form/input_company/InputCompany.vue'
import Vue from 'vue'
  export default {
    components: {InputCompanyName,InputCompany},
    data() {
      return {
        oldDocType: '',
        oldDocNum: '',
        seqMax1: 0,
        isFast: true,
        modal1: false,
        collapseInfo: [1,2], //展开栏
        notesData: [],
        isDisable: false,
        isLoading: true,
        isFrist: true,
        uekyFile: {
          team: '',
          ssAccount: '',
          renewDueDate: '',
          renewDate: '',
          materialReceiveDate: '',
          materialDeliveryDate: '',
          materialFeedbackDate: '',
          organizationCode: '',
          oldOrganizationCode: '',
          flag: true,
          dueDate: '',
          logoutDate: '',
          id: '',
          keyType: '',
          keyCode: '',
          keySeq: '',
          keyPwd: '',
          keyFee: '',
          companyName: '',
          companyId: '',
          serviceCenter: ''
        },
        renewUkey:{
          keySeq: '',
          id: '',
          type: '',
          renewDueDate: '',
          renewDate: ''
        },
        transferFeedbackList: [],
        typeList: [
          {value:'网办',label:'网办'},
          {value:'柜面',label:'柜面'}
        ],
        notesColumns: [
          {title: '操作员', key: 'createdBy', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.createdBy),
              ]);
            }
          },
          {title: '操作日期', key: 'renewDate', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.renewDate),
              ]);
            }
          },
          {title: '到期日期', key: 'dueDate', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.dueDate),
              ]);
            }
          },
          {title: '更新方式', key: 'type', align: 'center', width: 195,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.type),
              ]);
            }
          },
          {
            title: '操作',
            align: 'center',
            width: 80,
            key: 'operat',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {type: 'error', size: 'small'},
                  style: {margin: '0 auto'},
                  on: {
                    click: () => {

                      this.deleteRenew(params.row.id)
                    }
                  }
                }, '删除'),
              ]);
            }
          }
        ],
      }
    },
    mounted() {
      api.queryDocSeqList({type: 3}).then(data => {
            this.transferFeedbackList = data.data.docList;
        })

      let id = this.$route.query.id;

      if(id != 0){
        api.queryAmArchiveUkey({id: id}).then(data => {
            this.uekyFile = data.data;
            this.uekyFile.oldOrganizationCode = data.data.organizationCode;
            this.oldDocType = data.data.keyType;
            this.oldDocNum = data.data.keyCode;
        })

        this.queryRenew(this.$route.query.id);
        
      }
    }
    ,
    methods: {
      deleteRenew(id){
        const _self = this;
        this.$Modal.confirm({
          title: "",
          content: "确认删除吗?",
          onOk: function() {
            api.delAmArchiveUkeyRenew({id: id}).then(data => {
            if(data.data==true){
              this.$Message.success("删除成功");
              _self.queryRenew(_self.$route.query.id);
            }else{
              this.$Message.error("删除失败！");
            }
          })
          },
          error: function(error) {
            self.$Modal.remove();
          }
        });
      },
      changeType(val) {
      if (this.isFast) {
        this.isFast = false;
        if (
          this.oldDocType == undefined ||
          this.oldDocType == ""
        ) {
          this.queryDocSeqByDocType(val);
        }
        return;
      }
      if (val == "") {
        Vue.set(this.uekyFile, "keyCode", "");
        return;
      }

      if (val == this.oldDocType) {
        //用原有的 number
        Vue.set(this.uekyFile, "keyCode", this.oldDocNum);
        return;
      }
      this.queryDocSeqByDocType(val);
    },
    queryDocSeqByDocType(val) {
      api.queryDocSeqByDocType({ type: 3, docType: val }).then(data => {
        if (data.code == 200) {
          Vue.set(
            this.uekyFile,
            "keyCode",
            parseInt(data.data.docBo.docSeq) + 1
          );
          this.uekyFile.keyCode = parseInt(data.data.docBo.docSeq) + 1;
          this.seqMax1 = data.data.docBo.docSeq;
        } else {
          this.$Message.error("服务器异常" + data.message);
        }
      });
    },
      queryRenew(id){
        api.queryAmArchiveUkeyRenew({id: id}).then(data => {
            this.notesData = data.data;
        })
      },
      add(){
        let d = new Date();
        this.renewUkey.renewDate = d;//d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        this.modal1 = true;
        this.renewUkey.type = '';
        this.renewUkey.renewDueDate = '';
      },
      ok(){
        this.isLoading = true;
        if(this.renewUkey.renewDueDate == '' || this.renewUkey.renewDueDate == undefined){
          this.$Message.error("请填写到期日期！");
          this.isLoading = false;
          return;
        }
        if(this.renewUkey.type == '空' || this.renewUkey.type == '' || this.renewUkey.type == undefined){
          this.$Message.error("请选择更新方式！");
          return;
        }
        this.renewUkey.id = this.$route.query.id;
        var fromData = this.$utils.clear(this.renewUkey,'');
        if(this.renewUkey.renewDueDate){
          fromData.renewDueDate = this.$utils.formatDate(this.renewUkey.renewDueDate, 'YYYY-MM-DD');
        }
        if(this.renewUkey.renewDate){
          fromData.renewDate = this.$utils.formatDate(this.renewUkey.renewDate, 'YYYY-MM-DD');
        }
        api.amArchiveUkeyRenew(fromData).then(data => {
          if (data.code == 200) {
            if(data.data == true){
              this.$Message.success("续签成功");
              this.renewUkey.type = '';
              this.renewUkey.renewDueDate = '';
              this.uekyFile.dueDate = fromData.renewDueDate;
              this.uekyFile.keySeq = fromData.keySeq;
              this.queryRenew(this.$route.query.id);
              this.modal1 = false;
            }
          } else {
            this.$Message.error("保存失败！" + data.message);
          }
        })
      },
      cancel(){ 
        this.renewUkey.type = '';
        this.renewUkey.renewDueDate = '';
      },
      doSave(){
        this.isDisable = true;
        if(this.uekyFile.companyName == '' || this.uekyFile.companyName == undefined){
          this.$Message.error("公司名称必须填写！");
          this.isDisable = false;
          return;
        }
        if(this.uekyFile.companyId == '' || this.uekyFile.companyId == undefined){
          this.$Message.error("公司编号必须填写！");
          this.isDisable = false;
          return;
        }
        if(this.uekyFile.organizationCode == '' || this.uekyFile.organizationCode == undefined){
          this.$Message.error("组织机构代码必须填写！");
          this.isDisable = false;
          return;
        }
        this.uekyFile.flag = true;
        if(this.uekyFile.oldOrganizationCode == this.uekyFile.organizationCode){
          this.uekyFile.flag = false;
        }
        this.uekyFile.organizationCode = String.trim(this.uekyFile.organizationCode);
        this.uekyFile.createdTime='';
        this.uekyFile.modifiedTime='';
        var fromData = this.$utils.clear(this.uekyFile,'');
        if(this.uekyFile.materialReceiveDate){
          fromData.materialReceiveDate = this.$utils.formatDate(this.uekyFile.materialReceiveDate, 'YYYY-MM-DD');
        }
        if(this.uekyFile.materialDeliveryDate){
          fromData.materialDeliveryDate = this.$utils.formatDate(this.uekyFile.materialDeliveryDate , 'YYYY-MM-DD');
        }
        if(this.uekyFile.materialFeedbackDate){
          fromData.materialFeedbackDate = this.$utils.formatDate(this.uekyFile.materialFeedbackDate, 'YYYY-MM-DD');
        }
        if(this.uekyFile.dueDate){
          fromData.dueDate = this.$utils.formatDate(this.uekyFile.dueDate, 'YYYY-MM-DD');
        }
        if(this.uekyFile.logoutDate){
          fromData.logoutDate = this.$utils.formatDate(this.uekyFile.logoutDate, 'YYYY-MM-DD');
        }
        api.saveAmArchiveUkey(fromData).then(data => {
          if (data.code == 200) {
            if(data.data == 1){
              this.$Message.success("保存成功");
              this.$router.go(-1);
            }else if(data.data == 0){
              this.$Message.error("组织机构代码已存在！");
              this.isDisable = false;
              return;
            }
          } else {
            this.$Message.error("保存失败！" + data.message);
            this.isDisable = false;
          }
        })
      },
      goBack () {
        this.$router.go(-1);
      },
      updateData(val){
        if(val == '' || val == undefined){
          return;
        }
        if(this.$route.query.id != 0){
          if(this.isFrist){
            this.isFrist = false;
            return;
          }
        } 
        api.queryOrganizationCodeByCid({companyId:val}).then(data => {
          if (data.code == 200) {
            this.uekyFile.companyName = data.data.companyName;
            this.uekyFile.organizationCode = data.data.organizationCode;
            this.uekyFile.serviceCenter = data.data.serviceCenter;
            this.uekyFile.ssAccount = data.data.ssAccount;
            this.uekyFile.team = data.data.team;
          } else {
            this.$Message.error("查询组织机构和服务中心失败请联系管理员！" + data.message);
          }
        })
      }
    }
  }
</script>
