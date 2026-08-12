/*
 * Escape Room: O Enigma do Detetive
 * Toda a lógica e o conteúdo dos níveis ficam neste arquivo.
 * Para editar uma pergunta, altere apenas o objeto correspondente em LEVELS.
 */

// Banco de fases. As respostas aceitam variações definidas em "answers".
const LEVELS = [
  {
    title: 'A Pista da Lanchonete', rank: 'Detetive Novato', difficulty: 'INICIANTE',
    narrative: 'Uma nota fiscal amassada foi encontrada perto da última cena investigada pelo detetive.',
    problem: 'O primeiro suspeito comprou 2 hambúrgueres e 1 refrigerante por R$ 25. O segundo comprou 1 hambúrguer e 2 refrigerantes por R$ 20.',
    system: '2x + y = 25\nx + 2y = 20', objective: 'Descubra x e y. A senha é x + y.',
    hint: 'Subtraia a segunda equação da primeira: x − y = 5. Depois substitua em uma das equações.', answers: ['15']
  },
  {
    title: 'O Carro da Fuga', rank: 'Detetive Novato', difficulty: 'INICIANTE',
    narrative: 'Duas imagens de radar registraram os veículos que deixaram o local. As velocidades escondem o próximo código.',
    problem: 'A soma das velocidades dos carros A (x) e B (y) é 140 km/h. A diferença entre A e B é 60 km/h.',
    system: 'x + y = 140\nx − y = 60', objective: 'Encontre as velocidades. A senha é x − y.',
    hint: 'Some as duas equações para eliminar y. Você encontrará 2x = 200.', answers: ['60']
  },
  {
    title: 'A Contagem dos Passageiros', rank: 'Detetive Novato', difficulty: 'INICIANTE',
    narrative: 'Um recibo de bilheteria pode revelar qual transporte o suspeito usou para fugir.',
    problem: 'Na carteira havia 30 notas: algumas de R$ 5 (x) e outras de R$ 20 (y), totalizando R$ 300.',
    system: 'x + y = 30\n5x + 20y = 300', objective: 'Descubra quantas notas havia. A senha é o produto x × y.',
    hint: 'Multiplique a primeira equação por 5 e subtraia da segunda. Assim, 15y = 150.', answers: ['200']
  },
  {
    title: 'A Armadilha dos Dados Falsos', rank: 'Investigador', difficulty: 'INTERMEDIÁRIO',
    narrative: 'O hacker plantou três sistemas. Só um é possível e determinado — isto é, tem exatamente uma solução.',
    problem: 'A) x + y = 4; 2x + 2y = 8\nB) x + y = 3; 2x + 2y = 9\nC) x + y = 5; x − y = 1',
    system: 'Analise: SPD, SPI ou SI?', objective: 'Identifique o sistema com solução única e encontre x. Junte a letra e o valor de x.',
    hint: 'A representa a mesma reta; B tem retas paralelas. Em C, some as equações para obter 2x = 6.', answers: ['c3']
  },
  {
    title: 'O Código Negativo', rank: 'Investigador', difficulty: 'INTERMEDIÁRIO',
    narrative: 'O GPS recuperado está danificado, mas duas retas preservadas apontam para uma coordenada no mapa.',
    problem: 'Encontre o ponto de intersecção das duas retas registradas pelo GPS.',
    system: 'x + y = −3\n2x − y = 6', objective: 'Resolva o sistema. Junte x e y sem espaços para formar a senha.',
    hint: 'Some as equações para eliminar y: 3x = 3. Substitua x = 1 na primeira.', answers: ['1-4', '1,-4', '1 -4']
  },
  {
    title: 'O Enigma dos Decimais', rank: 'Investigador', difficulty: 'INTERMEDIÁRIO',
    narrative: 'A análise química revela duas substâncias. As quantidades exatas formam a combinação do armário de antídotos.',
    problem: 'Os reagentes x e y somam 1,5 g. Cinco vezes x menos duas vezes y resulta em 1,9 g.',
    system: 'x + y = 1,5\n5x − 2y = 1,9', objective: 'Calcule 100 × (x + 2y) e use o resultado como senha.',
    hint: 'Da primeira: y = 1,5 − x. Substituindo na segunda, você obtém x = 0,7 e y = 0,8.', answers: ['230']
  },
  {
    title: 'A Criptografia de 3 Pistas', rank: 'Perito Criminal', difficulty: 'AVANÇADO',
    narrative: 'O cofre principal possui três travas, uma para cada suspeito. Três depoimentos revelam seus valores.',
    problem: 'Resolva o sistema de três variáveis e leia os valores na ordem x, y, z.',
    system: 'x + y + z = 10\nx − y = 0\ny + z = 7', objective: 'A senha tem três dígitos: xyz.',
    hint: 'De x − y = 0, temos x = y. Como y + z = 7, substitua essas relações na primeira.', answers: ['334']
  },
  {
    title: 'O Triângulo de Depoimentos', rank: 'Perito Criminal', difficulty: 'AVANÇADO',
    narrative: 'Os horários de três testemunhas se cruzam. Apenas o escalonamento separa as coincidências dos fatos.',
    problem: 'Determine x, y e z usando os três depoimentos codificados.',
    system: 'x + y + z = 6\n2x − y + z = 3\nx + 2y − z = 2', objective: 'A senha é o produto x × y × z.',
    hint: 'Elimine x comparando a primeira equação com as outras. A solução é formada por três inteiros consecutivos.', answers: ['6']
  },
  {
    title: 'O Teorema do Perito', rank: 'Perito Criminal', difficulty: 'AVANÇADO',
    narrative: 'O laboratório não pede a solução do sistema: quer o determinante da matriz que protege sua porta.',
    problem: 'Calcule o determinante principal (Δ) da matriz de coeficientes abaixo pela regra de Sarrus.',
    system: '| 3   0   1 |\n| 1   2   0 |\n| 1   1   2 |', objective: 'O valor de Δ é a senha.',
    hint: 'Diagonais positivas: 3·2·2 + 0 + 1·1·1 = 13. Diagonais negativas somam 2.', answers: ['11']
  },
  {
    title: 'O Confronto Final', rank: 'Mestre', difficulty: 'MESTRE',
    narrative: 'O computador central está diante de você. A última ficha esconde a identidade do mandante do crime.',
    problem: 'A soma das idades A, B e C é 90. A tem o dobro da idade de B. A soma de A e B supera C em 30 anos. Qual é a idade do mais velho, A?',
    system: 'A + B + C = 90\nA = 2B\nA + B − C = 30', objective: 'A idade de A é a senha final.',
    hint: 'Some a primeira e a terceira equações: 2A + 2B = 120. Então A + B = 60 e A = 2B.', answers: ['40']
  }
];

