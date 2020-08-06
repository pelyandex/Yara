export default `
  <div class="main-block main-block-signin">
    <h1 class="main-block_title">Sign in</h1>
    <div class='main-block_controls' ya-keydown='keydown'>
      <div class="controls_input-box">
        <span>Login</span>
        <input class="controls_input" id='login' ya-change='change' ya-focus='focus' ya-blur='blur'>
        <span class='error auth_error' class='error'>This field can't be empty</span>
      </div>
      <div class="controls_input-box">
        <span>Password</span>
        <input type="password" id='password' class='controls_input' ya-change='change' ya-focus='focus' ya-blur='blur'>
        <span class='error auth_error' class='error'>This field can't be empty</span>
      </div>
      <div class="controls_confirm-block">
        <ya-button></ya-button>
        <span ya-click='toSignUp'>Sign up</span>
      </div>
    </div>
    <div class='error-box'>
      <span class='error-box_message'>Login or password incorrect</span>
    <div>
  </div>
`;
