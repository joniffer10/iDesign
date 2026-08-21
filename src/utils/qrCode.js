/**
 * Pure JavaScript QR Code Generator (ISO/IEC 18004 Standard)
 * Zero external dependencies. High performance & Retina-ready.
 */

// ── 1. Error Correction Levels ──
export const QRErrorCorrectionLevel = {
  L: 1, // ~7% error recovery
  M: 0, // ~15% error recovery
  Q: 3, // ~25% error recovery
  H: 2  // ~30% error recovery
}

// ── 2. Galois Field GF(2^8) Math for Reed-Solomon ──
const EXP_TABLE = new Uint8Array(512)
const LOG_TABLE = new Uint8Array(256)

for (let i = 0, x = 1; i < 255; i++) {
  EXP_TABLE[i] = x
  EXP_TABLE[i + 255] = x
  LOG_TABLE[x] = i
  x = (x << 1) ^ (x >= 128 ? 0x11d : 0)
}

function glog(n) {
  if (n < 1) throw new Error(`glog(${n}) invalid`)
  return LOG_TABLE[n]
}

function gexp(n) {
  while (n < 0) n += 255
  while (n >= 255) n -= 255
  return EXP_TABLE[n]
}

function polyMultiply(p1, p2) {
  const result = new Uint8Array(p1.length + p2.length - 1)
  for (let i = 0; i < p1.length; i++) {
    for (let j = 0; j < p2.length; j++) {
      if (p1[i] !== 0 && p2[j] !== 0) {
        result[i + j] ^= gexp(glog(p1[i]) + glog(p2[j]))
      }
    }
  }
  return result
}

function getGeneratorPoly(numEcWords) {
  let poly = new Uint8Array([1])
  for (let i = 0; i < numEcWords; i++) {
    poly = polyMultiply(poly, new Uint8Array([1, gexp(i)]))
  }
  return poly
}

function polyDivide(dividend, divisor) {
  const result = new Uint8Array(dividend)
  for (let i = 0; i < dividend.length - divisor.length + 1; i++) {
    const coef = result[i]
    if (coef !== 0) {
      for (let j = 1; j < divisor.length; j++) {
        if (divisor[j] !== 0) {
          result[i + j] ^= gexp(glog(divisor[j]) + glog(coef))
        }
      }
    }
  }
  return result.slice(dividend.length - divisor.length + 1)
}

