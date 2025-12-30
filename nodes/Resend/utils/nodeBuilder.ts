import { INodeProperties } from 'n8n-workflow';
import { ResendResourceModule } from '../types';
import { buildResourceField } from './commonFields';

export function buildResendNode(resources: ResendResourceModule[]): INodeProperties[] {
	const properties: INodeProperties[] = [];

	// 1. Add resource selector
	const resourceOptions = resources.map((r) => ({
		name: r.description.displayName,
		value: r.description.value,
	}));
	properties.push(buildResourceField(resourceOptions));

	// 2. Add operation selectors for each resource
	for (const resource of resources) {
		const operationField: INodeProperties = {
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: [resource.description.value],
				},
			},
			options: resource.operations.map((op) => ({
				name: op.name,
				value: op.value,
				description: op.description,
				action: op.action,
				routing: op.routing,
			})),
			default: resource.operations[0]?.value || '',
			description: 'The operation to perform',
		};
		properties.push(operationField);
	}

	// 3. Add all fields from all resources
	for (const resource of resources) {
		properties.push(...resource.fields);
	}

	return properties;
}
