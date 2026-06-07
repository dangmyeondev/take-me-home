const clock = document.getElementById("clock");
const progressBg = document.getElementById("progressBg");
const progressBarFill = document.getElementById("progressBarFill");
const progressText = document.getElementById("progressText");

const targetDate = new Date("2027-12-07");
const startDate = new Date("2024-06-07");
const totalTime = targetDate.getTime() - startDate.getTime();

const calculate = (dday) => {
    const now = new Date();
    const gap = dday.getTime() - now.getTime();

    const day = Math.floor(gap / (1000 * 60 * 60 * 24));
    const hours = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((gap % (1000 * 60)) / 1000);

    return { day, hours, minutes, seconds };
};

const calculateProgress = () => {
    const now = new Date();
    const elapsed = now.getTime() - startDate.getTime();
    const progress = Math.max(0, Math.min(1, elapsed / totalTime));
    return progress;
};

let lastValues = { day: -1, hours: -1, minutes: -1, seconds: -1 };

const render = () => {
    const { day, hours, minutes, seconds } = calculate(targetDate);
    const progress = calculateProgress();

    // Update progress background - 아래부터 차오름
    const clipTop = ((1 - progress) * 100).toFixed(1);
    progressBg.style.setProperty('--clip-top', clipTop + '%');
    
    // Update progress bar fill
    const progressPercent = (progress * 100).toFixed(1);
    progressBarFill.style.width = progressPercent + '%';
    progressText.textContent = progressPercent + '%';

    // Format with leading zeros
    const formatNumber = (num) => String(num).padStart(2, '0');

    // Check if values changed
    const hasChanged = 
        lastValues.day !== day || 
        lastValues.hours !== hours || 
        lastValues.minutes !== minutes || 
        lastValues.seconds !== seconds;

    if (hasChanged) {
        lastValues = { day, hours, minutes, seconds };
        
        // Create HTML with animation key to trigger animation
        const key = Date.now();
        clock.innerHTML = `
            <span class="countdown-item">
                <span class="countdown-number">
                    <span class="number-slide" key="${key}-day">${formatNumber(day)}</span>
                </span>
                <span class="countdown-label">일</span>
            </span>
            <span class="countdown-item">
                <span class="countdown-number">
                    <span class="number-slide" key="${key}-hours">${formatNumber(hours)}</span>
                </span>
                <span class="countdown-label">시간</span>
            </span>
            <span class="countdown-item">
                <span class="countdown-number">
                    <span class="number-slide" key="${key}-minutes">${formatNumber(minutes)}</span>
                </span>
                <span class="countdown-label">분</span>
            </span>
            <span class="countdown-item">
                <span class="countdown-number">
                    <span class="number-slide" key="${key}-seconds">${formatNumber(seconds)}</span>
                </span>
                <span class="countdown-label">초</span>
            </span>
        `;
    }
};

// Initial render
render();

// Update every 100ms for smooth animation
setInterval(render, 100);