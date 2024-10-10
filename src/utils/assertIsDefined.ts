export function assertIsDefined<T>(value: T): asserts value is NonNullable<T> {
  if (!value) {
    throw Error('Expected "value" to be defined, but received ' + value);
  }
}


export const assertDefined: <T>(value: T | undefined | null, error?: string)
  => asserts value is T
  = <T>(  value: T | undefined | null,  error?: string)  => {
    if (typeof value === 'number' || typeof value === 'boolean') {
      return;
    }

    if (!value) {
      throw new Error(error || 'Value is not defined');
    }
  }