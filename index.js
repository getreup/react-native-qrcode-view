import React from 'react';
import {StyleSheet, View} from 'react-native';
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
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.data !== this.props.data) return true;
    if (nextProps.positiveColor !== this.props.positiveColor) return true;
    if (nextProps.negativeColor !== this.props.negativeColor) return true;
    if (nextProps.dimension !== this.props.dimension) return true;

    return false;
  }

  render () {
    let qrcode = new JSQR.QrCode(this.props.data);
    let matrix = qrcode.getData();
    let posCol = this.props.positiveColor;
    let negCol = this.props.negativeColor;

    let blockDim = Math.floor(this.props.dimension / matrix.length);
    let startIndex = -1;
    return (
      <View ref='container' style={this.props.style}>
        <View style={[styles.container]}>
          {matrix.map((row, index) => <View key={index} style={[styles.row, {height: blockDim}]}>
            {row.map((value, column) => {
              if (startIndex < 0) startIndex = column;

              // check if the next column is the same
              let isLastColumn = column >= row.length - 1;
              let nextColumnValueSame = !isLastColumn && (value == row[column + 1]);

              if (nextColumnValueSame) {
                return null; // dont do anything
              }

              var thisStartIndex = startIndex;
              var numBlocks = column - startIndex + 1;
              startIndex = -1;
              return <View key={index + "-" + column} style={[styles.block, {
                width: blockDim * numBlocks,
                height: blockDim,
                backgroundColor: value == '1' ? posCol : negCol
              }]}/>;
            })}</View>)}
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