// Conteúdo de apoio baseado no material didático fornecido.
const LESSONS = [
  { id: 'basics', label: 'Fundamentos', title: 'O que é um sistema?', html: `<p>Um sistema reúne duas ou mais equações que devem ser verdadeiras <strong>ao mesmo tempo</strong>. As letras são as <strong>incógnitas</strong>; os valores que satisfazem todas as equações formam a <strong>solução</strong>.</p><h4>Elementos</h4><ul><li><strong>Equação:</strong> sentença matemática separada pelo sinal =.</li><li><strong>Incógnita:</strong> valor desconhecido, como x, y ou z.</li><li><strong>Solução:</strong> valores que tornam todas as igualdades verdadeiras.</li></ul><div class="lesson-example">x + y = 12\n3x − y = 20\nSolução: (8, 4), pois 8 + 4 = 12 e 3·8 − 4 = 20.</div><div class="lesson-tip">Sempre confira a resposta substituindo os valores em todas as equações.</div>` },
  { id: 'classification', label: 'Classificação', title: 'SPD, SPI ou SI?', html: `<p>Graficamente, cada equação de duas incógnitas representa uma reta.</p><h4>SPD — possível e determinado</h4><p>Tem uma única solução. As retas são <strong>concorrentes</strong>: cruzam-se em um ponto.</p><h4>SPI — possível e indeterminado</h4><p>Tem infinitas soluções. As equações representam a mesma reta.</p><h4>SI — impossível</h4><p>Não tem solução. As retas são paralelas e distintas.</p><div class="lesson-example">x + y = 4 e 2x + 2y = 8 → SPI\nx + y = 3 e 2x + 2y = 9 → SI\nx + y = 5 e x − y = 1 → SPD</div>` },
  { id: 'substitution', label: 'Substituição', title: 'Método da substituição', html: `<p>Isole uma incógnita em uma equação e coloque a expressão encontrada no lugar dela na outra.</p><ol><li>Isole a letra na equação mais simples.</li><li>Substitua na outra equação.</li><li>Resolva a equação com uma incógnita.</li><li>Volte e descubra a outra.</li><li>Confira o par nas duas equações.</li></ol><div class="lesson-example">x + y = 12 → x = 12 − y\n3x − y = 20\n3(12 − y) − y = 20\n36 − 4y = 20 → y = 4\nx = 12 − 4 → x = 8</div>` },
  { id: 'addition', label: 'Adição', title: 'Método da adição', html: `<p>Some as equações para eliminar uma incógnita. Para isso, seus coeficientes devem ser opostos.</p><div class="lesson-example">x + y = 12\n3x − y = 20\n──────────── (+)\n4x = 32 → x = 8\n8 + y = 12 → y = 4</div><p>Se não houver coeficientes opostos, multiplique <strong>todos os termos</strong> de uma ou das duas equações até criá-los.</p><div class="lesson-tip">Use adição quando já enxergar coeficientes iguais com sinais contrários.</div>` },
  { id: 'three', label: '3 incógnitas', title: 'Escalonamento 3 × 3', html: `<p>Em um sistema com x, y e z, elimine incógnitas aos poucos até formar uma “escada”.</p><ol><li>Use a primeira equação para eliminar x das duas seguintes.</li><li>Use a nova segunda equação para eliminar y da terceira.</li><li>Resolva a última equação, que terá apenas z.</li><li>Substitua de baixo para cima para achar y e x.</li></ol><div class="lesson-example">x + y + z = 10\nx − y = 0\ny + z = 7\nDa 2ª: x = y. Da 3ª: z = 7 − y.\nSubstituindo na 1ª: y + y + 7 − y = 10\ny = 3, x = 3, z = 4.</div>` },
  { id: 'cramer', label: 'Cramer', title: 'Regra de Cramer e determinantes', html: `<p>Cramer pode ser usada em sistemas normais — mesmo número de equações e incógnitas — quando o determinante principal D é diferente de zero.</p><div class="lesson-example">x = Dx / D    y = Dy / D    z = Dz / D</div><p>Em uma matriz 3 × 3, a regra de Sarrus soma os produtos das três diagonais descendentes e subtrai os produtos das três diagonais ascendentes.</p><div class="lesson-tip">Se D = 0, Cramer não fornece uma solução única: o sistema pode ser SPI ou SI e exige outra análise.</div>` }
];

