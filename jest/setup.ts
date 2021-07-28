import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'react-native-gesture-handler/jestSetup';

/*
* Mocking all for react-navigation
*/
jest.mock('react-native-iphone-x-helper', () => ({
    getStatusBarHeight: jest.fn(),
    getBottomSpace: jest.fn(),
}));

jest.mock('react-native-gesture-handler', () =>
  jest.requireActual('../node_modules/react-native-gesture-handler/jestSetup')
);

jest.mock('react-native-reanimated', () => {
    const Reanimated = require('react-native-reanimated/mock')

    // The mock for `call` immediately calls the callback which is incorrect
    // So we override it with a no-op
    Reanimated.default.call = () => {}
    return Reanimated
})

jest.mock('@react-native-community/masked-view', () => ({}));

/* Silence the warning: Animated: `useNativeDriver` is
 * not supported because the native animated module is missing
 */
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  class MockSafeAreaProvider extends React.Component {
    render() {
      const { children } = this.props;
      return React.createElement('SafeAreaProvider', this.props, children);
    }
  }
  return {
    useSafeAreaInsets: () => ({ top: 1, right: 2, bottom: 3, left: 4 }),
    SafeAreaProvider: MockSafeAreaProvider,
  };
});

Enzyme.configure({adapter: new Adapter()});
