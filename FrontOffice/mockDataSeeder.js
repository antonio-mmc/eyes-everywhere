/* ================================================
   EyesEveryWhere — Robust Mock Data Seeder (FORCED)
   ================================================ */

(function() {
  const seedData = () => {
    // 1. MOCK USER REFERENCE (Don't force login)
    let user = JSON.parse(sessionStorage.getItem('userfront')) || JSON.parse(localStorage.getItem('userfront'));
    if (!user) {
      user = {
        id: "USR-001",
        name: "António Correia",
        email: "antoniocorreiabusiness@gmail.com",
        picture: "../../FrontOffice/imagens/defaultUser.png"
      };
      // We keep it in memory for the seeder, but we don't set 'islogged' here
    }

    const userId = user.id;

    const mergeData = (key, newData, idField = 'id') => {
      let existing = [];
      try {
        existing = JSON.parse(localStorage.getItem(key) || '[]');
        if (!Array.isArray(existing)) existing = [];
        
        // ULTIMATE CLEANUP
        existing = existing.filter(item => {
          const id = String(item[idField] || '').trim();
          const email = String(item.email || '').trim();
          const status = String(item.estado || item.status || '').trim();
          
          const isLegacyString = id.includes('OC-') || id.includes('AUD-') || id === "NaN" || id === "undefined";
          
          // PROTEÇÃO: Não apagar ocorrências criadas recentemente (IDs numéricos ou timestamps)
          if (key === 'ocorrencias' && !isNaN(id) && (parseInt(id) > 2000 || parseInt(id) > 1700000000000)) return true;
          
          // For occurrences, we need email. For experts/audits, email is optional or in sub-fields.
          if (key === 'ocorrencias' && (!email || email === "N/A")) return false;
          if (key === 'auditorias' && !status) return false;
          
          return !isLegacyString;
        });
      } catch(e) { existing = []; }

      newData.forEach(item => {
        const index = existing.findIndex(e => e[idField] == item[idField]);
        if (index > -1) {
          existing[index] = item;
        } else {
          existing.unshift(item);
        }
      });
      localStorage.setItem(key, JSON.stringify(existing));
    };

    // 2. EXPERTS (Peritos) - ALL 2024
    const experts = [
      { id: 101, name: "Eng. Ricardo Pereira", email: "r.pereira@eyeseverywhere.pt", startDate: "12/01/2024", specialty: "Buraco na Estrada", status: "Disponível", phone: "912 345 678", address: "Rua de Cima, 12, Braga", postalCode: "4700-001", birthDate: "1985-05-20" },
      { id: 102, name: "Drª. Beatriz Santos", email: "b.santos@eyeseverywhere.pt", startDate: "05/03/2024", specialty: "Passeio Danificado", status: "Em Auditoria", phone: "934 567 890", address: "Av. da Liberdade, 45, Braga", postalCode: "4710-002", birthDate: "1990-11-12" },
      { id: 103, name: "Carlos Alberto", email: "c.alberto@eyeseverywhere.pt", startDate: "20/06/2024", specialty: "Iluminação Pública", status: "Disponível", phone: "965 432 109", address: "Rua do Souto, 8, Braga", postalCode: "4700-050", birthDate: "1978-02-28" },
      { id: 104, name: "Engª. Sofia Oliveira", email: "s.oliveira@eyeseverywhere.pt", startDate: "15/09/2024", specialty: "Falta de Sinalização", status: "Disponível", phone: "921 098 765", address: "Praça do Município, 2, Braga", postalCode: "4700-100", birthDate: "1988-07-15" },
      { id: 105, name: "Eng. Miguel Silva", email: "m.silva@eyeseverywhere.pt", startDate: "10/01/2024", specialty: "Buraco na Estrada", status: "Disponível", phone: "919 888 777", address: "Rua Nova, 5, Braga", postalCode: "4700-200", birthDate: "1982-03-10" }
    ];
    mergeData('expertsData', experts);

    // 3. OCCURRENCES (Ocorrências) - ALL 2024
    const fmt = (d) => {
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = 2024;
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      const seconds = String(d.getSeconds()).padStart(2, '0');
      return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
    };

    const d = new Date();
    const occurrences = [
      { id: 1001, userid: userId, tipo: "Buraco na estrada", estado: "Aceite", descricao: "Piso cedido devido a infiltrações constantes.", localizacao: "Rua do Souto, Braga", morada: "Rua do Souto", codigoPostal: "4700-001", email: user.email, data: fmt(new Date(d.getTime() - 86400000 * 5)), imagens: [], latitude: "41.5518", longitude: "-8.4229" },
      { id: 1002, userid: userId, tipo: "Iluminação pública", estado: "Em Progresso", descricao: "Poste #45 sem luz há 3 dias.", localizacao: "Avenida da Liberdade, Braga", morada: "Avenida da Liberdade", codigoPostal: "4710-002", email: user.email, data: fmt(new Date(d.getTime() - 86400000 * 2)), imagens: [], latitude: "41.5489", longitude: "-8.4201" },
      { id: 1005, userid: userId, tipo: "Buraco na estrada", estado: "Não Aceite", descricao: "Buraco em propriedade privada.", localizacao: "Rua Privada, Barcelos", morada: "Rua Privada", codigoPostal: "4750-100", email: user.email, data: fmt(new Date(d.getTime() - 86400000 * 10)), imagens: [], latitude: "41.5388", longitude: "-8.6189", motivoRejeicao: "Localização fora da jurisdição pública." },
      { id: 1006, userid: userId, tipo: "Passeio danificado", estado: "Aceite", descricao: "Passeio com desnível acentuado.", localizacao: "Rua da Escola, Braga", morada: "Rua da Escola", codigoPostal: "4700-200", email: user.email, data: fmt(new Date(d.getTime() - 86400000 * 20)), imagens: [], latitude: "41.5555", longitude: "-8.4111" },
      { id: 1007, userid: userId, tipo: "Iluminação pública", estado: "Em espera", descricao: "Várias lâmpadas fundidas no parque municipal.", localizacao: "Parque da Ponte, Braga", morada: "Parque da Ponte", codigoPostal: "4715-001", email: user.email, data: fmt(new Date(d.getTime() - 86400000 * 1)), imagens: [], latitude: "41.5433", longitude: "-8.4188" },
      { id: 1009, userid: userId, tipo: "Falta de sinalização", estado: "Não Aceite", descricao: "Pedido de sinal de 'Proibido Estacionar' indevido.", localizacao: "Rua do Raio, Braga", morada: "Rua do Raio", codigoPostal: "4710-003", email: user.email, data: fmt(new Date(d.getTime() - 86400000 * 3)), imagens: [], latitude: "41.5501", longitude: "-8.4199", motivoRejeicao: "Sinalização privada não é gerida pela autarquia." },
      { id: 1011, userid: userId, tipo: "Buraco na estrada", estado: "Em Progresso", descricao: "Fissura no asfalto em frente ao hospital.", localizacao: "Rua dos Hospitais, Braga", morada: "Rua dos Hospitais", codigoPostal: "4710-100", email: user.email, data: fmt(new Date(d.getTime() - 86400000 * 7)), imagens: [], latitude: "41.5600", longitude: "-8.4100" },
      { id: 1012, userid: userId, tipo: "Passeio danificado", estado: "Não Aceite", descricao: "Reclamação sobre cor das pedras.", localizacao: "Rua Central, Braga", morada: "Rua Central", codigoPostal: "4700-001", email: user.email, data: fmt(new Date(d.getTime() - 86400000 * 15)), imagens: [], latitude: "41.5500", longitude: "-8.4200", motivoRejeicao: "Estética não é motivo de intervenção urgente." }
    ];
    mergeData('ocorrencias', occurrences);

    // 4. AUDITS (Auditorias) - ALL 2024 & COMPLETE FIELDS
    const audits = [
      { id: 2001, nome: "Inspeção Braga Sul", titulo: "Inspeção Braga Sul", nivelUrgencia: 4, tipoOcorrencia: "Segurança Rodoviária", data: "10/04/2024", dataConclusao: "15/04/2024", perito: "Eng. Ricardo Pereira", estado: "Concluída", morada: "Rua do Souto, Braga", observacoes: "Piso renovado.", peritos: [{id: 101, name: "Eng. Ricardo Pereira"}] },
      { id: 2002, nome: "Manutenção Guimarães", titulo: "Manutenção Guimarães", nivelUrgencia: 3, tipoOcorrencia: "Iluminação Pública", data: "18/04/2024", dataConclusao: null, perito: "Carlos Alberto", estado: "Em Progresso", morada: "Av. Alberto Sampaio, Guimarães", observacoes: "Luminárias obsoletas.", peritos: [{id: 103, name: "Carlos Alberto"}] },
      { id: 2003, nome: "Acessibilidade Centro", titulo: "Acessibilidade Centro", nivelUrgencia: 2, tipoOcorrencia: "Passeio Danificado", data: "01/05/2024", dataConclusao: null, perito: "Drª. Beatriz Santos", estado: "Em Progresso", morada: "Praça do Município, Braga", observacoes: "Avaliação de rampas.", peritos: [{id: 102, name: "Drª. Beatriz Santos"}] },
      { id: 2004, nome: "Pavimentação Circular", titulo: "Pavimentação Circular", nivelUrgencia: 5, tipoOcorrencia: "Buraco na Estrada", data: "20/03/2024", dataConclusao: "25/03/2024", perito: "Engª. Sofia Oliveira", estado: "Concluída", morada: "Circular Urbana, Braga", observacoes: "Pavimento selado.", peritos: [{id: 104, name: "Engª. Sofia Oliveira"}] },
      { id: 2005, nome: "Sinalização Escolar", titulo: "Sinalização Escolar", nivelUrgencia: 4, tipoOcorrencia: "Falta de Sinalização", data: "10/03/2024", dataConclusao: "12/03/2024", perito: "Eng. Miguel Silva", estado: "Concluída", morada: "Rua da Escola, Braga", observacoes: "Sinalização reforçada.", peritos: [{id: 105, name: "Eng. Miguel Silva"}] },
      { id: 2006, nome: "Vistoria Noturna", titulo: "Vistoria Noturna", nivelUrgencia: 1, tipoOcorrencia: "Iluminação Pública", data: "05/05/2024", dataConclusao: null, perito: "Carlos Alberto", estado: "Em Progresso", morada: "Parque da Ponte, Braga", observacoes: "Pontos cegos.", peritos: [{id: 103, name: "Carlos Alberto"}] },
      { id: 2007, nome: "Auditoria Estrutural", titulo: "Auditoria Estrutural", nivelUrgencia: 4, tipoOcorrencia: "Passeio Danificado", data: "22/04/2024", dataConclusao: null, perito: "Engª. Sofia Oliveira", estado: "Em Progresso", morada: "Rua Nova, Braga", observacoes: "Análise de subsolo.", peritos: [{id: 104, name: "Engª. Sofia Oliveira"}] },
      { id: 2008, nome: "Fiscalização Viária", titulo: "Fiscalização Viária", nivelUrgencia: 3, tipoOcorrencia: "Buraco na Estrada", data: "25/04/2024", dataConclusao: null, perito: "Eng. Ricardo Pereira", estado: "Em Progresso", morada: "Circular Sul, Braga", observacoes: "Controlo de qualidade.", peritos: [{id: 101, name: "Eng. Ricardo Pereira"}] }
    ];
    mergeData('auditorias', audits);
  };

  seedData();
  console.log("EyesEveryWhere Mock Data Seeded successfully - All 2024, Full Audit Fields.");
})();
