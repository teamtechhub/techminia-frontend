import Downshift from "downshift";
import React, { useState, useEffect } from "react";
import AddItem from "./AddItem";
import Button from "components/Button/Button";
import _ from "lodash";
import { useAlert } from "react-alert";
import { filter } from "fuzzaldrin";

function stateReducer(state, changes) {
  // this prevents the menu from being closed when the user
  // selects an item with a keyboard or mouse
  switch (changes.type) {
    case Downshift.stateChangeTypes.keyDownEnter:
    case Downshift.stateChangeTypes.clickItem:
      return {
        ...changes,
        isOpen: state.isOpen,
        highlightedIndex: state.highlightedIndex,
      };
    default:
      return changes;
  }
}

export default function AutoCompleteSelectField(props) {
  const { data, name, apipath, collection, fields, handleChange } = props;
  const [items, setItems] = useState(null);
  const [newValue, setNewValue] = useState(false);
  const alert = useAlert();

  useEffect(() => {
    if (fields && collection) {
      const array = data.reduce((acc, val) => {
        var combo_name = "";
        for (let i = 0; i < collection.length; i++) {
          const element = collection[i];

          combo_name = combo_name + ` ${_.get(val, element, null)}`;
        }
        acc.push({
          ...val,
          combo_name: combo_name,
        });
        return acc;
      }, []);
      setItems(array);
    } else {
      setItems(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div>
      <Downshift
        stateReducer={stateReducer}
        onChange={(selection) => {
          alert.success(
            selection
              ? `${
                  fields && collection
                    ? selection.combo_name
                    : _.get(selection, name, null)
                } Selected`
              : "Selection Cleared"
          );
          handleChange(selection);
        }}
        itemToString={(item) =>
          item
            ? fields && collection
              ? item.combo_name
              : _.get(item, name, null)
            : ""
        }
      >
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          getToggleButtonProps,
          inputValue,
          highlightedIndex,
          selectedItem,
          isOpen,
          itemCount,
          ...rest
        }) => {
          console.log(rest);
          return (
            <div>
              <div style={{ display: "flex" }}>
                <input
                  type="text"
                  style={props.inputStyle}
                  placeholder={props.label}
                  {...getInputProps({
                    value: newValue ? newValue : inputValue,
                  })}
                />
                <Button
                  {...getToggleButtonProps()}
                  title={"↓"}
                  aria-label={"toggle menu"}
                  style={{ padding: 0, borderRadius: 0, ...props.buttonStyle }}
                />
              </div>

              <div
                {...getMenuProps()}
                style={{
                  // position: "absolute",
                  top: "calc(100% + 2px)",
                  width: "100%",
                  left: 0,
                  background: "#fff",
                  border: " 1px solid #00000014",
                  boxShadow: "0 1px 5px #00000033",
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  zIndex: 9,
                }}
              >
                {isOpen && (
                  <>
                    {fields && collection ? (
                      <>
                        {filter(items, inputValue, {
                          key: "label",
                        }).map((item, index) => (
                          <div
                            {...getItemProps({
                              key: `${item.combo_name}${index}`,
                              item,
                              index,
                              style: {
                                backgroundColor:
                                  highlightedIndex === index
                                    ? "lightgray"
                                    : "white",
                                fontWeight:
                                  selectedItem === item ? "bold" : "normal",

                                padding: "2px 5px",
                                height: "fit-content",
                                borderRadius: "2px",
                                margin: "2px",
                                border: "1px solid #00000014",
                              },
                            })}
                          >
                            {item.combo_name}
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        {items
                          .filter(
                            (item) =>
                              !inputValue ||
                              _.get(item, name, null).includes(inputValue)
                          )
                          .map((item, index) => (
                            <div
                              {...getItemProps({
                                key: `${_.get(item, name, null)}${index}`,
                                item,
                                index,
                                style: {
                                  backgroundColor:
                                    highlightedIndex === index
                                      ? "lightgray"
                                      : "white",
                                  fontWeight:
                                    selectedItem === item ? "bold" : "normal",

                                  padding: "2px 5px",
                                  borderRadius: "2px",
                                  margin: "2px",
                                  border: "1px solid #00000014",
                                },
                              })}
                            >
                              {_.get(item, name, null)}
                            </div>
                          ))}
                      </>
                    )}
                    <AddItem
                      fields={fields}
                      apipath={apipath}
                      title={name}
                      inputValue={inputValue ? inputValue : ""}
                      collection={collection}
                      setnewvalue={setNewValue}
                      {...props}
                    />
                  </>
                )}
              </div>
            </div>
          );
        }}
      </Downshift>
    </div>
  );
}
