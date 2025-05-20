// decorators/WithCache.ts
import { unstable_cache } from "next/cache";

type CacheConfig<Args extends unknown[]> = {
  key: (args: Args) => string[];
  revalidate?: number;
};

export function WithCache<Args extends unknown[], Return>(
  config: CacheConfig<Args>
): MethodDecorator {
  return (
    _target: object,
    _propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ): void => {
    const originalMethod = descriptor.value;

    if (typeof originalMethod !== "function") {
      throw new Error("@WithCache só pode ser usado em métodos.");
    }

    descriptor.value = async function (...args: Args): Promise<Return> {
      const cacheKey = config.key(args);

      const cachedFn = unstable_cache(
        () => originalMethod.apply(this, args),
        cacheKey,
        { revalidate: config.revalidate ?? 60 }
      );

      return cachedFn();
    };
  };
}
