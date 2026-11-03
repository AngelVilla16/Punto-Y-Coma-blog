export const TUTORIAL_LEVELS = ['Inicial', 'Intermedio', 'Avanzado'] as const

export type TutorialLevel = (typeof TUTORIAL_LEVELS)[number]
