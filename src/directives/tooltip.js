
export default {
  mounted(el, binding) {
    const tooltip = document.createElement('div')

    tooltip.textContent = binding.value


    tooltip.className = `
      absolute
      bg-gray-800 text-white text-xs
      px-2 py-1 rounded
      whitespace-nowrap
      pointer-events-none
      opacity-0 transition-opacity duration-150
      z-50
    `

    el._tooltip = tooltip

    el.addEventListener('mouseenter', () => {
      document.body.appendChild(tooltip)

      const rect = el.getBoundingClientRect()

      const margin = 8
      tooltip.style.left = rect.right + 'px'
      tooltip.style.top = rect.top - margin + 'px'

      tooltip.classList.remove('opacity-0')
      tooltip.classList.add('opacity-100')
    })

    el.addEventListener('mouseleave', () => {
      tooltip.classList.remove('opacity-100')
      tooltip.classList.add('opacity-0')

      setTimeout(() => {
        if (tooltip.parentNode) {
          tooltip.parentNode.removeChild(tooltip)
        }
      }, 150)
    })
  },

  updated(el, binding) {
    if (el._tooltip) el._tooltip.textContent = binding.value
  },

  unmounted(el) {
    if (el._tooltip) el._tooltip.remove()
  },
}
