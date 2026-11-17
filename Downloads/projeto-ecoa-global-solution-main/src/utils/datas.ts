function paraDataIso(data: Date) {
  const ano = data.getFullYear()
  const mes = String(data.getMonth() + 1).padStart(2, '0')
  const dia = String(data.getDate()).padStart(2, '0')
  return `${ano}-${mes}-${dia}`
}

// Primeiro dia que pode ser agendado: amanhã
export function dataDeAmanha() {
  const amanha = new Date()
  amanha.setDate(amanha.getDate() + 1)
  return paraDataIso(amanha)
}

// Horários de atendimento: das 8h às 16h30, de meia em meia hora
export const HORARIOS: string[] = []
for (let hora = 8; hora < 17; hora++) {
  const texto = String(hora).padStart(2, '0')
  HORARIOS.push(`${texto}:00`, `${texto}:30`)
}

// "2026-11-20T14:00:00" -> "sexta-feira, 20 de novembro, às 14:00"
export function formatarDataHora(dataHora: string) {
  const [data, hora = ''] = dataHora.split('T')
  const [ano, mes, dia] = data.split('-').map(Number)
  const dataLocal = new Date(ano, mes - 1, dia)
  const texto = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(dataLocal)
  return `${texto}, às ${hora.slice(0, 5)}`
}