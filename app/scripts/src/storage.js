class Store {
  constructor(storageApi) {
    this.api = storageApi;
  }

  get() {
    return this.api.getItem(this.key);
  }

  set(value) {
    this.api.setItem(this.key, value);
  }
}

// 实话说我觉得这设计不合理，至少父类的设计有问题；还能给不存在的属性加方法？
// 也有可能是变通的方法吧……毕竟没有抽象类和接口。
export class UserStore extends Store {
  constructor(key) {
    super(sessionStorage);
    this.key = key;
  }
}

// 非要继承也只能这样吧，要么每次都实例化，当成wrapper用；或者用分隔符分开
// 反正都不咋地。这种性能损失（以及这种无谓的包装）真的是有意义的吗？
export class MessageStore extends Store {
  constructor(key) {
    super(localStorage);
    this.key = key;
  }

  clear() {
    this.api.removeItem(this.key);
  }
}
