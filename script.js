const itens = ["Notebook 💻", "Carregador 🔌", "Chaves 🔑", "Carteira 👛", "Celular 📱", "Garrafa 🥤", "Caderno 📒"];
const frases = ["Você está pronto para vencer!", "Organização é a chave do sucesso.", "Mochila pronta, mente tranquila."];

const container = document.getElementById('checklist');
const progressBar = document.getElementById('progress-bar');
const statsText = document.getElementById('stats-text');
const resultBox = document.getElementById('result-box');
const resultContent = document.getElementById('result-content');

// Renderização inicial
itens.forEach((item, index) => {
    container.insertAdjacentHTML('beforeend', `
        <div class="item">
            <input type="checkbox" id="item-${index}" onchange="updateUI()">
            <label for="item-${index}" style="margin-left:10px; cursor:pointer;">${item}</label>
        </div>
    `);
});

function updateUI() {
    const checked = document.querySelectorAll('input:checked').length;
    const total = itens.length;
    const percent = Math.round((checked / total) * 100);
    
    progressBar.style.width = `${percent}%`;
    statsText.innerText = `${percent}% concluído (${checked}/${total})`;
}

function showResult(message, isSuccess) {
    resultBox.className = `result-box ${isSuccess ? 'bg-success' : 'bg-danger'}`;
    resultBox.style.background = isSuccess ? '#dcfce7' : '#fee2e2';
    resultContent.innerHTML = message;
    resultBox.classList.remove('hidden');
}

document.getElementById('btn-check').addEventListener('click', () => {
    const missing = Array.from(document.querySelectorAll('input:not(:checked)'))
        .map(i => i.nextElementSibling.innerText);

    if (missing.length === 0) {
        showResult(`✅ Tudo pronto! ${frases[Math.floor(Math.random()*frases.length)]}`, true);
    } else {
        showResult(`⚠ Faltando: <b>${missing.join(', ')}</b>`, false);
    }
});

document.getElementById('btn-sensor').addEventListener('click', () => {
    resultContent.innerHTML = "🔍 Escaneando componentes...";
    resultBox.classList.remove('hidden');
    setTimeout(() => document.getElementById('btn-check').click(), 1500);
});

document.getElementById('btn-clear').addEventListener('click', () => {
    document.querySelectorAll('input').forEach(i => i.checked = false);
    resultBox.classList.add('hidden');
    updateUI();
});
