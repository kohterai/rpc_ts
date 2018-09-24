/**
 * @license
 * Copyright (c) Aiden.ai
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as ModuleRpcCommon from '../common/rpc_common';

/** Base class for all server errors */
export abstract class ServerError extends Error {}

/** The handler did not respect the protocol */
export class HandlerProtocolError extends ServerError {
  constructor(readonly url: string, readonly message: string) {
    super(`${url}: ${message}`);
  }
}

/** There has been an error at the transport layer */
export class ServerTransportError extends ServerError {
  constructor(readonly cause: Error) {
    super(`Server transport error: ${cause.stack}`);
  }
}

/**
 * An error sent by the RPC handler or the context provider.  Note that RPC clients
 * throw a different error (`ModuleRpcClient.ClientRpcError`).  We do this
 * to ensure that no RPC server mistakenly rethrow the RPC error of an upstream
 * service.
 */
export class ServerRpcError extends ServerError {
  constructor(
    public readonly errorType: ModuleRpcCommon.RpcErrorType,
    message?: string,
    public readonly unsafeTransmittedMessage?: string,
  ) {
    super(message ? `${errorType}: ${message}` : errorType);
  }
}