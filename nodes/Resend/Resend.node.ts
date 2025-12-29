import {
	INodeType,
	INodeTypeDescription,
	ILoadOptionsFunctions,
	INodePropertyOptions,
} from 'n8n-workflow';

import { buildResendNode } from './utils/nodeBuilder';
import {
	getSegments,
	getDomains,
	getTopics,
	getTemplates,
} from './utils/loadOptionsHelpers';
import {
	emailsResource,
	contactsResource,
	segmentsResource,
	broadcastsResource,
	topicsResource,
	templatesResource,
} from './resources';

export class Resend implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Resend',
		name: 'resend',
		icon: 'file:resend.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Resend API - Email marketing and transactional emails',
		defaults: {
			name: 'Resend',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'resendApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.resend.com',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: buildResendNode([
			emailsResource,
			contactsResource,
			segmentsResource,
			broadcastsResource,
			topicsResource,
			templatesResource,
		]),
	};

	methods = {
		loadOptions: {
			getSegments,
			getDomains,
			getTopics,
			getTemplates,
		},
	};
}
