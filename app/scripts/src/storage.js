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

// 单独设计一个重复的聊天室类看似有点重复，但能降低耦合
// 如果只是因为可以少写代码就“复用”,那耦合得高到什么程度了……
export class ChatRoomStore extends Store {
  constructor(key) {
    super(sessionStorage);
    this.key = key;
  }
}

export class CurrentChatRoomStore extends Store {
  constructor(key) {
    super(sessionStorage);
    this.key = key;
  }
}