const $ = (selector) => document.querySelector(selector);
const elements = {
  intro: $('#introScreen'), game: $('#gameScreen'), victory: $('#victoryScreen'),
  timer: $('#timer'), score: $('#score'), progress: $('#progressBar'), levelNumber: $('#levelNumber'),
  rank: $('#rankLabel'), code: $('#levelCode'), title: $('#levelTitle'), difficulty: $('#difficulty'),
  narrative: $('#narrative'), problem: $('#problem'), system: $('#systemBox'), objective: $('#objective'),
  input: $('#answerInput'), feedback: $('#feedback'), hint: $('#hintBox'), hintBtn: $('#hintBtn'),
  dots: $('#evidenceDots'), continueBtn: $('#continueBtn')
};

const LEVEL_LESSONS = ['addition', 'addition', 'substitution', 'classification', 'addition', 'substitution', 'three', 'three', 'cramer', 'three'];
const METHOD_NAMES = ['Adição', 'Adição', 'Substituição', 'Classificação de sistemas', 'Adição', 'Substituição', 'Substituição em 3 × 3', 'Escalonamento', 'Determinante / Sarrus', 'Sistema 3 × 3'];

let state = { level: 0, score: 1000, seconds: 0, hints: [], started: false };
let timerId = null;

// Normaliza a resposta para aceitar maiúsculas, espaços e vírgulas sem frustrar o jogador.
function normalize(value) { return value.trim().toLowerCase().replace(/\s+/g, '').replace(',', '.'); }

