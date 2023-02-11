import { createInitiative, CreateInitiativeParams } from "storage/mutations/createInitiative"
describe("Create Civic Incubator", () => {
  it("should take a function with all params and return a void", async () => {
    const incubator: CreateInitiativeParams = {
      name: "Simple Initiative",
      adminPost: "Matequenhula",
      districtId: "5",
      latLng: {
        latitude: 31.25697,
        longitude: 3245892,
      },
      locality: "Matola gare",
      dateConstitution: 245845,
      provinceId: "20",
    }
    expect(await createInitiative(incubator)).resolves
  })
  it("should take a function missing any params and return an error", () => {})
})
