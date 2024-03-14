document.addEventListener('DOMContentLoaded', () => {
    const flashcards = document.querySelectorAll('.flashcard');
    let currentCard = 0;

    function showCurrentCard() {
        flashcards.forEach((card, index) => {
            if (index === currentCard) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }
    showCurrentCard();

    // Event listener for buttons
    document.getElementById('next').addEventListener('click', () => {
        if (currentCard < flashcards.length) {
            currentCard++;
            console.log(currentCard);
            showCurrentCard();
        }
    })
    document.getElementById('prev').addEventListener('click', () => {
        if (currentCard > 0) {
            currentCard--;
            console.log(currentCard);
            showCurrentCard();
        }
    })

    // Flip functionality.
    flashcards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        })
    })
})

/*

<div class="controller">
                    <!-- <div class="autoplay">
                        <img src="../assets/play_button.png" alt="play-button">
                    </div> -->
                    <div class="next-back"></div>
                    <div class="shuffle"></div>
                </div>

*/

