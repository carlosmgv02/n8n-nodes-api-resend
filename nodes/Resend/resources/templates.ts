import {
	INodeProperties,
	IExecuteSingleFunctions,
	IHttpRequestOptions,
} from 'n8n-workflow';
import { ResendResourceModule } from '../types';
import { buildIdField, buildPaginationFields } from '../utils/commonFields';

// preSend hook for pagination
async function preparePaginatedRequest(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const qs: any = {};

	const limit = this.getNodeParameter('limit', 20) as number;
	qs.limit = limit;

	const after = this.getNodeParameter('after', '') as string;
	if (after) {
		qs.after = after;
	}

	const before = this.getNodeParameter('before', '') as string;
	if (before) {
		qs.before = before;
	}

	requestOptions.qs = qs;
	return requestOptions;
}

export const templatesResource: ResendResourceModule = {
	description: {
		displayName: 'Template',
		value: 'templates',
		description: 'Manage email templates',
	},

	operations: [
		{
			name: 'List',
			value: 'list',
			description: 'List all templates',
			action: 'List templates',
			routing: {
				request: {
					method: 'GET',
					url: '/templates',
				},
				send: {
					preSend: [preparePaginatedRequest],
				},
			},
		},
		{
			name: 'Get',
			value: 'get',
			description: 'Get a template by ID or alias',
			action: 'Get a template',
			routing: {
				request: {
					method: 'GET',
					url: '=/templates/{{$parameter.id}}',
				},
			},
		},
	],

	fields: [
		// ================== LIST TEMPLATES FIELDS ==================
		...buildPaginationFields('templates', 'list'),

		// ================== GET TEMPLATE FIELDS ==================
		buildIdField('templates', ['get'], 'Template ID or Alias', 'The ID or alias of the template'),
	],
};
