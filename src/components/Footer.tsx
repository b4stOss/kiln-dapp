import { Container, Group, Text, Button, Card } from '@mantine/core';

export function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <Container size="xl">
        {/* Kiln Info Card */}
        <Card className="bg-gray-900 mb-6 max-w-md">
          <Group>
            <div className="text-xl font-bold">🔥 kiln</div>
            <Text size="sm" className="text-gray-400">KILN</Text>
          </Group>
          <Text size="sm" className="text-gray-400 mt-2 mb-4">
            @kiln
          </Text>
          <Text size="sm" className="text-gray-300 mb-4">
            Hundreds of companies use Kiln to earn rewards on their digital assets, or to 
            whitelabel earning functionality into their products.
          </Text>
          <Group className="mb-4">
            <Text size="sm" className="text-gray-400">🐦 @Kiln</Text>
            <Text size="sm" className="text-gray-400">📷 @Kiln</Text>
          </Group>
          <Button variant="filled" className="bg-white text-black w-full">
            Website →
          </Button>
        </Card>

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