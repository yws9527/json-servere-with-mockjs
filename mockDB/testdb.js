const Mock = require("mockjs");
const Random = Mock.Random;

const gradeNames = [
  '一年级', '二年级', '三年级', '四年级', '五年级', '六年级',
  '初一', '初二', '初三',
  '高一', '高二', '高三',
];

const averages = () => {
  return Mock.mock({
    code: 200,
    success: true,
    message: 'ok',
    data: {
      'list|12': [
        {
          "id|+1": 1,
          "gradeName|+1": gradeNames,
          "boyScore|1-100": 1,
          "girlScore|1-100": 1,
        }
      ],
    }
  });
}

const plan = () => {
  return Mock.mock({
    code: 200,
    success: true,
    message: 'ok',
    data: {
      'list|6-12': [
        {
          "id|+1": 1,
          "gradeName|+1": gradeNames,
          "boyScore|1-100": 1,
          "girlScore|1-100": 1,
        }
      ],
    }
  });
}

module.exports = {
  averages,
  plan,
}