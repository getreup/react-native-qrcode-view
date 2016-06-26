import React from 'react';
import {InteractionManager, StyleSheet, View} from 'react-native';
import JSQR from 'javascript-qrcode';

export default class QRCodeView extends React.Component {
  static defaultProps = {
    data : "",
    positiveColor : 'black',
    negativeColor : 'white',
    dimension : 200,
  };

  constructor(props) {
    super(props);

    this.state = {
      qrElements: []
    };
  }

  componentDidMount() {
    this.dataUpdated(this.props.data);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.dataUpdated(nextProps.data);
    }
  }

  dataUpdated(data) {
    let qrcode = new JSQR.QrCode(data);
    let matrix = qrcode.getData();
    let posCol = this.props.positiveColor;
    let negCol = this.props.negativeColor;

    let blockDim = Math.floor(this.props.dimension / matrix.length);
    let startIndex = -1;
    let qrElements = matrix.map((row, index) =>
      <View key={index} style={[styles.row, {height: blockDim}]}>
          {row.map((value, column) => {
            if (startIndex < 0) startIndex = column;

            // check if the next column is the same
            let isLastColumn = column >= row.length - 1;
            let nextColumnValueSame = !isLastColumn && (value == row[column + 1]);

            if (nextColumnValueSame) {
              return null; // don't do anything
            }

            let numBlocks = column - startIndex + 1;
            startIndex = -1;

            return <View key={index + "-" + column} style={[styles.block, {
              width: blockDim * numBlocks,
              height: blockDim,
              backgroundColor: value == '1' ? posCol : negCol
            }]}/>
          })}
      </View>
    );

    this.setState({qrElements: qrElements});
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.positiveColor !== this.props.positiveColor) return true;
    if (nextProps.negativeColor !== this.props.negativeColor) return true;
    if (nextProps.dimension !== this.props.dimension) return true;
    if (nextState.qrElements !== this.state.qrElements) return true;

    return false;
  }

  render () {
    return (
      <View ref='container' style={this.props.style}>
        <View style={[styles.container]}>
          {this.state.qrElements}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'stretch',
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  block: {
  },
  instructionContainer: {
    backgroundColor:'blue',
  },
  instructionText: {
    fontSize: 22,
    margin:10,
  },
  backgroundView: {
    position: 'absolute',
  },
});