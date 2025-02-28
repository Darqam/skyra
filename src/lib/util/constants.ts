/* eslint-disable @typescript-eslint/no-namespace */
import { transformOauthGuildsAndUser } from '#lib/api/utils';
import { CATEGORIES as TRIVIA_CATEGORIES } from '#lib/games/TriviaManager';
import { Colors, LanguageFormatters } from '#lib/types/Constants';
import { DEV, PREFIX, VERSION as SKYRA_VERSION } from '#root/config';
import { getHandler } from '#root/languages/index';
import { LogLevel } from '@sapphire/framework';
import { ServerOptionsAuth } from '@sapphire/plugin-api';
import { codeBlock, toTitleCase } from '@sapphire/utilities';
import type { ClientOptions } from 'discord.js';
import i18next, { FormatFunction, PostProcessorModule } from 'i18next';
import { join } from 'path';

export const rootFolder = join(__dirname, '..', '..', '..');
export const assetsFolder = join(rootFolder, 'assets');
export const socialFolder = join(assetsFolder, 'images', 'social');
export const cdnFolder = DEV ? join(assetsFolder, 'public') : join('/var', 'www', 'skyra.pw', 'cdn');

export const ZeroWidthSpace = '\u200B';

export const enum Time {
	Millisecond = 1,
	Second = 1000,
	Minute = 1000 * 60,
	Hour = 1000 * 60 * 60,
	Day = 1000 * 60 * 60 * 24,
	Month = 1000 * 60 * 60 * 24 * (365 / 12),
	Year = 1000 * 60 * 60 * 24 * 365
}

export const enum BrawlStarsEmojis {
	Trophy = '<:bstrophy:742083351891935353>',
	PowerPlay = '<:powerplay:746370227377405993>',
	RoboRumble = '<:bsroborumble:742086199065182269>',
	BossFight = '<:bsbossfight:742087586788540427>',
	Exp = '<:bsxp:743434002139971636>',
	GemGrab = '<:bsgemgrab:743430818780676137>',
	SoloShowdown = '<:bssoloshowdown:743431454557732955>',
	DuoShowdown = '<:bsduoshowdown:743431564674990151>',
	ChampionshipChallenge = '<:bschallenge:746373277726801971>'
}

export const enum Emojis {
	ArrowB = '<:ArrowB:694594285269680179>',
	ArrowBL = '<:ArrowBL:694594285118685259>',
	ArrowBR = '<:ArrowBR:694594285445578792>',
	ArrowL = '<:ArrowL:694594285521207436>',
	ArrowR = '<:ArrowR:694594285466812486>',
	ArrowT = '<:ArrowT:694594285487652954>',
	ArrowTL = '<:ArrowTL:694594285625933854>',
	ArrowTR = '<:ArrowTR:694594285412155393>',
	BoostLevel1 = '<:boostlvl1:764841388243681322>',
	BoostLevel2 = '<:boostlvl2:764841388449071134>',
	BoostLevel3 = '<:boostlvl3:764841388029902891>',
	BoostLevel4 = '<:boostlvl4:764841388336349225>',
	BoostLevel5 = '<:boostlvl5:764841388449202198>',
	BoostLevel6 = '<:boostlvl6:764841388445532200>',
	BoostLevel7 = '<:boostlvl7:764841388150882305>',
	BoostLevel8 = '<:boostlvl8:764841388462178344>',
	BoostLevel9 = '<:boostlvl9:764841388470698014>',
	Bot = '<:bot:764788923851079702>',
	Frame = '<:frame:764845055356698644>',
	GreenTick = '<:greenTick:637706251253317669>',
	Loading = '<a:sloading:656988867403972629>',
	RedCross = '<:redCross:637706251257511973>',
	Shiny = '<:shiny:612364146792726539>',
	Star = '<:Star:736337719982030910>',
	StarEmpty = '<:StarEmpty:736337232738254849>',
	StarHalf = '<:StarHalf:736337529900499034>'
}

