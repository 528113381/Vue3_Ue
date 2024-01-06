// .cjs----common.js规范 
// .mjs----es 模块化规范 

module.exports = {
    plugins: {
      'postcss-px-to-viewport': {
        // 设备宽度375计算vw的值
        viewportWidth: 375,
      },
    },
  };
  