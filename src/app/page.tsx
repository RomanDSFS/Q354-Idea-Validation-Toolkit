// src/app/page.tsx
import { tools } from '@/lib/tools-data';
import HomePageShell from '@/components/HomePageShell';

export const metadata = {
  title: 'Idea Validation Toolkit',
  description: 'Interactive methods for analysis, generation and stress testing.',
};

export default function HomePage() {
  return <HomePageShell tools={tools} />;
}