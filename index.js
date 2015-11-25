var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  View,
} = React;


var validAttributes = {
  ...ReactIOSViewAttributes.UIView,
  qrData: true,
  foregroundColor: true,
};

var RNQRCodeView = createReactIOSNativeComponentClass({
  validAttributes: validAttributes,
  uiViewClassName: 'RNQRCodeView',
});

var QRCodeViewIOS = React.createClass({
  mixins: [NativeMethodsMixin],

  propTypes: {
    style: View.propTypes.style,
    qrData: View.PropTypes.array,
    foregroundColor: View.PropTypes.string,
  },
  
  render: function() 
  {
    return (
      <RNQRCodeView
      	{...this.props} />
    );
  }
});

module.exports = QRCodeViewIOS;