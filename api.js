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
  localStorage.clear()
  localStorage.setItem('token', responseData.user.token)
  localStorage.setItem('user', responseData.user.name)
  renderComments()
})
}
export const commentPostFetch = (UserName,UserComment) => {
  fetch("https://wedev-api.sky.pro/api/v2/sayfiddinov-aliakbar/comments", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
              body: JSON.stringify({
                name: UserName.value.replaceAll("<", "&lt").replaceAll(">", "&gt"),
                text: UserComment.value.replaceAll("<", "&lt").replaceAll(">", "&gt"),
              }),
            })
              .then(() => fetch("https://wedev-api.sky.pro/api/v2/sayfiddinov-aliakbar/comments", { 
                method: "GET" 
              })
                .then((response) => {
        
                  if (response.status === 400) {
        
                    preLoaderText.textContent = ""
                    throw new Error("400")
        
                  }
        
                  if (response.status === 500) {
        
                    preLoaderText.textContent = ""
                    throw new Error("500")
        
                  } else {
                    UserComment.value = ""
                    return getFetchApi()
        
                  }
                })
                .catch((error) => {
                  if (error === "TypeError: Failed to fetch") {
                    preLoaderText.textContent = ""
                    alert("Проблемы с интернетом")
                  }
        
                  if (error === "400") {
                    preLoaderText.textContent = ""
                    alert("Имя и комментарий должны быть длиннее 3 символов")
                  }
        
                  if (error === "500") {
                    preLoaderText.textContent = ""
                    alert("проблемы с сервером")
                  } else {
                    ButtonElement.disabled = false
                    console.warn(error)
                  }
                }))
}