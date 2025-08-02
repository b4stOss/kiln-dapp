import { Container, Text } from '@mantine/core';

export function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <Container size="xl">

        {/* Copyright */}
        <div className="text-center">
          <Text size="sm" className="text-gray-400">
            All rights reserved.
          </Text>
          <Text size="sm" className="text-gray-400">
            Kiln Fullstack Team, Inc 2025
          </Text>
        </div>
      </Container>
    </footer>
  );
}