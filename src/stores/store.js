import { reactive } from 'vue'

const COLS = 5
const ROWS = 7

export const cells = reactive(
  Array.from(Array(COLS).keys()).map((i) =>
    Array.from(Array(ROWS).keys()).map((i) => '')
  )
)

export function evalCell(exp) {
  if (!exp.startsWith('=')) {
    return exp
  }

  if (exp.startsWith('=SUM(')) {
    
    const match =exp.slice(0).match(/=SUM\((.+)\)/)
    const rangeExp =match[1] // Remove '=SUM(' and ')'
    // const rangeExp = exp.slice(5, -1); // Remove '=SUM(' and ')'
    
    const [startCell, endCell] = rangeExp.split(':');
    const [startCol, startRow] = parseCellCoordinates(startCell);
    const [endCol, endRow] = parseCellCoordinates(endCell);
   
    let sum = 0;
    for (let r = startRow; r <= endRow; r++) {
      for (let c = startCol; c <= endCol; c++) {
        sum += Number(getCellValue(c, r)) || 0;
      }
    }
    
    return sum;
  }
  
  // = A1 + B2 ---> get(0,1) + get(1,2)
  exp = exp
    .slice(1)
    .replace(
      /([A-Za-z])(\d{1,2})/g,
    (_, c, r) => `get(${c.toUpperCase().charCodeAt(0) - 65},${r})`      
    )
    
  try {
    // console.log(exp)
    // console.log(cells[1][0])
    // console.log(new Function('get', `return ${exp}`)(getCellValue));
    return new Function('get', `return ${exp}`)(getCellValue)
  } catch (e) {
    return `#ERROR ${e}`
  }
}

function parseCellCoordinates(cellExp) {
  const colLetter = cellExp.match(/[A-Za-z]+/)[0]; 
  const rowNumber = Number(cellExp.match(/\d+/)[0]);
  const colIndex = colLetter.toUpperCase().split('').reduce((sum, char, i) => {
    return sum + (char.charCodeAt(0) - 65 + 1) * Math.pow(26, colLetter.length - i - 1);
  }, 0) - 1;
  
  const rowIndex = rowNumber;
 
  return [colIndex, rowIndex];
}

function getCellValue(c, r) {
  // console.log(ROWS - 1)
  const val = evalCell(cells[c][r])
  const num = Number(val)
  return Number.isFinite(num) ? num : val
}


