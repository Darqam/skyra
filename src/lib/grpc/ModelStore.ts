import { MemberHandler } from './structures';

export class ModelStore {
	public readonly members = new MemberHandler();

	public async waitForReady() {
		await this.members.waitForReady();
	}
}
