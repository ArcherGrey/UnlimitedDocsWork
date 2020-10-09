/**
 * @description: 命令模式对象构造函数
 * @param {Object} receiver 接收命令对象
 * @return {type}
 */
const CommandMode = function(receiver) {
  // 执行命令
  this.excute = function() {
    // 接收命令对象执行命令
    receiver.doSomething();
  };

  // 撤销命令
  this.undo = function() {
    // 接收命令对象撤销命令
    receiver.undoSomething();
  };
};

/**
 * @description: 设置命令
 * @param {Object} commander 命令发布对象
 * @param {Object} command 命令对象
 * @return {type}
 */
const setCommand = function(commander, command) {
  // 回调函数触发命令执行撤销
  commander.callback1 = function() {
    command.excute();
  };
  commander.callback2 = function() {
    command.undo();
  };
};

const r = {
  doSomething: () => {
    console.log("执行命令");
  },
  undoSomething: () => {
    console.log("撤销命令");
  }
};

const c = {
  fire1: function() {
    console.log("触发回调1");
    this.callback1();
  },
  fire2: function() {
    console.log("触发回调2");
    this.callback2();
  }
};

const commandInstance = new CommandMode(r);
setCommand(c, commandInstance);
c.fire1();
c.fire2();
