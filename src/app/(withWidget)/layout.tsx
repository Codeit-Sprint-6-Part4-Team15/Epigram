import '@/src/app/globals.css';

import FloatingButtons from '@/src/components/epigrams/FloatingButtons';

export default function WithWidgetLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <FloatingButtons />
      {children}
    </div>
  );
}
