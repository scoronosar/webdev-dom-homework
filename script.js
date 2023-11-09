const ButtonElement = document.getElementById('add-form-button');

const ListElement = document.getElementById('comments');

const UserName = document.getElementById('add-form-name');

const UserComment = document.getElementById('add-form-text');

let UserLikes = 0;

const currentDate = new Date();
const dateString = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()} `;

const Users = [
    {
        name: 'Глеб Фокин',
        comment: 'Это будет первый комментарий на этой странице',
        date: '12.02.22 12:18',
        likes:3,
        userLike: false,
        paint: ''
    },
    {
        name: 'Варвара Н.',
        comment: 'Мне нравится как оформлена эта страница! ❤',
        date: '13.02.22 19:22',
        likes:75,
        userLike: true,
        paint: '-active-like'
    }
];

const likes = () => {
    const likeButtons = document.querySelectorAll('.like-button');
    for (const likeButton of likeButtons) {
      likeButton.addEventListener('click', () => {
        const index = likeButton.dataset.index;
        if (Users[index].userLike === false ) {
            Users[index].paint = '-active-like';
            Users[index].likes += 1;
            Users[index].userLike = true;
        } else {
            Users[index].paint = '';
            Users[index].likes -= 1;
            Users[index].userLike = false;
        }
        renderComments();
      });
    };
  };

const renderComments = () => {
    const UsersHTML = Users.map((user, index) =>{
      return `
      <li class="comment">
            <div class="comment-header">
              <div>${user.name}</div>
              <div>${user.date}</div>
            </div>
            <div class="comment-body">
              <div class="comment-text">
                ${user.comment}
              </div>
            </div>
            <div class="comment-footer">
              <div class="likes">
                <span data-index='${index}'  class="likes-counter">${user.likes}</span>
                <button data-index='${index}' class="like-button ${user.paint}"</button>
                <button data-index='${index}' class = "edit-button">Редактировать</button>
              </div>
            </div>
          </li>
      `})
      .join('');
      ListElement.innerHTML = UsersHTML;
      likes();
  };

renderComments();

const initEditButtonListener = () => {

    const EditButtonElements = document.querySelectorAll('.edit-button');

    for (const EditButtonElement of EditButtonElements){
        EditButtonElement.addEventListener('click', () =>{
            const index = EditButtonElement.dataset.index;
            UserName.value = Users[index].name;
            UserComment.value = Users[index].comment;
            UserLikes = Users[index].likes;
            Users.splice(index, 1);
            renderComments();
        })
    }
};

initEditButtonListener();
likes();


ButtonElement.addEventListener("click", () => {
    UserName.style.backgroundColor = "white";
    UserComment.style.backgroundColor = "white";
    if (UserName.value === "" ){
        UserName.style.backgroundColor = "red";
        UserName.placeholder = "Пожалуйста заполните это поле";
    }
    else if (UserComment.value === ""){
        UserComment.style.backgroundColor = "red";
        UserComment.placeholder = "Пожалуйста заполните это поле";
    }
    else{
        Users.push({
            name: UserName.value,
            comment: UserComment.value,
            date: dateString,
            likes: UserLikes,
            userLike: false,
            paint: '',
        })
    }
        renderComments();
        initEditButtonListener();
        likes();
});