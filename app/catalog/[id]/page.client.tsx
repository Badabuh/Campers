"use client";

import { Formik, Form, Field, type FormikHelpers } from "formik";
import * as Yup from "yup";
import styles from "./page.module.css";
import { postBookingRequest } from "../../../lib/api/clientApi";

interface CamperDetailsClientProps {
  id: string;
}

interface FormValues {
  name: string;
  email: string;
}
const initialValues: FormValues = {
  name: "",
  email: "",
};

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("Please enter your full name.")
    .min(3, "Name must be at least 3 characters"),
  email: Yup.string()
    .trim()
    .email("Please enter a valid email.")
    .required("Please enter your email."),
});

export default function CamperDetailsClient({ id }: CamperDetailsClientProps) {
  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>,
  ) => {
    await postBookingRequest(id, values);
    resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, errors, touched }) => (
        <Form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.fieldGroup}>
            <div className={styles.inputWrap}>
              {touched.name && errors.name && (
                <label htmlFor="name" className={styles.label}>
                  Name*
                </label>
              )}
              <Field
                id="name"
                type="text"
                name="name"
                placeholder="Name*"
                className={`${styles.input} ${touched.name && errors.name ? styles.inputError : ""}`}
                aria-invalid={Boolean(touched.name && errors.name)}
              />
              {touched.name && errors.name && (
                <span className={styles.errorIcon} aria-hidden="true">
                  !
                </span>
              )}
            </div>
            {touched.name && errors.name && (
              <p className={styles.errorMessage}>{errors.name}</p>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <div className={styles.inputWrap}>
              {touched.email && errors.email && (
                <label htmlFor="email" className={styles.label}>
                  Email*
                </label>
              )}
              <Field
                id="email"
                type="email"
                name="email"
                placeholder="Email*"
                className={`${styles.input} ${touched.email && errors.email ? styles.inputError : ""}`}
                aria-invalid={Boolean(touched.email && errors.email)}
              />
              {touched.email && errors.email && (
                <span className={styles.errorIcon} aria-hidden="true">
                  !
                </span>
              )}
            </div>
            {touched.email && errors.email && (
              <p className={styles.errorMessage}>{errors.email}</p>
            )}
          </div>

          <button type="submit" className={styles.btnSubmit}>
            Send
          </button>
        </Form>
      )}
    </Formik>
  );
}
