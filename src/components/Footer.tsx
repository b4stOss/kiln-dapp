import { Container, Stack, Text } from '@mantine/core';

export function Footer() {
  return (
    <footer>
      <Container size="xl" bg="black" c="white" mt="xl" p="xl">
        {/* Copyright */}
        <Stack align="center" justify="center" gap={0}>
          <Text>All rights reserved.</Text>
          <Text>Kiln Fullstack Team, Inc 2025</Text>
        </Stack>
      </Container>
    </footer>
  );
}
