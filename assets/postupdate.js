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

        const postBox  = document.getElementById("postBox")
            const title = post["title"]
            const genre = post["genre"]
            const content = post["content"]
            const temp_html = `<div class="card">
            <h3 class="tit" id="title">${title}</h3>
            <h5 id="genre">${genre}</h5>
            <p class="desc">${content}</p>`;
            postBox.insertAdjacentHTML("beforeend", temp_html)
    });
});