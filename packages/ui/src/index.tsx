import type { PropsWithChildren } from 'react';

export type PillProps = PropsWithChildren<{ color?: string }>;

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