export namespace ConnectFourConstants {
	export const enum Emojis {
		Empty = '<:Empty:352403997606412289>',
		PlayerOne = '<:PlayerONE:352403997300359169>',
		PlayerTwo = '<:PlayerTWO:352404081974968330>',
		WinnerOne = '<:PlayerONEWin:352403997761601547>',
		WinnerTwo = '<:PlayerTWOWin:352403997958602752>'
	}

	export const Reactions = ['1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣'] as readonly string[];
}

export const enum MessageLogsEnum {
	Message,
	NSFWMessage,
	Image,
	Moderation,
	Member,
	Reaction
}

export namespace Moderation {
	/* eslint-disable no-multi-spaces */
	export const enum TypeVariation {
		Ban = 0b00000000,
		Kick = 0b00000001,
		Mute = 0b00000010,
		Prune = 0b00000011,
		SoftBan = 0b00000100,
		VoiceKick = 0b00000101,
		VoiceMute = 0b00000110,
		Warning = 0b00000111,
		RestrictedReaction = 0b00001000,
		RestrictedEmbed = 0b00001001,
		RestrictedAttachment = 0b00001010,
		RestrictedVoice = 0b00001011,
		SetNickname = 0b00001100,
		AddRole = 0b00001101,
		RemoveRole = 0b00001110,
		RestrictedEmoji = 0b00001111
	}

	export const enum TypeMetadata {
		Appeal = 0b00010000,
		Temporary = 0b00100000,
		Fast = 0b01000000,
		Invalidated = 0b10000000
	}

	export const enum TypeBits {
		Variation = 0b00001111,
		Metadata = 0b11110000
	}

	export const enum TypeCodes {
		Warning = TypeVariation.Warning,
		Mute = TypeVariation.Mute,
		Kick = TypeVariation.Kick,
		SoftBan = TypeVariation.SoftBan,
		Ban = TypeVariation.Ban,
		VoiceMute = TypeVariation.VoiceMute,
		VoiceKick = TypeVariation.VoiceKick,
		RestrictionAttachment = TypeVariation.RestrictedAttachment,
		RestrictionReaction = TypeVariation.RestrictedReaction,
		RestrictionEmbed = TypeVariation.RestrictedEmbed,
		RestrictionEmoji = TypeVariation.RestrictedEmoji,
		RestrictionVoice = TypeVariation.RestrictedVoice,
		UnWarn = TypeVariation.Warning | TypeMetadata.Appeal,
		UnMute = TypeVariation.Mute | TypeMetadata.Appeal,
		UnBan = TypeVariation.Ban | TypeMetadata.Appeal,
		UnVoiceMute = TypeVariation.VoiceMute | TypeMetadata.Appeal,
		UnRestrictionReaction = TypeVariation.RestrictedReaction | TypeMetadata.Appeal,
		UnRestrictionEmbed = TypeVariation.RestrictedEmbed | TypeMetadata.Appeal,
		UnRestrictionEmoji = TypeVariation.RestrictedEmoji | TypeMetadata.Appeal,
		UnRestrictionAttachment = TypeVariation.RestrictedAttachment | TypeMetadata.Appeal,
		UnRestrictionVoice = TypeVariation.RestrictedVoice | TypeMetadata.Appeal,
		UnSetNickname = TypeVariation.SetNickname | TypeMetadata.Appeal,
		UnAddRole = TypeVariation.AddRole | TypeMetadata.Appeal,
		UnRemoveRole = TypeVariation.RemoveRole | TypeMetadata.Appeal,
		TemporaryWarning = TypeVariation.Warning | TypeMetadata.Temporary,
		TemporaryMute = TypeVariation.Mute | TypeMetadata.Temporary,
		TemporaryBan = TypeVariation.Ban | TypeMetadata.Temporary,
		TemporaryVoiceMute = TypeVariation.VoiceMute | TypeMetadata.Temporary,
		TemporaryRestrictionAttachment = TypeVariation.RestrictedAttachment | TypeMetadata.Temporary,
		TemporaryRestrictionReaction = TypeVariation.RestrictedReaction | TypeMetadata.Temporary,
		TemporaryRestrictionEmbed = TypeVariation.RestrictedEmbed | TypeMetadata.Temporary,
		TemporaryRestrictionEmoji = TypeVariation.RestrictedEmoji | TypeMetadata.Temporary,
		TemporaryRestrictionVoice = TypeVariation.RestrictedVoice | TypeMetadata.Temporary,
		TemporarySetNickname = TypeVariation.SetNickname | TypeMetadata.Temporary,
		TemporaryAddRole = TypeVariation.AddRole | TypeMetadata.Temporary,
		TemporaryRemoveRole = TypeVariation.RemoveRole | TypeMetadata.Temporary,
		FastTemporaryWarning = TypeVariation.Warning | TypeMetadata.Temporary | TypeMetadata.Fast,
		FastTemporaryMute = TypeVariation.Mute | TypeMetadata.Temporary | TypeMetadata.Fast,
		FastTemporaryBan = TypeVariation.Ban | TypeMetadata.Temporary | TypeMetadata.Fast,
		FastTemporaryVoiceMute = TypeVariation.VoiceMute | TypeMetadata.Temporary | TypeMetadata.Fast,
		FastTemporaryRestrictionAttachment = TypeVariation.RestrictedAttachment | TypeMetadata.Temporary | TypeMetadata.Fast,
		FastTemporaryRestrictionReaction = TypeVariation.RestrictedReaction | TypeMetadata.Temporary | TypeMetadata.Fast,
		FastTemporaryRestrictionEmbed = TypeVariation.RestrictedEmbed | TypeMetadata.Temporary | TypeMetadata.Fast,
		FastTemporaryRestrictionEmoji = TypeVariation.RestrictedEmoji | TypeMetadata.Temporary | TypeMetadata.Fast,
		FastTemporaryRestrictionVoice = TypeVariation.RestrictedVoice | TypeMetadata.Temporary | TypeMetadata.Fast,
		FastTemporarySetNickname = TypeVariation.SetNickname | TypeMetadata.Temporary | TypeMetadata.Fast,
		FastTemporaryAddRole = TypeVariation.AddRole | TypeMetadata.Temporary | TypeMetadata.Fast,
		FastTemporaryRemoveRole = TypeVariation.RemoveRole | TypeMetadata.Temporary | TypeMetadata.Fast,
		Prune = TypeVariation.Prune,
		SetNickname = TypeVariation.SetNickname,
		AddRole = TypeVariation.AddRole,
		RemoveRole = TypeVariation.RemoveRole
	}
	/* eslint-enable no-multi-spaces */

