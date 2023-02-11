import { translate } from "i18n/translate"
import * as React from "react"
import { } from 'react-native-image-crop-picker'
import { fireEvent, render, waitFor, within } from "utils/test-utils/test-utils"
import { ImageCapture } from "./image-capture"

describe("<ImageCapture>", () => {
  const images = ['simple-image', 'simple-image2', 'simple-image3', 'simple-image4']
  const title = "Simple image capture"
  const onChangeMock = jest.fn();
  it("render", async function () {
    const { toJSON } = render(<ImageCapture title={title} onChangeImages={onChangeMock} images={[]}></ImageCapture>)
    expect(toJSON()).toMatchSnapshot()
  })

  it("should render no image", () => {
    const { getByText } = render(<ImageCapture title={title} onChangeImages={onChangeMock} images={[]}></ImageCapture>)
    expect(getByText((translate('common.camera-add')))).toBeTruthy()
    expect(getByText((translate('common.camera-preview')))).toBeTruthy()


  })

  it("should render image thumbnail with 1 image", () => {
    const _images = [images[0]]
    const { getAllByRole, debug } = render(<ImageCapture title={title} onChangeImages={onChangeMock} images={_images}></ImageCapture>)
    const imagesView = getAllByRole('image')

    expect(imagesView.length).toBe(_images.length)

    for (let i = 0; i < imagesView.length; i++) {
      const image = imagesView[i]
      expect(image).toHaveProp('source', { uri: _images[i] })
    }

  })
  it("should render image thumbnail with 4 image", () => {
    const { getAllByRole, debug } = render(<ImageCapture title={title} onChangeImages={onChangeMock} images={images}></ImageCapture>)
    const imagesView = getAllByRole('image')

    expect(imagesView.length).toBe(images.length)

    for (let i = 0; i < imagesView.length; i++) {
      const image = imagesView[i]
      expect(image).toHaveProp('source', { uri: images[i] })
    }

  })

  it("should render image preview with 4 image", () => {

    const { getByText, getByAccessibilityState, } = render(<ImageCapture title={title} onChangeImages={onChangeMock} images={images}></ImageCapture>)

    fireEvent.press(getByText((translate('common.camera-preview'))))
    const { getAllByRole, getByA11yState } = within(getByAccessibilityState({ expanded: true }))

    const imagesView = getAllByRole('imagebutton')
    expect(imagesView.length).toBe(images.length)
    expect(getByA11yState({ selected: true })).toHaveProp('source', { uri: images[0] })

    for (let i = 0; i < imagesView.length; i++) {
      const image = within(imagesView[i])
      expect(image.getByRole('image')).toHaveProp('source', { uri: images[i] })
    }



  })
  it("should set second image selected at preview", () => {
    const selectedIndex = 1
    const { getByText, getByAccessibilityState, } = render(<ImageCapture title={title} onChangeImages={onChangeMock} images={images}></ImageCapture>)

    fireEvent.press(getByText((translate('common.camera-preview'))))
    const { getAllByRole, getByA11yState } = within(getByAccessibilityState({ expanded: true }))

    const imagesView = getAllByRole('imagebutton')
    const path = images[selectedIndex]
    fireEvent.press(imagesView[selectedIndex])
    expect(getByA11yState({ selected: true })).toHaveProp('source', { uri: path })
  })
  it("should render add an image", async () => {
    const newImages = [...images, 'simple-image5']
    const { getByText } = render(<ImageCapture title={title} images={images} onChangeImages={onChangeMock}></ImageCapture>)

    fireEvent.press(getByText((translate('common.camera-add'))))

    await waitFor(
      () => expect(onChangeMock).toHaveBeenCalledWith(newImages)
    )

  })
  it("should render remove an image", () => {
    const removedIndex = 2

    const newImages = [...images]
    newImages.splice(removedIndex, 1)
    const { getByText, getByAccessibilityState } = render(<ImageCapture title={title} onChangeImages={onChangeMock} images={images}></ImageCapture>)

    fireEvent.press(getByText((translate('common.camera-preview'))))
    const { queryAllByRole } = within(getByAccessibilityState({ expanded: true }))

    const {getByRole} = within(queryAllByRole('imagebutton')[removedIndex]) 

    fireEvent.press(getByRole('button', {name: translate('common.remove')}))

    expect(onChangeMock).toHaveBeenCalledWith(newImages)


  })
  it("should close previewer", () => {
    const { getByText, queryByAccessibilityState, getByTestId } = render(<ImageCapture title={title} onChangeImages={onChangeMock} images={images}></ImageCapture>)

    fireEvent.press(getByText((translate('common.camera-preview'))))
    expect(queryByAccessibilityState({ expanded: true })).toBeTruthy()
    fireEvent.press(getByTestId(('close-previewer')))
    expect(queryByAccessibilityState({ expanded: true })).toBeFalsy()

  })

})
