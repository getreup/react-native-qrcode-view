<h2 align="center">react-native-qrcode-view</h2>

<p align="center">
A React Native View to display QR Codes in.
</p>

<p align="center">
<a href="https://badge.fury.io/js/react-native-qrcode-view"><img src="https://badge.fury.io/js/react-native-qrcode-view.svg" alt="npm version" height="18"></a><br />
<a href="https://nodei.co/npm/react-native-qrcode-view/"><img src="https://nodei.co/npm/react-native-qrcode-view.png"></a>
</p>


### TODO
- [ ] Native Support
- [x] Android Support
- [x] IOS Support

### Installation

All that is needed is installing through npm:

`npm i react-native-qrcode-view --save`

### Usage

```JSX
var React = require('react-native');

var QRCodeView = require('react-native-qrcode-view');

var {
AppRegistry,
StyleSheet,
View,
} = React;

var myQRCodeString = "Hi, please turn me into a qr code!";

var QRCodeDemo = React.createClass(
{

render: function()
{

return (
<View style={styles.container}>

<QRCodeView data={myQRCodeString} dimension={dimension} style={styles.qrcode} />

</View>
);
}
});

var styles = StyleSheet.create({
container:{
flex: 1,
alignItems: 'stretch',
flexDirection: 'column',
},
qrcode: {
padding: 50,
alignItems:'center',
},
});

module.exports = QRCodeDemo;


```

### Methods

`setData`

Takes a string and generates a new QRCode.  The data can be set by a prop or through this method after being rendered.

### Options

Configuration options are specified as attributes on the `<QRCodeView />` element.

#### Dimension (MANDATORY)

Prop `dimension`

This prop is mandatory and determines the width/height of the qrcode grid.

#### Data (OPTIONAL)

Prop: `data`

A plain string to be converted into a qrcode.  May be set after rendering with the 'setData' method.  Defaults to an empty string.

#### Positive Color (OPTIONAL)

Prop `positiveColor`

**Defaults to black**

This is the positive color in the qrcode.

#### Negative Color (OPTIONAL)

Prop `negativeColor`

**Defaults to white**

This is the negative color in the qrcode.