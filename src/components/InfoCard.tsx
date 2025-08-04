import { Group, Button, Text, Stack, Box, ActionIcon, Paper } from '@mantine/core';
import kilnLogo from '../assets/kiln.svg';
import { IconBrandInstagram, IconBrandX } from '@tabler/icons-react';

export function InfoCard() {
  return (
    <Paper withBorder p="xl">
      <Stack gap="md">
        {/* Header avec avatar et informations */}
        <Group align="center">
          <Box pos="relative">
            <Box
              w={60}
              h={60}
              bg="white"
              style={{
                borderRadius: '50%',
                border: '1px solid #e9ecef',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img src={kilnLogo} alt="Kiln" style={{ width: '40px', height: 'auto' }} />
            </Box>
            <ActionIcon size="sm" radius="xl" variant="filled" color="dark" pos="absolute" bottom={-4} right={-4}>
              ✓
            </ActionIcon>
          </Box>

          <Box>
            <Text size="xl" fw={700} c="dark">
              KILN
            </Text>
            <Text size="sm" c="dimmed">
              @Kiln
            </Text>
          </Box>
        </Group>

        {/* Description */}
        <Text size="sm" c="dark" lh={1.5}>
          Hundreds of companies use Kiln to earn rewards on their digital assets, or to whitelabel earning functionality into their
          products.
        </Text>

        {/* Liens sociaux */}
        <Group gap="lg">
          <Group gap={0}>
            <ActionIcon size="lg" radius="xl" variant="subtle" color="gray">
              <IconBrandX color="black" size={25} />
            </ActionIcon>
            <Text size="sm" c="dark">
              @Kiln
            </Text>
          </Group>

          <Group gap={0}>
            <ActionIcon size="lg" radius="xl" variant="subtle" color="gray">
              <IconBrandInstagram color="black" size={30} />
            </ActionIcon>
            <Text size="sm" c="dark">
              @Kiln
            </Text>
          </Group>
        </Group>

        {/* Bouton Website */}
        <Button variant="filled" color="dark" fullWidth size="md" rightSection="↗">
          Website
        </Button>
      </Stack>
    </Paper>
  );
}
