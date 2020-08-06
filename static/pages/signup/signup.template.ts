export default `
     <div class="main-block main-block-signup" ya-keydown='keydown'>
        <h1 class="main-block_title">Sign up</h1>
        <div class='main-block_controls main-block_controls-signup'>
          <div class="controls_input-box">
            <span>Name</span>
            <input class="controls_input" id='name' ya-change='change' ya-focus='focus' ya-blur='blur'>
            <span class='auth_error error'>This field can't be empty</span>
          </div>
          <div class="controls_input-box">
            <span>Second name</span>
            <input class="controls_input" id='secondname' ya-change='change' ya-focus='focus' ya-blur='blur'>
            <span class='auth_error error'>This field can't be empty</span>
          </div>
          <div class="controls_input-box">
            <span>Phone</span>
            <input class="controls_input" id='phone' ya-change='change' ya-focus='focus' ya-blur='blur'>
            <span class='auth_error error'>This field can't be empty</span>
          </div>
          <div class="controls_input-box">
            <span>Login</span>
            <input class="controls_input" id='login' ya-change='change' ya-focus='focus' ya-blur='blur'>
            <span class='auth_error error'>This field can't be empty</span>
          </div>
          <div class="controls_input-box">
            <span>Email</span>
            <input class="controls_input" id='email' ya-change='change' ya-focus='focus' ya-blur='blur'>
            <span class='auth_error error'>This field can't be empty</span>
          </div>
          <div class="controls_input-box">
            <span>Password</span>
            <input type="password" id='password' class='controls_input' ya-change='change' ya-focus='focus' ya-blur='blur'>
            <span class='auth_error error'>This field can't be empty</span>
          </div>
          <div class="controls_input-box">
            <span>Repeat password</span>
            <input type="password" id='repeatpassword' class='controls_input' ya-change='change' ya-focus='focus' ya-blur='blur'>
            <span class='auth_error error'>This field can't be empty</span>
          </div>
          <div class="controls_confirm-block">
            <ya-button></ya-button>
            <span ya-click='toSignIn'>Sign in</span>
          </div>
        </div>
      <div class='error-box'>
      <span class='error-box_message'>Server unavalible</span>
    <div>
  </div>
`;
