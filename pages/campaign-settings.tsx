import type { NextPage } from 'next';
import { useSettingsContext } from '../lib/utils/settings';
import { Container, Flex, VStack } from '@chakra-ui/react';
import LinkItem from '../components/linkItem';

const CampaignSettings: NextPage = () => {
  const { settingsQueryParam } = useSettingsContext();

  return (
    <Container maxW="containerxl" p={0}>
      <VStack>
        <LinkItem
          absPath={`${window.location.host}/campaign-summary?${settingsQueryParam}`}
          header="Campaign summary"
          pathname="/campaign-summary"
          query={settingsQueryParam}
          image="campaign-summary.png"
        />
        <LinkItem
          absPath={`${window.location.host}/incoming-donations?${settingsQueryParam}`}
          header="Incoming donations"
          pathname="/incoming-donations"
          query={settingsQueryParam}
          image="incoming-donations.png"
        />
        <LinkItem
          absPath={`${window.location.host}/campaign-donation?${settingsQueryParam}`}
          header="Payment page"
          pathname="/campaign-donation"
          query={settingsQueryParam}
          image="campaign-donation.svg"
        />
      </VStack>
    </Container>
  );
};

export default CampaignSettings;
