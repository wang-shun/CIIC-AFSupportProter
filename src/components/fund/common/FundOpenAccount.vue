<template>
  <Form label-width=150>
    <Row type="flex" justify="start">
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="变更类型：">
          <Select v-model="openAccount.changeTypeValue" style="width: 100%;"  transfer>
            <Option v-for="item in changeTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="缴费银行：">
          <Select v-model="openAccount.paymentBankValue" style="width: 100%;"  transfer>
            <Option v-for="item in paymentBankList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="付款方式：">
          <Select v-model="openAccount.payMethodValue" style="width: 100%;"  transfer>
            <Option v-for="item in payMethodList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Form-item>
      </Col>
      <!-- <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
      <Form-item label="终止类型：">
        <Select v-model="openAccount.endTypeValue" style="width: 100%;"  transfer>
          <Option v-for="item in endTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
        </Select>
      </Form-item>
      </Col> -->
      <!-- <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
      <Form-item label="是否账户暂管：">
        <Select v-model="openAccount.accountTempStoreTypeValue" style="width: 100%;"  transfer>
          <Option v-for="item in accountTempStoreTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
        </Select>
      </Form-item>
      </Col> -->
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
      <Form-item label="企业公积金账户名称：">
        <Input v-model="openAccount.companyFundAccountName" placeholder="请输入..." ></Input>
      </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="企业公积金账号：">
          <Input v-model="openAccount.companyFundAccountNum" placeholder="请输入..."></Input>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="公积金企业U盾：">
          <Select v-model="openAccount.UKeyValue" style="width: 100%;" transfer @on-change="changeDispatchType">
            <Option v-for="item in UKeyList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="客户缴费起始年月：">
          <DatePicker v-model="openAccount.customerPayStartDate" type='month' placement="bottom-end"  style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="每月关账日：">
          <Input v-model="openAccount.closeAccountEveryMonth" placeholder="请输入..." ></Input>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="专员操作起始年月：">
          <DatePicker v-model="openAccount.operateStrartMonth" type='month' placement="bottom-end" placeholder="选择日期"  style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="任务状态：">
            <Select v-model="openAccount.taskStatus" style="width: 100%;" transfer>
              <Option v-for="item in taskTypeList" :value="item.value" :key="item.value" >{{item.label}}</Option>
            </Select>
          </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="受理日期：">
          <DatePicker v-model="openAccount.acceptDate" placement="bottom-end" placeholder="选择日期"  style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="送审日期：">
          <DatePicker v-model="openAccount.deliveredDate" placement="bottom-end" placeholder="选择日期"  style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="完成日期：">
          <DatePicker v-model="openAccount.finishDate" placement="bottom-end" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
    </Row>
    <Row type="flex" justify="start">
      <Col :sm="{span: 24}">
        <Form-item label="备注：">
          <Input v-model="openAccount.notes" placeholder="请输入..." ></Input>
        </Form-item>
      </Col>
    </Row>
  </Form>
</template>
<script>
  export default {
    props: {
      openAccountInfo: {
        type: Object
      }
    },
    data() {
      return {
        changeTypeList: [
          {label: "开户", value: '1'},
          {label: "转入", value: '2'}
        ],
        paymentBankList: [
          {label: "徐汇--X", value: '15'},
          {label: "西郊--C", value: '16'},
          {label: "东方路--P", value: '17'},
          {label: "卢湾--L", value: '18'},
          {label: "黄浦--H", value: '0'},
        ],
        payMethodList: [
          {value: '1',label: "客户自付", },
          {value: '2',label: "我司付款(客户预付)"},
          {value: '3',label: "垫付"},
        ],
        endTypeList: [
          {label: "销户", value: '1'},
          {label: "公司自做", value: '2'},
          {label: "转其他代理商", value: '3'}
        ],
        taskTypeList:[
          {value: '1', label: '受理中',disabled:false},
          {value: '2', label: '送审中',disabled:false},
          {value: '3', label: '已完成',disabled:false},
        ],
        UKeyList: [
          {label: "有(中智代办)", value: '2'},
          {label: "有(客户自办)", value: '1'},
          {label: "没有", value: '0'},
        ],
        accountTempStoreTypeList: [
          {label: "是", value: 1},
          {label: "否", value: 0}
        ]
      }
    },
    mounted() {
      console.log(this.openAccountInfo);
    }
    ,
    computed: {
      openAccount() {
        
        return this.openAccountInfo;
      },
  changeDispatchType() {
   	console.log('======');
    	console.log(this.openAccountInfo.UKeyValue );
  }

    }
  }
</script>