function saveGame() { localStorage.setItem('detetiveEscapeSave', JSON.stringify(state)); }

function loadSavedGame() {
  try {
    const saved = JSON.parse(localStorage.getItem('detetiveEscapeSave'));
    if (saved && saved.started && saved.level < LEVELS.length) elements.continueBtn.classList.remove('hidden');
  } catch (_) { localStorage.removeItem('detetiveEscapeSave'); }
}

function showScreen(name) {
  elements.intro.classList.toggle('hidden', name !== 'intro');
  elements.game.classList.toggle('hidden', name !== 'game');
  elements.victory.classList.toggle('hidden', name !== 'victory');
  elements.victory.classList.toggle('grid', name === 'victory');
}

function startTimer() {
  clearInterval(timerId);
  timerId = setInterval(() => { state.seconds++; updateStatus(); if (state.seconds % 5 === 0) saveGame(); }, 1000);
}

function formatTime(total) {
  const minutes = String(Math.floor(total / 60)).padStart(2, '0');
  const seconds = String(total % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function updateStatus() {
  elements.timer.textContent = formatTime(state.seconds);
  elements.score.textContent = state.score;
}

// Desenha a fase atual usando os dados do banco LEVELS.
function renderLevel() {
  const level = LEVELS[state.level];
  elements.levelNumber.textContent = state.level + 1;
  elements.rank.textContent = level.rank.toUpperCase();
  elements.code.textContent = `EVIDÊNCIA ${String(state.level + 1).padStart(2, '0')}`;
  elements.title.textContent = level.title;
  elements.difficulty.textContent = level.difficulty;
  elements.narrative.textContent = level.narrative;
  elements.problem.textContent = level.problem;
  elements.system.textContent = level.system;
  elements.objective.textContent = level.objective;
  $('#methodLabel').textContent = METHOD_NAMES[state.level];
  elements.progress.style.width = `${(state.level + 1) * 10}%`;
  elements.input.value = '';
  elements.feedback.textContent = '';
  elements.feedback.className = 'feedback min-h-6 mt-3';
  elements.hint.textContent = level.hint;
  elements.hint.classList.toggle('hidden', !state.hints.includes(state.level));
  elements.hintBtn.disabled = state.hints.includes(state.level);
  elements.hintBtn.innerHTML = state.hints.includes(state.level) ? 'DICA REVELADA' : 'SOLICITAR DICA <span class="text-stone-500">−50 pts</span>';
  renderDots(); updateStatus(); saveGame();
  setTimeout(() => elements.input.focus(), 100);
}

function renderDots() {
  elements.dots.innerHTML = LEVELS.map((_, index) =>
    `<div class="evidence-dot ${index < state.level ? 'found' : ''}">${index < state.level ? '✓' : index + 1}</div>`
  ).join('');
}

function beginGame(continueSaved = false) {
  if (continueSaved) {
    try { state = { ...state, ...JSON.parse(localStorage.getItem('detetiveEscapeSave')) }; } catch (_) { /* novo jogo */ }
  } else {
    state = { level: 0, score: 1000, seconds: 0, hints: [], started: true };
  }
  state.started = true;
  showScreen('game'); renderLevel(); startTimer();
}

// Valida a senha; erro custa 25 pontos e acerto avança após uma breve confirmação.
function submitAnswer() {
  const typed = normalize(elements.input.value);
  if (!typed) { elements.feedback.textContent = 'Digite um código antes de tentar desbloquear.'; elements.feedback.classList.add('error'); return; }
  const correct = LEVELS[state.level].answers.some(answer => normalize(answer) === typed);
  if (!correct) {
    state.score = Math.max(0, state.score - 25);
    elements.feedback.textContent = 'ACESSO NEGADO — revise os cálculos. (−25 pontos)';
    elements.feedback.className = 'feedback min-h-6 mt-3 error'; updateStatus(); saveGame(); return;
  }
  elements.feedback.textContent = 'ACESSO LIBERADO — evidência recuperada.';
  elements.feedback.className = 'feedback min-h-6 mt-3 success';
  elements.input.disabled = true; $('#submitBtn').disabled = true;
  setTimeout(() => {
    state.level++;
    elements.input.disabled = false; $('#submitBtn').disabled = false;
    if (state.level >= LEVELS.length) finishGame(); else renderLevel();
  }, 900);
}

function revealHint() {
  if (state.hints.includes(state.level)) return;
  state.hints.push(state.level); state.score = Math.max(0, state.score - 50);
  elements.hint.classList.remove('hidden'); elements.hintBtn.disabled = true;
  elements.hintBtn.textContent = 'DICA REVELADA'; updateStatus(); saveGame();
}

function finishGame() {
  clearInterval(timerId); state.started = false; localStorage.removeItem('detetiveEscapeSave');
  $('#finalTime').textContent = formatTime(state.seconds); $('#finalScore').textContent = state.score;
  showScreen('victory');
}

function resetGame() {
  if (!confirm('Deseja apagar o progresso e reiniciar o caso?')) return;
  clearInterval(timerId); localStorage.removeItem('detetiveEscapeSave'); beginGame(false);
}

// Abre o capítulo solicitado sem pausar ou penalizar o jogador.
function openManual(chapter = 'basics') {
  const selected = LESSONS.find(lesson => lesson.id === chapter) || LESSONS[0];
  $('#manualTabs').innerHTML = LESSONS.map(lesson => `<button class="manual-tab ${lesson.id === selected.id ? 'active' : ''}" data-lesson="${lesson.id}">${lesson.label}</button>`).join('');
  $('#manualContent').innerHTML = `<h3>${selected.title}</h3>${selected.html}`;
  $('#manualModal').classList.remove('hidden'); document.body.style.overflow = 'hidden';
  document.querySelectorAll('[data-lesson]').forEach(button => button.addEventListener('click', () => openManual(button.dataset.lesson)));
}

function closeManual() { $('#manualModal').classList.add('hidden'); document.body.style.overflow = ''; }

$('#startBtn').addEventListener('click', () => beginGame(false));
elements.continueBtn.addEventListener('click', () => beginGame(true));
$('#submitBtn').addEventListener('click', submitAnswer);
elements.input.addEventListener('keydown', event => { if (event.key === 'Enter') submitAnswer(); });
elements.hintBtn.addEventListener('click', revealHint);
$('#resetBtn').addEventListener('click', resetGame);
$('#playAgainBtn').addEventListener('click', () => beginGame(false));
$('#manualBtn').addEventListener('click', () => openManual('basics'));
$('#learnBtn').addEventListener('click', () => openManual('basics'));
$('#levelManualBtn').addEventListener('click', () => openManual(LEVEL_LESSONS[state.level]));
$('#closeManualBtn').addEventListener('click', closeManual);
$('#closeManualFooterBtn').addEventListener('click', closeManual);
document.querySelector('[data-close-manual]').addEventListener('click', closeManual);
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeManual(); });

loadSavedGame(); updateStatus();
