import { Button } from "components/button/button";
import { Button as NBbtn } from "native-base";
import React from 'react';
interface CaptureButtonProps {
    onPressAdd: () => void;
    onPressPreview: () => void;
}
export function CaptureButton(props: CaptureButtonProps) {
    return <NBbtn.Group isAttached flex='1'>
        <Button tx="common.camera-add" flex='1' onPress={props.onPressAdd} />
        <Button tx="common.camera-preview" flex='1' variant='subtle'  onPress={props.onPressPreview} />
    </NBbtn.Group>
}