// 求乘积
var mult = function() {
  console.log("开始计算乘积");
  var a = 1;
  for (var i = 0; i < arguments.length; ++i) {
    a *= arguments[i];
  }
  return a;
};

mult(2, 3); // 6

// 加入缓存代理
var proxyMult = (function() {
  var cache = new Map();
  return function() {
    var args = Array.prototype.join.call(arguments, ",");

    if (cache.has(args)) {
      return cache.get(args);
    } else {
      var ans = mult.apply(this, arguments);
      cache.set(args, ans);
      return ans;
    }
  };
})();

proxyMult(1, 2, 3, 4, 5); // 120 调用 mult
proxyMult(1, 2, 3, 4, 5); // 120 不调用 mult 直接从缓存中取
