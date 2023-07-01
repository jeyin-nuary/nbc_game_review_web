// function getPostDetail(postId, callback) {
//     $.ajax({
//       type: "GET",
//       url: `/api/posts/${postId}`,
//       error: function (xhr, status, error) {
//         if (status == 401) {
//           alert("로그인이 필요합니다.");
//         } else if (status == 404) {
//           alert("존재하지 게시글입니다.");
//         } else {
//           alert("알 수 없는 문제가 발생했습니다. 관리자에게 문의하세요.");
//         }
//         window.location.href = "/posts";
//       },
//       success: function (response) {
//         callback(response.posts);
//       },
//     });
//   }

let url = location.href;
let idx = url.indexOf('=');
let id;
if (idx >= 0) {
   idx = idx + 1;
   id = url.substring(idx, url.length);
}

window.addEventListener("DOMContentLoaded", async function(){
    fetch(`/api/posts/${id}`,{})
    .then((response) => response.json())
    .then((data) => {
        let post = data["results"];

        const cardList  = document.getElementById("cardList")
            const title = post["title"]
            const genre = post["genre"]
            const content = post["content"]
            const postId = post["postId"]
            console.log(post);
            const temp_html = `<div class="card">
            <h3 class="tit" id="title">${title}</h3>
            <h5 id="genre">${genre}</h5>
            <p class="desc">${content}</p>
            <button type="button" class="more" class="ir" id="${postId}" onclick=window.location.href='/postdetail.html?id=${postId}'>더보기</button>
          </div>`;
           cardList.insertAdjacentHTML("beforeend", temp_html)

     
    });

})