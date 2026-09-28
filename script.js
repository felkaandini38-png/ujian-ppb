/* ================================
   RPL ONLINE EXAM - MAIN SCRIPT
   SMK Negeri 1 Lintau Buo
   
   FIX: Auto-stop tidak terpicu palsu
   - Grace period 3 detik setelah start
   - Debounce blur 1500ms
   - Verifikasi ganda
   ================================ */

// ============ KONFIGURASI UJIAN ============
const examConfig = {
    title: "Ujian Online RPL",
    school: "SMK Negeri 1 Lintau Buo",
    subject: "Pemrograman Perangkat Bergerak",
    className: "XII RPL",
    timePerQuestion: 3,
    pointsPerQuestion: 4,
    totalQuestions: 25,
    shuffleQuestions: true,
    teacherWA: "628xxxxxxxxx",
    teacherName: "Guru RPL"
};

// ============ STATE ============
let currentQuestion = 0;
let answers = {};
let examStartTime = null;
let questionTimerInterval = null;
let questionRemainingTime = examConfig.timePerQuestion * 60;
let examActive = false;
let shuffledOrder = [];

// 🛡️ ANTI-FALSE-TRIGGER
let isStartingExam = false;        // Flag saat proses start
let gracePeriodTimeout = null;     // Timeout grace period
let blurDebounceTimeout = null;    // Debounce untuk blur
let isInGracePeriod = false;       // Status grace period aktif

// ============ INISIALISASI ============
document.addEventListener('DOMContentLoaded', () => {
    checkExamStatus();
    setupSecurity();
});

function checkExamStatus() {
    const completed = localStorage.getItem('examCompleted');
    if (completed === 'true') {
        showCompletedScreen();
    } else {
        const started = localStorage.getItem('examStarted');
        if (started === 'true') {
            restoreExam();
        } else {
            showScreen('screen-opening');
        }
    }
}

// ============ NAVIGASI SCREEN ============
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    window.scrollTo(0, 0);
}

// ============ LOGIN ============
function submitLogin(event) {
    event.preventDefault();
    
    const name = document.getElementById('studentName').value.trim();
    const kelas = document.getElementById('studentClass').value.trim();
    const number = document.getElementById('studentNumber').value.trim();
    const nis = document.getElementById('studentNIS').value.trim();
    
    if (!name || !kelas || !number || !nis) {
        alert('Mohon lengkapi semua data!');
        return;
    }
    
    localStorage.setItem('studentName', name);
    localStorage.setItem('studentClass', kelas);
    localStorage.setItem('studentNumber', number);
    localStorage.setItem('studentNIS', nis);
    
    showScreen('screen-instruction');
}

// ============ ACAK SOAL ============
function generateShuffledOrder() {
    let order = [];
    for (let i = 0; i < questions.length; i++) {
        order.push(i);
    }
    for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
    }
    return order;
}

function getQuestionIndex(displayPosition) {
    if (examConfig.shuffleQuestions && shuffledOrder.length > 0) {
        return shuffledOrder[displayPosition];
    }
    return displayPosition;
}

// ============ KONFIRMASI MULAI ============
function confirmStart() {
    // 🛡️ Aktifkan flag STARTING sebelum confirm
    isStartingExam = true;
    
    if (!confirm('PERINGATAN:\n\nJika Anda keluar dari halaman ujian (pindah tab, minimize, buka aplikasi lain), ujian akan OTOMATIS BERHENTI dan dikumpulkan.\n\nLanjutkan?')) {
        isStartingExam = false;
        return;
    }
    
    startExam();
}

function startExam() {
    examStartTime = Date.now();
    examActive = true;
    currentQuestion = 0;
    answers = {};
    questionRemainingTime = examConfig.timePerQuestion * 60;
    
    if (examConfig.shuffleQuestions) {
        shuffledOrder = generateShuffledOrder();
        localStorage.setItem('shuffledOrder', JSON.stringify(shuffledOrder));
    } else {
        shuffledOrder = [];
        localStorage.removeItem('shuffledOrder');
    }
    
    localStorage.setItem('examStarted', 'true');
    localStorage.setItem('examStartTime', examStartTime.toString());
    localStorage.setItem('currentQuestion', '0');
    localStorage.setItem('answers', JSON.stringify(answers));
    localStorage.setItem('questionStartTime', Date.now().toString());
    localStorage.setItem('questionTimeLeft', questionRemainingTime.toString());
    
    showScreen('screen-exam');
    renderQuestion();
    renderGrid();
    startQuestionTimer();
    
    // 🛡️ GRACE PERIOD: 3 detik pertama abaikan event blur/visibility
    isInGracePeriod = true;
    if (gracePeriodTimeout) clearTimeout(gracePeriodTimeout);
    gracePeriodTimeout = setTimeout(() => {
        isInGracePeriod = false;
        isStartingExam = false;
    }, 3000);
}

