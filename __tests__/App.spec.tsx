import * as React from 'react';
import renderer from 'react-test-renderer';

import App from '../App';

jest.mock('expo', () => ({
  AppLoading: 'AppLoading',
}))

// jest.mock('../navigation/AppNavigator', () => 'AppNavigator')

describe.skip('App', () => {
  jest.useFakeTimers()

  test(`renders the loading screen`, () => {
    const tree = renderer.create(<App />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test(`renders the root without loading screen`, () => {
    const tree = renderer.create(<App skipLoadingScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
