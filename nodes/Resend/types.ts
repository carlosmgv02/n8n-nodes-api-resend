import { INodeProperties } from 'n8n-workflow';

// Resource types
export type ResendResource =
	| 'emails'
	| 'contacts'
	| 'segments'
	| 'broadcasts'
	| 'topics'
	| 'templates';

// Email operations
export type EmailOperation =
	| 'send'
	| 'sendBatch'
	| 'list'
	| 'get'
	| 'cancel'
	| 'update';

// Contact operations
export type ContactOperation =
	| 'create'
	| 'list'
	| 'get'
	| 'update'
	| 'delete'
	| 'addToSegment'
	| 'removeFromSegment';

// Segment operations
export type SegmentOperation =
	| 'create'
	| 'list'
	| 'get'
	| 'update'
	| 'delete';

// Broadcast operations
export type BroadcastOperation =
	| 'create'
	| 'list'
	| 'get'
	| 'update'
	| 'send'
	| 'delete';

// Topic operations
export type TopicOperation =
	| 'create'
	| 'list'
	| 'get'
	| 'update'
	| 'delete';

// Template operations (read-only)
export type TemplateOperation =
	| 'list'
	| 'get';

// Attachment interface
export interface ResendAttachment {
	filename?: string;
	content?: string; // base64
	path?: string;
	content_type?: string;
	content_id?: string; // For inline images (CID)
}

// Template variable interface
export interface TemplateVariable {
	key: string;
	value: string | number;
}

// Tag interface
export interface EmailTag {
	name: string;
	value: string;
}

// Header interface
export interface EmailHeader {
	key: string;
	value: string;
}

// Contact properties interface
export interface ContactProperty {
	key: string;
	value: string | number;
	type?: 'string' | 'number';
}

// Pagination response
export interface PaginatedResponse<T> {
	object: 'list';
	data: T[];
	has_more: boolean;
}

// Domain interface
export interface Domain {
	id: string;
	name: string;
	status: string;
	created_at: string;
	region: string;
}

// Segment interface
export interface Segment {
	id: string;
	name: string;
	description?: string;
	created_at: string;
}

// Topic interface
export interface Topic {
	id: string;
	name: string;
	description?: string;
	default_subscription: 'opt_in' | 'opt_out';
	visibility: 'public' | 'private';
	created_at: string;
}

// Template interface
export interface Template {
	id: string;
	name: string;
	alias?: string;
	subject?: string;
	from?: string;
	html?: string;
	status?: string;
	variables?: Array<{
		key: string;
		type: 'string' | 'number';
		fallback_value?: string | number;
	}>;
	created_at: string;
}

// Resource module interface
export interface ResendResourceDescription {
	displayName: string;
	value: ResendResource;
	description: string;
}

export interface ResendOperationDescription {
	name: string;
	value: string;
	description: string;
	action: string;
	routing?: any;
}

export interface ResendResourceModule {
	description: ResendResourceDescription;
	operations: ResendOperationDescription[];
	fields: INodeProperties[];
}