// ============ TIMER PER SOAL ============
function startQuestionTimer() {
    updateQuestionTimerDisplay();
    
    if (questionTimerInterval) clearInterval(questionTimerInterval);
    
    questionTimerInterval = setInterval(() => {
        const qStartTime = parseInt(localStorage.getItem('questionStartTime'));
        const elapsed = Math.floor((Date.now() - qStartTime) / 1000);
        const totalTime = examConfig.timePerQuestion * 60;
        questionRemainingTime = Math.max(0, totalTime - elapsed);
        
        localStorage.setItem('questionTimeLeft', questionRemainingTime.toString());
        updateQuestionTimerDisplay();
        
        if (questionRemainingTime <= 0) {
            clearInterval(questionTimerInterval);
            handleTimeUp();
        }
    }, 1000);
}

function updateQuestionTimerDisplay() {
    const minutes = Math.floor(questionRemainingTime / 60);
    const seconds = questionRemainingTime % 60;
    const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    document.getElementById('timer-display').textContent = display;
    document.getElementById('qtimer-text').textContent = display;
    document.getElementById('qtimer-number').textContent = currentQuestion + 1;
    
    const totalTime = examConfig.timePerQuestion * 60;
    const percent = (questionRemainingTime / totalTime) * 100;
    const fill = document.getElementById('qtimer-fill');
    fill.style.width = percent + '%';
    
    const timerBox = document.getElementById('timer-box');
    timerBox.classList.remove('warning', 'danger');
    fill.classList.remove('warning', 'danger');
    
    if (questionRemainingTime <= 30) {
        timerBox.classList.add('danger');
        fill.classList.add('danger');
    } else if (questionRemainingTime <= 60) {
        timerBox.classList.add('warning');
        fill.classList.add('warning');
    }
}

function handleTimeUp() {
    if (currentQuestion < questions.length - 1) {
        showTimeUpModal('Waktu 3 menit untuk soal ini telah habis. Lanjut ke soal berikutnya.');
        setTimeout(() => {
            nextQuestion();
        }, 100);
    } else {
        showTimeUpModal('Waktu habis! Ujian akan dikumpulkan otomatis.');
        setTimeout(() => {
            submitExam(true, 'Waktu soal terakhir habis');
        }, 100);
    }
}

function resetQuestionTimer() {
    const now = Date.now();
    localStorage.setItem('questionStartTime', now.toString());
    questionRemainingTime = examConfig.timePerQuestion * 60;
    localStorage.setItem('questionTimeLeft', questionRemainingTime.toString());
    
    if (questionTimerInterval) clearInterval(questionTimerInterval);
    startQuestionTimer();
}

// ============ RENDER SOAL ============
function renderQuestion() {
    const actualIndex = getQuestionIndex(currentQuestion);
    const q = questions[actualIndex];
    
    document.getElementById('question-number').textContent = `SOAL ${currentQuestion + 1}`;
    document.getElementById('question-text').innerHTML = formatQuestionText(q.question);
    
    const optionsList = document.getElementById('options-list');
    optionsList.innerHTML = '';
    
    const letters = ['A', 'B', 'C', 'D', 'E'];
    
    q.options.forEach((opt, idx) => {
        const div = document.createElement('div');
        div.className = 'option-item';
        if (answers[currentQuestion] === idx) {
            div.classList.add('selected');
        }
        div.innerHTML = `
            <div class="option-letter">${letters[idx]}</div>
            <div class="option-text">${formatOptionText(opt)}</div>
        `;
        div.addEventListener('click', () => selectOption(idx));
        optionsList.appendChild(div);
    });
    
    updateProgress();
    updateGrid();
    updateNavButtons();
}

function formatQuestionText(text) {
    return text.replace(/```([\s\S]*?)```/g, '<pre>$1</pre>')
               .replace(/`([^`]+)`/g, '<code>$1</code>');
}

function formatOptionText(text) {
    return text.replace(/`([^`]+)`/g, '<code>$1</code>');
}

function selectOption(idx) {
    answers[currentQuestion] = idx;
    localStorage.setItem('answers', JSON.stringify(answers));
    renderQuestion();
}

