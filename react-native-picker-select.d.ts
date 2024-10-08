declare module 'react-native-picker-select' {
    import { PickerStyle } from 'react-native';
    import * as React from 'react';

    export interface PickerSelectProps {
        onValueChange(value: any, index: number): void;
        items: Array<{ label: string; value: any; key?: string }>;
        placeholder?: { label: string; value: null };
        style?: {
            inputIOS?: PickerStyle;
            inputAndroid?: PickerStyle;
            placeholder?: PickerStyle;
        };
        value?: any;
        // other relevant props
    }

    export default class RNPickerSelect extends React.Component<PickerSelectProps> {}
}