<template>
  <div>
    <Table border :columns="refuseReturnMaterialsSignColumns" :width="1000"  :data="refuseReturnMaterialsSign" class="mt20"></Table>
    <Row type="flex" justify="start" class="mt20">
      <Col class="tr">
        <Button type="primary" @click="modal1 = true">新增</Button>
        <Button type="primary"  @click="instance()">提交</Button>
      </Col>
    </Row>
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
      refuseReturnMaterials:{
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
          {title: '批退日期', key: 'rejectDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.rejectDate),
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
        ],refuseReturnMaterialsColumns: [
          {title: '', type: 'selection', width: 60},
          {title: '材料名称', key: 'materialName', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
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
          ok () {
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
              for(var i = 0; i < this.refuseReturnMaterialsSign.length; i++)
              {
                  if(item.materialName === this.refuseReturnMaterialsSign[i].materialName)
                  {
                      isE = true;
                  }
              }

               if(!isE)
               {
                  this.refuseReturnMaterialsSign.push(fromData);
               }
               
           });
              
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
                  this.refuseReturnMaterialsSign.splice(index, 1);
              
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
