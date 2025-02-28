import { LanguageKeys } from '#lib/i18n/languageKeys';
import { SkyraCommand } from '#lib/structures';
import { PermissionLevels } from '#lib/types/Enums';
import { OWNERS } from '#root/config';
import { Argument, ArgumentContext } from '@sapphire/framework';

export class UserArgument extends Argument<SkyraCommand> {
	public async run(parameter: string, context: CommandArgumentContext) {
		const resolved = this.context.stores.get('commands').get(parameter.toLowerCase()) as SkyraCommand | undefined;
		if (resolved !== undefined && this.isAllowed(resolved, context)) return this.ok(resolved);
		return this.error({ parameter, identifier: LanguageKeys.Arguments.Command, context });
	}

	private isAllowed(command: SkyraCommand, context: CommandArgumentContext): boolean {
		if (command.permissionLevel !== PermissionLevels.BotOwner) return true;
		return context.owners ?? OWNERS.includes(context.message.author.id);
	}
}

interface CommandArgumentContext extends ArgumentContext<SkyraCommand> {
	owners?: boolean;
}
