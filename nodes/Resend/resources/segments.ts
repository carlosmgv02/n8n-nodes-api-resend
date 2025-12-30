import {
	INodeProperties,
	IExecuteSingleFunctions,
	IHttpRequestOptions,
	NodeOperationError,
} from 'n8n-workflow';
import { ResendResourceModule } from '../types';
import { buildIdField, buildPaginationFields } from '../utils/commonFields';
import { preparePaginatedRequest } from '../utils/requestBuilders';

// preSend hook for Create/Update Segment
async function prepareSegmentRequest(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const body: any = {
		name: this.getNodeParameter('name', '') as string,
	};

	const description = this.getNodeParameter('description', '') as string;
	if (description) {
		body.description = description;
	}

	// Validation
	if (!body.name) {
		throw new NodeOperationError(this.getNode(), 'Segment name is required');
	}

	requestOptions.body = body;
	return requestOptions;
}

export const segmentsResource: ResendResourceModule = {
	description: {
		displayName: 'Segment',
		value: 'segments',
		description: 'Manage contact segments',
	},

	operations: [
		{
			name: 'Create',
			value: 'create',
			description: 'Create a new segment',
			action: 'Create a segment',
			routing: {
				request: {
					method: 'POST',
					url: '/segments',
				},
				send: {
					preSend: [prepareSegmentRequest],
				},
			},
		},
		{
			name: 'List',
			value: 'list',
			description: 'List all segments',
			action: 'List segments',
			routing: {
				request: {
					method: 'GET',
					url: '/segments',
				},
				send: {
					preSend: [preparePaginatedRequest],
				},
			},
		},
		{
			name: 'Get',
			value: 'get',
			description: 'Get a segment by ID',
			action: 'Get a segment',
			routing: {
				request: {
					method: 'GET',
					url: '=/segments/{{$parameter.id}}',
				},
			},
		},
		{
			name: 'Update',
			value: 'update',
			description: 'Update a segment',
			action: 'Update a segment',
			routing: {
				request: {
					method: 'PATCH',
					url: '=/segments/{{$parameter.id}}',
				},
				send: {
					preSend: [prepareSegmentRequest],
				},
			},
		},
		{
			name: 'Delete',
			value: 'delete',
			description: 'Delete a segment',
			action: 'Delete a segment',
			routing: {
				request: {
					method: 'DELETE',
					url: '=/segments/{{$parameter.id}}',
				},
			},
		},
	],

	fields: [
		// ================== CREATE/UPDATE SEGMENT FIELDS ==================
		{
			displayName: 'Name',
			name: 'name',
			type: 'string',
			required: true,
			default: '',
			displayOptions: {
				show: {
					resource: ['segments'],
					operation: ['create', 'update'],
				},
			},
			description: 'Segment name',
			placeholder: 'VIP Customers',
		},
		{
			displayName: 'Description',
			name: 'description',
			type: 'string',
			default: '',
			displayOptions: {
				show: {
					resource: ['segments'],
					operation: ['create', 'update'],
				},
			},
			description: 'Segment description (optional)',
			placeholder: 'High-value customers who have purchased in the last 30 days',
		},

		// ================== GET/UPDATE/DELETE SEGMENT FIELDS ==================
		buildIdField('segments', ['get', 'update', 'delete'], 'Segment ID', 'The ID of the segment'),

		// ================== LIST SEGMENTS FIELDS ==================
		...buildPaginationFields('segments', 'list'),
	],
};
