# Sistema de Gerenciamento de Estacionamento

Um aplicativo moderno e responsivo para gerenciar vagas de estacionamento, desenvolvido com Next.js 15, TypeScript, CSS Modules e Sass.

## 🚀 Características

- **Interface Moderna**: Design inspirado em tons de azul com gradientes e efeitos visuais
- **Responsivo**: Otimizado para smartphones, tablets e desktops
- **Gerenciamento Completo**: Adicionar, remover e buscar veículos
- **Visualização em Tempo Real**: Status das vagas atualizado instantaneamente
- **50 Vagas**: Sistema configurado para gerenciar até 50 vagas de estacionamento

## 🎨 Funcionalidades

### Painel de Controle
- **Adicionar Veículo**: Selecione uma vaga disponível e insira a placa do veículo
- **Remover Veículo**: Libere vagas ocupadas facilmente
- **Buscar**: Encontre vagas específicas e gerencie rapidamente

### Status das Vagas
- 🟣 **Disponível**: Vaga livre para uso
- 🔴 **Ocupada**: Vaga com veículo estacionado (mostra placa e horário)
- 🟡 **Selecionada**: Vaga destacada para ação
- ⚫ **Desabilitada**: Vaga fora de uso

### Informações Exibidas
- Número da vaga
- Placa do veículo (quando ocupada)
- Horário de entrada
- Estatísticas em tempo real (disponíveis, ocupadas, total)

## 🛠️ Tecnologias Utilizadas

- **Next.js 15**: Framework React com App Router
- **TypeScript**: Tipagem estática para maior segurança
- **CSS Modules**: Estilos modulares e isolados
- **Sass**: Pré-processador CSS para estilos avançados
- **React Hooks**: useState e useEffect para gerenciamento de estado

## 📱 Responsividade

O aplicativo se adapta automaticamente a diferentes tamanhos de tela:

- **Desktop**: Grid de 10 colunas com vagas de 80x80px
- **Tablet**: Grid de 8 colunas com vagas de 70x70px
- **Mobile**: Grid de 5-6 colunas com vagas de 50-60px

## 🎯 Como Usar

1. **Visualizar Vagas**: O grid mostra todas as 50 vagas com seus status atuais
2. **Adicionar Veículo**: 
   - Clique na aba "➕ Adicionar Veículo"
   - Selecione uma vaga disponível
   - Digite a placa do veículo
   - Clique em "Adicionar Veículo"
3. **Remover Veículo**:
   - Clique na aba "➖ Remover Veículo"
   - Selecione uma vaga ocupada
   - Clique em "Remover Veículo"
4. **Buscar Vagas**:
   - Clique na aba "🔍 Buscar"
   - Digite o número da vaga para filtrar
   - Use os botões "Liberar" para ações rápidas

## 🚀 Executar o Projeto

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Acessar no navegador
http://localhost:3000
```

## 📁 Estrutura do Projeto

```
parking-management/
├── src/
│   ├── app/
│   │   ├── globals.css          # Estilos globais
│   │   └── page.tsx             # Página principal
│   └── components/
│       ├── ParkingGrid.tsx      # Componente principal do grid
│       ├── ParkingGrid.module.scss
│       ├── ParkingSpot.tsx      # Componente de vaga individual
│       ├── ParkingSpot.module.scss
│       ├── ControlPanel.tsx     # Painel de controle
│       └── ControlPanel.module.scss
├── package.json
└── README.md
```

## 🎨 Paleta de Cores

- **Fundo Principal**: Gradiente de azul escuro (#0f172a → #16213e)
- **Vagas Disponíveis**: Gradiente roxo (#7c3aed → #a855f7)
- **Vagas Ocupadas**: Gradiente vermelho (#ef4444 → #f87171)
- **Vagas Selecionadas**: Gradiente amarelo (#f59e0b → #fbbf24)
- **Vagas Desabilitadas**: Gradiente cinza (#6b7280 → #9ca3af)

## 📝 Licença

Este projeto foi desenvolvido como demonstração de um sistema de gerenciamento de estacionamento moderno e responsivo.

---

Desenvolvido com ❤️ usando Next.js 15 e tecnologias modernas.

