export function toUtc(dateIso: string): Date {
  const d = new Date(dateIso)
  if (Number.isNaN(d.getTime())) throw new Error('Invalid date')
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))
}
