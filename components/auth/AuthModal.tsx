"use client";
import { motion } from "framer-motion";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const AuthModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: () => void;
}) => {
  const [modalType, setModalType] = useState("login");
  const modalVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
  };
  return (
    <Modal isOpen={open} placement="center" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {modalType.toUpperCase()}
            </ModalHeader>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validateOnChange
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .required("Your email cannot be empty!")
                  .email("Invalid Email!"),
                password: Yup.string()
                  .required("Your password cannot be empty")
                  .min(8, "Password must be longer than 8 characters"),
              })}
              onSubmit={() => {
                console.log("Submitted");
              }}
            >
              {({ handleChange, values, errors }) => (
                <>
                  <motion.div
                    key={modalType}
                    initial="hidden"
                    variants={modalVariants}
                    animate="visible"
                  >
                    <ModalBody>
                      <Input
                        errorMessage={errors.email}
                        value={values.email}
                        name="email"
                        label="Email"
                        placeholder="Enter your email"
                        variant="bordered"
                        autoFocus
                        onChange={handleChange}
                      />
                      <Input
                        errorMessage={errors.password}
                        value={values.password}
                        name="password"
                        label="Password"
                        placeholder="Enter your password"
                        variant="bordered"
                        type="password"
                        autoFocus
                        onChange={handleChange}
                      />
                    </ModalBody>
                  </motion.div>
                  <ModalFooter>
                    <Button
                      startContent={<FontAwesomeIcon icon={faGoogle} />}
                      variant="light"
                    >
                      Login with Google
                    </Button>
                    <Button type="submit" color="primary">
                      {modalType.toUpperCase()}
                    </Button>
                    <Button
                      color="primary"
                      variant="light"
                      onPress={() =>
                        setModalType(
                          modalType === "Login" ? "Register" : "Login"
                        )
                      }
                    >
                      Or {modalType === "Login" ? "Register" : "Login"}
                    </Button>
                  </ModalFooter>
                </>
              )}
            </Formik>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
