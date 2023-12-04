import { K_SCREEN_HEIGHT, K_SCREEN_WIDTH } from '@common';
import { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {
  ERNHoleViewTimingFunction,
  IRNHoleViewAnimation,
  RNHole,
  RNHoleView,
} from 'react-native-hole-view';

const firstHole: RNHole = {
  x: K_SCREEN_WIDTH / 2 - 150,
  y: K_SCREEN_HEIGHT / 2 - 100,
  width: 300,
  height: 200,
  borderRadius: 4,
};
const secondHole: RNHole = {
  x: 150,
  y: 40,
  width: 120,
  height: 120,
  borderRadius: 60,
};

const animationSettings: IRNHoleViewAnimation = {
  timingFunction: ERNHoleViewTimingFunction.EASE_IN_OUT,
  duration: 200,
};

const Example = () => {
  const [holes, setHoles] = useState<RNHole[]>([]);
  const [animated, setAnimated] = useState<boolean>(false);
  const [animation, setAnimation] = useState<IRNHoleViewAnimation | undefined>(undefined);

  const onPress = useCallback(() => {
    if (animated) {
      setHoles([firstHole]);
    } else {
      setHoles([secondHole]);
    }

    setAnimation({ ...animationSettings });
    setAnimated(!animated);
  }, [animated, animation]);

  useEffect(() => {
    onPress();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <TouchableOpacity
        onPress={() => {}}
        style={{ backgroundColor: 'pink', padding: 60, borderRadius: 5 }}
      >
        <Text>{"Wow! I'm a button inside a hole!"}</Text>
      </TouchableOpacity>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ flexGrow: 0, flex: 0, padding: 0 }}>{"Wow! I'm a text inside a hole!"}</Text>
        <TouchableOpacity
          onPress={() => {}}
          style={{ backgroundColor: 'pink', padding: 10, borderRadius: 5 }}
        >
          <Text>{"Wow! I'm a button inside a hole!"}</Text>
        </TouchableOpacity>
      </View>
      <RNHoleView
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(34,146,231,0.4)',
        }}
        animation={animation}
        holes={holes}
        onAnimationFinished={() => {
          setAnimation(undefined);
        }}
      />
      <View
        pointerEvents={'box-none'}
        style={{
          position: 'absolute',
          flex: 1,
          width: '100%',
          height: '100%',
          alignItems: 'flex-end',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          onPress={onPress}
          style={{
            backgroundColor: 'pink',
            padding: 10,
            borderRadius: 5,
            bottom: 50,
          }}
        >
          <Text>{'Animate!'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Example;
