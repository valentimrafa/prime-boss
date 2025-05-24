import { composeProviders } from "./Compose";
import { PageReloadProvider } from "./reload";

const AllProviders = composeProviders([PageReloadProvider]);

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <AllProviders>{children}</AllProviders>;
};
