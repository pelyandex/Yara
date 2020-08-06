export default `
 <div class="main-block main-block_settings" ya-keydown='keydown'>
        <img class="settings_chat-box_avatar" src="../../images/avatar.png" alt="avatar">
        <div class='main-block_controls'>
          <div class="controls_input-box">
            <span>Name</span>
            <input class="controls_input" value='[name]' id='name' ya-change='change' ya-focus='focus' ya-blur='blur'>
            <span class='auth_error error' >This field can't be empty</span>
          </div>
          <div class="controls_input-box">
            <span>Login</span>
            <input class='controls_input' id='login' ya-change='change' ya-focus='focus' ya-blur='blur'>
            <span class='auth_error error'>This field can't be empty</span>
          </div>
          <div class="controls_input-box">
            <span>Email</span>
            <input class='controls_input' id='email' ya-change='change' ya-focus='focus' ya-blur='blur'>
            <span class='auth_error error'>This field can't be empty</span>
          </div>
          <div class="controls_input-box">
            <span>Previous password</span>
            <input type="password" id='previouspassword' class='controls_input' ya-change='change' ya-focus='focus' ya-blur='blur'>
            <span class='auth_error error'>This field can't be empty</span>
          </div>
          <div class="controls_input-box">
            <span>New password</span>
            <input type="password" id='newpassword' class='controls_input' ya-change='change' ya-focus='focus' ya-blur='blur'>
            <span class='auth_error error'>This field can't be empty</span>
          </div>
          <div class="controls_input-box">
            <span>Repeat new password</span>
            <input type="password" id='repeatnewpassword' class='controls_input' ya-change='change' ya-focus='focus' ya-blur='blur'>
            <span class='auth_error error'>This field can't be empty</span>
          </div>
          <div class="controls_confirm-block">
            <ya-button></ya-button>
          </div>
        </div>
      </div>
`;
