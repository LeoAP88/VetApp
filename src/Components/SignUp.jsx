import "./SignUp.css"

const SignUp = () => {
    return(
        <div class="container">
      <div class="center">
          <h1>Register</h1>
          <form method="POST" action="">
              <div class="txt_field">
                  <input type="text" name="name" required></input>
                  <span></span>
                  <label>Name</label>
              </div>
              <div class="txt_field">
                  <input type="email" name="email" required></input>
                  <span></span>
                  <label>Email</label>
              </div>
              <div class="txt_field">
                  <input type="password" name="password" required></input>
                  <span></span>
                  <label>Password</label>
              </div>
              <div class="txt_field">
                  <input type="password" name="cpassword" required></input>
                  <span></span>
                  <label>Confirm Password</label>
              </div>
              <input name="submit" className="signIn" type="Submit" value="Sign Up"></input>
              <div class="signup_link">
                  Have an Account ? <a href="loginForm.php">Login Here</a>
              </div>
          </form>
      </div>
  </div>
    );
}

export default SignUp;