	export const metadata = new Map<TypeCodes, ModerationTypeAssets>([
		[TypeCodes.Warning, { color: Colors.Yellow, title: 'Warning' }],
		[TypeCodes.Mute, { color: Colors.Amber, title: 'Mute' }],
		[TypeCodes.Kick, { color: Colors.Orange, title: 'Kick' }],
		[TypeCodes.SoftBan, { color: Colors.DeepOrange, title: 'SoftBan' }],
		[TypeCodes.Ban, { color: Colors.Red, title: 'Ban' }],
		[TypeCodes.VoiceMute, { color: Colors.Amber, title: 'Voice Mute' }],
		[TypeCodes.VoiceKick, { color: Colors.Orange, title: 'Voice Kick' }],
		[TypeCodes.RestrictionReaction, { color: Colors.Lime, title: 'Reaction Restriction' }],
		[TypeCodes.RestrictionEmbed, { color: Colors.Lime, title: 'Embed Restriction' }],
		[TypeCodes.RestrictionEmoji, { color: Colors.Lime, title: 'Emoji Restriction' }],
		[TypeCodes.RestrictionAttachment, { color: Colors.Lime, title: 'Attachment Restriction' }],
		[TypeCodes.RestrictionVoice, { color: Colors.Lime, title: 'Voice Restriction' }],
		[TypeCodes.UnWarn, { color: Colors.LightBlue, title: 'Reverted Warning' }],
		[TypeCodes.UnMute, { color: Colors.LightBlue, title: 'Reverted Mute' }],
		[TypeCodes.UnBan, { color: Colors.LightBlue, title: 'Reverted Ban' }],
		[TypeCodes.UnVoiceMute, { color: Colors.LightBlue, title: 'Reverted Voice Mute' }],
		[TypeCodes.UnRestrictionReaction, { color: Colors.LightBlue, title: 'Reverted Reaction Restriction' }],
		[TypeCodes.UnRestrictionEmbed, { color: Colors.LightBlue, title: 'Reverted Embed Restriction' }],
		[TypeCodes.UnRestrictionEmoji, { color: Colors.LightBlue, title: 'Reverted Emoji Restriction' }],
		[TypeCodes.UnRestrictionAttachment, { color: Colors.LightBlue, title: 'Reverted Attachment Restriction' }],
		[TypeCodes.UnRestrictionVoice, { color: Colors.LightBlue, title: 'Reverted Voice Restriction' }],
		[TypeCodes.UnSetNickname, { color: Colors.LightBlue, title: 'Reverted Set Nickname' }],
		[TypeCodes.UnAddRole, { color: Colors.LightBlue, title: 'Reverted Add Role' }],
		[TypeCodes.UnRemoveRole, { color: Colors.LightBlue, title: 'Reverted Remove Role' }],
		[TypeCodes.TemporaryWarning, { color: Colors.Yellow300, title: 'Temporary Warning' }],
		[TypeCodes.TemporaryMute, { color: Colors.Amber300, title: 'Temporary Mute' }],
		[TypeCodes.TemporaryBan, { color: Colors.Red300, title: 'Temporary Ban' }],
		[TypeCodes.TemporaryVoiceMute, { color: Colors.Amber300, title: 'Temporary Voice Mute' }],
		[TypeCodes.TemporaryRestrictionReaction, { color: Colors.Lime300, title: 'Temporary Reaction Restriction' }],
		[TypeCodes.TemporaryRestrictionEmbed, { color: Colors.Lime300, title: 'Temporary Embed Restriction' }],
		[TypeCodes.TemporaryRestrictionEmoji, { color: Colors.Lime300, title: 'Temporary Emoji Restriction' }],
		[TypeCodes.TemporaryRestrictionAttachment, { color: Colors.Lime300, title: 'Temporary Attachment Restriction' }],
		[TypeCodes.TemporaryRestrictionVoice, { color: Colors.Lime300, title: 'Temporary Voice Restriction' }],
		[TypeCodes.TemporarySetNickname, { color: Colors.Lime300, title: 'Temporary Set Nickname' }],
		[TypeCodes.TemporaryAddRole, { color: Colors.Lime300, title: 'Temporarily Added Role' }],
		[TypeCodes.TemporaryRemoveRole, { color: Colors.Lime300, title: 'Temporarily Removed Role' }],
		[TypeCodes.FastTemporaryWarning, { color: Colors.Yellow300, title: 'Temporary Warning' }],
		[TypeCodes.FastTemporaryMute, { color: Colors.Amber300, title: 'Temporary Mute' }],
		[TypeCodes.FastTemporaryBan, { color: Colors.Red300, title: 'Temporary Ban' }],
		[TypeCodes.FastTemporaryVoiceMute, { color: Colors.Amber300, title: 'Temporary Voice Mute' }],
		[TypeCodes.FastTemporaryRestrictionReaction, { color: Colors.Lime300, title: 'Temporary Reaction Restriction' }],
		[TypeCodes.FastTemporaryRestrictionEmbed, { color: Colors.Lime300, title: 'Temporary Embed Restriction' }],
		[TypeCodes.FastTemporaryRestrictionEmoji, { color: Colors.Lime300, title: 'Temporary Emoji Restriction' }],
		[TypeCodes.FastTemporaryRestrictionAttachment, { color: Colors.Lime300, title: 'Temporary Attachment Restriction' }],
		[TypeCodes.FastTemporaryRestrictionVoice, { color: Colors.Lime300, title: 'Temporary Voice Restriction' }],
		[TypeCodes.FastTemporarySetNickname, { color: Colors.Lime300, title: 'Temporary Set Nickname' }],
		[TypeCodes.FastTemporaryAddRole, { color: Colors.Lime300, title: 'Temporarily Added Role' }],
		[TypeCodes.FastTemporaryRemoveRole, { color: Colors.Lime300, title: 'Temporarily Removed Role' }],
		[TypeCodes.Prune, { color: Colors.Brown, title: 'Prune' }],
		[TypeCodes.SetNickname, { color: Colors.Lime, title: 'Set Nickname' }],
		[TypeCodes.AddRole, { color: Colors.Lime, title: 'Added Role' }],
		[TypeCodes.RemoveRole, { color: Colors.Lime, title: 'Removed Role' }]
	]) as ReadonlyMap<TypeCodes, ModerationTypeAssets>;

