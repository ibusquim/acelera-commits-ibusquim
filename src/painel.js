// Liga os dados da nave às funções de nave.js e mostra o resultado na página.
// Quer mudar o que aparece no painel? Comece mexendo no objeto `nave` abaixo.

import {
  calcularCombustivel,
  distanciaTotal,
  formatarDistancia,
  formatarRota,
  percentualDoTanque,
  podeDecolar,
  proximaParada,
  statusDoMotor,
} from './nave.js';

const nave = {
  posicaoAtual: 'Terra',
  combustivel: 46000,
  capacidadeDoTanque: 50000,
  consumoPorKm: 0.01,
  temperaturaMotor: 64,
  escotilhasFechadas: true,
  tripulacao: ['Comandante Ada', 'Byte'],
  rota: [
    { destino: 'Lua', distancia: 384400 },
    { destino: 'Estação Órbita', distancia: 650000 },
    { destino: 'Marte', distancia: 2400000 },
  ],
};

const DESCRICAO_DO_MOTOR = {
  frio: 'Frio: aqueça antes de partir',
  ideal: 'Ideal',
  quente: 'Quente: reduza a potência',
  superaquecido: 'Superaquecido: desligue agora!',
};

function escrever(id, texto) {
  document.getElementById(id).textContent = texto;
}

function mostrarPainel() {
  const liberada = podeDecolar(nave);
  escrever('decolagem', liberada ? 'Liberada' : 'Bloqueada');
  document.getElementById('decolagem').dataset.estado = liberada ? 'ok' : 'alerta';
  escrever(
    'mensagem-ada',
    liberada
      ? 'Comandante Ada: tudo pronto, tripulação. Bom voo!'
      : 'Comandante Ada: ainda não. Confira os instrumentos antes de decolar.',
  );

  const percentual = percentualDoTanque(nave.combustivel, nave.capacidadeDoTanque);
  const necessario = calcularCombustivel(distanciaTotal(nave.rota), nave.consumoPorKm);
  escrever('combustivel-percentual', `${percentual}%`);
  document.getElementById('combustivel-barra').style.width = `${percentual}%`;
  escrever(
    'combustivel-detalhe',
    `${nave.combustivel} L no tanque; a rota inteira precisa de ${Math.ceil(necessario)} L.`,
  );

  const status = statusDoMotor(nave.temperaturaMotor);
  escrever('motor-status', DESCRICAO_DO_MOTOR[status]);
  document.getElementById('motor-status').dataset.estado = status === 'ideal' ? 'ok' : 'alerta';
  escrever('motor-temperatura', `${nave.temperaturaMotor} °C`);

  const proxima = proximaParada(nave.rota, nave.posicaoAtual);
  escrever('rota', formatarRota(nave.posicaoAtual, nave.rota));
  escrever(
    'rota-detalhe',
    `Distância total: ${formatarDistancia(distanciaTotal(nave.rota))}. ` +
      (proxima ? `Próxima parada: ${proxima}.` : 'Chegamos ao destino final.'),
  );

  const lista = document.getElementById('tripulacao');
  lista.replaceChildren(
    ...nave.tripulacao.map((nome) => {
      const item = document.createElement('li');
      item.textContent = nome;
      return item;
    }),
  );
}

mostrarPainel();
