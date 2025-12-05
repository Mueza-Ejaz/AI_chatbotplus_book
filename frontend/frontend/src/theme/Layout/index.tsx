import React, {type ReactNode} from 'react';
import Layout from '@theme-original/Layout';
import type LayoutType from '@theme/Layout';
import type {WrapperProps} from '@docusaurus/types';
import ChatbotWidget from '@site/src/components/ChatbotWidget';
import { ChatbotProvider } from '@site/src/contexts/ChatbotContext'; // Import ChatbotProvider

type Props = WrapperProps<typeof LayoutType>;

export default function LayoutWrapper(props: Props): ReactNode {
  return (
    <ChatbotProvider> {/* Wrap with ChatbotProvider */}
      <Layout {...props} />
      <ChatbotWidget />
    </ChatbotProvider>
  );
}
