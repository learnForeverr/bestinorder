import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {useAnimatedReaction, useSharedValue} from 'react-native-reanimated';
import BarGraph from '../component/BarGraph';
import {
  animationTiming,
  dataFn,
  getNormalizeVal,
  getPositions,
} from '../constants/config';

const Home = () => {
  const [state, setState] = useState(dataFn());
  const [year, setYear] = useState(2010);
  const [normalizeVal, setNormalizeVal] = useState(getNormalizeVal(state));

  const positions = useSharedValue(getPositions(state));

  useAnimatedReaction(
    () => state,
    (_, prev) => {
      if (prev !== null) {
        positions.value = getPositions(state);
      }
    },
    [state],
  );

  useEffect(() => {
    let interval;
    if (year !== 2021) {
      interval = setInterval(() => {
        let data = dataFn();
        setState(data);
        setNormalizeVal(getNormalizeVal(data));
        setYear(year + 1);
      }, animationTiming);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginTop: 40,
        }}>
        {year}
      </Text>
      {state.map(item => (
        <BarGraph
          key={item.id}
          item={item}
          positions={positions}
          normalizeVal={normalizeVal}
        />
      ))}
    </View>
  );
};

export default Home;
