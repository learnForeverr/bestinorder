import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import Home from './src/view/Home';

const App = () => {
  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor="rgba(0,0,0,0)"
        barStyle="dark-content"
      />
      <Home />
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