// ── 3. QR Code Specifications Table (Versions 1 to 40) ──
// [TotalDataCodewords, [EcWordsPerBlock, NumBlocksG1, DataWordsG1, NumBlocksG2, DataWordsG2] for L, M, Q, H]
// Format per level: [ecWordsPerBlock, numBlocks1, dataWords1, numBlocks2, dataWords2]
const EC_TABLE = [
  null,
  // V1 (21x21)
  { L: [7, 1, 19, 0, 0], M: [10, 1, 16, 0, 0], Q: [13, 1, 13, 0, 0], H: [17, 1, 9, 0, 0] },
  // V2 (25x25)
  { L: [10, 1, 34, 0, 0], M: [16, 1, 28, 0, 0], Q: [22, 1, 22, 0, 0], H: [28, 1, 16, 0, 0] },
  // V3 (29x29)
  { L: [15, 1, 55, 0, 0], M: [26, 1, 44, 0, 0], Q: [18, 2, 17, 0, 0], H: [22, 2, 13, 0, 0] },
  // V4 (33x33)
  { L: [20, 1, 80, 0, 0], M: [18, 2, 32, 0, 0], Q: [26, 2, 24, 0, 0], H: [16, 4, 9, 0, 0] },
  // V5 (37x37)
  { L: [26, 1, 108, 0, 0], M: [24, 2, 43, 0, 0], Q: [18, 2, 15, 2, 16], H: [22, 2, 11, 2, 12] },
  // V6 (41x41)
  { L: [18, 2, 68, 0, 0], M: [16, 4, 27, 0, 0], Q: [24, 4, 19, 0, 0], H: [28, 4, 15, 0, 0] },
  // V7 (45x45)
  { L: [20, 2, 78, 0, 0], M: [18, 4, 31, 0, 0], Q: [18, 2, 14, 4, 15], H: [26, 4, 13, 1, 14] },
  // V8 (49x49)
  { L: [24, 2, 97, 0, 0], M: [22, 2, 38, 2, 39], Q: [22, 4, 18, 2, 19], H: [26, 4, 14, 2, 15] },
  // V9 (53x53)
  { L: [30, 2, 116, 0, 0], M: [22, 3, 36, 2, 37], Q: [20, 4, 16, 4, 17], H: [24, 4, 12, 4, 13] },
  // V10 (57x57)
  { L: [18, 2, 68, 2, 69], M: [26, 4, 43, 1, 44], Q: [24, 6, 19, 2, 20], H: [28, 6, 15, 2, 16] },
  // V11 (61x61)
  { L: [20, 4, 81, 0, 0], M: [30, 1, 50, 4, 51], Q: [28, 4, 22, 4, 23], H: [24, 3, 12, 8, 13] },
  // V12 (65x65)
  { L: [24, 2, 92, 2, 93], M: [22, 6, 36, 2, 37], Q: [26, 4, 20, 6, 21], H: [28, 7, 14, 4, 15] },
  // V13 (69x69)
  { L: [26, 4, 107, 0, 0], M: [22, 8, 37, 1, 38], Q: [24, 8, 20, 4, 21], H: [22, 12, 11, 4, 12] },
  // V14 (73x73)
  { L: [30, 3, 115, 1, 116], M: [24, 4, 40, 5, 41], Q: [20, 11, 16, 5, 17], H: [24, 11, 12, 5, 13] },
  // V15 (77x77)
  { L: [22, 5, 87, 1, 88], M: [24, 5, 41, 5, 42], Q: [30, 5, 24, 7, 25], H: [24, 11, 12, 7, 13] },
  // V16 (81x81)
  { L: [24, 5, 98, 1, 99], M: [28, 7, 45, 3, 46], Q: [24, 15, 19, 2, 20], H: [30, 3, 15, 13, 16] },
  // V17 (85x85)
  { L: [28, 1, 107, 5, 108], M: [28, 10, 46, 1, 47], Q: [28, 1, 22, 15, 23], H: [28, 2, 14, 17, 15] },
  // V18 (89x89)
  { L: [30, 5, 120, 1, 121], M: [26, 9, 43, 4, 44], Q: [28, 17, 22, 1, 23], H: [28, 2, 14, 19, 15] },
  // V19 (93x93)
  { L: [28, 3, 113, 4, 114], M: [26, 3, 44, 11, 45], Q: [26, 17, 21, 4, 22], H: [26, 9, 13, 16, 14] },
  // V20 (97x97)
  { L: [28, 3, 107, 5, 108], M: [26, 3, 41, 13, 42], Q: [30, 15, 24, 5, 25], H: [28, 15, 15, 10, 16] }
]

// Alignment Pattern Positions per version
const ALIGNMENT_PATTERN_POS = [
  [],
  [],
  [6, 18],
  [6, 22],
  [6, 26],
  [6, 30],
  [6, 34],
  [6, 22, 38],
  [6, 24, 42],
  [6, 26, 46],
  [6, 28, 50],
  [6, 30, 54],
  [6, 32, 58],
  [6, 34, 62],
  [6, 26, 46, 66],
  [6, 26, 48, 70],
  [6, 26, 50, 74],
  [6, 30, 54, 78],
  [6, 30, 56, 82],
  [6, 30, 58, 86],
  [6, 34, 62, 90]
]

// Format Information Format Bits
const FORMAT_INFO = [
  [0x5412, 0x5125, 0x5e7c, 0x5b4b, 0x45f9, 0x40ce, 0x4f97, 0x4aa0], // L (index 1)
  [0x77c4, 0x72f3, 0x7daa, 0x789d, 0x662f, 0x6318, 0x6c41, 0x6976], // M (index 0)
  [0x1689, 0x13b0, 0x1ce7, 0x19d0, 0x0762, 0x0255, 0x0d0c, 0x083b], // Q (index 3)
  [0x355f, 0x3068, 0x3f31, 0x3a06, 0x24b4, 0x2183, 0x2eda, 0x2bed]  // H (index 2)
]

