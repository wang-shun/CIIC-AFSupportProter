import moment from "moment";

let tools = {};


/**
 * copy 属性
 * @param source
 * @param target
 */
tools.copy = (source, target) => {
  // copy attr
  for (var attr in source) {
    if (target[attr] != undefined) {
      target[attr] = source[attr];
    }
  }
}


/**
 * 格式化日期
 * @param date 日期
 * @param fmt 日期格式
 * @returns string
 */
tools.formatDate = function (date, fmt) {
  try {
    return moment(date).format(fmt);
  } catch (e) {
    console.warn(e.message);
    return date;
  }
};

/**
 * 解析日期
 * @param dateString 日期字符串
 * @param fmt 日期格式
 * @returns Date
 */
tools.parseDate = function (dateString, fmt) {
  // utc 解决时区问题
  return moment.utc(dateString, fmt);
};


tools.arabiaToSimplifiedChinese = function(num){

  for(var i = num.length - 1; i >= 0; i--){
    num = num.replace(",", "");
    num = num.replace(" ", "")
  }

  if(isNaN(num)){ //验证输入的字符是否为数字
    return;
  }

  //字符处理完毕后开始转换，采用前后两部分分别转换
  var part = String(num).split(".");
  var newchar = "";

  alert(part.length);

  //小数点前进行转化
  for (var i = part[0].length - 1; i >= 0; i--) {
    if (part[0].length > 10) {
        //alert("位数过大，无法计算");
        return "";
    }//若数量超过拾亿单位，提示
    var tmpnewchar = ""
    var perchar = part[0].charAt(i);

    switch (perchar) {
        case "0":  tmpnewchar = "零" + tmpnewchar;break;
        case "1": tmpnewchar = "一" + tmpnewchar; break;
        case "2": tmpnewchar = "二" + tmpnewchar; break;
        case "3": tmpnewchar = "三" + tmpnewchar; break;
        case "4": tmpnewchar = "四" + tmpnewchar; break;
        case "5": tmpnewchar = "五" + tmpnewchar; break;
        case "6": tmpnewchar = "六" + tmpnewchar; break;
        case "7": tmpnewchar = "七" + tmpnewchar; break;
        case "8": tmpnewchar = "八" + tmpnewchar; break;
        case "9": tmpnewchar = "九" + tmpnewchar; break;
    }
    switch (part[0].length - i - 1) {
        case 0: tmpnewchar = tmpnewchar; break;
        case 1: if (perchar != 0) tmpnewchar = tmpnewchar + "十"; break;
        case 2: if (perchar != 0) tmpnewchar = tmpnewchar + "百"; break;
        case 3: if (perchar != 0) tmpnewchar = tmpnewchar + "千"; break;
        case 4: tmpnewchar = tmpnewchar + "万"; break;
        case 5: if (perchar != 0) tmpnewchar = tmpnewchar + "十"; break;
        case 6: if (perchar != 0) tmpnewchar = tmpnewchar + "百"; break;
        case 7: if (perchar != 0) tmpnewchar = tmpnewchar + "千"; break;
        case 8: tmpnewchar = tmpnewchar + "亿"; break;
        case 9: tmpnewchar = tmpnewchar + "十"; break;
    }
    newchar = tmpnewchar + newchar;
  }
  //替换所有无用汉字，直到没有此类无用的数字为止
  while (newchar.search("零零") != -1 || newchar.search("零亿") != -1 || newchar.search("亿万") != -1 || newchar.search("零万") != -1) {
    newchar = newchar.replace("零亿", "亿");
    newchar = newchar.replace("亿万", "亿");
    newchar = newchar.replace("零万", "万");
    newchar = newchar.replace("零零", "零");
    }
    //替换以“一十”开头的，为“十”
    if (newchar.indexOf("一十") == 0) {
        newchar = newchar.substr(1);
    }
    //替换以“零”结尾的，为“”
    if (newchar.lastIndexOf("零") == newchar.length - 1) {
        newchar = newchar.substr(0, newchar.length - 1);
    }
    return newchar;
};

tools.dx = function(number){
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(number))
    return "数据非法";
  var unit = "千百拾亿千百拾万千百拾元角分", str = "";
    number += "00";
  var p = number.indexOf('.');
  if (p >= 0)
    number = number.substring(0, p) + number.substr(p+1, 2);
    unit = unit.substr(unit.length - number.length);
  for (var i=0; i < number.length; i++)
      str += '零壹贰叁肆伍陆柒捌玖'.charAt(number.charAt(i)) + unit.charAt(i);
  return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
};


export default tools;




