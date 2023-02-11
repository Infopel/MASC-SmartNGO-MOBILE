import { DistrictsByProvinceResult, GetRawDistrictsByProvinceResult } from "../api.types"

export function parseDistrictsByProvinceResult(
  input: GetRawDistrictsByProvinceResult,
): DistrictsByProvinceResult {
  const { id, name } = input.province
  const districts: { id: number; name: string }[] = []
  for (const { id, name } of input.province.districts) {
    districts.push({ id, name })
  }
  return { districts, id, name }
}