// ── 4. UTF-8 Byte Encoder ──
function encodeStringToUtf8(str) {
  const bytes = []
  for (let i = 0; i < str.length; i++) {
    let code = str.charCodeAt(i)
    if (code < 0x80) {
      bytes.push(code)
    } else if (code < 0x800) {
      bytes.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f))
    } else if (code < 0xd800 || code >= 0xe000) {
      bytes.push(0xe0 | (code >> 12), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f))
    } else {
      i++
      code = 0x10000 + (((code & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff))
      bytes.push(
        0xf0 | (code >> 18),
        0x80 | ((code >> 12) & 0x3f),
        0x80 | ((code >> 6) & 0x3f),
        0x80 | (code & 0x3f)
      )
    }
  }
  return bytes
}

// ── 5. Bit Buffer ──
class BitBuffer {
  constructor() {
    this.buffer = []
    this.length = 0
  }
  put(num, length) {
    for (let i = 0; i < length; i++) {
      this.putBit(((num >>> (length - i - 1)) & 1) === 1)
    }
  }
  putBit(bit) {
    const bufIndex = Math.floor(this.length / 8)
    if (this.buffer.length <= bufIndex) {
      this.buffer.push(0)
    }
    if (bit) {
      this.buffer[bufIndex] |= (0x80 >>> (this.length % 8))
    }
    this.length++
  }
  getBytes() {
    return this.buffer
  }
}

// ── 6. Auto-Determine QR Version ──
function getCapacity(version, ecLevel) {
  const spec = EC_TABLE[version][ecLevel]
  const totalDataBytes = spec[1] * spec[2] + spec[3] * spec[4]
  return totalDataBytes
}

function findMinimumVersion(dataByteLength, ecLevel) {
  for (let v = 1; v <= 20; v++) {
    const capacity = getCapacity(v, ecLevel)
    const headerBits = 4 + (v < 10 ? 8 : 16)
    const requiredBytes = Math.ceil((headerBits + dataByteLength * 8) / 8)
    if (requiredBytes <= capacity) {
      return v
    }
  }
  return 20
}

// ── 7. Generate Encoded Data & Error Correction Codewords ──
function createData(version, ecLevel, utf8Bytes) {
  const spec = EC_TABLE[version][ecLevel]
  const totalDataBytes = spec[1] * spec[2] + spec[3] * spec[4]
  const buffer = new BitBuffer()

  // 1. Mode indicator (0100 for 8-bit byte mode)
  buffer.put(0b0100, 4)

  // 2. Character count indicator
  const charCountBits = version < 10 ? 8 : 16
  buffer.put(utf8Bytes.length, charCountBits)

  // 3. Data bytes
  for (let i = 0; i < utf8Bytes.length; i++) {
    buffer.put(utf8Bytes[i], 8)
  }

  // 4. Terminator (up to 4 zeroes)
  const totalDataBits = totalDataBytes * 8
  const terminatorLen = Math.min(4, totalDataBits - buffer.length)
  if (terminatorLen > 0) {
    buffer.put(0, terminatorLen)
  }

  // 5. Byte alignment padding
  while (buffer.length % 8 !== 0) {
    buffer.putBit(false)
  }

  // 6. Pad bytes (0xEC, 0x11 alternating)
  const padBytes = [0xec, 0x11]
  let padIdx = 0
  while (buffer.length < totalDataBits) {
    buffer.put(padBytes[padIdx % 2], 8)
    padIdx++
  }

  const rawData = buffer.getBytes()

  // 7. Split into blocks & generate Reed-Solomon EC bytes
  const ecWordsPerBlock = spec[0]
  const numBlocks1 = spec[1]
  const dataWords1 = spec[2]
  const numBlocks2 = spec[3]
  const dataWords2 = spec[4]
  const totalBlocks = numBlocks1 + numBlocks2

  const dataBlocks = []
  const ecBlocks = []
  const genPoly = getGeneratorPoly(ecWordsPerBlock)

  let offset = 0
  for (let i = 0; i < totalBlocks; i++) {
    const isGroup2 = i >= numBlocks1
    const blockSize = isGroup2 ? dataWords2 : dataWords1
    const blockData = rawData.slice(offset, offset + blockSize)
    offset += blockSize
    dataBlocks.push(blockData)

    // Calculate EC
    const dividend = new Uint8Array(blockSize + ecWordsPerBlock)
    dividend.set(blockData)
    const ec = polyDivide(dividend, genPoly)
    ecBlocks.push(ec)
  }

  // 8. Interleave Data & EC codewords
  const finalCodewords = []
  const maxDataLen = Math.max(dataWords1, dataWords2)
  for (let j = 0; j < maxDataLen; j++) {
    for (let i = 0; i < totalBlocks; i++) {
      if (j < dataBlocks[i].length) {
        finalCodewords.push(dataBlocks[i][j])
      }
    }
  }

  for (let j = 0; j < ecWordsPerBlock; j++) {
    for (let i = 0; i < totalBlocks; i++) {
      finalCodewords.push(ecBlocks[i][j])
    }
  }

  return finalCodewords
}

