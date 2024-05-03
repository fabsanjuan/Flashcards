// Initialize cache object for topic selection.
const flashcardsCache = {};

document.addEventListener('DOMContentLoaded', () => {
    // Current topic.
    let currentTopic = '';
    // URL parameter.
    const urlParams = new URLSearchParams(window.location.search);
    const topic = urlParams.get('topic');
    if (topic) {
        fetchFlashcards(topic)
        currentTopic = topic;
    }

    // Mobile hamburger menu.
    const hamburger = document.querySelector('.hamburger-menu');
    const line1 = document.getElementById('hamburger-line1');
    const line2 = document.getElementById('hamburger-line2');
    const line3 = document.getElementById('hamburger-line3');
    const navUL = document.querySelector('.top-nav-left nav ul');
    const navLinks = document.querySelectorAll('.nav-links');

    hamburger.addEventListener('click', () => {
        navUL.classList.toggle('active');
        line1.classList.toggle('active');
        line2.classList.toggle('active');
        line3.classList.toggle('active');
    })
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navUL.classList.contains('active')) {
                navUL.classList.toggle('active');
                line1.classList.toggle('active');
                line2.classList.toggle('active');
                line3.classList.toggle('active');
            }
        })
    })

    // Flashcard variables.
    const flashcardContainer = document.querySelector('.flashcard')
    const questionContainer = document.querySelector('.front p');
    const answerContainer = document.querySelector('.back p');
    let currentCard = 0;

    // Fetch flashcard content from storage.
    function fetchFlashcards(topic) {
        if (flashcardsCache[topic]) {
            console.log(`Loading ${topic} from cache`);
            showCurrentCard(flashcardsCache[topic][currentCard]);
            currentTopic = topic;
            return;
        }
        const filePath = `../assets/flashcards/${topic}.json`;
        fetch(filePath)
        .then(response => response.json())
        .then(flashcards => {
            console.log(`Fetched ${topic} flashcards`);
            flashcardsCache[topic] = flashcards;
            currentTopic = topic;
            showCurrentCard(flashcards[currentCard]);
        })
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
                console.log(img.src);
                img.alt = 'Flashcard image answer';
                answerContainer.appendChild(img);
            }
        }, 90);
    }
    
    // Event listener for next and previous buttons.
    document.getElementById('next').addEventListener('click', () => {
            if (currentCard < flashcardsCache[currentTopic].length) {
                currentCard++;
                console.log(currentCard);
                showCurrentCard(flashcardsCache[currentTopic][currentCard]);
            } else {
                currentCard = 0;
                showCurrentCard(flashcardsCache[currentTopic][currentCard]);
            }
    })
    document.getElementById('prev').addEventListener('click', () => {
            if (currentCard > 0) {
                currentCard--;
                console.log(currentCard);
                showCurrentCard(flashcardsCache[currentTopic][currentCard]);
            } else {
                currentCard = flashcardsCache[currentTopic].length - 1;
                showCurrentCard(flashcardsCache[currentTopic][currentCard]);
            }
    })

    // Flip functionality.
    flashcardContainer.addEventListener('click', () => {
        flashcardContainer.classList.toggle('flipped');
    })

    // Topic selector buttons.
    const topicButtons = document.querySelectorAll('.topic-btn');

    topicButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            let target = e.target;
            while (target != null && !target.classList.contains('topic-btn')) { // Pretty cool trick.
                target = target.parentElement;
            }
            if (target != null) {
                const topic = target.getAttribute('data-topic');
                console.log(topic);
                fetchFlashcards(topic);
            }

        })
    })
})


//TODO: create carousel for the topic selection.
// const prevBtn = document.getElementById('prevBtn');
//    const nextBtn = document.getElementById('nextBtn');
//    const slide = document.querySelector('#work-experience .carousel-slide');
//    const cards = document.querySelectorAll('#work-experience .card');
//    let windowWidth = window.innerWidth;
//    let carouselCounter = 0;
//    let totalSwipes = 0;
//    const carouselSize = cards[0].clientWidth + 16; // Card width + margin-right.

//    // size of window determines increments of carousel counter.
//    nextBtn.addEventListener('click', () => {
//     if (totalSwipes >= cards.length - 1) {
//         return;
//     } 
//     slide.style.transition = "transform  0.5s ease-in-out";
//     carouselCounter++;
//     slide.style.transform = "translateX(" + (-carouselSize * carouselCounter) + "px)";
//     // console.log(-carouselSize * carouselCounter);
//     // console.log(totalSwipes);
//     if (windowWidth >= 1275) { 
//         totalSwipes += 2;
//     } else if (windowWidth >= 960) {
//         totalSwipes += 1.5;
//     } else {
//         totalSwipes++;
//     }
//    })

//    prevBtn.addEventListener('click', () => {
//     if (totalSwipes <= 0) return;
//     slide.style.transition = 'transform 0.5s ease-in-out';
//     carouselCounter--;
//     slide.style.transform = 'translateX(' + (-carouselSize * carouselCounter) + 'px)';
//     if (windowWidth >= 1275) { 
//         totalSwipes += -2;
//     } else if (windowWidth >= 960) {
//         totalSwipes += -1.5;
//     } else {
//         totalSwipes--;
//     }
//    })


/*

<div class="controller">
                    <!-- <div class="autoplay">
                        <img src="../assets/play_button.png" alt="play-button">
                    </div> -->
                    <div class="next-back"></div>
                    <div class="shuffle"></div>
                </div>

*/
