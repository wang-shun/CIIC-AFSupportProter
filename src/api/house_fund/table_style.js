import '../../../static/css/table_style.css';

export default {
  empRowClassName(row, index) {
    let className = '';
    // if (row.hfAccountType) {
    //   if (parseInt(row.hfAccountType) === 1) {
        className = 'big-storage';
    //   } else if (parseInt(row.hfAccountType) === 2) {
    //     className = 'out-sourcing';
    //   } else if (parseInt(row.hfAccountType) === 3) {
    //     className = 'dependency';
    //   }
    // }
    // if (row.handleRemark && row.handleRemark != '') {
    //   className += '-remark';
    // }
    if (row.hasOut && parseInt(row.hasOut) == 1) {
      className += '-has-out';
    }
    return className;
  },
  empRejectRowClassName(row, index) {
    let className = '';
    if (row.hfAccountType) {
      if (parseInt(row.hfAccountType) === 1) {
        className = 'big-storage';
      } else if (parseInt(row.hfAccountType) === 2) {
        className = 'out-sourcing';
      } else if (parseInt(row.hfAccountType) === 3) {
        className = 'dependency';
      }
    }
    if (row.rejectionRemark && row.rejectionRemark != '') {
      className += '-remark';
    }
    if (row.hasOut && parseInt(row.hasOut) == 1) {
      className += '-has-out';
    }
    return className;
  },
  comRowClassName(row, index) {
    // if (row.paymentBank) {
    //   if (row.paymentBank === '16') {
    //     return 'payment-bank-xj-c';
    //   } else if (row.paymentBank === '17') {
    //     return 'payment-bank-dfl-p';
    //   } else if (row.paymentBank === '18') {
    //     return 'payment-bank-lw-l';
    //   } else if (row.paymentBank === '0') {
    //     return 'payment-bank-hp-h';
    //   }
    // }
    return '';
  }
}

