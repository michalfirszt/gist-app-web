import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16"
import App from "./App";
import Routes from "./Routes";

Enzyme.configure({adapter: new Adapter()});

test('renders App', () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toBeTruthy();
});

test('renders routes', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.contains(<Routes />)).toBeTruthy();
})
