const ButtonElement = document.getElementById('add-form-button');

const ListElement = document.getElementById('comments');

const UserName = document.getElementById('add-form-name');

const UserComment = document.getElementById('add-form-text');

let UserLikes = 0;

const fetchPromise = fetch("https://wedev-api.sky.pro/api/v1/saifuddinov-aliakbar/comments",{
    method:"GET",
  });
console.log(fetchPromise);

fetchPromise.then((response) =>  {
  console.log(response);

  const jsonPromise = response.json();

  jsonPromise.then((responseData) => {
    console.log(responseData);
  })
})

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
      likeButton.addEventListener('click', (event) => {
        const index = likeButton.dataset.index;
        event.stopPropagation();
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
      <li class="comment" data-index='${index}'>
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
              </div>
            </div>
          </li>
      `})
      .join('');
      ListElement.innerHTML = UsersHTML;
      likes();
  };

renderComments();

const initReplayClickListener = () => {
    const commentsToAnswer = document.querySelectorAll('.comment');
    for (const commentToAnswer of commentsToAnswer) {
      commentToAnswer.addEventListener("click", () => {
        const index = commentToAnswer.dataset.index;
        UserComment.value = `${Users[index].comment}\n${Users[index].name},\n`;
      });
    }
  }

likes();
initReplayClickListener();

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
            name: UserName.value
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;"),
            comment: UserComment.value
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;"),
            date: dateString,
            likes: UserLikes,
            userLike: false,
            paint: '',
        })
        UserName.value = '';
        UserComment.value = '';
    }
        renderComments();
        likes();
        initReplayClickListener();
});