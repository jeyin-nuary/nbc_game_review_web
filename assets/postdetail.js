let url = location.href;
let idx = url.indexOf('=');
let id;
if (idx >= 0) {
   idx = idx + 1;
   id = url.substring(idx, url.length);
}

// 게시글 상세 조회
window.addEventListener("DOMContentLoaded", async function(){
    fetch(`/api/posts/${id}`)
    .then((response) => response.json())
    .then((data) => {
        let post = data["results"];

        const cardList  = document.getElementById("cardList")
            const title = post["title"]
            const genre = post["genre"]
            const content = post["content"]
            const temp_html = `<div class="card">
            <h3 class="tit" id="title">${title}</h3>
            <h5 id="genre">${genre}</h5>
            <h5 id="genre">${genre}</h5>
            <p class="desc">${content}</p>`;
           cardList.insertAdjacentHTML("beforeend", temp_html)
    });
});

// 게시글 삭제
document
  .getElementById("postDelete")
  .addEventListener("click", async function () {
    try {
        const response = await fetch(`/api/posts/${id}`, {
          method: 'DELETE',
        });
    
          const data = await response.json();
          if (response.ok) {
            // 삭제성공
            alert("게시글이 삭제되었습니다") // 알림 창 띄우기
            window.location.href = "/"; // 삭제 완료시 메인페이지 이동
          } else {
            // 삭제 실패
            alert(data.message);
            // 실패 처리 로직 수행
          }
        } catch (error) {
          console.error("Error:", error);
          // 에러 처리 로직 수행
        }
});

//게시글 수정
document
  .getElementById("postUpdate")
  .addEventListener("click", async function(){
    window.location.href = `/postupdate.html?id=${id}`
  })

// 댓글 작성
document.getElementById('commentCreate').addEventListener('click', async function () {
  const comment = document.getElementById('commentInput').value;

  try {
    const response = await fetch(`api/posts/${id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comment,
      }),
    });
    console.log(response)


    const data = await response.json();
    if (response.ok) {
      console.log(data.message);
      alert('댓글이 작성되었습니다');
      location.reload();
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

//댓글 자동 조회
window.addEventListener("DOMContentLoaded", async function(){
  fetch(`/api/posts/${id}/comments`,{})
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
      let rows = data["results"];
      const commentBox  = document.getElementById("commentBox")
      rows.forEach(comments => {
          const comment = comments["comment"]
          const commentId = comments["commentId"]
          const temp_html = `<input type="text" class="commentInput" value="${comment}" disabled=""/>
          <div class="btn">
          <a type="button" href="comment.html?id=${commentId}" onclick="openPopup(this.href, 1000, 700); return false;"
          class="btn btn-dark">수정</a>
          </div>`;
        commentBox.insertAdjacentHTML("beforeend", temp_html)
      });
  });
});
