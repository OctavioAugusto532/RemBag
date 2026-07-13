const essentials = [
    { name: "Notebook", icon: "💻" }, { name: "Carregador", icon: "🔌" },
    { name: "Chaves", icon: "🔑" }, { name: "Carteira", icon: "👛" },
    { name: "Celular", icon: "📱" }, { name: "Garrafa", icon: "🥤" },
    { name: "Caderno", icon: "📒" }
];

const checklist = document.getElementById('checklist');
const progressBar = document.getElementById('progress-bar');
const statsText = document.getElementById('stats-text');
const alertBox = document.getElementById('result-alert');
const alertMsg = document.getElementById('alert-message');
const historyList = document.getElementById('history-list');

// Inicialização
essentials.forEach((item, index) => {
    checklist.innerHTML += `
        <div class="item-card" onclick="toggleItem(${index})">
            <input type="checkbox" id="check-${index}" style="display:none">
            <span>${item.icon} ${item.name}</span>
        </div>
    `;
});

function toggleItem(index) {
    const el = document.querySelectorAll('.item-card')[index];
    const checkbox = document.getElementById(`check-${index}`);
    checkbox.checked = !checkbox.checked;
    el.classList.toggle('checked');
    updateStats();
}

function updateStats() {
    const total = essentials.length;
    const checked = document.querySelectorAll('input:checked').length;
    const percent = (checked / total) * 100;
    progressBar.style.width = `${percent}%`;
    statsText.innerText = `Itens: ${checked}/${total} | Faltando: ${total - checked}`;
}

document.getElementById('btn-check').addEventListener('click', () => {
    const missing = essentials.filter((_, i) => !document.getElementById(`check-${i}`).checked);
    alertBox.classList.remove('hidden');
    
    if (missing.length === 0) {
        alertBox.style.background = "#dcfce7";
        alertMsg.innerHTML = "✅ Tudo pronto! Você está preparado.";
        saveHistory("Tudo OK");
    } else {
        alertBox.style.background = "#fee2e2";
        alertMsg.innerHTML = `⚠ Faltando: ${missing.map(m => m.name).join(', ')}`;
        saveHistory(`Faltando: ${missing.length} itens`);
    }
});

document.getElementById('btn-sensor').addEventListener('click', () => {
    alertBox.classList.remove('hidden');
    alertMsg.innerHTML = "📡 Escaneando tags RFID...";
    setTimeout(() => document.getElementById('btn-check').click(), 2000);
});

function saveHistory(status) {
    const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    historyList.innerHTML = `<li>${time} - ${status}</li>` + historyList.innerHTML;
}
