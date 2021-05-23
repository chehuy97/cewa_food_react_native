import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface componentNameProps {}

const StoreItem = () => {
  return (
    <View style={styles.container}>
      <Text>StoreItem</Text>
    </View>
  );
};

export default StoreItem;

const styles = StyleSheet.create({
  container: {}
});
