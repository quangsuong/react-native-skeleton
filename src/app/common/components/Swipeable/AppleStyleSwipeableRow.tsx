import React, { Component, PropsWithChildren, ReactNode } from 'react';
import { Animated, I18nManager, StyleSheet, View } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';

import Swipeable from 'react-native-gesture-handler/Swipeable';

interface SwipeProps {
  actions: SwipeActionDAta[];
}

interface SwipeActionDAta {
  content: ReactNode;
  onPress: () => void;
}

export default class AppleStyleSwipeableRow extends Component<PropsWithChildren<SwipeProps>> {
  private renderLeftActions = (
    _progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
      extrapolate: 'clamp',
    });
    return (
      <RectButton style={styles.leftAction} onPress={this.close}>
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{ translateX: trans }],
            },
          ]}
        >
          Archive
        </Animated.Text>
      </RectButton>
    );
  };

  private renderRightAction = (
    index: number,
    // color: string,
    x: number,
    progress: Animated.AnimatedInterpolation<number>
  ) => {
    const itemData = this.props.actions[index];
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    const pressHandler = () => {
      this.close();
      itemData?.onPress();
      // eslint-disable-next-line no-alert
      // window.alert(text);
    };

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }} key={index}>
        <RectButton
          style={[
            styles.rightAction,
            // { backgroundColor: color }
          ]}
          onPress={pressHandler}
        >
          {itemData.content}
          {/* <Text style={styles.actionText}>{text}</Text> */}
        </RectButton>
      </Animated.View>
    );
  };

  private renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    _dragAnimatedValue: Animated.AnimatedInterpolation<number>
  ) => (
    <View
      style={{
        width: 64 * this.props.actions.length,
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
      }}
    >
      {this.props.actions.map((el, index) =>
        this.renderRightAction(index, (index + 1) * 64, progress)
      )}
      {/* {this.renderRightAction('More', '#C8C7CD', 192, progress)}
            {this.renderRightAction('Flag', '#ffab00', 128, progress)}
            {this.renderRightAction('More', '#dd2c00', 64, progress)} */}
    </View>
  );

  private swipeableRow?: Swipeable;

  private updateRef = (ref: Swipeable) => {
    this.swipeableRow = ref;
  };
  private close = () => {
    this.swipeableRow?.close();
  };
  render() {
    const { children } = this.props;
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        enableTrackpadTwoFingerGesture
        leftThreshold={30}
        rightThreshold={40}
        // renderLeftActions={this.renderLeftActions}
        renderRightActions={this.renderRightActions}
        onSwipeableOpen={(direction) => {
          console.log(`Opening swipeable from the ${direction}`);
        }}
        onSwipeableClose={(direction) => {
          console.log(`Closing swipeable to the ${direction}`);
        }}
      >
        {children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#497AFC',
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
