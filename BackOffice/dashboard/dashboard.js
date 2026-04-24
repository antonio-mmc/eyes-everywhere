document.addEventListener('DOMContentLoaded', function () {
    // AUDITORIAS RESOLVIDAS COM PAGINAÇÃO
    const auditorias = JSON.parse(localStorage.getItem('auditorias') || '[]');
    const lista = document.getElementById('auditorias-resolvidas-list');
    const itemsPerPage = 4;
    let currentPage = 1;

    function renderAuditoriasPage(page) {
        if (!lista) return;
        const totalPages = Math.ceil(auditorias.length / itemsPerPage);
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageItems = auditorias.slice(start, end);

        if (auditorias.length === 0) {
            lista.innerHTML = '<div class="list-item"><div class="list-item-text">Nenhuma auditoria criada.</div></div>';
        } else {
            lista.innerHTML = pageItems.map(a => `
                <div class="list-item">
                    <div class="list-item-text">${a.nome || a.id}</div>
                    <div class="list-item-icon">〉</div>
                </div>
            `).join('');

            // Paginação
            let pagination = '<div class="pagination" style="margin-top:10px; text-align:center;">';
            if (page > 1) {
                pagination += `<button id="prevAuditorias" style="margin-right:5px;">Anterior</button>`;
            }
            pagination += `<span>Página ${page} de ${totalPages}</span>`;
            if (page < totalPages) {
                pagination += `<button id="nextAuditorias" style="margin-left:5px;">Próxima</button>`;
            }
            pagination += '</div>';
            lista.innerHTML += pagination;

            // Eventos dos botões
            if (page > 1) {
                document.getElementById('prevAuditorias').onclick = () => {
                    currentPage--;
                    renderAuditoriasPage(currentPage);
                };
            }
            if (page < totalPages) {
                document.getElementById('nextAuditorias').onclick = () => {
                    currentPage++;
                    renderAuditoriasPage(currentPage);
                };
            }
        }
    }

    renderAuditoriasPage(currentPage);

    // OCORRÊNCIAS REALIZADAS POR ÁREA - PERCENTAGENS REAIS
    const ocorrencias = JSON.parse(localStorage.getItem('ocorrencias') || '[]');
    const total = ocorrencias.length;

    const tipos = [
        "Buraco na Estrada",
        "Passeio Danificado",
        "Falta de Sinalização",
        "Iluminação Pública"
    ];

    // Conta quantas de cada tipo
    const contagem = {};
    tipos.forEach(tipo => contagem[tipo] = 0);
    ocorrencias.forEach(o => {
        const tipoEncontrado = tipos.find(t => t.toLowerCase() === (o.tipo || '').toLowerCase());
        if (tipoEncontrado) contagem[tipoEncontrado]++;
    });

    // Calcula percentagens
    const percentagens = tipos.map(tipo =>
        total > 0 ? Math.round((contagem[tipo] / total) * 100) : 0
    );

    // Atualiza as percentagens nos cantos do card
    const areaItems = document.querySelectorAll('.area-percentages .area-item');
    areaItems.forEach((item, idx) => {
        const label = item.querySelector('.area-label');
        const value = item.querySelector('.area-value');
        if (label && value) {
            label.textContent = tipos[idx];
            value.textContent = percentagens[idx] + '%';
        }
    });

    // Atualiza o donut chart
    const CIRC = 2 * Math.PI * 40;
    let offset = 0;
    // Seleciona todos os círculos de dados (exclui só o fundo e o buraco central)
    const svgCircles = document.querySelectorAll('.donut-chart svg circle[stroke-width="20"]:not(:first-child):not([fill])');
    percentagens.forEach((perc, idx) => {
        if (svgCircles[idx]) {
            const dash = (perc / 100) * CIRC;
            const gap = CIRC - dash;
            svgCircles[idx].setAttribute('stroke-dasharray', `${dash} ${gap}`);
            svgCircles[idx].setAttribute('transform', `rotate(${offset - 90} 50 50)`);
            offset += (perc / 100) * 360;
        }
    });

    // Ocorrências em Espera (Requested: 81)
    const elOcorrenciasEmEspera = document.getElementById('ocorrencias-em-espera');
    if (elOcorrenciasEmEspera) elOcorrenciasEmEspera.textContent = '81';

    // Auditorias Aceites (Requested: 520)
    const elAuditoriasAceites = document.getElementById('auditorias-aceites');
    if (elAuditoriasAceites) elAuditoriasAceites.textContent = '520';

    // Real Stats for Professionals (Requested: 150 / 100)
    const elDisponiveis = document.getElementById('profissionais-disponiveis');
    if (elDisponiveis) elDisponiveis.textContent = '150';

    const elEmAcao = document.getElementById('profissionais-em-acao');
    if (elEmAcao) elEmAcao.textContent = '100';

    // Auditorias a ser Resolvidas (Based on 'Em Progresso' + Mock for variety)
    const auditoriasData = JSON.parse(localStorage.getItem('auditorias') || '[]');
    let emProgresso = auditoriasData.filter(a => a.estado === 'Em Progresso');

    // Se houver poucas, adicionamos umas "falsas" para preencher como solicitado
    if (emProgresso.length < 3) {
        emProgresso.push(
            { nome: 'Inspeção Braga Sul', estado: 'Em Progresso' },
            { nome: 'Vistoria Noturna', estado: 'Em Progresso' },
            { nome: 'Acessibilidade Centro', estado: 'Em Progresso' }
        );
    }

    const auditoriasList = document.getElementById('auditorias-resolvidas-list');

    if (auditoriasList) {
        auditoriasList.innerHTML = emProgresso.map(a => `
            <a href="../Auditoria/ListaAuditorias/ListaAuditorias.html" class="list-item">
                <div class="list-item-icon"><i data-lucide="clock"></i></div>
                <div class="list-item-text">${a.nome || 'Auditoria sem nome'}</div>
            </a>
        `).join('');
        lucide.createIcons();
    }

    // Logout Logic (Redirect to FrontOffice)
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('islogged');
            sessionStorage.removeItem('userfront');
            window.location.href = '../../FrontOffice/Auditorias/index.html';
        });
    }
});