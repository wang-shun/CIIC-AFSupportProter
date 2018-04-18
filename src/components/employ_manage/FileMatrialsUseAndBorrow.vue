<template>
  <div>
    <div class="smList">
      <Collapse v-model="collapseInfo">
        <Panel name="1">
          雇员信息
          <div slot="content">
            <Form :label-width="150">
              <Row justify="start">
                <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                  <Form-item label="雇员编号：">
                    {{employeeInfo.employeeNumber}}
                  </Form-item>
                </Col>
                <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                  <Form-item label="雇员姓名：">
                    {{employeeInfo.employeeName}}
                  </Form-item>
                </Col>
              </Row>
            </Form>
          </div>
        </Panel>
        <Panel name="2">
          材料使用
          <div slot="content">
            <Row class="mt20">
              <Col :sm="{span: 24}" class="tr">
                <Button type="primary" @click="modal1 = true">新增</Button>
                <Button type="primary"  @click="instance()">提交</Button>
              </Col>
            </Row>
            <Modal
              v-model="modal1"
              title="档案材料使用"
              @on-ok="ok"
              @on-cancel="cancel">
              <Form :model="handleInfo" ref="handleInfo" :label-width="150">
                <!-- <Row type="flex" justify="start">
                  <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
                    <Form-item label="材料使用经办人：" prop="handleManw">
                      <Input v-model="handleInfo.handleManw" placeholder="请输入"/>
                    </Form-item>
                  </Col>
                </Row> -->
                <Row type="flex" justify="start">
                  <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
                    <Form-item label="使用日期：" prop="useDatew">
                      <DatePicker type="date" v-model="handleInfo.useDatew" transfer></DatePicker>
                    </Form-item>
                  </Col>
                </Row>
                <Row type="flex" justify="start">
                  <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
                    <Form-item label="备注：" prop="remarkw" transfer>
                      <Input v-model="handleInfo.remarkw" placeholder="请输入" :maxlength="50"/>
                    </Form-item>
                  </Col>
                </Row>
                <Row type="flex" justify="start">
                  <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
                    <Form-item label="使用借出材料人：" prop="useManw" transfer>
                      <Input v-model="handleInfo.useManw" placeholder="请输入" :maxlength="50"/>
                    </Form-item>
                  </Col>
                </Row>
                <Row>
                  <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
                  <Form-item label="使用材料：">
                    <Select v-model="handleInfo.materialw" transfer>
                      <Option v-for="item in handleTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                    </Select>
                   </Form-item>
                  </Col>
                </Row> 
                <Row>
                  <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
                  <Form-item label="用途：">
                    <Select v-model="handleInfo.purposew" transfer>
                      <Option v-for="item in handleTypeList1" :value="item.value" :key="item.value">{{item.label}}</Option>
                    </Select>
                   </Form-item>
                  </Col>
                </Row>   
               </Form>
            </Modal>
            <Table border :columns="matrialsUseColumns" :data="matrialsUseData" class="mt20"></Table>
          </div>
        </Panel>
        <Panel name="3">
          材料借出
          <div slot="content">
            <Row class="mt20">
              <Col :sm="{span: 24}" class="tr">
                <Button type="primary" @click="modal2 = true">新增</Button>
               <Button type="primary"  @click="instance1()">提交</Button>
              </Col>
            </Row>
            <Modal
              v-model="modal2"
              title="档案材料借出"
              @on-ok="ok1"
              @on-cancel="cancel1">
              <Form :model="handleInfo" ref="handleInfo" :label-width="150">
                <!--<Row type="flex" justify="start">
                  <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
                    <Form-item label="材料借出经办人：" prop="handleManw">
                      <Input v-model="handleInfo.handleManw" placeholder="请输入"/>
                    </Form-item>
                  </Col>
                </Row>-->
                <Row type="flex" justify="start">
                  <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
                    <Form-item label="借出日期：" prop="useDatew">
                      <DatePicker type="date" v-model="handleInfo.useDatew" transfer></DatePicker>
                    </Form-item>
                  </Col>
                </Row>
                <Row type="flex" justify="start">
                  <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
                    <Form-item label="归还日期：" prop="returnDate">
                      <DatePicker type="date" v-model="handleInfo.returnDate" transfer></DatePicker>
                    </Form-item>
                  </Col>
                </Row>
                <Row type="flex" justify="start">
                  <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
                    <Form-item label="备注：" prop="remarkw" transfer>
                      <Input v-model="handleInfo.remarkw" placeholder="请输入" :maxlength="50"/>
                    </Form-item>
                  </Col>
                </Row>
                <Row type="flex" justify="start">
                  <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
                    <Form-item label="借出材料人：" prop="useManw" transfer>
                      <Input v-model="handleInfo.useManw" placeholder="请输入" :maxlength="50"/>
                    </Form-item>
                  </Col>
                </Row>
                <Row>
                  <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
                  <Form-item label="借出材料：">
                    <Select v-model="handleInfo.materialw" transfer>
                      <Option v-for="item in  handleTypeList2" :value="item.value" :key="item.value">{{item.label}}</Option>
                    </Select>
                   </Form-item>
                  </Col>
                </Row> 
                <Row>
                  <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
                  <Form-item label="用途：">
                    <Select v-model="handleInfo.purposew" transfer>
                      <Option v-for="item in handleTypeList3" :value="item.value" :key="item.value">{{item.label}}</Option>
                    </Select>
                   </Form-item>
                  </Col>
                </Row>   
               </Form>
            </Modal>
            <Table border ref="payComSelection" :columns="matrialsBorrowColumns" :data="matrialsBorrowData" class="mt20"></Table>
          </div>
        </Panel>
      </Collapse>
    </div>
    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="warning" @click="goBack">返回</Button>
      </Col>
    </Row>
  </div>
