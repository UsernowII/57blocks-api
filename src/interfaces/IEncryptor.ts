export type EncryptPayload = {
  id: string;
  email: string;
};
export interface IEncryptor {
  encrypt: (payload: EncryptPayload) => string;

  decrypt: (token: string) => string;
}
