<template>
  <div>
    <Table border :columns="refuseReturnMaterialsSignColumns" :width="1000"  :data="refuseReturnMaterialsSign" class="mt20"></Table>
    <Row type="flex" justify="start" class="mt20">
      <Col class="tr">
        <Button type="primary" @click="insertShow">新增</Button>
        <!-- <Button type="primary"  @click="instance()">提交</Button> -->
      </Col>
    </Row>
    <br/>
    <Collapse v-model="collapseInfo">
    <Form :label-width="150">
      <Panel name="1">
        材料流转记录
    <Table border :columns="refuseReturnMaterialsSignColumnsLog" :width="1000"  :data="materialLogList" class="mt20"></Table>
    </Panel>
    </Form>
    </Collapse>
     <Modal
        v-model="modal1"
        title="归还材料签收"
        @on-ok="ok"
        @on-cancel="cancel">
    <Table border  ref="payComSelection" :columns="refuseReturnMaterialsColumns" :width="300"  :data="refuseReturnMaterials" class="mt20"></Table>
    </Modal>
  </div>
</template>
<script>
 import api from '../../../api/employ_manage/hire_operator'
  export default {
    props: {
      refuseReturnMaterialsSignInfo: {
        type: Array
      },
      materialLogList: {
        type: Array
      },
      refuseReturnMaterials:{
        type: Array
      }
    },
    data() {
      return {
        collapseInfo: [1], //展开栏
         modal1: false,
        refuseReturnMaterialsSignColumns: [
          {title: '提交日期', key: 'submitterDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.submitterDate),
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
          {title: '批退人', key: 'rejectName', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.rejectName),
              ]);
            }
          },
          {title: '批退日期', key: 'rejectDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.rejectDate),
              ]);
            }
          },
          {title: '收到人', key: 'receiveName', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.receiveName),
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
        ],refuseReturnMaterialsSignColumnsLog: [
          {title: '操作类型', key: 'operationType', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.operationType==1?"签收":params.row.operationType==2?"批退":params.row.operationType==3?"提交":"其它"),
              ]);
            }
          },
          {title: '操作人', key: 'operationName', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.operationName),
              ]);
            }
          },
          {title: '操作时间', key: 'operationTime', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.operationTime),
              ]);
            }
          },
          {title: '备注', key: 'remark', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.remark),
              ]);
            }
          }
        ],refuseReturnMaterialsColumns: [
          {title: '', type: 'selection', width: 60},
          {title: '材料名称', key: 'materialName', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.materialName),
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

          insertShow(){
            if(this.materialLogList[0] != undefined){
              if(this.materialLogList[0].operationType != undefined && this.materialLogList[0].operationType == 1)
              {
                this.$Message.success("雇员中心已签收材料，不能新增！");
                 return false;
              }
            }
            // if(this.refuseReturnMaterialsSign[0] != undefined){
            //   if(this.refuseReturnMaterialsSign[0].receiveName != undefined)
            //   {
            //     this.$Message.success("有签收不能新增材料！");
            //      return false;
            //   }
            // }
            this.modal1 = true;
            let selection = this.$refs.payComSelection;
            selection.selectAll(false);
          },
          ok () {
             if(this.$route.query.empTaskResignId==undefined){

                  this.$Message.success("还没有退工成功不能新增！");
                   return false;

               }
              let selection = this.$refs.payComSelection.getSelection();

            //判断条件
            //是否有选中列
            if(selection.length == 0){
              alert("没有选中的列");
              return;
            }

          selection.some(item => {
               var isE = false;
               var fromData = this.$utils.clear(this.realHandInfo,'');
               fromData.materialName = item.materialName;

               fromData.empTaskId = this.$route.query.empTaskResignId;

              if(this.refuseReturnMaterialsSign.length==0){
                 isE = false;
              }
              // for(var i = 0; i < this.refuseReturnMaterialsSign.length; i++)
              // {
              //     if(item.materialName === this.refuseReturnMaterialsSign[i].materialName)
              //     {
              //        isE = true;
              //    }
              // }
               if(!isE)
               {
                  this.refuseReturnMaterialsSign.push(fromData);
               }

           });
              this.instance();
            },
            cancel () {

            },instance() {

              if(this.refuseReturnMaterialsSign.length==0)
              {
                 this.$Message.success("无内容提交！");
                 return false;
              }
            api.saveAmEmpMaterial(this.refuseReturnMaterialsSign).then(data => {

                  if (data.data.data.data == 1) {
                    this.$Message.success("保存成功");
                    this.refuseReturnMaterialsSignInfo = data.data.data.result;
                    this.materialLogList = data.data.data.logList;

                  }else if (data.data.data == 2){
                    this.$Message.success("已签收，无法保存！");
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

              if(this.materialLogList[0] != undefined){
                if(this.materialLogList[0].operationType != undefined && this.materialLogList[0].operationType == 1)
                {
                  this.$Message.success("雇员中心已签收材料，不能新增！");
                  return false;
                }
            }
                const _self = this;
                if(!empMaterialId){
                  this.refuseReturnMaterialsSign.splice(index, 1);

                }else{
                     this.$Modal.confirm({
                      title: '',
                      content: '确认删除吗?',
                      onOk:function(){

                        let params = {empMaterialId:empMaterialId}

                        api.deleteAmEmpMaterial(params).then(data=>{
                             _self.refuseReturnMaterialsSign.splice(index, 1);;
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
