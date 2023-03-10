import { element, expect, waitFor } from "detox"
import { getDatePickerAndroid, userTapsDatePickerOkButtonAndroid } from "../utils"

describe("Peace Ambassadors", function () {
  beforeEach(async () => {
    await device.launchApp({ newInstance: true })
    await expect(element(by.id("login-screen"))).toExist()
    await element(by.id("loginBtn")).tap()
    await expect(element(by.id("home-screen"))).toExist()
    await element(by.text("Peace Ambassadors")).tap()
    await expect(element(by.id("peace-ambassadors-and-vdo-screen"))).toBeVisible()
  })

  it("Create new PA", async function () {
    await element(by.text("New")).tap()
    waitFor(element(by.id("new-peace-ambassadors-and-vdo-screen"))).toBeVisible()
    await element(by.id("groupCode")).typeText("tebd7586")
    await element(by.id("province")).tap()
    await element(by.id("province")).atIndex(2).tap()
    await element(by.id("district")).tap()
    await element(by.id("district")).atIndex(2).tap()
    await element(by.id("zone")).typeText("Matola gare")

    /***start Date Picker */
    await element(by.id("dateOfConstitution")).tap()
    const datePicker = element(getDatePickerAndroid())
    await datePicker.swipe("left", "fast", 1)
    await datePicker.tap({ x: 50, y: 200 })
    await userTapsDatePickerOkButtonAndroid()
    /***end Date Picker */

    waitFor(element(by.id("numberOfMembers"))).toBeVisible()
    await element(by.id("numberOfMembers")).typeText("10")
    await element(by.id("numberOfActiveMembers")).typeText("8")
    await element(by.id("save")).tap()
  })
  it("should show members", async () => {
    await element(by.label("Peace ambassadors item")).atIndex(2).tap()
    waitFor(element(by.id("peace-ambassadors-and-vdo-details-screen"))).toBeVisible()
    await element(by.id("members")).tap()
  })
  it("should show actions", async () => {
    await element(by.label("Peace ambassadors item")).atIndex(2).tap()
    waitFor(element(by.id("peace-ambassadors-and-vdo-details-screen"))).toBeVisible()
    await element(by.id("actions")).tap()
  })
  it("Add PA Member", async function () {
    await element(by.label("Peace ambassadors item")).atIndex(2).tap()
    waitFor(element(by.id("peace-ambassadors-and-vdo-details-screen"))).toBeVisible()
    await element(by.id("members")).tap()
    await element(by.label("Add member")).tap()
    await expect(element(by.id("add-member-bottom-sheet"))).toBeVisible()

    //     ???	C??digo do membro: gerado automaticamente, concatenando c??digo do grupo e n??mero incremental;
    // ???	NOME DO MEMBRO: caixa de texto;
    // ???	Data de nascimento: campo de selec????o de data;
    // ???	ESTADO CIVIL: caixa de selec????o ??nica com lista de estados civis;
    // ???	FUN????O: caixa de selec????o ??nica com op????es l??der religioso, l??der comunit??rio, outro (especificar qual);
    // ???	NIVEL DE ESCOLARIDADE: caixa de texto;
    // ???	?? MEMBRO ACTIVO: caixa de selec????o com op????es sim | n??o;
    // ???	Caso preencha n??o:
    // o	PORQU??  DESISTIU: caixa de texto longo;

    // await element(by.id("code")).typeText()
    await element(by.id("member-name")).typeText("Paulo Amorim")
    await element(by.id("civil-status")).tap()
    await element(by.id("civil-status")).atIndex(1).tap()
    await element(by.id("function")).atIndex(1).tap()
    await element(by.id("school-level")).typeText("12 classe")
    await element(by.id("active-member")).atIndex(1).tap()
    await element(by.id("given-up-reason")).typeText("Some weird text here")
    await element(by.id("save")).tap()
    await expect(element(by.id("add-member-bottom-sheet"))).not.toBeVisible()
  })
  it("New PA Action", async function () {
    await element(by.label("Peace ambassadors item")).atIndex(2).tap()
    waitFor(element(by.id("peace-ambassadors-and-vdo-details-screen"))).toBeVisible()
    await element(by.id("actions")).tap()
    await element(by.label("Add action")).tap()
    await expect(element(by.id("add-action-bottom-sheet"))).toBeVisible()

    //     ???	Data de realiza????o: caixa de selec????o de data;
    // ???	Tipo de ac????o: caixa de selec????o com op????es forma????o | reuni??o regular | mesa redonda, ac????es de advocacia | peti????es | outro (especificar qual);
    // ???	Nome da ac????o: caixa de texto;
    // ???	Objectivo da ac????o: caixa de texto;
    // ???	Coordenador da ac????o: caixa de texto;
    // ???	Nr de Participantes (Homens): caixa num??rica;
    // ???	Nr de Participantes (Mulheres): caixa num??rica;
    // ???	Observa????es: caixa de texto longo;

    await element(by.id("date")).typeText("Paulo Amorim")
    await element(by.id("action-type")).tap()
    await element(by.id("action-type")).atIndex(1).tap()
    await element(by.id("name")).typeText("Alguma a????o")
    await element(by.id("goal")).typeText("Algum objectivo de a????o")
    await element(by.id("coordenator")).typeText("Algum objectivo de a????o")
    await element(by.id("number'of'participants-male")).typeText("4")
    await element(by.id("number'of'participants-female")).typeText("2")
    await element(by.id("save")).tap()
    await expect(element(by.id("add-action-bottom-sheet"))).not.toBeVisible()
  })
})
