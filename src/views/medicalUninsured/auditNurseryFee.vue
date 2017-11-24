<template>
    <div class="auditNurseryFee">
        <Card>
                <Form :model="formItem" :label-width="120" :rules="ruleValidate">
                    <row >
                    <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                    <Form-item label="雇员编号：" prop="name">
                      <span class="expand-value">11F0125</span>
                    </Form-item>
                    </Col>
                    <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                    <Form-item label="雇员姓名：" prop="types">
                      <span class="expand-value">戴丽</span>
                    </Form-item>
                    </Col>
                    <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                    <Form-item label="申请类型：" prop="types">
                      <span class="expand-value">支付个人</span>
                    </Form-item>
                    </Col>
                    </row >
                    <row >
                      <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                        <Form-item label="付款类型：" prop="name">
                          <span class="expand-value">子女托费</span>
                        </Form-item>
                      </Col>
                      <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                      <Form-item label="发票张数：" prop="name">
                        <Input v-model="formItem.name" placeholder="3"></Input>
                      </Form-item>
                      </Col>
                      <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                      <Form-item label="" prop="name">
                        <Checkbox v-model="single">无发票报销</Checkbox>
                      </Form-item>
                      </Col>
                    </row >
                    <row >
                      <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                        <Form-item label="税前金额：">
                          <Input v-model="formItem.name" placeholder="300.00"></Input>
                        </Form-item>
                      </Col>
                      <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                         <Form-item label="税额：">
                           <Input v-model="formItem.name" placeholder="0.00"></Input>
                         </Form-item>
                      </Col>
                      <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                      <Form-item label="实际付出金额：">
                        <Input v-model="formItem.name" placeholder="300.00"></Input>
                      </Form-item>
                      </Col>
                    </row >

                    <row >
                     <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 13, offset: 0 }" class="checkBtn">
                       <Form-item label="备注：">
                               <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                        </Form-item>
                    </Col>
                   </row>
                  <row >
                    <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 1, offset: 0 }" class="checkBtn">
                        <Table width="320" height="185" style="margin-left: 240px;" :columns="columns2" :data="data2"></Table>
                    </Col>
                  </row>
                </Form>

        </Card>
        <Card>
          <row>
            <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
             <div class="floatRightBtns" >
              <router-link to="/acceptanceList">
                <Button type="primary">确认受理</Button>
              </router-link>
              <Button type="success" @click="back">返回</Button>
             </div>
            </Col>
          </row>
        </Card>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                onlyNum:false,
                formItem: {
                    name:null,
                    code:null,
                    types:"",
                    typeVal:"请选择",
                    disabled:true,
                    routerChanged:false,
                    note:"雇员的名称"
                },
                dataTypes:[
                    {
                        value: '1num',
                        label: '医疗费'
                    },
                    {
                        value: '2',
                        label: '体检费用'
                    },
                    {
                        value: '3',
                        label: '住院补贴'
                    },
                    {
                        value: '4',
                        label: '托费'
                    },
                    {
                        value: '5',
                        label: '大额理赔款'
                    },
                     {
                        value: '6',
                        label: '其他'
                    }
                ],
                peopleTypes: [
                    {
                        value: '1',
                        label: '雇员'
                    },
                    {
                        value: '2',
                        label: '子女'
                    },
                    {
                        value: '3',
                        label: '配偶'
                    }
                ],
                columns2: [
                {
                  title: '付出金额',
                  key: 'name',
                  width: 100,
                },
                {
                  title: '付款分类',
                  key: 'age',
                  width: 100
                },
                  {
                    title: '所属月份',
                    key: 'month',
                    width: 100
                  }
                ],
              data2: [
                {
                  name: '100.00',
                  age: '子女托费',
                  month:'2017.07'
                },
                {
                  name: '100.00',
                  age: '子女托费',
                  month:'2017.08'
                },
                {
                  name: '100.00',
                  age: '子女托费',
                  month:'2017.09'
                }
                ]
            }
        },
        methods:{

            back () {
                 this.$local.back();
            },
            selectChange(){
                this.formItem.disabled=false;
                if(this.formItem.types == "computed" || this.formItem.types == "seniorComputed" || this.formItem.types == "fixed"){
                    this.onlyNum=true;
                }else{
                    this.onlyNum=false;
                }
            },
            passData(){
                let data=this.$route.params.data;
                if(data){
                    this.editObj=data;
                    this.formItem.name=data.name;
                    this.formItem.code=data.code;
                    this.formItem.types=createLookMap("label", "value", this.salaryType)[data.types];
                    this.formItem.typeVal=createLookMap("label", "value", this.dataTypes)[data.typeVal];
                }else{
                    data=""
                }
            }
        },
        watch:{
            //监听路由变化 页面重载或路由跳转获取URL参数
            $route(){
                console.log("路由发生了变化");
                this.passData();
            }
        },
        created(){
            this.passData();
        },
    }

    function createLookMap(key, value, jsonArr){
        let map = {}
        for (let i = 0; i < jsonArr.length; i++) {
            let item = jsonArr[i]
            let mapKey = item[key]
            let mapValue = item[value]
            map[mapKey] = mapValue
        }
        return map
    }

</script>
