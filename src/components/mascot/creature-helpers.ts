export function patch(
  base: number[][],
  ops: Array<[row: number, col: number, colorIndex: number]>
): number[][] {
  const result = base.map((row) => [...row]);
  for (const [r, c, colorIndex] of ops) {
    if (r >= 0 && r < result.length && c >= 0 && c < result[r].length) {
      result[r][c] = colorIndex;
    }
  }
  return result;
}

export function shift(base: number[][], dr: number, dc: number): number[][] {
  const rows = base.length;
  const cols = rows > 0 ? base[0].length : 0;
  const result = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const newR = r + dr;
      const newC = c + dc;
      if (newR >= 0 && newR < rows && newC >= 0 && newC < cols) {
        result[newR][newC] = base[r][c];
      }
    }
  }
  return result;
}