// ── 8. Mask Evaluation & Matrix Layout ──
const MASK_PATTERNS = [
  (r, c) => (r + c) % 2 === 0,
  (r, c) => r % 2 === 0,
  (r, c) => c % 3 === 0,
  (r, c) => (r + c) % 3 === 0,
  (r, c) => (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0,
  (r, c) => ((r * c) % 2) + ((r * c) % 3) === 0,
  (r, c) => (((r * c) % 2) + ((r * c) % 3)) % 2 === 0,
  (r, c) => (((r + c) % 2) + ((r * c) % 3)) % 2 === 0
]

function createMatrix(size) {
  const matrix = Array.from({ length: size }, () => new Int8Array(size).fill(-1))
  const reserved = Array.from({ length: size }, () => new Uint8Array(size).fill(0))
  return { matrix, reserved, size }
}

function placeFinderPattern(mat, r, c) {
  const { matrix, reserved, size } = mat
  for (let y = -1; y <= 7; y++) {
    for (let x = -1; x <= 7; x++) {
      const row = r + y
      const col = c + x
      if (row >= 0 && row < size && col >= 0 && col < size) {
        let isDark = false
        if (y >= 0 && y <= 6 && x >= 0 && x <= 6) {
          if (y === 0 || y === 6 || x === 0 || x === 6 || (y >= 2 && y <= 4 && x >= 2 && x <= 4)) {
            isDark = true
          }
        }
        matrix[row][col] = isDark ? 1 : 0
        reserved[row][col] = 1
      }
    }
  }
}

function placeAlignmentPattern(mat, r, c) {
  const { matrix, reserved } = mat
  for (let y = -2; y <= 2; y++) {
    for (let x = -2; x <= 2; x++) {
      const row = r + y
      const col = c + x
      if (reserved[row][col]) continue
      const isDark = Math.abs(y) === 2 || Math.abs(x) === 2 || (y === 0 && x === 0)
      matrix[row][col] = isDark ? 1 : 0
      reserved[row][col] = 1
    }
  }
}

function buildBaseMatrix(version) {
  const size = version * 4 + 17
  const mat = createMatrix(size)

  // 1. Finder Patterns
  placeFinderPattern(mat, 0, 0)
  placeFinderPattern(mat, 0, size - 7)
  placeFinderPattern(mat, size - 7, 0)

  // 2. Timing Patterns
  for (let i = 8; i < size - 8; i++) {
    if (!mat.reserved[6][i]) {
      mat.matrix[6][i] = i % 2 === 0 ? 1 : 0
      mat.reserved[6][i] = 1
    }
    if (!mat.reserved[i][6]) {
      mat.matrix[i][6] = i % 2 === 0 ? 1 : 0
      mat.reserved[i][6] = 1
    }
  }

  // 3. Alignment Patterns
  const alignPos = ALIGNMENT_PATTERN_POS[version] || []
  for (let i = 0; i < alignPos.length; i++) {
    for (let j = 0; j < alignPos.length; j++) {
      const r = alignPos[i]
      const c = alignPos[j]
      if (!mat.reserved[r][c]) {
        placeAlignmentPattern(mat, r, c)
      }
    }
  }

  // 4. Dark Module
  mat.matrix[4 * version + 9][8] = 1
  mat.reserved[4 * version + 9][8] = 1

  // 5. Reserve Format Info areas
  for (let i = 0; i < 9; i++) {
    if (i !== 6) mat.reserved[8][i] = 1
    if (i !== 6) mat.reserved[i][8] = 1
  }
  for (let i = size - 8; i < size; i++) {
    mat.reserved[8][i] = 1
  }
  for (let i = size - 7; i < size; i++) {
    mat.reserved[i][8] = 1
  }

  return mat
}

function placeFormatInfo(mat, ecLevel, maskPattern) {
  const { matrix, size } = mat
  const ecIdx = ecLevel === 'M' ? 1 : ecLevel === 'L' ? 0 : ecLevel === 'H' ? 3 : 2
  const formatData = FORMAT_INFO[ecIdx][maskPattern]

  for (let i = 0; i < 15; i++) {
    const bit = ((formatData >> i) & 1) === 1 ? 1 : 0

    // Top-left
    if (i < 6) {
      matrix[i][8] = bit
    } else if (i < 8) {
      matrix[i + 1][8] = bit
    } else if (i === 8) {
      matrix[8][7] = bit
    } else {
      matrix[8][14 - i] = bit
    }

    // Split across top-right and bottom-left
    if (i < 8) {
      matrix[8][size - i - 1] = bit
    } else {
      matrix[size - 15 + i][8] = bit
    }
  }
}

function placeData(mat, codewords, maskPattern) {
  const { matrix, reserved, size } = mat
  const maskFn = MASK_PATTERNS[maskPattern]
  let bitIdx = 0
  const totalBits = codewords.length * 8

  let inc = -1
  let row = size - 1
  let col = size - 1

  while (col > 0) {
    if (col === 6) col-- // Skip vertical timing pattern column

    for (let c = 0; c < 2; c++) {
      const currentCol = col - c
      if (!reserved[row][currentCol]) {
        let bit = 0
        if (bitIdx < totalBits) {
          const byteVal = codewords[Math.floor(bitIdx / 8)]
          bit = (byteVal >>> (7 - (bitIdx % 8))) & 1
          bitIdx++
        }
        // Apply mask
        if (maskFn(row, currentCol)) {
          bit ^= 1
        }
        matrix[row][currentCol] = bit
      }
    }

    row += inc
    if (row < 0 || row >= size) {
      row -= inc
      inc = -inc
      col -= 2
    }
  }
}

function calculatePenalty(matrix, size) {
  let penalty = 0

  // Feature 1: Adjacent modules in row/column in same color (5+ in a row)
  for (let r = 0; r < size; r++) {
    let count = 0
    let last = -1
    for (let c = 0; c < size; c++) {
      const current = matrix[r][c]
      if (current === last) {
        count++
        if (count === 5) penalty += 3
        else if (count > 5) penalty += 1
      } else {
        last = current
        count = 1
      }
    }
  }

  for (let c = 0; c < size; c++) {
    let count = 0
    let last = -1
    for (let r = 0; r < size; r++) {
      const current = matrix[r][c]
      if (current === last) {
        count++
        if (count === 5) penalty += 3
        else if (count > 5) penalty += 1
      } else {
        last = current
        count = 1
      }
    }
  }

  // Feature 2: 2x2 blocks of same color
  for (let r = 0; r < size - 1; r++) {
    for (let c = 0; c < size - 1; c++) {
      const val = matrix[r][c]
      if (val === matrix[r + 1][c] && val === matrix[r][c + 1] && val === matrix[r + 1][c + 1]) {
        penalty += 3
      }
    }
  }

  return penalty
}

// ── 9. Main QR Generation Entrypoint ──
export function generateQRCodeMatrix(value, options = {}) {
  const text = typeof value === 'string' ? value : String(value || '')
  let ecLevel = (options.errorCorrection || 'M').toUpperCase()
  if (!['L', 'M', 'Q', 'H'].includes(ecLevel)) ecLevel = 'M'

  // Boost EC level to H if a center logo is requested and level was low
  if (options.hasLogo && (ecLevel === 'L' || ecLevel === 'M')) {
    ecLevel = 'H'
  }

  const utf8Bytes = encodeStringToUtf8(text)
  const minVersion = findMinimumVersion(utf8Bytes.length, ecLevel)
  const version = Math.max(minVersion, options.minVersion || 1)
  const codewords = createData(version, ecLevel, utf8Bytes)

  let bestMask = 0
  let minPenalty = Infinity
  let bestMatrix = null

  // Evaluate all 8 masks and pick the one with optimal scannability
  for (let mask = 0; mask < 8; mask++) {
    const mat = buildBaseMatrix(version)
    placeData(mat, codewords, mask)
    placeFormatInfo(mat, ecLevel, mask)

    const penalty = calculatePenalty(mat.matrix, mat.size)
    if (penalty < minPenalty) {
      minPenalty = penalty
      bestMask = mask
      bestMatrix = mat.matrix
    }
  }

  const moduleCount = version * 4 + 17
  const isDark = (row, col) => {
    if (row < 0 || row >= moduleCount || col < 0 || col >= moduleCount) return false
    return bestMatrix[row][col] === 1
  }

  return {
    version,
    ecLevel,
    mask: bestMask,
    moduleCount,
    matrix: bestMatrix,
    isDark
  }
}

// ── 10. SVG Path & Geometric Utilities ──
export function isFinderPatternModule(r, c, moduleCount) {
  // Top-left: [0..6, 0..6]
  if (r <= 6 && c <= 6) return true
  // Top-right: [0..6, moduleCount-7..moduleCount-1]
  if (r <= 6 && c >= moduleCount - 7) return true
  // Bottom-left: [moduleCount-7..moduleCount-1, 0..6]
  if (r >= moduleCount - 7 && c <= 6) return true
  return false
}

export function isCenterLogoZone(r, c, moduleCount, logoRatio = 0.26) {
  const center = (moduleCount - 1) / 2
  const halfSpan = Math.ceil((moduleCount * logoRatio) / 2)
  return Math.abs(r - center) <= halfSpan && Math.abs(c - center) <= halfSpan
}

/**
 * Generate SVG path data for crisp standard rects or rounded dots
 */
export function generateSVGPaths({
  matrix,
  moduleCount,
  margin = 2,
  variant = 'default',
  hasLogo = false,
  logoRatio = 0.26
}) {
  const totalCells = moduleCount + margin * 2
  const cellSize = 10
  const totalViewBox = totalCells * cellSize

  let bodyPath = ''
  let finderPath = ''

  for (let r = 0; r < moduleCount; r++) {
    for (let c = 0; c < moduleCount; c++) {
      if (matrix[r][c] !== 1) continue

      // If there is a center logo, skip modules directly in the center safe zone
      if (hasLogo && isCenterLogoZone(r, c, moduleCount, logoRatio)) {
        continue
      }

      const x = (c + margin) * cellSize
      const y = (r + margin) * cellSize
      const isFinder = isFinderPatternModule(r, c, moduleCount)

      if (variant === 'rounded') {
        if (isFinder) {
          // Keep finder patterns clean
          finderPath += `M${x},${y} h${cellSize} v${cellSize} h-${cellSize} Z `
        } else {
          // Dots for data modules
          const radius = cellSize * 0.44
          const cx = x + cellSize / 2
          const cy = y + cellSize / 2
          bodyPath += `M${cx - radius},${cy} a${radius},${radius} 0 1,0 ${radius * 2},0 a${radius},${radius} 0 1,0 -${radius * 2},0 `
        }
      } else {
        // Crisp standard rectangles
        const rectSvg = `M${x},${y} h${cellSize} v${cellSize} h-${cellSize} Z `
        if (isFinder) {
          finderPath += rectSvg
        } else {
          bodyPath += rectSvg
        }
      }
    }
  }

  return {
    totalViewBox,
    cellSize,
    bodyPath: bodyPath.trim(),
    finderPath: finderPath.trim()
  }
}
