/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

type ErrorWithCode = Error & { code: number }
type MaybeErrorWithCode = ErrorWithCode | null | undefined

const createErrorFromCodeLookup: Map<number, () => ErrorWithCode> = new Map()
const createErrorFromNameLookup: Map<string, () => ErrorWithCode> = new Map()

/**
 * Overflow: 'Opertaion overflowed'
 *
 * @category Errors
 * @category generated
 */
export class OverflowError extends Error {
  readonly code: number = 0x1770
  readonly name: string = 'Overflow'
  constructor() {
    super('Opertaion overflowed')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, OverflowError)
    }
  }
}

createErrorFromCodeLookup.set(0x1770, () => new OverflowError())
createErrorFromNameLookup.set('Overflow', () => new OverflowError())

/**
 * MemberRefrenceVerificationFailed: 'the member refrence is not valid'
 *
 * @category Errors
 * @category generated
 */
export class MemberRefrenceVerificationFailedError extends Error {
  readonly code: number = 0x1771
  readonly name: string = 'MemberRefrenceVerificationFailed'
  constructor() {
    super('the member refrence is not valid')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MemberRefrenceVerificationFailedError)
    }
  }
}

createErrorFromCodeLookup.set(
  0x1771,
  () => new MemberRefrenceVerificationFailedError()
)
createErrorFromNameLookup.set(
  'MemberRefrenceVerificationFailed',
  () => new MemberRefrenceVerificationFailedError()
)

/**
 * InvalidChief: 'the chief is not valid'
 *
 * @category Errors
 * @category generated
 */
export class InvalidChiefError extends Error {
  readonly code: number = 0x1772
  readonly name: string = 'InvalidChief'
  constructor() {
    super('the chief is not valid')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidChiefError)
    }
  }
}

createErrorFromCodeLookup.set(0x1772, () => new InvalidChiefError())
createErrorFromNameLookup.set('InvalidChief', () => new InvalidChiefError())

/**
 * MemberNotFound: 'the member refrence can not be found in the conntainers'
 *
 * @category Errors
 * @category generated
 */
export class MemberNotFoundError extends Error {
  readonly code: number = 0x1773
  readonly name: string = 'MemberNotFound'
  constructor() {
    super('the member refrence can not be found in the conntainers')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MemberNotFoundError)
    }
  }
}

createErrorFromCodeLookup.set(0x1773, () => new MemberNotFoundError())
createErrorFromNameLookup.set('MemberNotFound', () => new MemberNotFoundError())

/**
 * ChiefNotFound: 'the chief refrence can not be found in the conntainers'
 *
 * @category Errors
 * @category generated
 */
export class ChiefNotFoundError extends Error {
  readonly code: number = 0x1774
  readonly name: string = 'ChiefNotFound'
  constructor() {
    super('the chief refrence can not be found in the conntainers')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, ChiefNotFoundError)
    }
  }
}

createErrorFromCodeLookup.set(0x1774, () => new ChiefNotFoundError())
createErrorFromNameLookup.set('ChiefNotFound', () => new ChiefNotFoundError())

/**
 * InvalidAddressContainer: 'the address container is not valid'
 *
 * @category Errors
 * @category generated
 */
export class InvalidAddressContainerError extends Error {
  readonly code: number = 0x1775
  readonly name: string = 'InvalidAddressContainer'
  constructor() {
    super('the address container is not valid')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidAddressContainerError)
    }
  }
}

createErrorFromCodeLookup.set(0x1775, () => new InvalidAddressContainerError())
createErrorFromNameLookup.set(
  'InvalidAddressContainer',
  () => new InvalidAddressContainerError()
)

/**
 * Attempts to resolve a custom program error from the provided error code.
 * @category Errors
 * @category generated
 */
export function errorFromCode(code: number): MaybeErrorWithCode {
  const createError = createErrorFromCodeLookup.get(code)
  return createError != null ? createError() : null
}

/**
 * Attempts to resolve a custom program error from the provided error name, i.e. 'Unauthorized'.
 * @category Errors
 * @category generated
 */
export function errorFromName(name: string): MaybeErrorWithCode {
  const createError = createErrorFromNameLookup.get(name)
  return createError != null ? createError() : null
}