</template>
<script>
import api from '../../api/employ_manage/hire_operator'
  export default {
    data() {
      return {
         modal1: false,
         modal2: false,
         userName:'',
        collapseInfo: [1, 2, 3],
        employeeInfo: {
          employeeNumber: this.$route.query.employeeId,
          employeeName: this.$route.query.employeeName
        },
        matrialsUseColumns: [
          {title: '使用材料', key: 'useMatrials', align: 'center',
            render: (h, params) => {
             return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.material),
              ]);
            }
          },
          {title: '用途', key: 'useful', align: 'center',
            render: (h, params) => {
             return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.purpose),
              ]);
            }
          },
          {title: '使用材料人', key: 'matrialsUser', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.useMan),
              ]);
            }
          },
          {title: '使用日期', key: 'useDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.useDate),
              ]);
            }
          },
          {title: '材料使用经办人', key: 'matrialsManager', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.handleMan),
              ]);
            }
          },
          {title: '备注', key: 'notes', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.remark),
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
            
                                this.remove(params.index,params.row.archiveUseId)
                            }
                        }
                    }, '删除')
                ]);
            }
         }
        ],
        matrialsUseData: [],

          matrialsBorrowColumns: [
          {title: '借出材料', key: 'useMatrials', align: 'center',
            render: (h, params) => {
             return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.material),
              ]);
            }
          },
          {title: '用途', key: 'useful', align: 'center',
            render: (h, params) => {
             return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.purpose),
              ]);
            }
          },
          {title: '借出材料人', key: 'matrialsUser', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.useMan),
              ]);
            }
          },
          {title: '借出日期', key: 'useDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.useDate),
              ]);
            }
          },
          {title: '借出经办人', key: 'matrialsManager', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.handleMan),
              ]);
            }
          },
          {title: '备注', key: 'notes', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.remark),
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
            
                                this.remove(params.index,params.row.archiveUseId)
                            }
                        }
                    }, '删除')
                ]);
            }
         }
        ],
        matrialsBorrowData: [],
        handleTypeList: [
          {value: '档案', label: '档案'},
          {value: '党员材料', label: '党员材料'},
          {value: '学籍资料', label: '学籍资料'},
          {value: '职工登记表', label: '职工登记表'},
          {value: '劳动力登记表', label: '劳动力登记表'},
          {value: '学生登记表', label: '学生登记表'},
          {value: '职称评定表', label: '职称评定表'},
          {value: '劳动手册', label: '劳动手册'},
          {value: '上家退工单', label: '上家退工单'},
          {value: '存档卡', label: '存档卡'},
          {value: '落户通知书', label: '落户通知书'},
          {value: '其他', label: '其他'}
        ],
        handleTypeList1: [
          {value: '归档材料', label: '归档材料'},
          {value: '政审', label: '政审'},
          {value: '档案借阅', label: '档案借阅'},
          {value: '认定工龄', label: '认定工龄'},
          {value: '查询信息', label: '查询信息'},
          {value: '复印材料', label: '复印材料'},
          {value: '扫描材料', label: '扫描材料'},
          {value: '开存档证明', label: '开存档证明'},
          {value: '其他', label: '其他'}
        ],
        handleTypeList2: [
          {value: '档案', label: '档案'},
          {value: '党员材料', label: '党员材料'},
          {value: '劳动手册', label: '劳动手册'},
          {value: '上家退工单', label: '上家退工单'},
          {value: '存档卡', label: '存档卡'},
          {value: '其他', label: '其他'}
        ], 
        handleTypeList3: [
          {value: '党员转正', label: '党员转正'},
          {value: '社保核查', label: '社保核查'},
          {value: '公司查阅', label: '公司查阅'},
          {value: '私人事务', label: '私人事务'},
          {value: '其他', label: '其他'}
        ],
        handleInfo: {
          remarkContentw: '',
          remarkManw: '',
          remarkDatew:'',
          materialw:''
        },realHandInfo:{
           remarkContent: '',
           remarkMan: '',
           remarkDate:'',
           employeeId:'',
           remarkType:'2'
        }
      }
    },
     async mounted() {
          
          let params = {employeeId:this.$route.query.employeeId,archiveId:this.$route.query.archiveId}

          api.queryArchiveUse(params).then(data=>{
              this.userName = data.data.userName;
              if(data.data.amArchiveUsePageRows){
                  this.matrialsUseData  = data.data.amArchiveUsePageRows.rows;
              }

              if(data.data.amArchiveUsePageRows1){
                   this.matrialsBorrowData = data.data.amArchiveUsePageRows1.rows;
              }
      
          })
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },goFileMatrialsUseAndBorrow() {
        let selection = this.$refs.payComSelection.getSelection();

        //判断条件
        //是否有选中列
        if(selection.length == 0){
          alert("没有选中的列");
          return;
        }

        //已有批次的不可再添加
        let isHaveBatch = false;
        var tempId;
        var tempId1;
        selection.some(item => {
          this.matrialsBorrowData.splice(item.render.params.index, 1);
        });
        
        this.$router.push({name:'fileMatrialsUseAndBorrow', query: {archiveId:tempId,employeeId:tempId1}});
      },ok () {
             var isE = false;
             if(this.handleInfo.materialw==''){
                 this.$Message.info('使用材料不能为空');
                  return;
               }
               if(this.handleInfo.useDatew==''){
                  this.$Message.info('使用日期不能为空');
                  return;
               }
                
              var fromData = this.$utils.clear(this.realHandInfo,'');
              
               fromData.useDate = this.$utils.formatDate(this.handleInfo.useDatew, 'YYYY-MM-DD');
               fromData.handleMan = this.userName;
               fromData.useMan = this.handleInfo.useManw;
               fromData.material = this.handleInfo.materialw;
               fromData.purpose = this.handleInfo.purposew;
               fromData.remark = this.handleInfo.remarkw;
              
               fromData.employeeId = this.$route.query.employeeId;
               fromData.archiveId = this.$route.query.archiveId;

               fromData.useBorrow = 0;

               if(this.matrialsUseData.length==0)
               {
                  isE = false;
               }
              
              for(var i = 0; i < this.matrialsUseData.length; i++)
              {
                  if(fromData.useDate === this.matrialsUseData[i].useDate&&fromData.handleMan === this.matrialsUseData[i].handleMan&&fromData.useMan=== this.matrialsUseData[i].useMan&&fromData.material === this.matrialsUseData[i].material&&fromData.purpose=== this.matrialsUseData[i].purpose)
                  {
                      isE = true;
                  }
              }
               
              if(!isE)
              {
                  this.matrialsUseData.push(fromData);
              }
               
               this.handleInfo.useDatew = '';
                this.handleInfo.returnDate = '';
                this.handleInfo.useManw = '';
                this.handleInfo.materialw = '';
                this.handleInfo.purposew = '';
                this.handleInfo.remarkw = '';
               
            },ok1 () {
              var isE = false;
              if(this.handleInfo.materialw==''){
                 this.$Message.info('借出材料不能为空');
                  return;
               }
               if(this.handleInfo.useDatew==''){
                  this.$Message.info('借出日期不能为空');
                  return;
               }
               if(this.handleInfo.returnDate==''){
                  this.$Message.info('归还日期不能为空');
                  return;
               }
              var fromData = this.$utils.clear(this.realHandInfo,'');
              
               fromData.useDate = this.$utils.formatDate(this.handleInfo.useDatew, 'YYYY-MM-DD');
               fromData.returnDate = this.$utils.formatDate(this.handleInfo.returnDate, 'YYYY-MM-DD');
               fromData.handleMan = this.handleInfo.handleManw;
               fromData.useMan = this.handleInfo.useManw;
               fromData.material = this.handleInfo.materialw;
               fromData.purpose = this.handleInfo.purposew;
               fromData.remark = this.handleInfo.remarkw;
              
               fromData.employeeId = this.$route.query.employeeId;
               fromData.archiveId = this.$route.query.archiveId;

               fromData.useBorrow = 1;

               if(this.matrialsBorrowData.length==0)
               {
                  isE = false;
               }

               for(var i = 0; i < this.matrialsBorrowData.length; i++)
              {
                  if(fromData.useDate === this.matrialsBorrowData[i].useDate&&fromData.returnDate=== this.matrialsBorrowData[i].returnDate&&fromData.handleMan === this.matrialsBorrowData[i].handleMan&&fromData.useMan=== this.matrialsBorrowData[i].useMan&&fromData.material === this.matrialsBorrowData[i].material&&fromData.purpose=== this.matrialsBorrowData[i].purpose)
                  {
                      isE = true;
                  }
              }
               
              if(!isE){
                   this.matrialsBorrowData.push(fromData);
              }
               
                this.handleInfo.useDatew = '';
                this.handleInfo.returnDate = '';
                this.handleInfo.useManw = '';
                this.handleInfo.materialw = '';
                this.handleInfo.purposew = '';
                this.handleInfo.remarkw = '';
            },
            
            cancel () {
                this.handleInfo.useDatew = '';
                this.handleInfo.returnDate = '';
                this.handleInfo.useManw = '';
                this.handleInfo.materialw = '';
                this.handleInfo.purposew = '';
                this.handleInfo.remarkw = '';


            },cancel1 () {
                this.handleInfo.useDatew = '';
                this.handleInfo.returnDate = '';
                this.handleInfo.useManw = '';
                this.handleInfo.materialw = '';
                this.handleInfo.purposew = '';
                this.handleInfo.remarkw = '';
            },instance() {
        
            api.saveAmArchiveUse(this.matrialsUseData).then(data => {
                  if (data.data.data == true) {
                    this.$Message.success("保存成功");
                    history.go(-1);
                  } else {
                    this.$Message.error("保存失败！");
                  }
            })
          
       },instance1() {
        
            api.saveAmArchiveUse(this.matrialsBorrowData).then(data => {
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
            remove (index,archiveUseId) {
                if(!archiveUseId){
                  this.matrialsUseData.splice(index, 1);
              
                }else{
                     this.$Modal.confirm({
                      title: '',
                      content: '确认删除吗?',
                      onOk:function(){

                        let params = {archiveUseId:archiveUseId}

                        api.deleteAmArchiveUse(params).then(data=>{
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
