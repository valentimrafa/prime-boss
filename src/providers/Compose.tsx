import { ReactNode, ComponentType } from "react";

type ProviderProps = { children: ReactNode };

export function composeProviders(
  providers: ComponentType<ProviderProps>[]
): ComponentType<ProviderProps> {
  return providers.reduce(
    (AccumulatedProviders, CurrentProvider) =>
      ({ children }: ProviderProps) =>
        (
          <AccumulatedProviders>
            <CurrentProvider>{children}</CurrentProvider>
          </AccumulatedProviders>
        ),
    ({ children }) => <>{children}</>
  );
}
