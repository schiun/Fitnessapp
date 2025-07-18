+// Workout Data
+const workoutData = {
+    push: {
+        name: "Push Day",
+        description: "Focus on pushing movements targeting chest, shoulders, and triceps",
+        duration: 45,
+        calories: 300,
+        exercises: [
+            {
+                name: "Push-ups",
+                sets: 3,
+                reps: "12-15",
+                duration: 90,
+                description: "Start in plank position, lower chest to ground, push back up. Keep core tight and body straight."
+            },
+            {
+                name: "Pike Push-ups",
+                sets: 3,
+                reps: "8-12",
+                duration: 90,
+                description: "In downward dog position, lower head towards hands, push back up. Great for shoulders."
+            },
+            {
+                name: "Tricep Dips",
+                sets: 3,
+                reps: "10-15",
+                duration: 90,
+                description: "Using chair or bench, lower body by bending elbows, push back up. Focus on triceps."
+            },
+            {
+                name: "Diamond Push-ups",
+                sets: 2,
+                reps: "6-10",
+                duration: 60,
+                description: "Hands in diamond shape, perform push-ups. Targets triceps more than regular push-ups."
+            },
+            {
+                name: "Wall Handstand Push-ups",
+                sets: 2,
+                reps: "5-8",
+                duration: 60,
+                description: "Against wall, lower head towards ground, push back up. Advanced shoulder exercise."
+            },
+            {
+                name: "Chest Squeeze",
+                sets: 3,
+                reps: "15-20",
+                duration: 60,
+                description: "Press palms together at chest level, hold for 2 seconds each rep. Isometric chest exercise."
+            },
+            {
+                name: "Plank to Push-up",
+                sets: 2,
+                reps: "8-12",
+                duration: 90,
+                description: "Start in plank, move to push-up position, perform push-up, return to plank."
+            }
+        ]
+    },
+    pull: {
+        name: "Pull Day",
+        description: "Focus on pulling movements targeting back, biceps, and rear delts",
+        duration: 45,
+        calories: 280,
+        exercises: [
+            {
+                name: "Pull-ups/Chin-ups",
+                sets: 3,
+                reps: "5-10",
+                duration: 120,
+                description: "Hang from bar, pull body up until chin over bar. Use assistance band if needed."
+            },
+            {
+                name: "Inverted Rows",
+                sets: 3,
+                reps: "10-15",
+                duration: 90,
+                description: "Under table/bar, pull chest to bar while body straight. Great back exercise."
+            },
+            {
+                name: "Superman",
+                sets: 3,
+                reps: "12-15",
+                duration: 60,
+                description: "Lie face down, lift chest and legs off ground simultaneously. Hold for 2 seconds."
+            },
+            {
+                name: "Reverse Fly",
+                sets: 3,
+                reps: "12-15",
+                duration: 60,
+                description: "Bend forward, arms out to sides, squeeze shoulder blades together. Use water bottles if needed."
+            },
+            {
+                name: "Pike Walks",
+                sets: 3,
+                reps: "8-10",
+                duration: 90,
+                description: "In push-up position, walk feet towards hands, then walk hands forward to return."
+            },
+            {
+                name: "Wall Angels",
+                sets: 3,
+                reps: "15-20",
+                duration: 60,
+                description: "Back against wall, move arms up and down like making snow angels. Focus on rear delts."
+            },
+            {
+                name: "Dead Hang",
+                sets: 3,
+                reps: "15-30s",
+                duration: 90,
+                description: "Hang from bar with straight arms. Build grip strength and stretch shoulders."
+            }
+        ]
+    },
+    legs: {
+        name: "Leg Day",
+        description: "Focus on lower body targeting quads, glutes, hamstrings, and calves",
+        duration: 45,
+        calories: 350,
+        exercises: [
+            {
+                name: "Bodyweight Squats",
+                sets: 3,
+                reps: "15-20",
+                duration: 90,
+                description: "Feet shoulder-width apart, lower hips back and down, keep knees behind toes."
+            },
+            {
+                name: "Lunges",
+                sets: 3,
+                reps: "10-12 each leg",
+                duration: 120,
+                description: "Step forward, lower back knee towards ground, push back to start. Alternate legs."
+            },
+            {
+                name: "Single-leg Glute Bridges",
+                sets: 3,
+                reps: "10-12 each leg",
+                duration: 90,
+                description: "Lie on back, one foot on ground, lift hips up squeezing glutes. Switch legs."
+            },
+            {
+                name: "Calf Raises",
+                sets: 3,
+                reps: "15-20",
+                duration: 60,
+                description: "Rise up on toes, hold briefly, lower slowly. Can do single-leg for more difficulty."
+            },
+            {
+                name: "Wall Sit",
+                sets: 3,
+                reps: "30-45s",
+                duration: 90,
+                description: "Back against wall, slide down to sitting position, hold. Thighs parallel to ground."
+            },
+            {
+                name: "Jump Squats",
+                sets: 3,
+                reps: "10-15",
+                duration: 90,
+                description: "Perform squat, then jump up explosively, land softly and repeat. High intensity."
+            },
+            {
+                name: "Bulgarian Split Squats",
+                sets: 2,
+                reps: "8-10 each leg",
+                duration: 120,
+                description: "Back foot elevated, lower into lunge position, push back up. Advanced exercise."
+            },
+            {
+                name: "Single-leg Calf Raises",
+                sets: 2,
+                reps: "10-12 each leg",
+                duration: 60,
+                description: "Rise up on one toe, hold briefly, lower slowly. Switch legs."
+            }
+        ]
+    }
+};
+
+// App State
+let currentWorkout = null;
+let currentExerciseIndex = 0;
+let completedExercises = [];
+let timer = {
+    minutes: 0,
+    seconds: 0,
+    isRunning: false,
+    interval: null
+};
+
+// DOM Elements
+const workoutCards = document.querySelectorAll('.workout-card');
+const workoutDetails = document.getElementById('workout-details');
+const workoutSelection = document.querySelector('.workout-selection');
+const backBtn = document.getElementById('back-btn');
+const workoutTitle = document.getElementById('workout-title');
+const exercisesList = document.getElementById('exercises-list');
+const progressFill = document.getElementById('progress-fill');
+const progressText = document.getElementById('progress-text');
+const timerMinutes = document.getElementById('timer-minutes');
+const timerSeconds = document.getElementById('timer-seconds');
+const startPauseBtn = document.getElementById('start-pause-btn');
+const resetBtn = document.getElementById('reset-btn');
+const completeWorkoutBtn = document.getElementById('complete-workout');
+const dailyWorkout = document.getElementById('daily-workout');
+
+// Stats Elements
+const workoutsCompletedEl = document.getElementById('workouts-completed');
+const caloriesBurnedEl = document.getElementById('calories-burned');
+const totalTimeEl = document.getElementById('total-time');
+const currentStreakEl = document.getElementById('current-streak');
+
+// Initialize App
+document.addEventListener('DOMContentLoaded', function() {
+    loadStats();
+    setDailyRecommendation();
+    setupEventListeners();
+    registerServiceWorker();
+    
+    // Handle URL parameters for shortcuts
+    const urlParams = new URLSearchParams(window.location.search);
+    const workout = urlParams.get('workout');
+    if (workout && workoutData[workout]) {
+        startWorkout(workout);
+    }
+});
+
+// Register Service Worker for PWA functionality
+function registerServiceWorker() {
+    if ('serviceWorker' in navigator) {
+        window.addEventListener('load', function() {
+            navigator.serviceWorker.register('/sw.js')
+                .then(function(registration) {
+                    console.log('SW registered: ', registration);
+                })
+                .catch(function(registrationError) {
+                    console.log('SW registration failed: ', registrationError);
+                });
+        });
+    }
+}
+
+// Event Listeners
+function setupEventListeners() {
+    // Workout card clicks
+    workoutCards.forEach(card => {
+        card.addEventListener('click', () => {
+            const workoutType = card.dataset.type;
+            startWorkout(workoutType);
+        });
+    });
+
+    // Back button
+    backBtn.addEventListener('click', () => {
+        showWorkoutSelection();
+    });
+
+    // Timer controls
+    startPauseBtn.addEventListener('click', toggleTimer);
+    resetBtn.addEventListener('click', resetTimer);
+
+    // Complete workout
+    completeWorkoutBtn.addEventListener('click', completeWorkout);
+}
+
+// Set Daily Recommendation
+function setDailyRecommendation() {
+    const today = new Date();
+    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
+    
+    let recommendedType;
+    let message;
+    
+    switch (dayOfWeek % 3) {
+        case 0:
+            recommendedType = 'push';
+            message = 'Today is perfect for building upper body strength! Focus on your chest, shoulders, and triceps with our push workout.';
+            break;
+        case 1:
+            recommendedType = 'pull';
+            message = 'Time to work that back and biceps! Our pull workout will help you build a strong, balanced physique.';
+            break;
+        case 2:
+            recommendedType = 'legs';
+            message = 'Never skip leg day! Strengthen your foundation with our comprehensive lower body workout.';
+            break;
+    }
+    
+    const workout = workoutData[recommendedType];
+    dailyWorkout.innerHTML = `
+        <div class="recommended-workout-content">
+            <h4>${workout.name}</h4>
+            <p>${message}</p>
+            <div class="workout-stats">
+                <span><i class="fas fa-clock"></i> ${workout.duration} minutes</span>
+                <span><i class="fas fa-fire"></i> ~${workout.calories} calories</span>
+                <span><i class="fas fa-dumbbell"></i> ${workout.exercises.length} exercises</span>
+            </div>
+            <button class="action-btn" onclick="startWorkout('${recommendedType}')" style="margin-top: 15px; padding: 12px 25px; font-size: 0.9rem;">
+                <i class="fas fa-play"></i> Start Today's Workout
+            </button>
+        </div>
+    `;
+}
+
+// Start Workout
+function startWorkout(type) {
+    currentWorkout = workoutData[type];
+    currentExerciseIndex = 0;
+    completedExercises = [];
+    
+    workoutTitle.textContent = currentWorkout.name;
+    renderExercises();
+    updateProgress();
+    resetTimer();
+    
+    workoutSelection.style.display = 'none';
+    workoutDetails.style.display = 'block';
+    
+    // Scroll to top
+    workoutDetails.scrollIntoView({ behavior: 'smooth' });
+}
+
+// Show Workout Selection
+function showWorkoutSelection() {
+    workoutSelection.style.display = 'block';
+    workoutDetails.style.display = 'none';
+    resetTimer();
+}
+
+// Render Exercises
+function renderExercises() {
+    exercisesList.innerHTML = '';
+    
+    currentWorkout.exercises.forEach((exercise, index) => {
+        const exerciseElement = document.createElement('div');
+        exerciseElement.className = `exercise-item ${completedExercises.includes(index) ? 'completed' : ''}`;
+        
+        exerciseElement.innerHTML = `
+            <div class="exercise-header">
+                <h3 class="exercise-name">${exercise.name}</h3>
+                <button class="exercise-complete-btn" onclick="completeExercise(${index})" 
+                        ${completedExercises.includes(index) ? 'disabled' : ''}>
+                    <i class="fas fa-check"></i> ${completedExercises.includes(index) ? 'Completed' : 'Complete'}
+                </button>
+            </div>
+            <div class="exercise-details">
+                <div class="exercise-stat">
+                    <div class="exercise-stat-label">Sets</div>
+                    <div class="exercise-stat-value">${exercise.sets}</div>
+                </div>
+                <div class="exercise-stat">
+                    <div class="exercise-stat-label">Reps</div>
+                    <div class="exercise-stat-value">${exercise.reps}</div>
+                </div>
+                <div class="exercise-stat">
+                    <div class="exercise-stat-label">Duration</div>
+                    <div class="exercise-stat-value">${exercise.duration}s</div>
+                </div>
+            </div>
+            <div class="exercise-description">
+                ${exercise.description}
+            </div>
+        `;
+        
+        exercisesList.appendChild(exerciseElement);
+    });
+}
+
+// Complete Exercise
+function completeExercise(index) {
+    if (!completedExercises.includes(index)) {
+        completedExercises.push(index);
+        renderExercises();
+        updateProgress();
+        
+        // Auto-start timer if not running
+        if (!timer.isRunning && completedExercises.length === 1) {
+            toggleTimer();
+        }
+    }
+}
+
+// Update Progress
+function updateProgress() {
+    const totalExercises = currentWorkout.exercises.length;
+    const completed = completedExercises.length;
+    const percentage = (completed / totalExercises) * 100;
+    
+    progressFill.style.width = `${percentage}%`;
+    progressText.textContent = `${completed} / ${totalExercises}`;
+}
+
+// Timer Functions
+function toggleTimer() {
+    if (timer.isRunning) {
+        pauseTimer();
+    } else {
+        startTimer();
+    }
+}
+
+function startTimer() {
+    timer.isRunning = true;
+    startPauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
+    
+    timer.interval = setInterval(() => {
+        timer.seconds++;
+        if (timer.seconds >= 60) {
+            timer.seconds = 0;
+            timer.minutes++;
+        }
+        updateTimerDisplay();
+    }, 1000);
+}
+
+function pauseTimer() {
+    timer.isRunning = false;
+    startPauseBtn.innerHTML = '<i class="fas fa-play"></i> Resume';
+    clearInterval(timer.interval);
+}
+
+function resetTimer() {
+    timer.isRunning = false;
+    timer.minutes = 0;
+    timer.seconds = 0;
+    startPauseBtn.innerHTML = '<i class="fas fa-play"></i> Start';
+    clearInterval(timer.interval);
+    updateTimerDisplay();
+}
+
+function updateTimerDisplay() {
+    timerMinutes.textContent = timer.minutes.toString().padStart(2, '0');
+    timerSeconds.textContent = timer.seconds.toString().padStart(2, '0');
+}
+
+// Complete Workout
+function completeWorkout() {
+    if (completedExercises.length < currentWorkout.exercises.length) {
+        if (!confirm('You haven\'t completed all exercises. Are you sure you want to finish?')) {
+            return;
+        }
+    }
+    
+    pauseTimer();
+    
+    // Calculate stats
+    const workoutTime = timer.minutes + (timer.seconds / 60);
+    const caloriesEstimate = Math.round((completedExercises.length / currentWorkout.exercises.length) * currentWorkout.calories);
+    
+    // Update stats
+    updateStats(workoutTime, caloriesEstimate);
+    
+    // Show completion message
+    alert(`🎉 Workout Complete!\n\nTime: ${timer.minutes}:${timer.seconds.toString().padStart(2, '0')}\nExercises: ${completedExercises.length}/${currentWorkout.exercises.length}\nEstimated Calories: ${caloriesEstimate}\n\nGreat job! Keep up the consistency!`);
+    
+    // Return to main screen
+    showWorkoutSelection();
+}
+
+// Stats Functions
+function loadStats() {
+    const stats = JSON.parse(localStorage.getItem('fitDailyStats')) || {
+        workoutsCompleted: 0,
+        totalCalories: 0,
+        totalMinutes: 0,
+        currentStreak: 0,
+        lastWorkoutDate: null
+    };
+    
+    workoutsCompletedEl.textContent = stats.workoutsCompleted;
+    caloriesBurnedEl.textContent = stats.totalCalories;
+    totalTimeEl.textContent = Math.round(stats.totalMinutes);
+    currentStreakEl.textContent = stats.currentStreak;
+}
+
+function updateStats(minutes, calories) {
+    let stats = JSON.parse(localStorage.getItem('fitDailyStats')) || {
+        workoutsCompleted: 0,
+        totalCalories: 0,
+        totalMinutes: 0,
+        currentStreak: 0,
+        lastWorkoutDate: null
+    };
+    
+    const today = new Date().toDateString();
+    const lastWorkout = stats.lastWorkoutDate;
+    
+    // Update basic stats
+    stats.workoutsCompleted++;
+    stats.totalCalories += calories;
+    stats.totalMinutes += minutes;
+    
+    // Update streak
+    if (lastWorkout === today) {
+        // Already worked out today, don't change streak
+    } else if (lastWorkout) {
+        const lastDate = new Date(lastWorkout);
+        const todayDate = new Date();
+        const timeDiff = todayDate.getTime() - lastDate.getTime();
+        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
+        
+        if (daysDiff === 1) {
+            // Consecutive day
+            stats.currentStreak++;
+        } else {
+            // Streak broken
+            stats.currentStreak = 1;
+        }
+    } else {
+        // First workout
+        stats.currentStreak = 1;
+    }
+    
+    stats.lastWorkoutDate = today;
+    
+    localStorage.setItem('fitDailyStats', JSON.stringify(stats));
+    loadStats();
+}
+
+// Utility Functions
+function formatTime(seconds) {
+    const minutes = Math.floor(seconds / 60);
+    const remainingSeconds = seconds % 60;
+    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
+}
+
+// Add some motivational features
+function getMotivationalMessage() {
+    const messages = [
+        "Every rep counts! 💪",
+        "You're stronger than yesterday! 🔥",
+        "Consistency is key! 🗝️",
+        "Your body can do it. It's your mind you need to convince! 🧠",
+        "The only bad workout is the one that didn't happen! ✅",
+        "Strong is the new beautiful! 💎",
+        "Push yourself because no one else is going to do it for you! 🚀",
+        "Your only limit is you! 🌟"
+    ];
+    
+    return messages[Math.floor(Math.random() * messages.length)];
+}
+
+// Add keyboard shortcuts
+document.addEventListener('keydown', function(e) {
+    // Space bar to start/pause timer
+    if (e.code === 'Space' && workoutDetails.style.display !== 'none') {
+        e.preventDefault();
+        toggleTimer();
+    }
+    
+    // Escape to go back
+    if (e.code === 'Escape' && workoutDetails.style.display !== 'none') {
+        showWorkoutSelection();
+    }
+});
+
+// Add notification support for rest periods
+function startRestTimer(duration) {
+    let restTime = duration;
+    const restInterval = setInterval(() => {
+        restTime--;
+        if (restTime <= 0) {
+            clearInterval(restInterval);
+            // Show notification or alert
+            if ('Notification' in window && Notification.permission === 'granted') {
+                new Notification('Rest period over!', {
+                    body: 'Time for your next set!',
+                    icon: '/favicon.ico'
+                });
+            }
+        }
+    }, 1000);
+}
+
+// Request notification permission on load
+if ('Notification' in window && Notification.permission === 'default') {
+    Notification.requestPermission();
+}
EOF
)
