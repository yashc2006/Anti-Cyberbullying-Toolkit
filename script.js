// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Mobile Navigation
const navLinks = document.querySelector('.nav-links');
const mobileMenuBtn = document.createElement('button');
mobileMenuBtn.className = 'mobile-menu-btn';
mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
mobileMenuBtn.setAttribute('aria-label', 'Toggle navigation menu');

document.querySelector('.logo').after(mobileMenuBtn);

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Testimonial Slider
if (document.querySelector('.slider')) {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    let autoSlideInterval;

    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    }

    // Event listeners for slider buttons
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });

        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });
    }

    // Auto-advance slider
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    startAutoSlide();
}

// Quiz functionality
if (document.getElementById('quiz-content')) {
    const quizContent = document.getElementById('quiz-content');
    const quizNextBtn = document.getElementById('quiz-next');
    const progressBar = document.getElementById('quiz-progress');

    const quizQuestions = [
        {
            question: "What is cyberbullying?",
            options: [
                "Using technology to harass, threaten, or target another person",
                "Playing online games",
                "Sending friendly messages",
                "Using social media"
            ],
            correct: 0
        },
        {
            question: "Which of these is a warning sign of cyberbullying?",
            options: [
                "Being happy after using devices",
                "Wanting to spend time online",
                "Suddenly avoiding devices or social media",
                "Sharing posts regularly"
            ],
            correct: 2
        },
        {
            question: "What should you do if you witness cyberbullying?",
            options: [
                "Ignore it",
                "Join in",
                "Share it with others",
                "Report it and support the victim"
            ],
            correct: 3
        },
        {
            question: "Which of these is NOT a safe online practice?",
            options: [
                "Using strong passwords",
                "Sharing personal information publicly",
                "Setting privacy settings",
                "Logging out of accounts"
            ],
            correct: 1
        },
        {
            question: "How can you protect yourself from cyberbullying?",
            options: [
                "Never use the internet",
                "Keep evidence of bullying messages",
                "Share your passwords with friends",
                "Use your real name and address online"
            ],
            correct: 1
        }
    ];

    let currentQuestion = -1;
    let score = 0;

    function showQuestion() {
        const question = quizQuestions[currentQuestion];
        quizContent.innerHTML = `
            <h3>${question.question}</h3>
            <div class="options">
                ${question.options.map((option, index) => `
                    <button class="btn option-btn" data-index="${index}">${option}</button>
                `).join('')}
            </div>
        `;

        // Update progress bar
        const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
        progressBar.style.setProperty('--progress', `${progress}%`);

        // Add click handlers to options
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', handleAnswer);
        });
    }

    function handleAnswer(e) {
        const selectedIndex = parseInt(e.target.dataset.index);
        const correct = selectedIndex === quizQuestions[currentQuestion].correct;

        // Disable all buttons
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.disabled = true;
            if (parseInt(btn.dataset.index) === quizQuestions[currentQuestion].correct) {
                btn.style.backgroundColor = '#4CAF50';
            }
        });

        if (correct) {
            score++;
            e.target.style.backgroundColor = '#4CAF50';
        } else {
            e.target.style.backgroundColor = '#f44336';
        }

        quizNextBtn.textContent = currentQuestion === quizQuestions.length - 1 ? 'Show Results' : 'Next Question';
        quizNextBtn.style.display = 'block';
    }

    function showResults() {
        const percentage = (score / quizQuestions.length) * 100;
        quizContent.innerHTML = `
            <h3>Quiz Complete!</h3>
            <p>You scored ${score} out of ${quizQuestions.length} (${percentage}%)</p>
            <div class="quiz-feedback">
                ${percentage >= 80 ? 
                    '<p class="success">Great job! You have a good understanding of cyberbullying prevention.</p>' :
                    '<p class="improvement">Keep learning! Review our resources to better understand cyberbullying prevention.</p>'
                }
            </div>
            <button class="btn" onclick="resetQuiz()">Try Again</button>
        `;
        progressBar.style.setProperty('--progress', '100%');
    }

    function resetQuiz() {
        currentQuestion = -1;
        score = 0;
        quizNextBtn.textContent = 'Start Quiz';
        quizNextBtn.style.display = 'block';
        progressBar.style.setProperty('--progress', '0%');
    }

    if (quizNextBtn) {
        quizNextBtn.addEventListener('click', () => {
            currentQuestion++;
            if (currentQuestion < quizQuestions.length) {
                showQuestion();
                quizNextBtn.style.display = 'none';
            } else {
                showResults();
            }
        });
    }
}

// Report Form Handling
const reportForm = document.getElementById('report-form');
if (reportForm) {
    reportForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            incidentType: document.getElementById('incident-type').value,
            platform: document.getElementById('platform').value,
            description: document.getElementById('description').value,
            date: document.getElementById('date').value,
            evidence: document.getElementById('evidence').files[0]
        };

        // Here you would typically send this data to a server
        // For demo purposes, we'll just show a success message
        alert('Thank you for your report. We will review it and take appropriate action.');
        reportForm.reset();
    });
}

// Story Form Handling
const storyForm = document.getElementById('story-form');
if (storyForm) {
    storyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value || 'Anonymous',
            role: document.getElementById('role').value,
            story: document.getElementById('story').value
        };

        // Here you would typically send this data to a server
        // For demo purposes, we'll just show a success message
        alert('Thank you for sharing your story! It will help others understand the impact of our toolkit.');
        storyForm.reset();
    });
}

// Download functionality
const downloadButtons = document.querySelectorAll('[id^="download-"]');
downloadButtons.forEach(button => {
    button.addEventListener('click', () => {
        // In a real application, this would trigger a PDF download
        // For demo purposes, we'll just show an alert
        alert('Download started! (In a real application, this would download the selected resource)');
    });
});