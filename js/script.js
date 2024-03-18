document.addEventListener('DOMContentLoaded', () => {
    const flashcardContainer = document.querySelector('.flashcard')
    const questionContainer = document.querySelector('.front p');
    const answerContainer = document.querySelector('.back p');
    let currentCard = 0;

    // Fetch flashcard content from storage.
    function fetchFlashcards() {
        return fetch('../assets/flashcards/science.json')
        .then(response => response.json())
        .catch(error => console.error('Fetching flashcards failed:', error));
    }

    // Display the current card.
    function showCurrentCard(flashcard) {
        flashcardContainer.classList.remove('flipped');

        // Delay addition of new content until after card flips.
        setTimeout(() => {
            questionContainer.textContent = flashcard.question;
            answerContainer.textContent = '';

            if (flashcard.answerType === 'text') {
                answerContainer.textContent = flashcard.answer;
            } else if (flashcard.answerType === 'image') {
                const img = document.createElement('img');
                img.src = flashcard.answer;
                img.alt = 'Flashcard image answer';
                answerContainer.appendChild(img);
            }
        }, 90);
    }
    fetchFlashcards().then(flashcards => {
        showCurrentCard(flashcards[currentCard]);
    })
    
    // Event listener for next and previous buttons.
    document.getElementById('next').addEventListener('click', () => {
        fetchFlashcards().then(flashcards => {
            if (currentCard < flashcards.length) {
                currentCard++;
                console.log(currentCard);
                showCurrentCard(flashcards[currentCard]);
            } else {
                currentCard = 0;
                showCurrentCard(flashcards[currentCard]);
            }
        })
    })
    document.getElementById('prev').addEventListener('click', () => {
        fetchFlashcards().then(flashcards => {
            if (currentCard > 0) {
                currentCard--;
                console.log(currentCard);
                showCurrentCard(flashcards[currentCard]);
            } else {
                currentCard = flashcards.length - 1;
                showCurrentCard(flashcards[currentCard]);
            }
        })
    })

    // Flip functionality.
    flashcardContainer.addEventListener('click', () => {
        flashcardContainer.classList.toggle('flipped');
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