	export const enum TypeVariationAppealNames {
		Warning = 'moderationEndWarning',
		Mute = 'moderationEndMute',
		Ban = 'moderationEndBan',
		VoiceMute = 'moderationEndVoiceMute',
		RestrictedReaction = 'moderationEndRestrictionReaction',
		RestrictedEmbed = 'moderationEndRestrictionEmbed',
		RestrictedEmoji = 'moderationEndRestrictionEmoji',
		RestrictedAttachment = 'moderationEndRestrictionAttachment',
		RestrictedVoice = 'moderationEndRestrictionVoice',
		SetNickname = 'moderationEndSetNickname',
		AddRole = 'moderationEndAddRole',
		RemoveRole = 'moderationEndRemoveRole'
	}

	export const enum SchemaKeys {
		Case = 'caseID',
		CreatedAt = 'createdAt',
		Duration = 'duration',
		ExtraData = 'extraData',
		Guild = 'guildID',
		Moderator = 'moderatorID',
		Reason = 'reason',
		ImageURL = 'imageURL',
		Type = 'type',
		User = 'userID'
	}

	export interface ModerationTypeAssets {
		color: number;
		title: string;
	}

	export interface ModerationManagerDescriptionData {
		type: string;
		userName: string;
		userDiscriminator: string;
		userID: string;
		reason: string | null;
		prefix: string;
		caseID: number;
		formattedDuration: string;
	}

