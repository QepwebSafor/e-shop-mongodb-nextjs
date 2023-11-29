

export const formatNumber = (digit: number) => {
  return new Intl.NumberFormat('es-Es').format(digit)
}

