/**
 *
 * @param str string
 * @returns Record<string, string | null>
 */
export function parseQs(str: string) {
  const parse: Record<string, string | null> = {}
  let tmp = str.replace('?', '')
  tmp.split('&').forEach((it: any) => {
    it = it.split('=')
    parse[it[0]] = it[1] !== '' ? it[1] : null
  })

  return parse
}
