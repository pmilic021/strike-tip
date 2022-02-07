import type { NextPage } from 'next';
import { useSettingsContext } from '../lib/utils/settings';
import { Input } from '@chakra-ui/input';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import Layout from 'components/layout';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { apiClient } from '../lib/api';

type FormData = {
  username: string;
  campaignDescription?: string;
  goalAmount?: string;
};

const Home: NextPage = () => {
  const { setSettings, settingsQueryParam } = useSettingsContext();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>();

  const userExists = async (username: string) => {
    try {
      await apiClient.getAccountProfile(username);
      return true;
    } catch (e) {
      return false;
    }
  };

  const onSubmit = async (values: FormData) => {
    setSettings({
      username: values.username,
      goalAmount: values.goalAmount
        ? +(+values.goalAmount).toFixed(2)
        : undefined,
      goalDescription: values.campaignDescription,
    });
  };

  useEffect(() => {
    if (isSubmitSuccessful && settingsQueryParam) {
      router.push({
        pathname: '/campaign-settings',
        query: settingsQueryParam,
      });
    }
  }, [router, isSubmitSuccessful, settingsQueryParam]);

  return (
    <Layout>
      <Heading size="3xl">Strike Stream Tips</Heading>

      <Box mt={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading mb={8}>Create a campaign</Heading>
          <FormControl isInvalid={!!errors.username} mb={4}>
            <FormLabel htmlFor="username">Strike account username</FormLabel>
            <Input
              id="username"
              placeholder="Strike username"
              {...register('username', {
                required: true,
                validate: userExists,
              })}
            />
            <FormErrorMessage>
              {errors.username?.type === 'required'
                ? 'Username is required'
                : null}
              {errors.username?.type === 'validate'
                ? 'Account not found'
                : null}
            </FormErrorMessage>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel htmlFor="campaignDescription">
              Campaign description
            </FormLabel>
            <Input
              id="campaignDescription"
              placeholder="Description"
              {...register('campaignDescription')}
            />
          </FormControl>

          <FormControl isInvalid={!!errors.goalAmount} mb={4}>
            <FormLabel htmlFor="goalAmount">Goal amount in $</FormLabel>
            <NumberInput precision={2}>
              <NumberInputField
                id="goalAmount"
                placeholder="Goal amount"
                {...register('goalAmount', { min: 1, required: true })}
              />
            </NumberInput>
            <FormErrorMessage>
              {errors.goalAmount ? 'Min amount is $1.00' : null}
            </FormErrorMessage>
          </FormControl>

          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Create
          </Button>
        </form>
      </Box>
    </Layout>
  );
};

export default Home;
