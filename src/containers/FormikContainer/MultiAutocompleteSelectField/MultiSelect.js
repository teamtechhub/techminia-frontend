import { useMultipleSelection, useSelect } from "downshift";
import React, { useEffect } from "react";
import _ from "lodash";

export default function MultiSelect(props) {
  const { items, collection, val, placeholder } = props;
  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection({ initialSelectedItems: [] });

  useEffect(() => {
    collection(selectedItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItems]);

  const getFilteredItems = () =>
    items.filter((item) => selectedItems.indexOf(item) < 0);
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    selectedItem: null,
    defaultHighlightedIndex: 0, // after selection, highlight the first item.
    items: getFilteredItems(),
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      switch (type) {
        case useSelect.stateChangeTypes.MenuKeyDownEnter:
        case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true, // keep the menu open after selection.
          };
        default:
          break;
      }

      return changes;
    },
    onStateChange: ({ type, selectedItem }) => {
      switch (type) {
        case useSelect.stateChangeTypes.MenuKeyDownEnter:
        case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
          if (selectedItem) {
            addSelectedItem(selectedItem);
          }
          break;
        default:
          break;
      }
    },
  });
  return (
    <div>
      <label {...getLabelProps()}>{placeholder} :</label>
      <br />
      {selectedItems.map((selectedItem, index) => (
        <span
          style={{
            background: "#fff",
            margin: "3px",
            padding: "3px",
            border: "0.5px solid grey",
          }}
          key={`selected-item-${index}`}
          {...getSelectedItemProps({ selectedItem, index })}
        >
          {val ? _.get(selectedItem, val, null) : selectedItem}
          <span
            style={{}}
            onClick={(e) => {
              e.stopPropagation();
              removeSelectedItem(selectedItem);
            }}
          >
            &#10005;
          </span>
        </span>
      ))}
      <br />
      <button
        {...getToggleButtonProps(
          getDropdownProps({ preventKeyAction: isOpen })
        )}
      >
        {_.get(selectedItem, val, null) || "Select"}
      </button>
      <ul
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
        {isOpen &&
          getFilteredItems(items).map((item, index) => (
            <li
              style={{
                backgroundColor:
                  highlightedIndex === index ? "lightgray" : "white",
                fontWeight: selectedItem === item ? "bold" : "normal",

                padding: "2px 5px",
                height: "fit-content",
                borderRadius: "2px",
                margin: "2px",
                border: "1px solid #00000014",
              }}
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
            >
              {val ? _.get(item, val, null) : item}
            </li>
          ))}
      </ul>
    </div>
  );
}
