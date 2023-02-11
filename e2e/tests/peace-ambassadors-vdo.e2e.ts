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

    //     •	Código do membro: gerado automaticamente, concatenando código do grupo e número incremental;
    // •	NOME DO MEMBRO: caixa de texto;
    // •	Data de nascimento: campo de selecção de data;
    // •	ESTADO CIVIL: caixa de selecção única com lista de estados civis;
    // •	FUNÇÃO: caixa de selecção única com opções líder religioso, líder comunitário, outro (especificar qual);
    // •	NIVEL DE ESCOLARIDADE: caixa de texto;
    // •	É MEMBRO ACTIVO: caixa de selecção com opções sim | não;
    // •	Caso preencha não:
    // o	PORQUÊ  DESISTIU: caixa de texto longo;

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

    //     •	Data de realização: caixa de selecção de data;
    // •	Tipo de acção: caixa de selecção com opções formação | reunião regular | mesa redonda, acções de advocacia | petições | outro (especificar qual);
    // •	Nome da acção: caixa de texto;
    // •	Objectivo da acção: caixa de texto;
    // •	Coordenador da acção: caixa de texto;
    // •	Nr de Participantes (Homens): caixa numérica;
    // •	Nr de Participantes (Mulheres): caixa numérica;
    // •	Observações: caixa de texto longo;

    await element(by.id("date")).typeText("Paulo Amorim")
    await element(by.id("action-type")).tap()
    await element(by.id("action-type")).atIndex(1).tap()
    await element(by.id("name")).typeText("Alguma ação")
    await element(by.id("goal")).typeText("Algum objectivo de ação")
    await element(by.id("coordenator")).typeText("Algum objectivo de ação")
    await element(by.id("number'of'participants-male")).typeText("4")
    await element(by.id("number'of'participants-female")).typeText("2")
    await element(by.id("save")).tap()
    await expect(element(by.id("add-action-bottom-sheet"))).not.toBeVisible()
  })
})
