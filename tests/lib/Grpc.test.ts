import { Store } from '@sapphire/pieces';

const { grpc } = Store.injectedContext;

describe('Grpc', () => {
	test('waitForReady succeeds', async () => {
		await expect(grpc.waitForReady()).resolves.toBe(undefined);
	});

	test('Member#addPoints', async () => {
		const result = await grpc.members.addPoints({ id: '1', amount: 50 });
		expect(result.success).toBe(true);
		expect(result.amount).toBe(50);
		expect(result.errorMessage).toBe('');
	});

	test('Member#addPoints', async () => {
		const result = await grpc.members.addPoints({ id: '1', amount: 200 });
		expect(result.success).toBe(true);
		expect(result.amount).toBe(250);
		expect(result.errorMessage).toBe('');
	});

	test('Member#getPoints', async () => {
		const result = await grpc.members.getPoints({ id: '1' });
		expect(result.success).toBe(true);
		expect(result.amount).toBe(250);
		expect(result.errorMessage).toBe('');
	});
});
