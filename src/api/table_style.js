export default {
  changeSortElementClass(tableIndex, idx, sortType) {
    let tableElement = this.getByClass(document, 'ivu-table-header')[tableIndex];
    let columnElement = this.getByClass(tableElement, 'ivu-table-column-center')[idx];
    let divElement = this.getByClass(columnElement, 'ivu-table-cell')[0]
    let spanElement = this.getByClass(divElement, 'ivu-table-sort')[0];

    if (spanElement) {
      let elements = spanElement.getElementsByTagName('i');

      if (elements && elements.length === 2) {
        if (sortType === 'asc') {
          elements[0].setAttribute("class", "ivu-icon ivu-icon-arrow-up-b on");
          elements[1].setAttribute("class", "ivu-icon ivu-icon-arrow-down-b");
        } else if (sortType === 'desc') {
          elements[0].setAttribute("class", "ivu-icon ivu-icon-arrow-up-b");
          elements[1].setAttribute("class", "ivu-icon ivu-icon-arrow-down-b on");
        } else {
          elements[0].setAttribute("class", "ivu-icon ivu-icon-arrow-up-b");
          elements[1].setAttribute("class", "ivu-icon ivu-icon-arrow-down-b");
        }
      }
    }
  },

  getByClass(parent, cls) {
    if (parent.getElementsByClassName) {
      return parent.getElementsByClassName(cls);
    } else {
      var res = [];
      var reg = new RegExp(' ' + cls + ' ', 'i')
      var ele = parent.getElementsByTagName('*');
      for (var i = 0; i < ele.length; i++) {
        if (reg.test(' ' + ele[i].className + ' ')) {
          res.push(ele[i]);
        }
      }
      return res;
    }
  },
}
