//피드 불러오기
window.addEventListener("DOMContentLoaded", async function(){
    fetch("/api/posts",{})
    .then((response) => response.json())
    .then((data) => {
        let rows = data["results"];
        const cardList  = document.getElementById("cardList")
        rows.forEach(post => {
            const title = post["title"]
            const genre = post["genre"]
            const content = post["content"]
            const postId = post["postId"]
            const temp_html = `<div class="card">
            <h3 class="tit" id="title">${title}</h3>
            <h5 id="genre">${genre}</h5>
            <p class="desc">${content}</p>
            <button type="button" class="more" class="ir" id="${postId}" onclick=window.location.href='/postdetail.html?id=${postId}'>더보기</button>
          </div>`;
           cardList.insertAdjacentHTML("beforeend", temp_html)

        });
    });

})