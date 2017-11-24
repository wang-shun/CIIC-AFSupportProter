<template>
    <div class="AddInsurancePolicyNum">
        <Card>
              <Form :model="formItem" :label-width="120" >
                <row >
                    <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                     <Form-item label="保单号名称：" prop="name">
                       <Input v-model="formItem.code" placeholder="补充医疗2018"></Input>
                     </Form-item>
                    </i-col>
                </row >
                <row >
                  <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                    <Form-item label="保单号：" prop="name">
                      <Input v-model="formItem.code" placeholder="补充医疗2018201247"></Input>
                    </Form-item>
                  </i-col>
                </row >
                <row >
                    <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                      <Form-item label="所属保单：" prop="types">
                          <Select placeholder="选择保单">
                            <Option value="0">全部</Option>
                            <Option value="1">补充医疗大保单</Option>
                            <Option value="2">特需医疗保险保单</Option>
                            <Option value="3">大中华医疗保险保单</Option>
                          </Select>
                        </Form-item>
                    </i-col>
                </row >
                <row >
                  <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                    <Form-item label="保单号开始日期：" prop="name">
                      <Input v-model="formItem.code" placeholder="2016-01-01"></Input>
                    </Form-item>
                  </i-col>
                </row >
                <row >
                  <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                    <Form-item label="保单号结束日期：" prop="name">
                      <Input v-model="formItem.code" placeholder="2016-12-31"></Input>
                    </Form-item>
                  </i-col>
                </row >
                <row >
                  <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                    <Form-item label="缴费周期：" prop="types">
                      <Select placeholder="选择缴费周期">
                        <Option value="1">月缴</Option>
                        <Option value="2">季缴</Option>
                        <Option value="3">年缴</Option>
                      </Select>
                    </Form-item>
                  </i-col>
                </row >
                <row >
                  <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                    <Form-item label="保费计算规则：" prop="types">
                      <Select placeholder="选择保费计算规则">
                        <Option value="1">固定保费</Option>
                        <Option value="2">保额*费率</Option>
                        <Option value="3">不固定保费</Option>
                      </Select>
                    </Form-item>
                  </i-col>
                </row >

                  <row>
                    <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                      <router-link to="/acceptanceList">
                          <Table border :columns="columns7" :data="data6"></Table>
                      </router-link>
                    </i-col>
                     <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                       <router-link to="/AddPayRate">
                         <Button type="primary">新增付费比例</Button>
                       </router-link>
                     </i-col>
                  </row>
                <br>
                  <row>
                   <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                     <div class="floatRightBtns">
                        <router-link to="/InsurancePolicyNumList">
                            <Button type="primary">提交</Button>
                        </router-link>
                        <Button type="success" @click="back">返回</Button>
                     </div>
                   </i-col>
                  </row>
              </Form>
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
                columns7: [
                {
                  title: '理赔比例',
                  sortable: true,
                  key: 'column1'
                },

                {
                  title: '收费',
                  sortable: true,
                  key: 'column2'
                }
              ],
                data6: [
                {
                  column1: '100%',
                  column2: '20元/人月'
                },
                {
                  column1: '90%',
                  column2: '15元/人月'
                }
              ],
                liandairens: [
                {
                  value: '1',
                  label: '戴敏一'
                },
                {
                  value: '2',
                  label: '戴敏二'
                },
                {
                  value: '3',
                  label: '戴敏三'
                }
              ],
                ruleValidate: {
                    name: [
                        { required: true, message: '薪资项模板名称不能为空', trigger: 'blur' }
                    ],
                    types: [
                        { required: true, message: '请选择薪资项模板类别', trigger: 'change' }
                    ],
                    dataTypes: [
                        { required: true, message: '请选择数据类型', trigger: 'change' }
                    ],

                }
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
