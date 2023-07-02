// 저장 버튼 클릭 시 게시글 작성 처리
document
  .getElementById("postSubmit")
  .addEventListener("click", async function () {
    const title = document.getElementById("title").value;
    const game_title = document.getElementById("game_title").value;
    const genre = document.getElementById("genre").value;
    const content = document.getElementById("content").value;
    try {
        const response = await fetch('/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            game_title,
            genre,
            content,
          }),
        });
    
          const data = await response.json();
          if (response.ok) {
            // 게시글 작성 성공
            alert(data.message); // 알림 창 띄우기
            window.location.href = "/"; // 작성 완료시 메인페이지 이동
          } else {
            // 작성 실패
            alert(data.message);
            // 실패 처리 로직 수행
          }
        } catch (error) {
          console.error("Error:", error);
          // 에러 처리 로직 수행
        }
      });