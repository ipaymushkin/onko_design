export interface CapturedFrame {
  id: string;
  timestamp: string;
  source: 'ai' | 'manual';
  icdCode: string;
  probability: number;
  hasSpectrogram: boolean;
}

export interface SpectrogramZone {
  label: string;
  values: number[];
  pathologyProbability: number;
  icdCode: string;
}

export interface SpectrogramData {
  frameId: string;
  zones: SpectrogramZone[];
}

export interface PatientInfo {
  medicalCardNumber: string;
  screeningDate: string;
}

export interface DeviceStatus {
  id: string;
  name: string;
  connected: boolean;
  model: string;
}

export const MOCK_PATIENT: PatientInfo = {
  medicalCardNumber: 'МК-2024-0847',
  screeningDate: '30.06.2025',
};

export const MOCK_DEVICES: DeviceStatus[] = [
  { id: 'camera', name: 'Интраоральная камера', connected: true, model: 'OralCam Pro X2' },
  { id: 'spectrometer', name: 'Спектрометр', connected: true, model: 'SpecOral S-300' },
];

export const MOCK_FRAMES: CapturedFrame[] = [
  {
    id: '1',
    timestamp: '14:32:08',
    source: 'ai',
    icdCode: 'K13.1',
    probability: 85,
    hasSpectrogram: true,
  },
  {
    id: '2',
    timestamp: '14:33:45',
    source: 'manual',
    icdCode: 'K13.6',
    probability: 72,
    hasSpectrogram: true,
  },
  {
    id: '3',
    timestamp: '14:35:12',
    source: 'ai',
    icdCode: 'L43.0',
    probability: 68,
    hasSpectrogram: false,
  },
  {
    id: '4',
    timestamp: '14:36:01',
    source: 'ai',
    icdCode: 'D10.0',
    probability: 91,
    hasSpectrogram: true,
  },
];

export const MOCK_SPECTROGRAM: SpectrogramData = {
  frameId: '1',
  zones: [
    {
      label: 'Зона здоровой слизистой',
      values: [420, 480, 520, 490, 450, 410, 380],
      pathologyProbability: 12,
      icdCode: '—',
    },
    {
      label: 'Граница очага патологии',
      values: [380, 520, 680, 720, 650, 580, 490],
      pathologyProbability: 74,
      icdCode: 'K13.1',
    },
    {
      label: 'Центр очага патологии',
      values: [350, 490, 750, 820, 780, 690, 520],
      pathologyProbability: 88,
      icdCode: 'K13.1',
    },
  ],
};

export const CLINICAL_RECOMMENDATIONS = [
  'Рекомендуется повторный осмотр через 2 недели для контроля динамики выявленных изменений.',
  'При сохранении паттеровых зон — направление к онкологу-стоматологу для биопсии.',
  'Исключить механическую травму (прикусывание щеки) на период наблюдения.',
  'Провести профессиональную гигиену полости рта.',
];

export const AI_CONCLUSION =
  'По результатам видеоосмотра и спектрального анализа выявлены участки с признаками патологии слизистой оболочки полости рта. Наиболее вероятный диагноз: K13.1 Прикусывание щеки и губ (85%), K13.6 Гиперплазия слизистой (72%). Рекомендуется динамическое наблюдение и при необходимости — гистологическое исследование.';
