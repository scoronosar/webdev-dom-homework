import { loginFetch} from "./api.js"
import { Container, renderComments } from "./render-comments.js"
export let User
export const renderlogin = () =>{
    const loginLinkElement = document.getElementById('login-link-main')
    loginLinkElement.addEventListener('click', () =>{
      Container.innerHTML = `
      <div class="form">
      <h3>Форма входа</h3>
      <div class="input-container">
          <input type="text" placeholder="Логин" id="login-input" class="input">
          <input type="text" placeholder="Пароль" id="password-input" class="input">
      </div>
      <button type="submit" id="submit-button" class="button">Войти</button>
    </div>
      ` 
      const submitButtonElement = document.getElementById('submit-button')
      submitButtonElement.addEventListener('click', () => {
        User = document.getElementById('login-input').value
        const passwordInput = document.getElementById('password-input').value
        loginFetch(User, passwordInput)
      })
    })
}
