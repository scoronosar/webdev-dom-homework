const userUrl = "https://wedev-api.sky.pro/api/user/login"
import { dateString, Users , SetUsers, preLoaderText, ListElement } from "./main.js";
import { renderComments} from "./render-comments.js";

export let token;

export const SetToken = (newToken) =>{
    token = newToken
};

export const getFetchApi = () => {
    return fetch("https://wedev-api.sky.pro/api/v2/sayfiddinov-aliakbar/comments", { 
      method: "GET"
   })
      .then(response => response.json())
      .then(response => {
        const getApiComments = response.comments.map(comment => {
          return {
            author: comment.author.name,
            date: dateString,
            likes: comment.likes,
            isLiked: false,
            text: comment.text,
          }
        })
        SetUsers(getApiComments)
      })
      .then(() => {
        setTimeout(() => {
          preLoaderText.textContent = ""
          preLoaderText.classList.remove("margin")
          renderComments(ListElement, Users)
        }, 900)
      })
  }
export const loginFetch = (loginInput,passwordInput) =>{
  fetch('https://wedev-api.sky.pro/api/user/login' , {
    method: 'POST',
    body: JSON.stringify ({
        "login": loginInput,
        "password": passwordInput
    })
}).then((response) =>{
    if (response.status === 201){
        return response.json()
    }
    else{
        alert("неправельны логин или пороль")
    }
}).then((responseData) =>{
    SetToken(responseData.user.token)
})
}