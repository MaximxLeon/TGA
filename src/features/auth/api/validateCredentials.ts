import { greenApiFetch } from '@/shared/api/';

type ValidateCredentialsParams = {
  idInstance: string;
  apiTokenInstance: string;
};

export async function validateCredentials({
  idInstance,
  apiTokenInstance,
}: ValidateCredentialsParams) {
  const response = await greenApiFetch(
    `/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`,
  );

  const text = await response.text();

  if (!response.ok) {
    throw new Error(`GREEN-API error: ${response.status} ${text}`);
  }

  if (!text) {
    return false;
  }

  const data = JSON.parse(text);

  return data.stateInstance === "authorized";
}
