/**
 * 테스트
 * @param a
 * @param b
 */
export const sum = (a: number, b: number) => {
  return a + b;
};

/**
 * 숫자 콤마 단위로 변환
 * @param num
 * @example
 *  numberWithComma(1000) // 1,000
 *  numberWithComma('1000') // 1,000
 */
export const numberWithComma = (num: string | number = 0) => {
  return Number(num).toLocaleString();
};
