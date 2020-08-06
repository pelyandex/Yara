export default `
    <div class="main-block index_main-block">
      <div class="main_chat-box">
      <div class="chat-box_search-input">
      <input class='index_create-chat-input' ya-change='setNameNewChat' id='chatInput' placeholder="Create new chat">
      <span class='plus' ya-click='createChat'>+</span>
        </div>
          <ul class="chat-box">
            <li ya-for='chats' class="chat-item">
              <img class="chat-box_avatar" src="https://subdued-view.surge.sh/smile.png" alt="avatar">
              <div class="chat-box_info">
              <span>{{title}}</span>
              </div>
            </li>
          </ul>
      </div>
      <div class="message-box">
        <span class='logout' ya-click='logout'>Logout</span>
        <div style='height:16%'>
          <span class="message-box_time">{{currentTime}}</span>
        </div>
        <div class="message-box_messages-box">
          <div ya-for='currentChat' class="messages-box_me" style='flex-direction:row'>
            <img class="chat-box_avatar" style="margin: 0 15px;" src="https://subdued-view.surge.sh/smile.png" alt="avatar">
            <span>{{text}}</span>
            <span style="position: absolute; top: 0; right:0">{{date}}</span>
          </div>
        </div>
        <div class="message-box_input-box">
          <img class="chat-box_avatar" style="margin-left: 4px;" src="https://subdued-view.surge.sh/smile.png" alt="avatar">
          <div class="input-box" ya-keydown='keydown'>
            <input class="input-box_input" id='message' ya-blur='blur' ya-change='change' ya-input='change' ya-focus='focus'>
            <span class='error index_error' style='top:10px;right:100px'>Invalid characters</span>
            <button class="input-box_send-button" ya-click='enter'></button>
          </div>
        </div>
      </div>
      <div class='error-box'>
        <span class='error-box_message'>Server unavalible</span>
      <div>
    </div>`;
