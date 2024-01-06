const url = "https://pizza112.srvsrv.net/api/show/reviews";
const reviews = [];
const reviewsContainer = document.querySelector("#reviews");
let currentReviewIndex = 0;


function showReview() {
    const review = reviews[currentReviewIndex];
    const starsMarkup = Array.from({ length: 5 }, (_, index) => {
        const starClass = review.rating > index ? "star--filled" : "star--empty";
        return `<img src="./img/star.svg" class="star ${starClass}" data-value="${index + 1
            }">`;
    }).join("");

    const avatar = `https://pizza112.srvsrv.net/static/images/Avatars/${review.authorAvatar}`;

    reviewsContainer.style.filter = "unset";

    reviewsContainer.innerHTML = `
        <li class="reviews-list__item">
            <ul class="review-list reviews-display-container">
                <li class="review-list__item">
                    <img src="${avatar}" alt="Аватар автора отзыва">
                </li>
                <li class="review-list__item">
                    <p class="review-author">${review.authorName}</p>
                    <div class="review-stars">
                        ${starsMarkup}
                    </div>
                    <p class="review-info">${review.text}</p>
                </li>
            </ul>
        </li>
    `;
}

function getReviews() {

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    fetch(url, options)
        .then((response) => {
            try {
                return response.json();
            } catch (error) {
                return [{}];
            }
        })
        .then((data) => {
            if (!data) return;
            reviews.push(...data);
            showReview();
        })
        .catch((error) => console.error("Ошибка:", error));
}

document.querySelector('.reviews img[src="./img/left.svg"]')
    .addEventListener("click", (event) => {
        event.preventDefault();
        currentReviewIndex--
        if (currentReviewIndex <= 0) {
            currentReviewIndex = reviews.length - 1;
        }
        showReview();
    });

document.querySelector('.reviews img[src="./img/right.svg"]')
    .addEventListener("click", (event) => {
        event.preventDefault();
        currentReviewIndex++
        if (currentReviewIndex > reviews.length - 1) currentReviewIndex = 0
        showReview();
    });

getReviews();
