export async function userTapsDatePickerOkButtonAndroid() {
  // selecting element by text does not work consistently :/
  const okButton = element(by.text("OK"))
  // const okButton = element(
  //   by
  //     .type('androidx.appcompat.widget.AppCompatButton')
  //     .withAncestor(by.type('android.widget.ScrollView')),
  // ).atIndex(1);
  await okButton.tap()
}

export const getDatePickerAndroid = () => {
  //element(by.type("android.widget.DatePicker"))

  return by.type("android.widget.ScrollView").withAncestor(by.type("android.widget.DatePicker"))
}

export async function userTapsDatePickerCancelButtonAndroid() {
  // selecting element by text does not work consistently :/
  const cancelButton = element(by.text("Cancel"))
  // const cancelButton = element(
  //   by
  //     .type('androidx.appcompat.widget.AppCompatButton')
  //     .withAncestor(by.type('android.widget.ScrollView')),
  // ).atIndex(0);
  await cancelButton.tap()
}
