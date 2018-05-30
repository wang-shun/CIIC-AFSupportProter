<!--受理单、未投保查看页面-->
<template>
  <div>
    <Card>
      <p slot="title">
        雇员信息
      </p>
      <Form :model="detail" :label-width="105">
        <Row>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 12}">
            <Form-item label="雇员编号">
              <span>{{ detail.employeeId }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 12}">
            <Form-item label="公司编号">
              <span>{{ detail.companyId }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 12}">
            <Form-item label="雇员姓名">
              <span>{{ detail.employeeName }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 12}">
            <Form-item label="公司名称">
              <span>{{ detail.companyName }}</span>
            </Form-item>
          </Col>
        </Row>
      </Form>
    </Card>

    <Card class="mt10">
      <p slot="title">
        受理单信息
      </p>
      <Form :model="detail" :label-width="105">
        <Row>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="受理单编号">
              <span>{{ detail.acceptanceId }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="受理人">
              <span>{{ detail.handler }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="受理类型">
              <span>{{ this.getCaseType(detail.caseType) }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="受理单状态">
              <span>{{ this.getAcceptanceStatus(detail.status) }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="连带人">
              <span>{{ detail.jointPersonName }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="款项类型">
              <span>{{ this.getMoneyType(detail.moneyType) }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="受理日期">
              <span>{{ detail.handlerDate }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="受理金额">
              <span>{{ detail.caseMoney }}</span>
            </Form-item>
          </Col>

        </Row>
      </Form>
    </Card>
    <Card v-if="detail.status > 2" class="mt10">
      <p slot="title">
        未投保审核信息
      </p>
      <Form :model="detail" :label-width="105">
        <Row>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="就诊医院">
              <span>{{ detail.clinicHospital }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="受理金额">
              <span>{{ detail.acceptAmount }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="付款方式">
              <span>{{ this.getPayType(detail.payType) }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="诊断">
              <span>{{ detail.diagnose }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="审核金额">
              <span>{{ detail.auditAmount }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="就诊日期">
              <span>{{ detail.diagnoseDate }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="住院天数">
              <span>{{ detail.hospitalizationDays }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="住院开始日期">
              <span>{{ detail.hospitalizationStartDate }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="住院结束日期">
              <span>{{ detail.hospitalizationEndDate }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="审核人">
              <span>{{ detail.auditor }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="审核日期">
              <span>{{ detail.auditDate }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="备注">
              <span>{{ detail.remark }}</span>
            </Form-item>
          </Col>
        </Row>
      </Form>
    </Card>
    <Row class="mt10">
      <Col :sm="{span: 24}" class="tr">
        <Button v-if="detail.status" type="primary" @click="printUninsuredReview()">打印</Button>
        <Button type="warning" @click="back()">返回</Button>
      </Col>
    </Row>
  </div>
</template>

<script>
  import apiAjax from "../../../data/health_medical/uninsured_application.js";
  import admissibility from '../../../store/modules/health_medical/data_sources/admissibility.js'

  export default {
    data() {
      return {
        umAcceptanceId: '',
        detail: {},
        userInfo: {}
      }
    },
    created() {
      this.umAcceptanceId = JSON.parse(sessionStorage.getItem('umAcceptanceId'));
      this.queryAcceptanceUninsured();
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    },
    methods: {
      queryAcceptanceUninsured() {
        apiAjax.acceptanceDetail(this.umAcceptanceId).then(response => {
          let data = response.data
          if (data.code == 200) {
            this.detail = data.object
          } else {
            this.$Message.error("请重试");
          }
        }).catch(e => {
          console.info(e.message);
          this.$Message.error("服务器异常，请稍后再试");
        });
      },
      printUninsuredReview() {
        let head = `<html><head></head><body>`;
        let foot = `</body></html>`;
        this.detail.username = this.userInfo.displayName;
        let obj = this.getFundPayNoteObj(this.detail);
        let html = head + obj + foot;
        let pwin = window.open("", "print")
        pwin.document.write(html);
        pwin.document.close();
        pwin.print();
      },
      getFundPayNoteObj(row) {
        var html =
          `<div>
            <div style="border-bottom: 1px solid black;width: 200px;margin-bottom: 30px;">
                <h2>CIIC</h2>
                <h3>A1606056</h3>
            </div>
            <div>
                <table border="1" cellspacing="0" style="text-align: center;">
                    <tr>
                        <td>
                            收款人<br>
                            公司编号<br>
                            公司名称
                        </td>
                        <td>
                            江伟 雇员编号:${row.employeeName}<br>
                            ${row.employeeId}<br>
                            ${row.companyName}
                        </td>
                    </tr>
                    <tr>
                        <td>付款方式</td>
                        <td style="color: red">现金</td>
                    </tr>
                    <tr>
                        <td>付款地区</td>
                        <td style="color: red">日本</td>
                    </tr>
                    <tr>
                        <td>金额</td>
                        <td>
                            人民币 肆拾伍万圆（大写）<br>
                            ￥ 1000
                        </td>
                    </tr>
                </table>
                <p>说明：${row.remark}</p>

            </div>
            <div style="border-bottom: 1px dashed black;width: 300px;">
                <p>
                    部门主管&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    收款人签收&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </p>
                <p style="text-align: right">制单人：${row.username}</p>
                <p style="text-align: right">雇员付款编号：230221</p>
                <p>备注：</p>
                <p style="text-indent: 2em">
                      1、前来领款时请携带本付款凭单及雇员证件<br>
                    (身份证或雇员证)，取他人带领的，还必须由<br>
                    雇员本人写好委托书方可带领并出示代领人证<br>
                    件。
                </p>
                <p style="text-indent: 2em">
                      2、领款金额3000.00元以上者，请电话预约<br>
                    ：54594545*804 朱小姐
                </p>
            </div>
        </div>`;
        return html;
      },

      back() {
        this.$local.back()
      },
      getCaseType(type) {
        return admissibility.caseTypeToChina(type);
      },
      getMoneyType(type) {
        return admissibility.moneyTypeToChina(type);
      },
      getAcceptanceStatus(status) {
        return admissibility.statusToChina(status);
      },
      getPayType(type) {
        return admissibility.payTypeToChina(type);
      }
    },
  }
</script>
