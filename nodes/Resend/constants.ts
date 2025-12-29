export const PAGINATION = {
	DEFAULT_LIMIT: 20,
	MAX_LIMIT: 100,
} as const;

export const ATTACHMENT = {
	MAX_SIZE_BYTES: 40 * 1024 * 1024,
	MAX_SIZE_MB: 40,
} as const;

export const BATCH_EMAIL = {
	MAX_COUNT: 100,
} as const;
