const url = location.href;
const idx = url.indexOf("=");
const id = url.substring(idx, url.length);
const commentId = id.substr(1);

// 댓글 삭제
document
  .getElementById("commentDelete")
  .addEventListener("click", async function () {
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (response.ok) {
        // 삭제성공
        alert("게시글이 삭제되었습니다"); // 알림 창 띄우기
        window.close(); // 삭제 완료시 메인페이지 이동
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

// 댓글 수정
document
  .getElementById("commentUpdate")
  .addEventListener("click", async function () {
    const comment = document.getElementById("commentCn").value;
    try {
        const response = await fetch(`/api/comments/${commentId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            comment,
          }),
        });
    
          const data = await response.json();
          if (response.ok) {
            // 댓글 수정 성공
            alert(data.message); // 알림 창 띄우기
            window.close(); // 삭제 완료시 메인페이지 이동
        } else {
            // 수정 실패
            alert(data.message);
            // 실패 처리 로직 수행
          }
        } catch (error) {
          console.error("Error:", error);
          // 에러 처리 로직 수행
        }
      });
