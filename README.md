# Chattrbox

书上的“高级聊天室”的实现。

我说实话，用jQuery做SPA真的会死人；而且还是传统的SSR。

我现在开始有点佩服助教了，那个影院管理系统写出来居然还像个人样。

实现思路大致是维护两个Map，一个作为聊天室到socket的映射，
另一个作为聊天室到消息的映射，然后在需要使用的时候，
根据聊天室名称进行遍历。

也就是说，接口是这样的：

```typescript
interface ChatRoomToMessageMap {
    [roomName: string]: Message[];
}
interface chatRoomToClientMap {
    [roomName: string]: WebSocket[];
}
```

存在的问题：

1. WebSocket需要去重。按照现有实现，连接池会过大而造成性能瓶颈。

2. 测试不充分。
