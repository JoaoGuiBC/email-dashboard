export enum RETURN_TYPES {
  SUCCESS,
  VALIDATION_ERROR,
  SERVER_ERROR,
}

export type ActionReturn = {
  type: RETURN_TYPES
  errors?: Record<string, string[] | undefined>
  message?: string
}
