const itens = ["Notebook 💻", "Carregador 🔌", "Chaves 🔑", "Carteira 👛", "Celular 📱", "Garrafa 🥤", "Caderno 📒"];
const frases = ["Organização economiza tempo.", "Você está preparado para o dia.", "Conferir a mochila evita imprevistos.", "Pequenos hábitos fazem grande diferença."];
let historico = [];

const container = document.getElementById('checklist');
const resultDiv = document.getElementById('result');
const progressBar = document.getElementById('progress-bar');
const statsText = document.getElementById('stats-text');
const historyList = document.getElementById('history-list');

// Inicializa Checklist
itens.forEach((item, index) => {
    container.innerHTML += `
        <div class="item">
            <input type="checkbox" id="item-${index}" onchange="atualizar()">
            <label for="item-${index}">${item}</label>
        </div>
    `;
});

function atualizar() {
    const checks = document.querySelectorAll('input:checked');
    const total = itens.length;
    const marcados = checks.length;
    const porcentagem = (marcados / total) * 100;
    
    progressBar.style.width = porcentagem + "%";
    statsText.innerText = `Itens: ${marcados} / ${total} | Faltando: ${total - marcados}`;
}

function salvarHistorico(msg) {
    const agora = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    historico.unshift(`${agora} - ${msg}`);
    if (historico.length > 5) historico.pop();
    
    historyList.innerHTML = historico.map(h => `<li>${h}</li>`).join('');
}

document.getElementById('btn-check').addEventListener('click', () => {
    const naoMarcados = Array.from(document.querySelectorAll('input:not(:checked)'))
        .map(el => el.nextElementSibling.innerText);

    resultDiv.style.display = "block";
    if (naoMarcados.length === 0) {
        resultDiv.style.background = "#dcfce7";
        resultDiv.innerHTML = `✅ Tudo certo! ${frases[Math.floor(Math.random()*frases.length)]}`;
        salvarHistorico("Tudo OK");
    } else {
        resultDiv.style.background = "#fee2e2";
        resultDiv.innerHTML = `⚠ Faltando: ${naoMarcados.join(', ')}`;
        salvarHistorico(`Faltando: ${naoMarcados.length} itens`);
    }
});

document.getElementById('btn-sensor').addEventListener('click', () => {
    resultDiv.style.display = "block";
    resultDiv.innerHTML = "📡 Escaneando mochila...";
    setTimeout(() => {
        document.getElementById('btn-check').click();
    }, 2000);
});

document.getElementById('btn-clear').addEventListener('click', () => {
    document.querySelectorAll('input').forEach(i => i.checked = false);
    resultDiv.style.display = "none";
    atualizar();
});
