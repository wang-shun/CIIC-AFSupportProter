<template>
  <div>
    <Table border :columns="refuseReturnMaterialsSignColumns" :width="900"  :data="refuseReturnMaterialsSign" class="mt20"></Table>
    <Row type="flex" justify="start" class="mt20">
      <Col class="tr">
        <Button type="primary" @click="modal1 = true">新增</Button>
        <Button type="primary"  @click="instance()">提交</Button>
      </Col>
    </Row>
     <Modal
        v-model="modal1"
        title="新增档案备注"
        @on-ok="ok"
        @on-cancel="cancel">
      <Form :model="handleInfo" ref="handleInfo" :label-width="150">
      <Row type="flex" justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
          <Form-item label="材料名称：" prop="materialNamew">
             <Input v-model="handleInfo.materialNamew" placeholder="请输入"/>
          </Form-item>
        </Col>
       </Row>
      <Row type="flex" justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
          <Form-item label="收到人：" prop="receiveManw">
             <Input v-model="handleInfo.receiveManw" placeholder="请输入"/>
          </Form-item>
        </Col>
       </Row>
       <Row type="flex" justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
          <Form-item label="批退人：" prop="rejectManw">
             <Input v-model="handleInfo.rejectManw" placeholder="请输入"/>
          </Form-item>
        </Col>
       </Row>
       <Row type="flex" justify="start">
         <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
          <Form-item label="提交日期：" prop="submitDatew">
            <DatePicker type="date" v-model="handleInfo.submitDatew" transfer></DatePicker>
          </Form-item>
         </Col>
      </Row>
       <Row type="flex" justify="start">
         <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
          <Form-item label="收到日期：" prop="receiveDatew">
            <DatePicker type="date" v-model="handleInfo.receiveDatew" transfer></DatePicker>
          </Form-item>
         </Col>
      </Row>
      <Row type="flex" justify="start">
         <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
          <Form-item label="批退日期：" prop="rejectDatew">
            <DatePicker type="date" v-model="handleInfo.rejectDatew" transfer></DatePicker>
          </Form-item>
         </Col>
      </Row>
      
    </Form>
    </Modal>
  </div>
</template>
<script>
 import api from '../../../api/employ_manage/hire_operator'
  export default {
    props: {
      refuseReturnMaterialsSignInfo: {
        type: Array
      }
    },
    data() {
      return {
         modal1: false,
        refuseReturnMaterialsSignColumns: [
          {title: '提交日期', key: 'submitDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.submitDate),
              ]);
            }
          },
          {title: '材料名称', key: 'materialName', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.materialName),
              ]);
            }
          },
          {title: '批退人', key: 'rejectMan', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.rejectMan),
              ]);
            }
          },
          {title: '批退日期', key: 'receiveDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.receiveDate),
              ]);
            }
          },
          {title: '收到人', key: 'receiveMan', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.receiveMan),
              ]);
            }
          },
          {title: '收到日期', key: 'recieveDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.receiveDate),
              ]);
            }
          }, 
          {
            title: '操作',
            key: 'action',
            width: 100,
            align: 'center',
            render: (h, params) => {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'error',
                            size: 'small'
                        },
                        on: {
                            click: () => {
                                this.remove(params.index,params.row.empMaterialId)
                            }
                        }
                    }, '删除')
                ]);
            }
         }
        ],handleInfo: {
          materialNamew:'',
          remarkContentw: '',
          receiveManw: '',
          receiveDatew:'',
          submitDatew:'',
          rejectManw:'',
          receiveDatew:'',
          rejectDatew:''

        },realHandInfo:{
           remarkContent: '',
           receiveMan: '',
           receiveDate:'',
           submitDate:'',
           employeeId:'',
           rejectMan:'',
           receiveDate:'',
           remarkType:'2'
        }
      }
    },
    computed: {
      refuseReturnMaterialsSign() {
        return this.refuseReturnMaterialsSignInfo
      }
    },
    methods: {
            ok () {
              if(this.handleInfo.materialNamew==''){
                 this.$Message.info('材料名称不能为空');
                  return;
               }
               if(this.handleInfo.submitDatew==''){
                  this.$Message.info('提交日期不能为空');
                  return;
               }
                if(this.handleInfo.receiveDatew==''){
                  this.$Message.info('收到日期不能为空');
                  return;
               }
               if(this.handleInfo.rejectDatew==''){
                  this.$Message.info('批退日期不能为空');
                  return;
               }
              var fromData = this.$utils.clear(this.realHandInfo,'');
               fromData.receiveDate = this.$utils.formatDate(this.handleInfo.receiveDatew, 'YYYY-MM-DD');
               fromData.submitDate = this.$utils.formatDate(this.handleInfo.submitDatew, 'YYYY-MM-DD');
               fromData.rejectDate = this.$utils.formatDate(this.handleInfo.rejectDatew, 'YYYY-MM-DD');
              
               fromData.receiveMan = this.handleInfo.receiveManw;

               fromData.rejectMan = this.handleInfo.rejectManw;
             
               fromData.employeeId = this.$route.query.employeeId;

               fromData.materialName = this.handleInfo.materialNamew;
               
               this.refuseReturnMaterialsSign.push(fromData);
            },
            cancel () {
               
            },instance() {
        
            api.saveAmEmpMaterial(this.refuseReturnMaterialsSign).then(data => {
                  if (data.data.data == true) {
                    this.$Message.success("保存成功");
                    history.go(-1);
                  } else {
                    this.$Message.error("保存失败！");
                  }
            })
          
       },show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },
            remove (index,empMaterialId) {
                if(!empMaterialId){
                  this.fileNotesView.splice(index, 1);
              
                }else{
                     this.$Modal.confirm({
                      title: '',
                      content: '确认删除吗?',
                      onOk:function(){
                       
                        let params = {empMaterialId:empMaterialId}

                        api.deleteAmEmpMaterial(params).then(data=>{
                              history.go(-1);
                      })
                       
                      },
                      error:function(error){
                        self.$Modal.remove();
                    }
                    });
                }
                
            },del(){
                 let selection = this.$refs.payComSelection.getSelection();
                  //判断条件
                  //是否有选中列
                  if(selection.length == 0){
                    alert("没有选中的列");
                    return;
                  }
                 
                  selection.some(item => {
                       var ff = item;
            
                  });
            },clickRow (index) {
              
            }
        
    }
  }
</script>
