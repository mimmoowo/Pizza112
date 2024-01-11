const feedbackSection = document.querySelector(".feedback")


function main() {
    if (localStorage.getItem('isReviewed') !== 'true') {
        feedbackSection.innerHTML = `
            <h2 class="section-feedback__name">Оставьте отзыв!</h2>
            <p>Ваши отзывы очень важны для нас :)</p>
            <p>Поставьте оценку:</p>
            <div class="review-stars" id="rating">
            <img src="./img/star.svg" class="star" data-value="1">
            <img src="./img/star.svg" class="star" data-value="2">
            <img src="./img/star.svg" class="star" data-value="3">
            <img src="./img/star.svg" class="star" data-value="4">
            <img src="./img/star.svg" class="star" data-value="5">
            </div>
            <div class="feedback-container">
              <textarea rows="10" cols="45" name="text" class="feedback-form"
              placeholder="Напишите ваши впечатления от пребывания у нас"></textarea>
              <a type="button" id="submitFeedback">отправить</a>
            </div>
        `;


        const submitButton = document.querySelector("#submitFeedback")
        const rating = document.getElementById('rating');
        const stars = rating.querySelectorAll('.star');
        let selectedRating = 5;

        submitButton.onclick = async (event) => {
            const text = document.querySelector(".feedback textarea").value

            if (!text) {
                alert("Отзыв не может быть пуст")
                return
            }

            putReview(text, selectedRating)
        }

        const putReview = async (text, rating) => {
            try {
                const url = `https://pizza112.srvsrv.net/api/client/putReview`;
                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + localStorage.getItem('userToken'),
                    },
                    body: JSON.stringify({
                        text,
                        rating
                    }),
                };
                const response = await fetch(url, options);

                if (response.status === 200) {
                    feedbackSection.innerHTML = "<h3 class='section__title'>Ваш отзыв успешно добавлен!</h3>";
                    localStorage.setItem('isReviewed', true);
                }

                try {
                    const data = await response.json();
                    if (data.error) {
                        alert(data.error);
                    }
                } catch (error) {
                    console.error(error)
                }
            } catch (error) {
                console.error(error)
            }
        };

        stars.forEach(star => {
            star.addEventListener('click', function () {
                selectedRating = this.getAttribute('data-value');
                updateStars(rating, selectedRating);
            });
        });

        function updateStars(container, rating) {
            const stars = container.querySelectorAll('.star');
            stars.forEach((star, index) => {
                if (index < rating) {
                    star.src = './img/star.svg';
                } else {
                    star.src = './img/starEmpty.svg';
                }
            });
        }
    } else {
        feedbackSection.innerHTML = "<h3 class='section__title'>Вы уже оставляли отзыв!</h3>";
    }
}

main()