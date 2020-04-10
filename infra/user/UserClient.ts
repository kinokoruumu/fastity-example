import { APIClient } from "../../foundation/utils/APIClientUtils";

export type FetchMeParams = void;
export type FetchMeResponse = {};

export async function fetchMe(apiClient: APIClient): Promise<FetchMeResponse> {
  const { data } = await apiClient.get<FetchMeResponse>("/users/me");

  return data;
}
