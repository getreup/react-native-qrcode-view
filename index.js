var React = require('react-native');

var { requireNativeComponent } = React;

class QRCodeView extends React.Component {
  render() {
    return <RNQRCodeView {...this.props} />;
  }
}

QRCodeView.propTypes = {
	
};

var RNQRCodeView = requireNativeComponent('RNQRCodeView', QRCodeView);

module.exports = QRCodeView;