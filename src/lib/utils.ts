export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatCapacity(n: number): string {
  return n.toLocaleString('en-US')
}
