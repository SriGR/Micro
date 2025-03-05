import RootLayout from "./RootLayout";
import RootClientLayout from "./Components/RootClientLayout";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout>
      <RootClientLayout>{children}</RootClientLayout>
    </RootLayout>
  );
}
