let url = location.href;
let idx = url.indexOf('=');
let id;
if (idx >= 0) {
   idx = idx + 1;
   id = url.substring(idx, url.length);
}

// 게시글 상세 조회
// 수정 하기전 내용 보여주기
window.addEventListener("DOMContentLoaded", async function(){
    fetch(`/api/posts/${id}`)
    .then((response) => response.json())
    .then((data) => {
        let post = data["results"];

        const postBox  = document.getElementById("postBox")
            const title = post["title"]
            const game_title =post["game_title"]
            const genre = post["genre"]
            const content = post["content"]
            const temp_html = `<div class="input-group input-group-lg">
            <span class="input-group-text" id="inputGroup-sizing-lg">제목</span>
            <input
              type="text"
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-lg"
              id="title"
              value="${title}"
            />
          </div>
          <div class="input-group input-group-lg">
            <span class="input-group-text" id="inputGroup-sizing-lg"
              >게임 이름</span
            >
            <input
              type="text"
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-lg"
              id="game_title"
              value="${game_title}"
            />
          </div>
  
          <div class="input-group input-group-lg">
            <span class="input-group-text" id="inputGroup-sizing-lg"
              >게임 장르</span>
            <input
              type="text"
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-lg"
              id="genre"
              value="${genre}"
              />
          </div>
  
          <div>
              <input class="postCrContent" id="content" type="text" value="${content}"/>
              <p></p>
          </div>`;
            postBox.insertAdjacentHTML("beforeend", temp_html)
    });
});

// 저장 버튼 클릭 시 게시글 수정 처리
document
  .getElementById("updateSubmit")
  .addEventListener("click", async function () {
    const title = document.getElementById("title").value;
    const game_title = document.getElementById("game_title").value;
    const genre = document.getElementById("genre").value;
    const content = document.getElementById("content").value;
    try {
        const response = await fetch(`/api/posts/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            postId: id,
            title,
            game_title,
            genre,
            content,
          }),
        });
    
          const data = await response.json();
          if (response.ok) {
            // 게시글 수정 성공
            alert(data.message); // 알림 창 띄우기
            window.location.href =`/` ; // 수정 완료시 메인페이지 이동
          } else {
            // 수성 실패
            alert(data.message);
            // 실패 처리 로직 수행
          }
        } catch (error) {
          console.error("Error:", error);
          // 에러 처리 로직 수행
        }
      });