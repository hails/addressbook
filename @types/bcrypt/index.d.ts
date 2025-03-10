// Type definitions for bcrypt 3.0
// Project: https://www.npmjs.org/package/bcrypt
// Definitions by:  Peter Harris <https://github.com/codeanimal>
//                  Ayman Nedjmeddine <https://github.com/IOAyman>
//                  David Stapleton <https://github.com/dstapleton92>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped


/**
 * @param rounds    The cost of processing the data. Default 10.
 * @param minor     The minor version of bcrypt to use. Either 'a' or 'b'. Default 'b'.
 */

declare module 'bcrypt' {
  export function genSaltSync(rounds?: number, minor?: string): string;

  /**
   * @param rounds    The cost of processing the data. Default 10.
   * @param callback  A callback to be fire once the sald has been generated. Uses eio making it asynchronous.
   * @return A promise to be either resolved with the generated salt or rejected with an Error
   */
  export function genSalt(rounds?: number, callback?: (err: Error, salt: string) => void): Promise<string>;

  /**
   * @param rounds    The cost of processing the data. Default 10.
   * @param minor     The minor version of bcrypt to use. Either 'a' or 'b'. Default 'b'.
   * @param callback  A callback to be fire once the sald has been generated. Uses eio making it asynchronous.
   * @return A promise to be either resolved with the generated salt or rejected with an Error
   */
  export function genSalt(rounds?: number, minor?: string, callback?: (err: Error, salt: string) => void): Promise<string>;

  /**
   * @param callback  A callback to be fire once the sald has been generated. Uses eio making it asynchronous.
   * @return A promise to be either resolved with the generated salt or rejected with an Error
   */
  export function genSalt(callback?: (err: Error, salt: string) => void): Promise<string>;

  /**
   * @param data  The data to be encrypted.
   * @param salt  The salt to be used in encryption.
   */
  export function hashSync(data: any, saltOrRounds: string | number): string;

  /**
   * @param data      The data to be encrypted.
   * @param salt      The salt to be used in encryption.
   * @param callback  A callback to be fired once the data has been encrypted. Uses eio making it asynchronous.
   * @return A promise to be either resolved with the encrypted data salt or rejected with an Error
   */
  export function hash(data: any, saltOrRounds: string | number, callback?: (err: Error, encrypted: string) => void): Promise<string>;

  /**
   * @param data      The data to be encrypted.
   * @param encrypted The data to be compared against.
   */
  export function compareSync(data: any, encrypted: string): boolean;

  /**
   * @param data      The data to be encrypted.
   * @param encrypted The data to be compared against.
   * @param callback  A callback to be fire once the data has been compared. Uses eio making it asynchronous.
   * @return A promise to be either resolved with the comparision result salt or rejected with an Error
   */
  export function compare(data: any, encrypted: string, callback?: (err: Error, same: boolean) => void): Promise<boolean>;

  /**
   * Return the number of rounds used to encrypt a given hash
   *
   * @param encrypted Hash from which the number of rounds used should be extracted.
   */
  export function getRounds(encrypted: string): number;
}
