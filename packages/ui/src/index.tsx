codex/review-new-typescript-changes-for-front-end-0sq425
type PillChild = JSX.Element | string | number | boolean | null | undefined;

 codex/review-new-typescript-changes-for-front-end-zyidlq
type PillChild = JSX.Element | string | number | boolean | null | undefined;

import type { PropsWithChildren } from 'react';
main
 main

export type PillProps = { color?: string; children?: PillChild | PillChild[] };

export function Pill({ children, color = '#2563eb' }: PillProps) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color,
        color: '#fff',
        borderRadius: 9999,
        padding: '4px 12px',
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {children}
    </div>
  );
}
