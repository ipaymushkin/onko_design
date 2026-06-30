export interface IcdCode {
  code: string;
  name: string;
}

export const ICD_CODES: IcdCode[] = [
  { code: 'K13.1', name: 'Прикусывание щеки и губ' },
  { code: 'L43.0', name: 'Лишай гипертрофический красный плоский' },
  { code: 'S00.5', name: 'Поверхностная травма губы и полости рта' },
  { code: 'K06.2', name: 'Поражения десны и беззубого альвеолярного края, обусловленные травмой' },
  { code: 'D10.0', name: 'Доброкачественное новообразование губы' },
  { code: 'K13.6', name: 'Гиперплазия слизистой оболочки полости рта' },
  { code: 'L43.9', name: 'Лишай красный плоский неуточнённый' },
  { code: 'D10.3', name: 'Доброкачественное новообразование других и неуточнённых частей рта' },
];

export function getIcdLabel(code: string): string {
  const found = ICD_CODES.find((item) => item.code === code);
  return found ? `${found.code} — ${found.name}` : code;
}
