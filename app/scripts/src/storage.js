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

// 实话说我觉得这设计不合理，至少父类的设计有问题
export class UserStore extends Store {
  constructor(key) {
    super(sessionStorage);
    this.key = key;
  }
}
