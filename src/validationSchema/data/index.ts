import * as yup from 'yup';

export const dataValidationSchema = yup.object().shape({
  soil_moisture: yup.number().integer().required(),
  light_level: yup.number().integer().required(),
  relative_humidity: yup.number().integer().required(),
  temperature: yup.number().integer().required(),
  date: yup.date().required(),
  organization_id: yup.string().nullable().required(),
});
