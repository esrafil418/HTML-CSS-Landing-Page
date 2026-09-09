import '@/styles/main.css';
import { mountLayout } from '@/shared/components/layout';
import { onReady } from '@/shared/utils/dom';

export function bootPage(init?: () => void): void {
  onReady(() => {
    mountLayout();
    init?.();
  });
}
