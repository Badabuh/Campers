"use client";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import type { engine, form, transmission } from "@/types/types";
import styles from "./FormSearch.module.css";
import type { CampersQueryParams } from "@/types/camperApi";

const validationSchema = Yup.object().shape({
  location: Yup.string(),
  form: Yup.string(),
  transmission: Yup.string(),
  engine: Yup.string(),
});

interface FormValues {
  location: string;
  form: form | "";
  transmission: transmission | "";
  engine: engine | "";
}

const formOptions = [
  { value: "alcove", label: "Alcove" },
  { value: "panel_van", label: "Panel Van" },
  { value: "integrated", label: "Integrated" },
  { value: "semi_integrated", label: "Semi integrated" },
];

const engineOptions = [
  { value: "diesel", label: "Diesel" },
  { value: "petrol", label: "Petrol" },
  { value: "hybrid", label: "Hybrid" },
  { value: "electric", label: "Electric" },
];

const transmissionOptions = [
  { value: "automatic", label: "Automatic" },
  { value: "manual", label: "Manual" },
];
interface FormSearchProps {
  setData: (params: CampersQueryParams) => void;
}
export default function FormSearch({ setData }: FormSearchProps) {
  const initialValues: FormValues = {
    location: "",
    form: "",
    transmission: "",
    engine: "",
  };

  const handleSubmit = async (values: FormValues, resetForm: () => void) => {
    setData({
      ...(values.location ? { location: values.location } : {}),
      ...(values.form ? { form: values.form } : {}),
      ...(values.transmission ? { transmission: values.transmission } : {}),
      ...(values.engine ? { engine: values.engine } : {}),
    });
    resetForm();
  };

  const handleReload = () => {
    window.location.reload();
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
    >
      {({
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        values,
      }) => (
        <Form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label htmlFor="location" className={styles.label}>
              Location
            </label>
            <div className={styles.inputWrap}>
              <svg
                className={styles.locationIcon}
                aria-hidden="true"
                focusable="false"
              >
                <use href="/svg/brand-sprite.svg#map-pin" />
              </svg>
              <Field
                type="text"
                name="location"
                id="location"
                className={styles.input}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="City"
                aria-invalid={Boolean(touched.location && errors.location)}
                aria-describedby="location-error"
              />
            </div>
          </div>

          <div className={styles.filterBlock}>
            <p className={styles.filterTitle}>Filters</p>

            <div className={styles.filterGroup}>
              <p className={styles.filterLabel}>Camper form</p>
              <div className={styles.optionList}>
                {formOptions.map((option) => (
                  <label key={option.value} className={styles.optionRow}>
                    <Field
                      type="radio"
                      name="form"
                      value={option.value}
                      checked={values.form === option.value}
                      className={styles.radioInput}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.filterGroup}>
              <p className={styles.filterLabel}>Engine</p>
              <div className={styles.optionList}>
                {engineOptions.map((option) => (
                  <label key={option.value} className={styles.optionRow}>
                    <Field
                      type="radio"
                      name="engine"
                      value={option.value}
                      checked={values.engine === option.value}
                      className={styles.radioInput}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.filterGroup}>
              <p className={styles.filterLabel}>Transmission</p>
              <div className={styles.optionList}>
                {transmissionOptions.map((option) => (
                  <label key={option.value} className={styles.optionRow}>
                    <Field
                      type="radio"
                      name="transmission"
                      value={option.value}
                      checked={values.transmission === option.value}
                      className={styles.radioInput}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button type="submit" className={styles.submitButton}>
            Search
          </button>

          <button
            type="button"
            className={styles.clearButton}
            onClick={() => handleReload()}
          >
            <span className={styles.clearIcon}>X</span> Clear filters
          </button>
        </Form>
      )}
    </Formik>
  );
}
