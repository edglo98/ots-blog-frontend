export const capitalizeFirstWord = (text) => text.charAt(0).toUpperCase() + text.slice(1)

export function calculateReadTime(item) {
  const wpm = 225;
  const content = JSON.parse(item.content.data.content)
  const words = content.blocks.reduce((counter, item) => {
    if (item.type === 'image') return counter
    const text = item.data?.text || ''
    const wordsInItem = text.trim().split(/\s+/).length;
    return counter + wordsInItem
  }, 0)

  return Math.ceil(words / wpm);
}

export const formatDate = (
  date,
  params
) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    ...params,
  };
  const dateFormat = new Intl.DateTimeFormat('es-ES', options);
  return dateFormat.format(date);
};