import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, {Rect} from 'react-native-svg';
import {animationTiming, gap, _WIDTH} from '../constants/config';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const BarGraph = ({item, positions, normalizeVal}) => {
  const translateY = useSharedValue(positions.value[item.id] * gap);

  useAnimatedReaction(
    () => positions.value[item.id],
    (next, prev) => {
      if (prev !== null) {
        translateY.value = next * gap;
      }
    },
    [positions.value[item.id]],
  );

  const widthAnim = useDerivedValue(() => {
    return item.value;
  }, [item]);

  const animatedProps = useAnimatedProps(() => {
    return {
      x: '25',
      y: '5',
      width: withTiming(
        interpolate(
          widthAnim.value,
          [0, item.value],
          [0, item.value * normalizeVal],
        ),
        {duration: animationTiming},
      ),
      height: '50',
      fill: item.color,
      strokeWidth: '3',
      stroke: 'rgb(0,0,0)',
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      marginTop: 100,
      justifyContent: 'center',
      transform: [
        {
          translateY: withTiming(translateY.value, {
            duration: animationTiming / 2,
          }),
        },
      ],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <Svg width={_WIDTH} height="60" translateX={30}>
        <AnimatedRect animatedProps={animatedProps} />
      </Svg>
      <Image
        source={{uri: item.url}}
        style={{
          width: 40,
          height: 40,
          position: 'absolute',
          marginLeft: 5,
        }}
        resizeMode="cover"
      />
      <Text
        style={{
          position: 'absolute',
          right: 10,
          fontWeight: 'bold',
          fontSize: 16,
        }}>
        {Math.round(item.value)}
      </Text>
    </Animated.View>
  );
};

export default BarGraph;

const styles = StyleSheet.create({});
