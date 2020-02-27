import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { AddActivity } from "./AddActivity";
import React from "react";
import { Message } from "./Message";
import renderer from "react-test-renderer";

Enzyme.configure({ adapter: new Adapter() });

describe("testing presentational part of AddActivity component", () => {
  it("find every nodes in match with CSS selectors", () => {
    const addFn = jest.fn();
    const wrapper = shallow(<AddActivity add={addFn} />);
    //CSS Selectors
    expect(wrapper.find(".foo")).toHaveLength(0);
    expect(wrapper.find("input")).toHaveLength(1);
    expect(wrapper.find("button")).toHaveLength(1);
    expect(wrapper.find("form")).toHaveLength(1);
    //compound selector
    expect(wrapper.find("div.some-class")).toHaveLength(0);
    expect(wrapper.find("#activity")).toHaveLength(1);
  });
  it("find how many nodes we have in the render tree of a specific types", () => {
    const addFn = jest.fn();
    const wrapper = shallow(<AddActivity add={addFn} />);

    const complexComponent = wrapper.findWhere(n => {
      return n.type() === Message;
    });
    expect(complexComponent).toHaveLength(1);
  });
  it("find how many nodes we have in the render tree of a specific types", () => {
    const addFn = jest.fn();
    const wrapper = shallow(<AddActivity add={addFn} />);
    //testing outermost element
    expect(wrapper.type()).toEqual("div");
  });
  it("testing the internal state of a component", () => {
    const addFn = jest.fn();
    const wrapper = shallow(<AddActivity add={addFn} />);
    expect(wrapper.state("count")).toEqual(0);
    //set internal state
    wrapper.setState({ count: 1234 });
    expect(wrapper.state("count")).toEqual(1234);
  });
  it("simulate event empty text field", () => {
    const addFn = jest.fn();
    const wrapper = shallow(<AddActivity add={addFn} />);
    wrapper.find("button").simulate("submit");
    expect(addFn.mock.calls.length).toEqual(0);
  });
  it("simulate event full text field with data", () => {
    const addFn = jest.fn();
    const wrapper = mount(<AddActivity add={addFn} />);
    //retrieve the input text field
    let input = wrapper
      .find("input")
      .at(0)
      .getDOMNode() as HTMLInputElement;
    input.value = "Activity1";

    //send action
    wrapper.find("button").simulate("submit");
    expect(addFn.mock.calls.length).toEqual(1);
    expect(addFn.mock.calls).toEqual([["Activity1"]]);
    expect(addFn.mock.calls[0]).toEqual(["Activity1"]);
    expect(addFn.mock.results).toEqual([{ type: "return", value: undefined }]);
  });
});
describe("testing snapshot", () => {
  it("snapshot testing towards AddActivity component", () => {
    const addFn = jest.fn();
    let tree = renderer.create(<AddActivity add={addFn} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("snapshot testing towards AddActivity component using prettier", () => {
    const addFn = jest.fn();
    let tree = renderer.create(<AddActivity add={addFn} />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div>
        <form
          onSubmit={[Function]}
        >
          <input
            id="activity"
          />
          <button
            className="btn"
            id="Add"
            type="submit"
          >
            Add
          </button>
        </form>
        <div
          style={
            Object {
              "backgroundColor": "lightgrey",
            }
          }
        >
          <h2>
            <div>
              <h4>
                Inserted 
                0
                 activities today 
              </h4>
            </div>
          </h2>
           
        </div>
        <hr />
        <span />
      </div>
    `);
  });
});
