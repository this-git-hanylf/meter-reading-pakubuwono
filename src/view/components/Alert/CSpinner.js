import React from 'react';
import { Modal, View, Text, ActivityIndicator } from 'react-native';
import Style from '../../../theme/Style';

const CSpinner = props => (
    <Modal onRequestClose={() => null} visible={props.visible} transparent>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ borderRadius: 10, backgroundColor: 'white', padding: 25 }}>
          <Text style={Style.textBlack}>Loading</Text>
          <ActivityIndicator size="large" color="#0000ff" timestamp="1000" />
        </View>
      </View>
    </Modal>
  );

export default CSpinner;