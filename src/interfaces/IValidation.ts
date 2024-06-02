export interface IValidation {
  validate: (data: Record<string, unknown>) => Error | null;
}
