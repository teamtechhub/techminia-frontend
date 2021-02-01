import React, { useContext, useEffect, useState } from "react";
import Button from "components/Button/Button";
import RadioCard from "components/RadioCard/RadioCard";
import RadioGroup from "components/RadioGroup/RadioGroup";
import UpdateContact from "./Update/UpdateContact";
import { openModal } from "@redq/reuse-modal";
import {
  PaymentContainer,
  Heading,
  ButtonGroup,
  Contact,
} from "./Payment.style";

import { ProfileContext } from "contexts/profile/profile.context";
import { axiosInstance, tokenConfig } from "utils/axios";
import { useAlert } from "react-alert";

// The type of props Payment Form receives

const Payment = ({ setSelectedContact }) => {
  const { dispatch } = useContext(ProfileContext);
  const [contact, setContact] = useState([]);
  const alert = useAlert();
  useEffect(() => {
    axiosInstance
      .get(`/account/contact/`, tokenConfig())
      .then((res) => setContact(res.data.results));
  }, []);

  // Add or edit modal
  const handleModal = (
    modalComponent,
    modalProps = {},
    className = "add-address-modal"
  ) => {
    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: modalComponent,
      componentProps: { item: modalProps },
      closeComponent: "",
      config: {
        enableResizing: false,
        disableDragging: true,
        className: "quick-view-modal",
        width: 458,
        height: "auto",
      },
    });
  };

  const handleEditDelete = async (item, type, name) => {
    if (type === "edit") {
      handleModal(UpdateContact, item);
    } else {
      dispatch({ type: "DELETE_CONTACT", payload: item.id });

      return await axiosInstance
        .put(
          `/account/contact/${item.id}/`,
          { is_deleted: true },
          tokenConfig()
        )
        .then((res) => alert.info("contact deleted"));
    }
  };

  return (
    <form>
      <PaymentContainer>
        {/* Contact number */}
        <Contact>
          <Heading>Select Your Contact Number</Heading>
          <ButtonGroup>
            <RadioGroup
              items={contact}
              component={(item) => (
                <RadioCard
                  id={item.id}
                  key={item.id}
                  title={item.name}
                  content={item.contact}
                  checked={item.type === "primary"}
                  onChange={() => {
                    // dispatch({
                    //   type: "SET_PRIMARY_CONTACT",
                    //   payload: item.id,
                    // });
                    setSelectedContact(item);
                  }}
                  name="contact"
                  onEdit={() => handleEditDelete(item, "edit", "contact")}
                  onDelete={() => handleEditDelete(item, "delete", "contact")}
                />
              )}
              secondaryComponent={
                <Button
                  title="Add Contact"
                  iconPosition="right"
                  colors="primary"
                  size="small"
                  variant="outlined"
                  type="button"
                  intlButtonId="addContactBtn"
                  onClick={() =>
                    handleModal(UpdateContact, "add-contact-modal")
                  }
                />
              }
            />
          </ButtonGroup>
        </Contact>
      </PaymentContainer>
    </form>
  );
};

export default Payment;
