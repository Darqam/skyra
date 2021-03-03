import { GRPC_ADDRESS } from '#root/config';
import { createReferPromise } from '#utils/util';
import { Client, credentials, ServiceError } from '@grpc/grpc-js';
import { Message } from 'google-protobuf';

export abstract class ClientHandler<C extends Client = Client> {
	public abstract readonly client: C;

	public waitForReady() {
		return new Promise<void>((resolve, reject) => {
			this.client.waitForReady(Date.now() + 5000, (error) => (error ? reject(error) : resolve()));
		});
	}

	protected makeCall<T>(cb: ClientHandler.AsyncCall<Message>, type: ClientHandler.ResolvedType<T>): Promise<T> {
		const refer = createReferPromise<T>();

		try {
			cb((error, response) => {
				if (error === null) refer.resolve(ClientHandler.resolveMessage(response, type) as T);
				else refer.reject(error);
			});
		} catch (error) {
			refer.reject(error);
		}

		return refer.promise;
	}

	public static address = GRPC_ADDRESS;
	public static getCredentials = credentials.createInsecure;

	protected static resolveMessage(message: Message, type: ClientHandler.ResponseResolution) {
		switch (type) {
			case ClientHandler.ResponseResolution.Array:
				return message.toArray();
			case ClientHandler.ResponseResolution.Message:
				return message;
			case ClientHandler.ResponseResolution.Object:
				return message.toObject();
			case ClientHandler.ResponseResolution.String:
				return message.toString();
		}
	}
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ClientHandler {
	export interface AsyncCall<T> {
		(cb: (error: ServiceError | null, response: T) => unknown): void;
	}

	export type ResolvedType<T> = T extends string
		? ResponseResolution.String
		: T extends unknown[] | readonly unknown[]
		? ResponseResolution.Array
		: T extends Message
		? ResponseResolution.Message
		: ResponseResolution.Object;

	export const enum ResponseResolution {
		Array,
		Message,
		Object,
		String
	}
}