	export interface Unlock {
		unlock(): void;
	}
}

export namespace Mime {
	export const enum Types {
		ApplicationJson = 'application/json',
		ApplicationFormUrlEncoded = 'application/x-www-form-urlencoded',
		TextPlain = 'text/plain',
		ImagePng = 'image/png'
	}
}

export const helpUsagePostProcessor: PostProcessorModule = {
	type: 'postProcessor',
	name: 'helpUsagePostProcessor',
	process(value, [key]) {
		// If the value is equal to the key then it is an empty usage, so return an empty string
		if (value === key) return '';
		// Otherwise just return the value
		return value;
	}
};

export const clientOptions: Partial<ClientOptions> = {
	caseInsensitiveCommands: true,
	caseInsensitivePrefixes: true,
	loadDefaultErrorEvents: false,
	nms: {
		everyone: 5,
		role: 2
	},
	logger: {
		level: DEV ? LogLevel.Debug : LogLevel.Info
	},
	api: {
		auth: ({
			transformers: [transformOauthGuildsAndUser]
		} as unknown) as ServerOptionsAuth
	},
	i18n: {
		defaultMissingKey: 'default',
		defaultNS: 'globals',
		i18next: (_: string[], languages: string[]) => ({
			supportedLngs: languages,
			preload: languages,
			returnObjects: true,
			returnEmptyString: false,
			returnNull: false,
			load: 'all',
			lng: 'en-US',
			fallbackLng: 'en-US',
			defaultNS: 'globals',
			overloadTranslationOptionHandler: (args) => ({ defaultValue: args[1] ?? 'globals:default' }),
			initImmediate: false,
			interpolation: {
				escapeValue: false,
				defaultVariables: {
					TRIVIA_CATEGORIES: Object.keys(TRIVIA_CATEGORIES ?? {}).join(', '),
					VERSION: SKYRA_VERSION,
					LOADING: Emojis.Loading,
					SHINY: Emojis.Shiny,
					GREENTICK: Emojis.GreenTick,
					REDCROSS: Emojis.RedCross,
					DEFAULT_PREFIX: PREFIX,
					/* Permissions */
					ADMINISTRATOR: 'ADMINISTRATOR',
					VIEW_AUDIT_LOG: 'VIEW_AUDIT_LOG',
					MANAGE_GUILD: 'MANAGE_GUILD',
					MANAGE_ROLES: 'MANAGE_ROLES',
					MANAGE_CHANNELS: 'MANAGE_CHANNELS',
					KICK_MEMBERS: 'KICK_MEMBERS',
					BAN_MEMBERS: 'BAN_MEMBERS',
					CREATE_INSTANT_INVITE: 'CREATE_INSTANT_INVITE',
					CHANGE_NICKNAME: 'CHANGE_NICKNAME',
					MANAGE_NICKNAMES: 'MANAGE_NICKNAMES',
					MANAGE_EMOJIS: 'MANAGE_EMOJIS',
					MANAGE_WEBHOOKS: 'MANAGE_WEBHOOKS',
					VIEW_CHANNEL: 'VIEW_CHANNEL',
					SEND_MESSAGES: 'SEND_MESSAGES',
					SEND_TTS_MESSAGES: 'SEND_TTS_MESSAGES',
					MANAGE_MESSAGES: 'MANAGE_MESSAGES',
					EMBED_LINKS: 'EMBED_LINKS',
					ATTACH_FILES: 'ATTACH_FILES',
					READ_MESSAGE_HISTORY: 'READ_MESSAGE_HISTORY',
					MENTION_EVERYONE: 'MENTION_EVERYONE',
					USE_EXTERNAL_EMOJIS: 'USE_EXTERNAL_EMOJIS',
					ADD_REACTIONS: 'ADD_REACTIONS',
					CONNECT: 'CONNECT',
					SPEAK: 'SPEAK',
					STREAM: 'STREAM',
					MUTE_MEMBERS: 'MUTE_MEMBERS',
					DEAFEN_MEMBERS: 'DEAFEN_MEMBERS',
					MOVE_MEMBERS: 'MOVE_MEMBERS',
					USE_VAD: 'USE_VAD',
					PRIORITY_SPEAKER: 'PRIORITY_SPEAKER',
					VIEW_GUILD_INSIGHTS: 'VIEW_GUILD_INSIGHTS'
				},
				format: (...[value, format, language, options]: Parameters<FormatFunction>) => {
					switch (format as LanguageFormatters) {
						case LanguageFormatters.AndList: {
							return getHandler(language!).listAnd.format(value as string[]);
						}
						case LanguageFormatters.OrList: {
							return getHandler(language!).listOr.format(value as string[]);
						}
						case LanguageFormatters.Permissions: {
							return i18next.t(`permissions:${value}`, { ...options, lng: language });
						}
						case LanguageFormatters.PermissionsAndList: {
							return getHandler(language!).listAnd.format(
								(value as string[]).map((value) => i18next.t(`permissions:${value}`, { ...options, lng: language }))
							);
						}
						case LanguageFormatters.HumanLevels: {
							return i18next.t(`humanLevels:${value}`, { ...options, lng: language });
						}
						case LanguageFormatters.ToTitleCase: {
							return toTitleCase(value);
						}
						case LanguageFormatters.CodeBlock: {
							return codeBlock('', value);
						}
						case LanguageFormatters.JsCodeBlock: {
							return codeBlock('js', value);
						}
						case LanguageFormatters.Number: {
							return getHandler(language!).number.format(value as number);
						}
						case LanguageFormatters.NumberCompact: {
							return getHandler(language!).numberCompact.format(value as number);
						}
						case LanguageFormatters.Ordinal: {
							return getHandler(language!).ordinal(value as number);
						}
						case LanguageFormatters.Duration: {
							return getHandler(language!).duration.format(value as number, options?.precision ?? 2);
						}
						case LanguageFormatters.Date:
							return getHandler(language!).date.format(value as number);
						case LanguageFormatters.DateTime: {
							return getHandler(language!).dateTime.format(value as number);
						}
						default:
							return value as string;
					}
				}
			}
		})
	}
};

export const enum BrandingColors {
	Primary = 0x1e88e5,
	Secondary = 0xff9d01
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type O = object;
