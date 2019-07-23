import $ from 'jquery';
import md5 from 'crypto-js/md5';
import moment from 'moment';

function createGravatarUrl(username) {
  let userHash = md5(username);
  return `http://www.gravatar.com/avatar/${userHash.toString()}`;
}

export function promptForUsername() {
  const username = prompt('Enter a username');
  return username.toLowerCase();
}

export function promptForChatRoomName() {
  const chatRoomName = prompt('Enter a chat room name');
  return chatRoomName.toLowerCase();
}

export class ChatRoom {
  constructor(buttonSel, currentSel, listSel) {
    this.$menuButton = $(buttonSel);
    this.$currentChatRoom = $(currentSel);
    this.$chatRoomList = $(listSel);
  }

  init(current, list, changeChatRoomCallback) {
    this.$currentChatRoom.text(current);
    // 如果就一项（或者没有，比如初始化的时候），没必要开启下拉栏
    // 在这里就不用发消息了，因为app初始化的时候已经发过了，会重复
    if (!list || list.length <= 1) {
      this.$menuButton.attr('disabled', 'disabled');
      // changeChatRoomCallback(current);
      return;
    }
    list.forEach(item => {
      const $item = $('<li>');
      const $anchor = $('<a>', {
        text: item
      });
      $anchor.on('click', (event) => {
        event.preventDefault();
        const targetChatRoom = event.target.innerText;
        // 目标和当前不一致再切换，因为修改比读取的开销大
        if (targetChatRoom === this.$currentChatRoom.text()) {
          return;
        }
        this.$currentChatRoom.text(targetChatRoom);
        // 这里触发切换聊天室的逻辑；如果切换失败，换回去就是了
        // 还是类似于乐观锁的机制
        changeChatRoomCallback(targetChatRoom);
      });
      $item.append($anchor);
      this.$chatRoomList.append($item);
    });
  }
}

export class ChatForm {
  constructor(formSel, inputSel) {
    this.$form = $(formSel);
    this.$input = $(inputSel);
  }

  init(submitCallback) {
    this.$form.submit((event) => {
      event.preventDefault();
      const val = this.$input.val();
      submitCallback(val);
      this.$input.val('');
    });
    this.$form.find('button').on('click', () => this.$form.submit());
  }
}

export class ChatList {
  constructor(listSel, username) {
    this.$list = $(listSel);
    this.username = username;
  }

  drawMessage({user: u, timestamp: t, message: m}) {
    let $messageRow = $('<li>', {
      'class': 'message-row'
    });
    if (this.username === u) {
      $messageRow.addClass('me');
    }
    let $message = $('<p>');
    $message.append($('<span>', {
      'class': 'message-username',
      text: u
    }));
    $message.append($('<span>', {
      'class': 'timestamp',
      text: moment(t).fromNow()
    }));
    $message.append($('<span>', {
      'class': 'message-message',
      text: m
    }));

    let $img = $('<img>', {
      src: createGravatarUrl(u),
      title: u
    });

    $messageRow.append($img);
    $messageRow.append($message);
    this.$list.append($messageRow);
    // 2s内的新消息淡入
    if ((new Date() - new Date(t).getTime()) / 1000 < 2) {
      $messageRow.hide();
      $messageRow.fadeIn();
    }
    $messageRow.get(0).scrollIntoView();
  }

  init() {
    this.timer = setInterval(() => {
      $('[data-time]').each((index, element) => {
        const $element = $(element);
        const timestamp = new Date().setTime($element.attr('data-time'));
        const ago = moment(timestamp).fromNow();
        $element.html(ago);
      });
    }, 1000);
  }

  clear() {
    this.$list.empty();
  }
}


