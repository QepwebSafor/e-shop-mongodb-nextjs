import React from 'react'

const formatPrice = (amount: number) => {
  return new Intl.NumberFormat('es-Es', {
    style:'currency',
    currency:'EUR'
  }).format(amount)
}

export default formatPrice