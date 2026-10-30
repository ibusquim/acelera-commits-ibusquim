// Funções puras do painel de bordo da AceleraOne.
// "Pura" quer dizer: a mesma entrada sempre devolve a mesma saída, e nada fora da função é alterado.

/** Temperatura mínima (°C) para o motor estar pronto. */
export const TEMPERATURA_MINIMA = 20;

/** Temperatura máxima (°C) de operação normal do motor. */
export const TEMPERATURA_MAXIMA = 90;

/** Acima desta temperatura (°C) o motor está superaquecido. */
export const TEMPERATURA_CRITICA = 120;

/**
 * Calcula quanto combustível a nave gasta para percorrer uma distância.
 *
 * @param {number} distancia Distância do trecho, em quilômetros.
 * @param {number} consumoPorKm Litros gastos a cada quilômetro.
 * @returns {number} Litros necessários para o trecho.
 * @throws {RangeError} Se a distância ou o consumo forem negativos.
 * @example
 * calcularCombustivel(1000, 0.5); // 500
 */
export function calcularCombustivel(distancia, consumoPorKm) {
  if (distancia < 0 || consumoPorKm < 0) {
    throw new RangeError('Distância e consumo não podem ser negativos.');
  }
  return distancia * consumoPorKm;
}

/**
 * Diz quantos por cento do tanque estão cheios, arredondado para o inteiro mais próximo.
 *
 * @param {number} litros Combustível atual no tanque.
 * @param {number} capacidade Capacidade total do tanque, em litros.
 * @returns {number} Um número de 0 a 100.
 * @throws {RangeError} Se a capacidade não for maior que zero.
 * @example
 * percentualDoTanque(750, 1000); // 75
 */
export function percentualDoTanque(litros, capacidade) {
  if (capacidade <= 0) {
    throw new RangeError('A capacidade do tanque precisa ser maior que zero.');
  }
  const percentual = Math.round((litros / capacidade) * 100);
  return Math.min(100, Math.max(0, percentual));
}

/**
 * Traduz a temperatura do motor em um status legível.
 *
 * - abaixo de 20 °C: `'frio'`
 * - de 20 °C a 90 °C: `'ideal'`
 * - acima de 90 °C até 120 °C: `'quente'`
 * - acima de 120 °C: `'superaquecido'`
 *
 * @param {number} temperatura Temperatura do motor, em graus Celsius.
 * @returns {'frio' | 'ideal' | 'quente' | 'superaquecido'} Status do motor.
 * @example
 * statusDoMotor(65); // 'ideal'
 */
export function statusDoMotor(temperatura) {
  if (temperatura < TEMPERATURA_MINIMA) return 'frio';
  if (temperatura <= TEMPERATURA_MAXIMA) return 'ideal';
  if (temperatura <= TEMPERATURA_CRITICA) return 'quente';
  return 'superaquecido';
}

/**
 * Soma a distância de todos os trechos de uma rota.
 *
 * @param {{ destino: string, distancia: number }[]} rota Lista de paradas, em ordem.
 * @returns {number} Distância total, em quilômetros.
 * @example
 * distanciaTotal([{ destino: 'Lua', distancia: 384400 }]); // 384400
 */
export function distanciaTotal(rota) {
  return rota.reduce((total, parada) => total + parada.distancia, 0);
}

/**
 * Encontra a próxima parada depois da posição atual da nave.
 *
 * @param {{ destino: string, distancia: number }[]} rota Lista de paradas, em ordem.
 * @param {string} posicaoAtual Nome do lugar onde a nave está agora.
 * @returns {string | null} O destino seguinte, ou `null` se a nave já está na última parada.
 *   Se a posição atual não estiver na rota, devolve a primeira parada.
 * @example
 * proximaParada([{ destino: 'Lua', distancia: 1 }, { destino: 'Marte', distancia: 2 }], 'Lua'); // 'Marte'
 */
export function proximaParada(rota, posicaoAtual) {
  const indice = rota.findIndex((parada) => parada.destino === posicaoAtual);
  const proxima = rota[indice + 1];
  return proxima ? proxima.destino : null;
}

/**
 * Monta o texto da rota para exibir no painel, com setas entre as paradas.
 *
 * @param {string} origem Lugar de onde a nave parte.
 * @param {{ destino: string, distancia: number }[]} rota Lista de paradas, em ordem.
 * @returns {string} Algo como `'Terra → Lua → Marte'`.
 * @example
 * formatarRota('Terra', [{ destino: 'Lua', distancia: 384400 }]); // 'Terra → Lua'
 */
export function formatarRota(origem, rota) {
  return [origem, ...rota.map((parada) => parada.destino)].join(' → ');
}

/**
 * Formata uma distância com separador de milhar no padrão brasileiro.
 *
 * @param {number} km Distância em quilômetros (é arredondada para inteiro).
 * @returns {string} Algo como `'384.400 km'`.
 * @example
 * formatarDistancia(384400); // '384.400 km'
 */
export function formatarDistancia(km) {
  const inteiro = String(Math.round(km));
  return `${inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.')} km`;
}

/**
 * Confere se a nave pode decolar. Todas as condições precisam ser verdadeiras:
 * motor com status `'ideal'`, escotilhas fechadas, pelo menos uma pessoa a bordo
 * e combustível suficiente para a rota inteira.
 *
 * @param {object} nave Estado atual da nave.
 * @param {number} nave.combustivel Litros no tanque.
 * @param {number} nave.consumoPorKm Litros gastos a cada quilômetro.
 * @param {number} nave.temperaturaMotor Temperatura do motor, em °C.
 * @param {boolean} nave.escotilhasFechadas Se todas as escotilhas estão fechadas.
 * @param {string[]} nave.tripulacao Nomes de quem está a bordo.
 * @param {{ destino: string, distancia: number }[]} nave.rota Paradas planejadas.
 * @returns {boolean} `true` se a decolagem está liberada.
 */
export function podeDecolar(nave) {
  const combustivelNecessario = calcularCombustivel(distanciaTotal(nave.rota), nave.consumoPorKm);
  return (
    statusDoMotor(nave.temperaturaMotor) === 'ideal' &&
    nave.escotilhasFechadas &&
    nave.tripulacao.length > 0 &&
    nave.combustivel >= combustivelNecessario
  );
}
