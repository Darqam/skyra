import { MemberClient } from '../generated/member_grpc_pb';
import * as Member from '../generated/member_pb';
import { ClientHandler } from './base/ClientHandler';

export class MemberHandler extends ClientHandler {
	public readonly client = new MemberClient(ClientHandler.address, ClientHandler.getCredentials());

	public addPoints(options: MemberHandler.PointsQuery): Promise<MemberHandler.PointsResult> {
		const query = new Member.PointsQuery().setId(options.id).setAmount(options.amount);
		return this.makeCall<MemberHandler.PointsResult>((cb) => this.client.addPoints(query, cb), ClientHandler.ResponseResolution.Object);
	}

	public getPoints(options: MemberHandler.MemberQuery): Promise<MemberHandler.PointsResult> {
		const query = new Member.MemberQuery().setId(options.id);
		return this.makeCall<MemberHandler.PointsResult>((cb) => this.client.getPoints(query, cb), ClientHandler.ResponseResolution.Object);
	}
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace MemberHandler {
	export type PointsQuery = Member.PointsQuery.AsObject;
	export type MemberQuery = Member.MemberQuery.AsObject;
	export type PointsResult = Member.PointsResult.AsObject;
}
