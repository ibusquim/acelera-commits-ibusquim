import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  calcularCombustivel,
  distanciaTotal,
  formatarDistancia,
  formatarRota,
  percentualDoTanque,
  podeDecolar,
  proximaParada,
  statusDoMotor,
} from '../src/nave.js';

const rota = [
  { destino: 'Lua', distancia: 384400 },
  { destino: 'Marte', distancia: 1000000 },
  { destino: 'Júpiter', distancia: 2000000 },
];

function naveProntaParaDecolar() {
  return {
    combustivel: 50000,
    consumoPorKm: 0.01,
    temperaturaMotor: 60,
    escotilhasFechadas: true,
    tripulacao: ['Ada', 'Byte'],
    rota,
  };
}

test('calcularCombustivel multiplica distância pelo consumo', () => {
  assert.equal(calcularCombustivel(1000, 0.5), 500);
  assert.equal(calcularCombustivel(0, 2), 0);
});

test('calcularCombustivel recusa valores negativos', () => {
  assert.throws(() => calcularCombustivel(-1, 1), RangeError);
  assert.throws(() => calcularCombustivel(1, -1), RangeError);
});

test('percentualDoTanque arredonda e fica entre 0 e 100', () => {
  assert.equal(percentualDoTanque(750, 1000), 75);
  assert.equal(percentualDoTanque(1, 3), 33);
  assert.equal(percentualDoTanque(1200, 1000), 100);
  assert.equal(percentualDoTanque(-5, 1000), 0);
  assert.throws(() => percentualDoTanque(10, 0), RangeError);
});

test('statusDoMotor respeita as faixas de temperatura', () => {
  assert.equal(statusDoMotor(5), 'frio');
  assert.equal(statusDoMotor(20), 'ideal');
  assert.equal(statusDoMotor(90), 'ideal');
  assert.equal(statusDoMotor(91), 'quente');
  assert.equal(statusDoMotor(120), 'quente');
  assert.equal(statusDoMotor(121), 'superaquecido');
});

test('distanciaTotal soma todos os trechos', () => {
  assert.equal(distanciaTotal(rota), 3384400);
  assert.equal(distanciaTotal([]), 0);
});

test('proximaParada devolve o destino seguinte', () => {
  assert.equal(proximaParada(rota, 'Lua'), 'Marte');
  assert.equal(proximaParada(rota, 'Marte'), 'Júpiter');
});

test('proximaParada devolve null na última parada', () => {
  assert.equal(proximaParada(rota, 'Júpiter'), null);
});

test('proximaParada começa pela primeira parada quando a nave ainda não partiu', () => {
  assert.equal(proximaParada(rota, 'Terra'), 'Lua');
  assert.equal(proximaParada([], 'Terra'), null);
});

test('formatarRota junta as paradas com setas', () => {
  assert.equal(formatarRota('Terra', rota), 'Terra → Lua → Marte → Júpiter');
  assert.equal(formatarRota('Terra', []), 'Terra');
});

test('formatarDistancia usa ponto como separador de milhar', () => {
  assert.equal(formatarDistancia(384400), '384.400 km');
  assert.equal(formatarDistancia(3384400), '3.384.400 km');
  assert.equal(formatarDistancia(999), '999 km');
  assert.equal(formatarDistancia(1234.6), '1.235 km');
});

test('podeDecolar libera a nave quando tudo está certo', () => {
  assert.equal(podeDecolar(naveProntaParaDecolar()), true);
});

test('podeDecolar segura a nave se faltar alguma condição', () => {
  assert.equal(podeDecolar({ ...naveProntaParaDecolar(), combustivel: 100 }), false);
  assert.equal(podeDecolar({ ...naveProntaParaDecolar(), temperaturaMotor: 10 }), false);
  assert.equal(podeDecolar({ ...naveProntaParaDecolar(), escotilhasFechadas: false }), false);
  assert.equal(podeDecolar({ ...naveProntaParaDecolar(), tripulacao: [] }), false);
});
