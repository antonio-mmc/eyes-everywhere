# 👁️ EyesEveryWhere: Gestão Inteligente de Infraestruturas Urbanas

**EyesEveryWhere** é uma plataforma avançada de monitorização e orquestração urbana concebida para modernizar a interação entre cidadãos e administração municipal. Focada na infraestrutura de vias públicas, a solução permite o reporte, auditoria e resolução eficiente de incidentes urbanos, como buracos, danos em passeios e falhas de iluminação.

[![Estado do Projeto: Gold](https://img.shields.io/badge/Estado-Gold-FFD700.svg?style=for-the-badge)](#)
[![Stack Tecnológica](https://img.shields.io/badge/Stack-Vue_3_|_Node.js_|_Vanilla_JS_|_Tailwind-blue.svg?style=for-the-badge)](#)
[![Design Style](https://img.shields.io/badge/Design-Glassmorphism-purple.svg?style=for-the-badge)](#)

---

## 🚀 Tecnologias

A plataforma utiliza um stack tecnológico moderno e diversificado para garantir escalabilidade e performance:

*   **Frontend (SPA Core):** Vue.js 3 (Composition API), Pinia (State Management), Vue Router.
*   **Interfaces Administrativas:** Vanilla JavaScript (ES6+), CSS Grid/Flexbox, Lucide Icons.
*   **Backend:** Node.js, Express.
*   **Geospacial:** Leaflet.js para mapeamento e geolocalização.
*   **Estilização:** Tailwind CSS e CSS Customizado (Design Glassmorphic).
*   **Segurança:** Autenticação baseada em JWT (JSON Web Tokens).

---

## 🏗️ Arquitetura e Ecossistema

O projeto segue uma arquitetura modular que separa as preocupações de reporte público da gestão administrativa complexa:

*   **FrontOffice:** Interface dedicada ao cidadão, focada na usabilidade e rapidez de reporte.
*   **BackOffice:** Suite administrativa de alta performance para auditores e gestores municipais, com visualização de dados em tempo real.
*   **Core API:** Camada de orquestração em Node.js que unifica a comunicação entre os módulos e gere a persistência de dados.
*   **Geospatial Layer:** Integração de mapas para visualização precisa de ocorrências e planeamento de rotas de reparação.

---

## ✨ Funcionalidades

*   **Sistema de Reporte Georreferenciado:** Registo de ocorrências com coordenadas precisas e suporte multimédia.
*   **Gestão de Ciclo de Vida de Ocorrências:** Fluxo de trabalho completo desde o reporte inicial, auditoria técnica, até à resolução final.
*   **Dashboard de Analytics:** Visualização de métricas de desempenho urbano e eficiência das equipas de manutenção.
*   **Design Responsivo Premium:** Interface adaptável (mobile-first) com estética Glassmorphic para uma experiência de utilizador superior.
*   **Controlo de Acessos:** Sistema de permissões granulado para diferentes tipos de utilizadores (Cidadão, Perito, Administrador).

---

## 🛠️ O Processo

O desenvolvimento do EyesEveryWhere seguiu uma metodologia ágil e iterativa:
1.  **Análise de Requisitos:** Identificação dos principais estrangulamentos na comunicação municipal em Braga através do enunciado do projeto.
2.  **Design de UI/UX:** Criação de um sistema de design moderno que privilegia a clareza da informação e a facilidade de interação sob stress (ex: reportar um problema na rua).
3.  **Desenvolvimento Modular:** Implementação faseada, começando pelo núcleo de gestão de dados e evoluindo para as interfaces SPA e ferramentas de auditoria.
4.  **Refatoração Contínua:** Otimização constante do código para garantir padrões de *clean code* e eficiência na manipulação do DOM.

---

## 🧠 O que Aprendi

*   **Gestão de Estado Complexa:** A implementação de fluxos de auditoria exigiu um domínio profundo de gestão de estado assíncrona, especialmente na coordenação entre o BackOffice e o servidor.
*   **Design de Interfaces Administrativas:** Aprendi a equilibrar a densidade de informação necessária para um administrador com a estética limpa e moderna do Glassmorphism.
*   **Integração Geospacial:** Domínio de APIs de mapeamento para transformar dados abstratos em informações visuais acionáveis e úteis para a logística urbana.
*   **Arquitetura Full-Stack:** Consolidação de conhecimentos na integração de sistemas heterogéneos (Vue.js + Vanilla JS + Node.js).

---

## 🔮 Como poderia ser melhorado

*   **Automação com IA:** Implementação de modelos de *Computer Vision* para categorizar automaticamente o tipo de dano a partir de fotos enviadas pelos cidadãos.
*   **Notificações em Tempo Real:** Integração de WebSockets para notificações imediatas tanto para cidadãos (sobre o estado do seu reporte) como para técnicos (sobre novas auditorias).
*   **Módulo Offline:** Capacidade de registo de ocorrências em áreas com baixa conectividade, com sincronização automática posterior.
*   **Integração com Cidades Inteligentes (IoT):** Conexão direta com sensores de iluminação pública para auto-reporte de falhas sem intervenção humana.

---

## ⚙️ Como correr o projeto

### Pré-requisitos
*   Node.js (v18+)
*   npm

### Instalação
1.  Clone o repositório:
    ```bash
    git clone <repository-url>
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```

### Execução
1.  Inicie o servidor de desenvolvimento:
    ```bash
    npm start
    ```
2.  Aceda à interface:
    *   **Portal Principal (FrontOffice):** `http://localhost:3000/`

---