// ============ NAVIGASI SOAL ============
function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        localStorage.setItem('currentQuestion', currentQuestion.toString());
        resetQuestionTimer();
        renderQuestion();
        window.scrollTo(0, 0);
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        localStorage.setItem('currentQuestion', currentQuestion.toString());
        resetQuestionTimer();
        renderQuestion();
        window.scrollTo(0, 0);
    }
}

function goToQuestion(idx) {
    currentQuestion = idx;
    localStorage.setItem('currentQuestion', currentQuestion.toString());
    resetQuestionTimer();
    renderQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateNavButtons() {
    document.getElementById('btn-prev').disabled = currentQuestion === 0;
    const btnNext = document.getElementById('btn-next');
    if (currentQuestion === questions.length - 1) {
        btnNext.textContent = 'Soal Terakhir';
        btnNext.disabled = true;
    } else {
        btnNext.textContent = 'Selanjutnya →';
        btnNext.disabled = false;
    }
}

// ============ PROGRESS ============
function updateProgress() {
    const answered = Object.keys(answers).length;
    const total = questions.length;
    const percent = Math.round((answered / total) * 100);
    
    document.getElementById('progress-text').textContent = `Soal ${currentQuestion + 1} dari ${total}`;
    document.getElementById('progress-percent').textContent = `${percent}%`;
    document.getElementById('progress-fill').style.width = `${percent}%`;
    document.getElementById('stat-answered').textContent = answered;
    document.getElementById('stat-remain').textContent = total - answered;
}

// ============ GRID ============
function renderGrid() {
    const grid = document.getElementById('question-grid');
    grid.innerHTML = '';
    
    for (let i = 0; i < questions.length; i++) {
        const item = document.createElement('div');
        item.className = 'grid-item';
        item.textContent = String(i + 1).padStart(2, '0');
        item.addEventListener('click', () => goToQuestion(i));
        grid.appendChild(item);
    }
    updateGrid();
}

function updateGrid() {
    const items = document.querySelectorAll('.grid-item');
    items.forEach((item, idx) => {
        item.classList.remove('active', 'answered');
        if (idx === currentQuestion) item.classList.add('active');
        if (answers[idx] !== undefined) item.classList.add('answered');
    });
}

// ============ SUBMIT ============
function confirmSubmit() {
    const answered = Object.keys(answers).length;
    const total = questions.length;
    const remaining = total - answered;
    
    document.getElementById('modal-info').innerHTML = 
        `Anda masih memiliki <strong>${remaining} soal</strong> belum dijawab.`;
    
    document.getElementById('modal-confirm').classList.add('active');
}

function closeModal() {
    document.getElementById('modal-confirm').classList.remove('active');
}

function submitExam(autoSubmit = false, status = 'Selesai') {
    closeModal();
    
    if (questionTimerInterval) clearInterval(questionTimerInterval);
    examActive = false;
    
    let correct = 0;
    let wrong = 0;
    let empty = 0;
    
    for (let i = 0; i < questions.length; i++) {
        const actualIndex = getQuestionIndex(i);
        const q = questions[actualIndex];
        
        if (answers[i] === undefined) {
            empty++;
        } else if (answers[i] === q.answer) {
            correct++;
        } else {
            wrong++;
        }
    }
    
    const score = correct * examConfig.pointsPerQuestion;
    
    localStorage.setItem('examCompleted', 'true');
    localStorage.setItem('examCompletedAt', Date.now().toString());
    localStorage.setItem('score', score.toString());
    localStorage.setItem('correct', correct.toString());
    localStorage.setItem('wrong', wrong.toString());
    localStorage.setItem('empty', empty.toString());
    localStorage.setItem('examStatus', status);
    
    const startTime = parseInt(localStorage.getItem('examStartTime'));
    const timeUsedMs = Date.now() - startTime;
    const secondsUsed = Math.floor(timeUsedMs / 1000);
    const minutesUsed = Math.floor(secondsUsed / 60);
    const secs = secondsUsed % 60;
    
    showResult(correct, wrong, empty, score, `${minutesUsed} menit ${secs} detik`, status);
}

function showResult(correct, wrong, empty, score, timeUsed, status = 'Selesai') {
    document.getElementById('result-name').textContent = localStorage.getItem('studentName') || '-';
    document.getElementById('result-class').textContent = localStorage.getItem('studentClass') || '-';
    document.getElementById('score-value').textContent = score;
    document.getElementById('stat-correct').textContent = correct;
    document.getElementById('stat-wrong').textContent = wrong;
    document.getElementById('stat-empty').textContent = empty;
    document.getElementById('stat-correct-points').textContent = correct * examConfig.pointsPerQuestion;
    document.getElementById('result-total').textContent = questions.length;
    document.getElementById('result-time').textContent = timeUsed;
    
    const statusEl = document.getElementById('result-status');
    if (status === 'Selesai') {
        statusEl.textContent = '✓ Selesai Normal';
        statusEl.className = 'status-badge';
    } else {
        statusEl.textContent = '⚠️ ' + status;
        statusEl.className = 'status-badge stopped';
    }
    
    const circle = document.getElementById('score-circle');
    circle.classList.remove('grade-a', 'grade-b', 'grade-c', 'grade-d');
    if (score >= 85) circle.classList.add('grade-a');
    else if (score >= 70) circle.classList.add('grade-b');
    else if (score >= 55) circle.classList.add('grade-c');
    else circle.classList.add('grade-d');
    
    showScreen('screen-result');
}

// ============ COMPLETED SCREEN ============
function showCompletedScreen() {
    document.getElementById('completed-name').textContent = localStorage.getItem('studentName') || '-';
    document.getElementById('completed-class').textContent = localStorage.getItem('studentClass') || '-';
    showScreen('screen-completed');
}

function viewResult() {
    const score = parseInt(localStorage.getItem('score')) || 0;
    const correct = parseInt(localStorage.getItem('correct')) || 0;
    const wrong = parseInt(localStorage.getItem('wrong')) || 0;
    const empty = parseInt(localStorage.getItem('empty')) || 0;
    const status = localStorage.getItem('examStatus') || 'Selesai';
    
    const startTime = parseInt(localStorage.getItem('examStartTime'));
    const completedAt = parseInt(localStorage.getItem('examCompletedAt'));
    const timeUsedMs = completedAt - startTime;
    const secondsUsed = Math.floor(timeUsedMs / 1000);
    const minutesUsed = Math.floor(secondsUsed / 60);
    const secs = secondsUsed % 60;
    
    showResult(correct, wrong, empty, score, `${minutesUsed} menit ${secs} detik`, status);
}

// ============ RESTORE EXAM ============
function restoreExam() {
    const savedAnswers = localStorage.getItem('answers');
    const savedQuestion = localStorage.getItem('currentQuestion');
    const savedOrder = localStorage.getItem('shuffledOrder');
    
    answers = savedAnswers ? JSON.parse(savedAnswers) : {};
    currentQuestion = savedQuestion ? parseInt(savedQuestion) : 0;
    examActive = true;
    
    if (savedOrder) {
        shuffledOrder = JSON.parse(savedOrder);
    } else {
        shuffledOrder = [];
    }
    
    showScreen('screen-exam');
    renderQuestion();
    renderGrid();
    startQuestionTimer();
    
    // 🛡️ Grace period juga saat restore
    isInGracePeriod = true;
    if (gracePeriodTimeout) clearTimeout(gracePeriodTimeout);
    gracePeriodTimeout = setTimeout(() => {
        isInGracePeriod = false;
    }, 3000);
}

// ============ MODALS ============
function showTimeUpModal(text) {
    document.getElementById('time-warning-text').textContent = text;
    document.getElementById('modal-time').classList.add('active');
}

function closeTimeWarning() {
    document.getElementById('modal-time').classList.remove('active');
}

// ============ KIRIM KE WHATSAPP ============
function sendToWhatsApp() {
    const nomorGuru = examConfig.teacherWA;
    
    if (!nomorGuru || nomorGuru === "628xxxxxxxxx") {
        alert('Nomor WhatsApp guru belum dikonfigurasi.\n\nSilakan hubungi guru untuk mengirim hasil secara manual.');
        return;
    }
    
    const nama = localStorage.getItem('studentName') || '-';
    const kelas = localStorage.getItem('studentClass') || '-';
    const absen = localStorage.getItem('studentNumber') || '-';
    const nis = localStorage.getItem('studentNIS') || '-';
    const score = localStorage.getItem('score') || '0';
    const correct = localStorage.getItem('correct') || '0';
    const wrong = localStorage.getItem('wrong') || '0';
    const empty = localStorage.getItem('empty') || '0';
    const status = localStorage.getItem('examStatus') || 'Selesai';
    const tanggal = new Date().toLocaleString('id-ID');
    
    const pesan = 
`📝 *HASIL UJIAN RPL*
━━━━━━━━━━━━━━━━━━
🏫 ${examConfig.school}
📚 ${examConfig.subject}
━━━━━━━━━━━━━━━━━━

👤 *Data Peserta*
• Nama : ${nama}
• Kelas: ${kelas}
• Absen: ${absen}
• NIS  : ${nis}

📊 *Hasil Ujian*
• Nilai     : *${score} / 100*
• Benar     : ${correct} soal
• Salah     : ${wrong} soal
• Kosong    : ${empty} soal
• Status    : ${status}

📅 Tanggal: ${tanggal}

━━━━━━━━━━━━━━━━━━
_Dikirim melalui Sistem Ujian Online RPL_`;
    
    const encodedPesan = encodeURIComponent(pesan);
    const waURL = `https://wa.me/${nomorGuru}?text=${encodedPesan}`;
    
    window.open(waURL, '_blank');
}

// ============ 🛡️ KEAMANAN & AUTO-STOP (DIPERBAIKI) ============
function setupSecurity() {
    
    // 1️⃣ VISIBILITY CHANGE - dengan grace period & verifikasi
    document.addEventListener('visibilitychange', () => {
        // Abaikan jika sedang start exam atau grace period
        if (isStartingExam || isInGracePeriod) return;
        
        // Hanya proses jika ujian aktif dan di screen exam
        if (!examActive) return;
        if (!document.getElementById('screen-exam').classList.contains('active')) return;
        
        if (document.hidden) {
            // Page benar-benar tersembunyi → auto stop
            triggerAutoStop('Keluar dari halaman ujian');
        }
    });
    
    // 2️⃣ WINDOW BLUR - dengan DEBOUNCE 1500ms
    window.addEventListener('blur', () => {
        // Abaikan jika sedang start exam atau grace period
        if (isStartingExam || isInGracePeriod) return;
        if (!examActive) return;
        if (!document.getElementById('screen-exam').classList.contains('active')) return;
        
        // Clear timeout sebelumnya (reset debounce)
        if (blurDebounceTimeout) clearTimeout(blurDebounceTimeout);
        
        // Tunggu 1500ms - jika user kembali fokus, batalkan auto-stop
        blurDebounceTimeout = setTimeout(() => {
            // Verifikasi ganda: apakah page masih blur?
            if (!document.hasFocus() || document.hidden) {
                triggerAutoStop('Keluar dari halaman ujian');
            }
        }, 1500);
    });
    
    // 3️⃣ WINDOW FOCUS - batalkan auto-stop jika user kembali
    window.addEventListener('focus', () => {
        if (blurDebounceTimeout) {
            clearTimeout(blurDebounceTimeout);
            blurDebounceTimeout = null;
        }
    });
    
    // 4️⃣ PAGE HIDE (mobile) - dengan grace period
    document.addEventListener('pagehide', () => {
        if (isStartingExam || isInGracePeriod) return;
        if (examActive) {
            triggerAutoStop('Halaman ditutup');
        }
    });
    
    // 5️⃣ Cegah klik kanan saat ujian
    document.addEventListener('contextmenu', (e) => {
        if (examActive && !isInGracePeriod) e.preventDefault();
    });
    
    // 6️⃣ Cegah shortcut tertentu
    document.addEventListener('keydown', (e) => {
        if (examActive && !isInGracePeriod) {
            if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) e.preventDefault();
            if (e.ctrlKey && e.shiftKey && (e.key === 'i' || e.key === 'I')) e.preventDefault();
            if (e.ctrlKey && (e.key === 's' || e.key === 'S')) e.preventDefault();
            if (e.key === 'F12') e.preventDefault();
        }
    });
    
    // 7️⃣ Cegah copy
    document.addEventListener('copy', (e) => {
        if (examActive && !isInGracePeriod) e.preventDefault();
    });
}

// 🛡️ Fungsi trigger auto-stop (dipusatkan)
function triggerAutoStop(reason) {
    if (!examActive) return;
    examActive = false;
    
    if (questionTimerInterval) clearInterval(questionTimerInterval);
    if (blurDebounceTimeout) clearTimeout(blurDebounceTimeout);
    if (gracePeriodTimeout) clearTimeout(gracePeriodTimeout);
    
    let correct = 0, wrong = 0, empty = 0;
    
    for (let i = 0; i < questions.length; i++) {
        const actualIndex = getQuestionIndex(i);
        const q = questions[actualIndex];
        
        if (answers[i] === undefined) empty++;
        else if (answers[i] === q.answer) correct++;
        else wrong++;
    }
    
    const score = correct * examConfig.pointsPerQuestion;
    
    localStorage.setItem('examCompleted', 'true');
    localStorage.setItem('examCompletedAt', Date.now().toString());
    localStorage.setItem('score', score.toString());
    localStorage.setItem('correct', correct.toString());
    localStorage.setItem('wrong', wrong.toString());
    localStorage.setItem('empty', empty.toString());
    localStorage.setItem('examStatus', reason);
    
    showScreen('screen-autostop');
}