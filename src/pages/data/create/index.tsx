import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createData } from 'apiSdk/data';
import { Error } from 'components/error';
import { dataValidationSchema } from 'validationSchema/data';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';
import { DataInterface } from 'interfaces/data';

function DataCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: DataInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createData(values);
      resetForm();
      router.push('/data');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<DataInterface>({
    initialValues: {
      soil_moisture: 0,
      light_level: 0,
      relative_humidity: 0,
      temperature: 0,
      date: new Date(new Date().toDateString()),
      organization_id: (router.query.organization_id as string) ?? null,
    },
    validationSchema: dataValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Data
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="soil_moisture" mb="4" isInvalid={!!formik.errors?.soil_moisture}>
            <FormLabel>Soil Moisture</FormLabel>
            <NumberInput
              name="soil_moisture"
              value={formik.values?.soil_moisture}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('soil_moisture', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.soil_moisture && <FormErrorMessage>{formik.errors?.soil_moisture}</FormErrorMessage>}
          </FormControl>
          <FormControl id="light_level" mb="4" isInvalid={!!formik.errors?.light_level}>
            <FormLabel>Light Level</FormLabel>
            <NumberInput
              name="light_level"
              value={formik.values?.light_level}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('light_level', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.light_level && <FormErrorMessage>{formik.errors?.light_level}</FormErrorMessage>}
          </FormControl>
          <FormControl id="relative_humidity" mb="4" isInvalid={!!formik.errors?.relative_humidity}>
            <FormLabel>Relative Humidity</FormLabel>
            <NumberInput
              name="relative_humidity"
              value={formik.values?.relative_humidity}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('relative_humidity', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.relative_humidity && <FormErrorMessage>{formik.errors?.relative_humidity}</FormErrorMessage>}
          </FormControl>
          <FormControl id="temperature" mb="4" isInvalid={!!formik.errors?.temperature}>
            <FormLabel>Temperature</FormLabel>
            <NumberInput
              name="temperature"
              value={formik.values?.temperature}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('temperature', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.temperature && <FormErrorMessage>{formik.errors?.temperature}</FormErrorMessage>}
          </FormControl>
          <FormControl id="date" mb="4">
            <FormLabel>Date</FormLabel>
            <Box display="flex" maxWidth="100px" alignItems="center">
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values?.date ? new Date(formik.values?.date) : null}
                onChange={(value: Date) => formik.setFieldValue('date', value)}
              />
              <Box zIndex={2}>
                <FiEdit3 />
              </Box>
            </Box>
          </FormControl>
          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'data',
    operation: AccessOperationEnum.CREATE,
  }),
)(DataCreatePage);
